/**
 * @fileoverview Server actions for the leaderboard and user rankings.
 */
"use server";

import type {
  LeaderboardPeriod,
  LeaderboardTrack,
} from "@/lib/constants/leaderboard";
import { getLeaderboard } from "@/lib/data/leaderboard";

/**
 * Server action to fetch leaderboard entries based on period and track filters.
 */
export async function fetchFilteredLeaderboard(
  period: LeaderboardPeriod,
  track: LeaderboardTrack,
) {
  return await getLeaderboard(period, track);
}
