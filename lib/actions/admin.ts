"use server";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { client } from "@/sanity/client";

export async function getAdminDashboardStats() {
	try {
		// 1. Total Learners
		const [{ count: totalLearners }] = await db
			.select({ count: sql`count(*)`.mapWith(Number) })
			.from(user)
			.where(sql`role = 'learner'`);

		// 2. Total XP Minted across all users
		const [{ totalXp }] = await db
			.select({ totalXp: sql`sum(${user.totalXp})`.mapWith(Number) })
			.from(user);

		// 3. Active Courses from Sanity
		const activeCoursesCount = await client.fetch(
			`count(*[_type == "course" && status == "published"])`,
		);

		// 4. Pending Reviews from Sanity
		const pendingReviewsCount = await client.fetch(
			`count(*[_type == "course" && status == "draft" || status == "review_pending"])`,
		);

		return {
			totalLearners: totalLearners || 0,
			xpMinted: totalXp || 0,
			activeCourses: activeCoursesCount || 0,
			pendingReviews: pendingReviewsCount || 0,
			// Keeping these mock values until an on-chain indexer is built for true global enrollments
			activeEnrollments: Math.floor((totalLearners || 0) * 0.4),
			completionRate: 68,
		};
	} catch (error) {
		console.error("Failed to fetch admin dashboard stats:", error);
		return {
			totalLearners: 0,
			xpMinted: 0,
			activeCourses: 0,
			pendingReviews: 0,
			activeEnrollments: 0,
			completionRate: 0,
		};
	}
}
