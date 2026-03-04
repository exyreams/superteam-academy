/**
 * @fileoverview API route to finalize a course on-chain.
 * Rewards the learner with a completion bonus and triggers creator rewards.
 */

import { AnchorProvider, Program } from "@coral-xyz/anchor";
import {
	createAssociatedTokenAccountInstruction,
	getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { eq } from "drizzle-orm";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import {
	CLUSTER_URL,
	getConfigPda,
	getCoursePda,
	getEnrollmentPda,
	TOKEN_2022_PROGRAM_ID,
} from "@/lib/anchor/client";
import { OnchainAcademy } from "@/lib/anchor/idl/onchain_academy";
import IDL from "@/lib/anchor/idl/onchain_academy.json";
import { db } from "@/lib/db";
import { streak as streakTable, userActivity } from "@/lib/db/schema";
import { getPostHogClient } from "@/lib/posthog-server";

const connection = new Connection(CLUSTER_URL, "confirmed");

/**
 * Handles the finalization of a course for a learner.
 * Verifies lesson completion and mints bonus XP.
 */
export async function POST(request: Request) {
	try {
		const body = (await request.json()) as {
			courseSlug: string;
			learnerAddress: string;
		};
		const { courseSlug, learnerAddress } = body;

		if (!courseSlug || !learnerAddress) {
			return NextResponse.json(
				{ error: "Missing courseSlug or learnerAddress" },
				{ status: 400 },
			);
		}

		const learnerPublicKey = new PublicKey(learnerAddress);

		// 1. Load Backend Signer
		const keypairPath = path.resolve(process.cwd(), "wallets", "signer.json");
		if (!fs.existsSync(keypairPath)) {
			return NextResponse.json(
				{ error: "Backend signer not found" },
				{ status: 500 },
			);
		}
		const secretKeyArray = JSON.parse(fs.readFileSync(keypairPath, "utf-8"));
		const backendSigner = Keypair.fromSecretKey(new Uint8Array(secretKeyArray));

		// 2. Setup Program
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

		// 3. Derive PDAs and Fetch Course Data
		const [configPda] = getConfigPda();
		const [coursePda] = getCoursePda(courseSlug);
		const [enrollmentPda] = getEnrollmentPda(courseSlug, learnerPublicKey);

		// Fetch course account to get creator address
		const courseAccount = await program.account.course.fetch(coursePda);
		const creatorPublicKey = courseAccount.creator;

		// 4. Token Accounts
		const XP_MINT = new PublicKey(process.env.NEXT_PUBLIC_XP_MINT!);

		const learnerTokenAccount = getAssociatedTokenAddressSync(
			XP_MINT,
			learnerPublicKey,
			false,
			TOKEN_2022_PROGRAM_ID,
		);

		const creatorTokenAccount = getAssociatedTokenAddressSync(
			XP_MINT,
			creatorPublicKey,
			false,
			TOKEN_2022_PROGRAM_ID,
		);

		// 5. Ensure Token Accounts exist
		const instructions = [];
		const [learnerAtaInfo, creatorAtaInfo] = await Promise.all([
			connection.getAccountInfo(learnerTokenAccount),
			connection.getAccountInfo(creatorTokenAccount),
		]);

		if (!learnerAtaInfo) {
			instructions.push(
				createAssociatedTokenAccountInstruction(
					backendSigner.publicKey,
					learnerTokenAccount,
					learnerPublicKey,
					XP_MINT,
					TOKEN_2022_PROGRAM_ID,
				),
			);
		}

		if (!creatorAtaInfo) {
			instructions.push(
				createAssociatedTokenAccountInstruction(
					backendSigner.publicKey,
					creatorTokenAccount,
					creatorPublicKey,
					XP_MINT,
					TOKEN_2022_PROGRAM_ID,
				),
			);
		}

		// 6. Finalize Course
		const tx = await program.methods
			.finalizeCourse()
			.accountsPartial({
				config: configPda,
				course: coursePda,
				enrollment: enrollmentPda,
				learner: learnerPublicKey,
				learnerTokenAccount,
				creatorTokenAccount,
				creator: creatorPublicKey,
				xpMint: XP_MINT,
				backendSigner: backendSigner.publicKey,
				tokenProgram: TOKEN_2022_PROGRAM_ID,
			})
			.preInstructions(instructions)
			.signers([backendSigner])
			.rpc();

		// Track course completion server-side
		const posthog = getPostHogClient();
		posthog.capture({
			distinctId: learnerAddress,
			event: "course_completed",
			properties: {
				course_slug: courseSlug,
				transaction_signature: tx,
			},
		});
		await posthog.shutdown();

		// 7. DB Updates (Streaks & Activity)
		try {
			const now = new Date();
			const [existingStreak] = await db
				.select()
				.from(streakTable)
				.where(eq(streakTable.userId, learnerAddress));

			if (!existingStreak) {
				await db.insert(streakTable).values({
					id: uuidv4(),
					userId: learnerAddress,
					currentStreak: 1,
					longestStreak: 1,
					lastActiveDate: now,
					updatedAt: now,
				});
			} else {
				const lastActive = existingStreak.lastActiveDate;
				let newCurrent = existingStreak.currentStreak;
				const isSameDay =
					lastActive && lastActive.toDateString() === now.toDateString();
				const isNextDay =
					lastActive &&
					new Date(lastActive.getTime() + 86400000).toDateString() ===
						now.toDateString();

				if (!isSameDay) {
					if (isNextDay) {
						newCurrent += 1;
					} else {
						newCurrent = 1;
					}
					await db
						.update(streakTable)
						.set({
							currentStreak: newCurrent,
							longestStreak: Math.max(newCurrent, existingStreak.longestStreak),
							lastActiveDate: now,
							updatedAt: now,
						})
						.where(eq(streakTable.userId, learnerAddress));
				}
			}

			// Add Activity record
			await db.insert(userActivity).values({
				id: uuidv4(),
				userId: learnerAddress,
				type: "course_completed",
				title: `COURSE COMPLETED: ${courseSlug.toUpperCase()}`,
				description: "Mastered the track and earned a completion bonus!",
				xpEarned: Math.floor(
					(courseAccount.lessonCount * courseAccount.xpPerLesson) / 2,
				),
				metadata: { courseSlug, signature: tx },
				createdAt: now,
			});
		} catch (dbError) {
			console.error("Failed to update DB gamification stats:", dbError);
		}

		return NextResponse.json({
			success: true,
			signature: tx,
			message: "Course finalized! Completion bonus rewarded.",
		});
	} catch (error) {
		console.error("Error finalizing course:", error);

		// Handle CourseAlreadyFinalized gracefully
		const errorMessage = error instanceof Error ? error.message : String(error);
		if (errorMessage.includes("CourseAlreadyFinalized")) {
			return NextResponse.json({
				success: true,
				message: "Course was already finalized on-chain.",
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
