/**
 * @fileoverview Server actions for the leaderboard and user rankings.
 */
"use server";

import {
	getLeaderboard,
	LeaderboardPeriod,
	LeaderboardTrack,
} from "@/lib/data/leaderboard";

/**
 * Server action to fetch leaderboard entries based on period and track filters.
 */
export async function fetchFilteredLeaderboard(
	period: LeaderboardPeriod,
	track: LeaderboardTrack,
) {
	return await getLeaderboard(period, track);
}
