/**
 * @fileoverview Shared constants and types for the leaderboard system.
 * These are safe to import in both client and server environments.
 */

/**
 * Supported time periods for leaderboard filtering.
 */
export type LeaderboardPeriod = "weekly" | "monthly" | "all-time";

/**
 * Official Metaplex Core Collection addresses for each learning track.
 * Maps numeric track IDs from the Solana program to their on-chain collection mints.
 */
export const TRACK_COLLECTIONS = {
	1: "Dzi3c2vDiGkQPXcFzna5WuT6o3XbmetSuMLspxMYN7hJ", // Rust
	2: "FJ78Whis39a1sjo89q3ufTn5pVctGqiLM59uL3kzX8Hh", // Anchor
	3: "Diu7bircshMJWXsKEk3snYdfxNXB8QCtHbEif8473ojh", // DeFi
	4: "4dmgjeUWUojnLPnafoQ4wdiqqBoe6DqpEBcb2vEK3jvC", // Security
	5: "9WNJe2sLmtTB3SQ8jV4bptTixYHvnTj3C511W2RBtyZF", // Frontend
} as const;

export type TrackId = keyof typeof TRACK_COLLECTIONS;

/**
 * Learning tracks available for leaderboard filtering.
 * Uses 'all' or specific collection mint addresses.
 */
export type LeaderboardTrack = "all" | (typeof TRACK_COLLECTIONS)[TrackId];

/**
 * Represents a single entry in the leaderboard rankings.
 */
export interface LeaderboardEntry {
	rank: number;
	userId: string;
	username: string;
	walletAddress: string;
	avatar: string; // Bootstrap icon name
	xp: number;
	level: number;
	streak: number;
	isCurrentUser?: boolean;
}

/**
 * Filter criteria for leaderboard queries.
 */
export interface LeaderboardFilter {
	period: LeaderboardPeriod;
	track: LeaderboardTrack;
}

/**
 * Summary of a specific user's position relative to the entire leaderboard.
 */
export interface UserStanding {
	globalRank: number;
	percentile: string; // e.g., "TOP 1%"
	xpToFirst: number;
	rewardsEligible: boolean;
	xp?: number;
}
