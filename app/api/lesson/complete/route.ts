import { NextResponse } from "next/server";
import { Keypair, PublicKey, Connection } from "@solana/web3.js";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import fs from "fs";
import path from "path";
import IDL from "@/lib/anchor/idl/onchain_academy.json";
import { OnchainAcademy } from "@/lib/anchor/idl/onchain_academy";
import { 
  getConfigPda,
  getCoursePda, 
  getEnrollmentPda, 
  CLUSTER_URL 
} from "@/lib/anchor/client";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

// Recreate connection instance for the server-side
const connection = new Connection(CLUSTER_URL, "confirmed");

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { courseSlug: string; learnerAddress: string; lessonIndex: number };
    const { courseSlug, learnerAddress, lessonIndex } = body;

    // Validate inputs
    if (!courseSlug || !learnerAddress || typeof lessonIndex !== 'number') {
      return NextResponse.json(
        { error: "Missing required parameters: courseSlug, learnerAddress, lessonIndex" }, 
        { status: 400 }
      );
    }

    const learnerPublicKey = new PublicKey(learnerAddress);

    // 1. Load Backend Signer (Authority keypair)
    const keypairPath = path.resolve(process.cwd(), "wallets", "signer.json");
    if (!fs.existsSync(keypairPath)) {
      return NextResponse.json(
        { error: "Backend signer keypair not found. Ensure wallets/signer.json exists." }, 
        { status: 500 }
      );
    }
    
    const raw = fs.readFileSync(keypairPath, "utf-8");
    const secretKeyArray = JSON.parse(raw);
    const backendSigner = Keypair.fromSecretKey(new Uint8Array(secretKeyArray));

    // 2. Initialize Program Instance Server-Side
    // We wrap the backend signer in an Anchor Wallet object
    const anchorWallet = {
      publicKey: backendSigner.publicKey,
      signTransaction: async <T extends import("@solana/web3.js").Transaction | import("@solana/web3.js").VersionedTransaction>(tx: T) => {
        if ('version' in tx) {
            tx.sign([backendSigner]);
        } else {
            tx.partialSign(backendSigner);
        }
        return tx;
      },
      signAllTransactions: async <T extends import("@solana/web3.js").Transaction | import("@solana/web3.js").VersionedTransaction>(txs: T[]) => {
        return txs.map((tx) => {
            if ('version' in tx) {
                tx.sign([backendSigner]);
            } else {
                tx.partialSign(backendSigner);
            }
            return tx;
        });
      }
    };
    const provider = new AnchorProvider(
      connection,
      anchorWallet,
      AnchorProvider.defaultOptions()
    );
    
    const program = new Program<OnchainAcademy>(
      IDL as OnchainAcademy, 
      provider
    );

    // 3. Derive PDAs
    const [configPda] = getConfigPda();
    const [coursePda] = getCoursePda(courseSlug);
    const [enrollmentPda] = getEnrollmentPda(courseSlug, learnerPublicKey);

    const XP_MINT = new PublicKey(process.env.NEXT_PUBLIC_XP_MINT!);
    const TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");

    const learnerTokenAccount = getAssociatedTokenAddressSync(
      XP_MINT,
      learnerPublicKey,
      false,
      TOKEN_2022_PROGRAM_ID
    );

    // 4. Send the Transaction
    // `complete_lesson` on-chain requires specific accounts
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
      .signers([backendSigner])
      .rpc();

    return NextResponse.json({ 
        success: true, 
        signature: tx,
        message: `Lesson ${lessonIndex} marked complete.`
    });
    
  } catch (error) {
    console.error("Error completing lesson:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to complete lesson on-chain" }, 
      { status: 500 }
    );
  }
}
