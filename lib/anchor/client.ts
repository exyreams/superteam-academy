import { Connection, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import type { WalletContextState } from "@solana/wallet-adapter-react";
import { OnchainAcademy } from "./idl/onchain_academy";
import IDL from "./idl/onchain_academy.json";

// Program deployed on devnet
export const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!);
export const XP_MINT = new PublicKey(process.env.NEXT_PUBLIC_XP_MINT!);
export const AUTHORITY = new PublicKey(process.env.NEXT_PUBLIC_AUTHORITY!);

export const CLUSTER_URL =
  process.env.NEXT_PUBLIC_CLUSTER === "devnet"
    ? "https://api.devnet.solana.com"
    : "http://127.0.0.1:8899";

export const TOKEN_2022_PROGRAM_ID = new PublicKey(
  "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",
);
export const MPL_CORE_PROGRAM_ID = new PublicKey(
  "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d",
);

export const connection = new Connection(CLUSTER_URL, "confirmed");

/**
 * Get the Anchor Program instance
 * @param wallet The wallet from useWallet()
 */
export function getProgram(
  wallet: WalletContextState,
): Program<OnchainAcademy> | null {
  if (!wallet || !wallet.publicKey) return null;

  const provider = new AnchorProvider(
    connection,
    wallet as any,
    AnchorProvider.defaultOptions(),
  );
  return new Program<OnchainAcademy>(IDL as OnchainAcademy, provider);
}

/**
 * Derive Config PDA (singleton)
 */
export function getConfigPda(): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([Buffer.from("config")], PROGRAM_ID);
}

/**
 * Derive Course PDA
 */
export function getCoursePda(courseId: string): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("course"), Buffer.from(courseId)],
    PROGRAM_ID,
  );
}

/**
 * Derive Enrollment PDA
 */
export function getEnrollmentPda(
  courseId: string,
  learner: PublicKey,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("enrollment"), Buffer.from(courseId), learner.toBuffer()],
    PROGRAM_ID,
  );
}

/**
 * Derive MinterRole PDA
 */
export function getMinterRolePda(minter: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("minter"), minter.toBuffer()],
    PROGRAM_ID,
  );
}

/**
 * Derive AchievementType PDA
 */
export function getAchievementTypePda(
  achievementId: string,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("achievement"), Buffer.from(achievementId)],
    PROGRAM_ID,
  );
}

/**
 * Derive AchievementReceipt PDA
 */
export function getAchievementReceiptPda(
  achievementId: string,
  recipient: PublicKey,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("achievement_receipt"),
      Buffer.from(achievementId),
      recipient.toBuffer(),
    ],
    PROGRAM_ID,
  );
}
