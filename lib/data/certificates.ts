/**
 * @fileoverview Data models and utilities for course certificates.
 * Handles both mock data and real-time on-chain asset resolution.
 */

/** Represents a course completion certificate, either mock or on-chain. */
export interface Certificate {
	id: string;
	certificateNo: string;
	courseName: string;
	courseDescription: string;
	recipient: string;
	walletAddress: string;
	issueDate: string;
	validator: string;
	onChain: {
		assetType: string;
		mintAddress: string;
		owner: string;
		metadataUri: string;
		status: "verified" | "pending";
		signature: string;
	};
	mastery: {
		finalScore: number;
		maxScore: number;
		xpEarned: number;
		rankAchieved: number;
	};
}

// Mock certificate data
export const mockCertificates: Record<string, Certificate> = {
	"rust-fundamentals": {
		id: "rust-fundamentals",
		certificateNo: "STA-RF-2024-0892",
		courseName: "RUST FUNDAMENTALS",
		courseDescription:
			"Demonstrated proficiency in Ownership, Structs, PDAs, and Memory Management.",
		recipient: "OPERATOR_0xKD...92A",
		walletAddress: "0xKD...92A",
		issueDate: "OCTOBER 24, 2024",
		validator: "SUPERTEAM PROTOCOL",
		onChain: {
			assetType: "Compressed NFT",
			mintAddress: "7xK9...p4Lm",
			owner: "0xKD...92A",
			metadataUri: "arweave.net/k2...j9",
			status: "verified",
			signature: "4z9fR...kP2m...Lq88...vXy1...92bN...wQzP...7mRt...zZ5p",
		},
		mastery: {
			finalScore: 98,
			maxScore: 100,
			xpEarned: 2500,
			rankAchieved: 10,
		},
	},
	"solana-basics": {
		id: "solana-basics",
		certificateNo: "STA-SB-2024-0893",
		courseName: "SOLANA BASICS",
		courseDescription:
			"Demonstrated proficiency in Accounts, Transactions, Programs, and Network Architecture.",
		recipient: "OPERATOR_0xKD...92A",
		walletAddress: "0xKD...92A",
		issueDate: "NOVEMBER 15, 2024",
		validator: "SUPERTEAM PROTOCOL",
		onChain: {
			assetType: "Compressed NFT",
			mintAddress: "8yL2...q5Nn",
			owner: "0xKD...92A",
			metadataUri: "arweave.net/m3...k8",
			status: "verified",
			signature: "5a8gS...nQ3n...Mr99...wYz2...83cO...xRaQ...8nSu...aA6q",
		},
		mastery: {
			finalScore: 95,
			maxScore: 100,
			xpEarned: 2200,
			rankAchieved: 9,
		},
	},
	"anchor-framework": {
		id: "anchor-framework",
		certificateNo: "STA-AF-2024-0894",
		courseName: "ANCHOR FRAMEWORK",
		courseDescription:
			"Demonstrated proficiency in Program Development, Account Constraints, and Cross-Program Invocations.",
		recipient: "OPERATOR_0xKD...92A",
		walletAddress: "0xKD...92A",
		issueDate: "DECEMBER 03, 2024",
		validator: "SUPERTEAM PROTOCOL",
		onChain: {
			assetType: "Compressed NFT",
			mintAddress: "9zM3...r6Oo",
			owner: "0xKD...92A",
			metadataUri: "arweave.net/n4...l9",
			status: "verified",
			signature: "6b9hT...oR4o...Ns00...xZa3...94dP...yScR...9oTv...bB7r",
		},
		mastery: {
			finalScore: 92,
			maxScore: 100,
			xpEarned: 3000,
			rankAchieved: 11,
		},
	},
};

// Helper function to resolve certificate (supports mock and real on-chain IDs)
export async function getCertificateById(
	id: string,
): Promise<Certificate | null> {
	// 1. Check Mocks
	if (mockCertificates[id]) return mockCertificates[id];

	// 2. Check if ID looks like a Solana Address
	if (id.length >= 32 && id.length <= 44) {
		try {
			const { onchainQueryService } = await import(
				"@/lib/services/onchain-queries"
			);
			const asset = await onchainQueryService.getCoreAsset(id);

			if (asset) {
				// Synthesize a certificate from on-chain asset
				return {
					id: asset.pubkey,
					certificateNo: `STA-ONCHAIN-${asset.pubkey.slice(0, 8).toUpperCase()}`,
					courseName: asset.name.toUpperCase(),
					courseDescription: `Verified achievement for ${asset.name} completed by the operator.`,
					recipient: `OPERATOR_${asset.owner.slice(0, 6)}...`,
					walletAddress: asset.owner,
					issueDate: "REAL-TIME PROOF", // We don't have exact timestamp in raw buffer usually without more parsing
					validator: "SUPERTEAM ACADEMY",
					onChain: {
						assetType: "Metaplex Core",
						mintAddress: asset.pubkey,
						owner: asset.owner,
						metadataUri: asset.uri,
						status: "verified",
						signature: "ON-CHAIN_VERIFIED", // Signature would need tx indexing
					},
					mastery: {
						finalScore: 100, // Fallback
						maxScore: 100,
						xpEarned: 0, // Would need course mapping
						rankAchieved: 0,
					},
				};
			}
		} catch (e) {
			console.error("Failed to resolve on-chain certificate:", e);
		}
	}

	return null;
}
