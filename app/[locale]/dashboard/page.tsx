/**
 * @fileoverview Server-side entry point for the User Dashboard.
 * Fetches user statistics, core progress, achievements, and activity feeds.
 */

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { auth } from "@/lib/auth";
import { getLatestAchievements } from "@/lib/data/achievements";
import { getActivityFeed, getRecentActivity } from "@/lib/data/activity";
import {
	getActiveCourses,
	getRecommendedCourses,
	getUserStats,
} from "@/lib/data/user";

export default async function DashboardPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/");
	}

	const userId = session.user.id;

	const [
		userStats,
		achievements,
		recentActivity,
		activeCourses,
		recommendedCourses,
		fullHistory,
	] = await Promise.all([
		getUserStats(userId),
		getLatestAchievements(userId),
		getRecentActivity(userId),
		getActiveCourses(userId),
		getRecommendedCourses(userId),
		getActivityFeed(userId, 100),
	]);

	return (
		<DashboardView
			userStats={userStats}
			activeCourses={activeCourses}
			recommendedCourses={recommendedCourses}
			achievements={achievements}
			recentActivity={recentActivity}
			fullHistory={fullHistory}
		/>
	);
}
