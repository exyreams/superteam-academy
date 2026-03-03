/**
 * @fileoverview Lesson completion route handler.
 * Marks a lesson as complete on-chain and rewards the learner with XP tokens.
 */

import { AnchorProvider, Program } from "@coral-xyz/anchor";
import {
	createAssociatedTokenAccountInstruction,
	getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import {
	CLUSTER_URL,
	getConfigPda,
	getCoursePda,
	getEnrollmentPda,
} from "@/lib/anchor/client";
import { OnchainAcademy } from "@/lib/anchor/idl/onchain_academy";
import IDL from "@/lib/anchor/idl/onchain_academy.json";
import { getPostHogClient } from "@/lib/posthog-server";

// Recreate connection instance for the server-side
const connection = new Connection(CLUSTER_URL, "confirmed");

/**
 * Handles the completion of a lesson for a learner.
 * Verifies lesson progress on-chain and mints XP tokens as a reward.
 */
export async function POST(request: Request) {
	let lessonIndex: number | undefined;
	try {
		const body = (await request.json()) as {
			courseSlug: string;
			learnerAddress: string;
			lessonIndex: number;
		};
		const { courseSlug, learnerAddress } = body;
		lessonIndex = body.lessonIndex;

		// Validate inputs
		if (!courseSlug || !learnerAddress || typeof lessonIndex !== "number") {
			return NextResponse.json(
				{
					error:
						"Missing required parameters: courseSlug, learnerAddress, lessonIndex",
				},
				{ status: 400 },
			);
		}

		const learnerPublicKey = new PublicKey(learnerAddress);

		// 1. Load Backend Signer (Authority keypair)
		const keypairPath = path.resolve(process.cwd(), "wallets", "signer.json");
		if (!fs.existsSync(keypairPath)) {
			return NextResponse.json(
				{
					error:
						"Backend signer keypair not found. Ensure wallets/signer.json exists.",
				},
				{ status: 500 },
			);
		}

		const raw = fs.readFileSync(keypairPath, "utf-8");
		const secretKeyArray = JSON.parse(raw);
		const backendSigner = Keypair.fromSecretKey(new Uint8Array(secretKeyArray));

		// 2. Initialize Program Instance Server-Side
		// We wrap the backend signer in an Anchor Wallet object
		const anchorWallet = {
			publicKey: backendSigner.publicKey,
			signTransaction: async <
				T extends
					| import("@solana/web3.js").Transaction
					| import("@solana/web3.js").VersionedTransaction,
			>(
				tx: T,
			) => {
				if ("version" in tx) {
					tx.sign([backendSigner]);
				} else {
					tx.partialSign(backendSigner);
				}
				return tx;
			},
			signAllTransactions: async <
				T extends
					| import("@solana/web3.js").Transaction
					| import("@solana/web3.js").VersionedTransaction,
			>(
				txs: T[],
			) => {
				return txs.map((tx) => {
					if ("version" in tx) {
						tx.sign([backendSigner]);
					} else {
						tx.partialSign(backendSigner);
					}
					return tx;
				});
			},
		};
		const provider = new AnchorProvider(
			connection,
			anchorWallet,
			AnchorProvider.defaultOptions(),
		);

		const program = new Program<OnchainAcademy>(
			IDL as OnchainAcademy,
			provider,
		);

		// 3. Derive PDAs
		const [configPda] = getConfigPda();
		const [coursePda] = getCoursePda(courseSlug);
		const [enrollmentPda] = getEnrollmentPda(courseSlug, learnerPublicKey);

		const XP_MINT = new PublicKey(process.env.NEXT_PUBLIC_XP_MINT!);
		const TOKEN_2022_PROGRAM_ID = new PublicKey(
			"TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
		);

		const learnerTokenAccount = getAssociatedTokenAddressSync(
			XP_MINT,
			learnerPublicKey,
			false,
			TOKEN_2022_PROGRAM_ID,
		);

		// 4. Check if ATA exists, if not, create it
		const ataInfo = await connection.getAccountInfo(learnerTokenAccount);
		const instructions = [];

		if (!ataInfo) {
			console.log("ATA does not exist, adding creation instruction...");
			instructions.push(
				createAssociatedTokenAccountInstruction(
					backendSigner.publicKey, // Payer
					learnerTokenAccount,
					learnerPublicKey,
					XP_MINT,
					TOKEN_2022_PROGRAM_ID,
				),
			);
		}

		// 5. Send the Transaction
		const tx = await program.methods
			.completeLesson(lessonIndex)
			.accountsPartial({
				config: configPda,
				course: coursePda,
				enrollment: enrollmentPda,
				learner: learnerPublicKey,
				learnerTokenAccount: learnerTokenAccount,
				xpMint: XP_MINT,
				backendSigner: backendSigner.publicKey,
				tokenProgram: TOKEN_2022_PROGRAM_ID,
			})
			.preInstructions(instructions)
			.signers([backendSigner])
			.rpc();

		// Track lesson completion server-side
		const posthog = getPostHogClient();
		posthog.capture({
			distinctId: learnerAddress,
			event: "lesson_completed",
			properties: {
				course_slug: courseSlug,
				lesson_index: lessonIndex,
				transaction_signature: tx,
			},
		});
		await posthog.shutdown();

		return NextResponse.json({
			success: true,
			signature: tx,
			message: `Lesson ${lessonIndex} marked complete.`,
		});
	} catch (error: unknown) {
		console.error("Error completing lesson:", error);

		// Handle LessonAlreadyCompleted gracefully
		const errorMessage = error instanceof Error ? error.message : String(error);
		if (errorMessage.includes("LessonAlreadyCompleted")) {
			return NextResponse.json({
				success: true,
				message: `Lesson ${lessonIndex} was already completed on-chain.`,
			});
		}

		return NextResponse.json(
			{
				error: errorMessage,
			},
			{ status: 500 },
		);
	}
}
