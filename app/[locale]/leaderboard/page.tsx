/**
 * @fileoverview Main Leaderboard page for Superteam Academy.
 * Fetches rankings and user standing to display the global competition.
 */

import { headers } from "next/headers";
import { LeaderboardView } from "@/components/leaderboard/LeaderboardView";
import { auth } from "@/lib/auth";
import {
	getLeaderboard,
	getUserStanding,
	syncUserXp,
} from "@/lib/data/leaderboard";

/**
 * Server Component: LeaderboardPage
 * Handles data fetching for the initial leaderboard state.
 */
export default async function LeaderboardPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	const entries = await getLeaderboard();

	if (session?.user?.id && session.user.walletAddress) {
		// Proactively sync user XP when they visit the leaderboard
		await syncUserXp(session.user.id, session.user.walletAddress);
	}

	const userStanding = session?.user?.id
		? await getUserStanding(session.user.id)
		: null;

	return (
		<LeaderboardView
			initialEntries={entries}
			userStanding={
				userStanding || {
					globalRank: 0,
					percentile: "N/A",
					xpToFirst: 0,
					rewardsEligible: false,
					xp: 0,
				}
			}
		/>
	);
}
