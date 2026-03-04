/**
 * @fileoverview Server actions for user gamification, including achievements, skill radar, and course progress.
 */
"use server";

import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { and, desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { getProgram } from "@/lib/anchor/client";
import { getUserEnrollments } from "@/lib/anchor/services";
import { auth } from "@/lib/auth";
import { Achievement, achievementDefinitions } from "@/lib/data/achievements";
import { mockCourses } from "@/lib/data/courses";
import { SkillRadar } from "@/lib/data/credentials";
import { CourseProgress } from "@/lib/data/user";
import { db } from "@/lib/db";
import { userActivity } from "@/lib/db/schema";

/**
 * Fetches real achievements unlocked by a user from the activity feed.
 * @param userId - Optional ID of the user to fetch achievements for. Falls back to current session.
 */
export async function getUserRealAchievements(userId?: string) {
	let targetUserId = userId;

	if (!targetUserId) {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		targetUserId = session?.user?.id;
	}

	if (!targetUserId) return [];

	const activities = await db.query.userActivity.findMany({
		where: and(
			eq(userActivity.userId, targetUserId),
			eq(userActivity.type, "achievement"),
		),
		orderBy: [desc(userActivity.createdAt)],
	});

	// Map DB activities to Achievement objects
	return activities.map((act) => {
		const metadata = act.metadata as { achievementId?: string };
		const def = achievementDefinitions.find(
			(a) => a.id === metadata.achievementId,
		);

		return {
			id: act.id,
			name: def?.name || act.title.replace("ACHIEVEMENT UNLOCKED: ", ""),
			description: def?.description || act.description || "",
			icon: def?.icon || "bi-patch-check",
			category: def?.category || "special",
			unlockedAt: act.createdAt.toISOString(),
		} as Achievement;
	});
}

/**
 * Calculates real Skill Radar scores based on XP earned in different course categories.
 * @param userId - Optional ID of the user to calculate radar for.
 */
export async function calculateRealSkillRadar(
	userId?: string,
): Promise<SkillRadar> {
	let targetUserId = userId;

	if (!targetUserId) {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		targetUserId = session?.user?.id;
	}

	const skills: SkillRadar = {
		rust: 0,
		anchor: 0,
		frontend: 0,
		security: 0,
		governance: 0,
	};

	if (!targetUserId) return skills;

	const activities = await db.query.userActivity.findMany({
		where: and(
			eq(userActivity.userId, targetUserId),
			eq(userActivity.type, "lesson_completed"),
		),
	});

	// Simple heuristic: Map course categories to skill buckets
	activities.forEach((act) => {
		const metadata = act.metadata as { courseSlug?: string };
		const course = mockCourses.find((c) => c.slug === metadata.courseSlug);
		const xp = act.xpEarned || 0;

		if (!course) return;

		switch (course.category?.toLowerCase()) {
			case "rust":
				skills.rust += xp;
				break;
			case "core":
			case "anchor":
			case "spl":
				skills.anchor += xp;
				break;
			case "web3":
			case "frontend":
				skills.frontend += xp;
				break;
			case "security":
				skills.security += xp;
				break;
			case "governance":
				skills.governance += xp;
				break;
		}
	});

	// Normalize to 0-100 scale (assuming 1000 XP in a category is "pro" for the radar)
	return {
		rust: Math.min(100, Math.floor(skills.rust / 10)),
		anchor: Math.min(100, Math.floor(skills.anchor / 10)),
		frontend: Math.min(100, Math.floor(skills.frontend / 10)),
		security: Math.min(100, Math.floor(skills.security / 10)),
		governance: Math.min(100, Math.floor(skills.governance / 10)),
	};
}

/**
 * Fetches real course progress from the database.
 * @param userId - Optional ID of the user to fetch progress for.
 */
export async function getEnrolledCoursesProgress(
	userId?: string,
): Promise<CourseProgress[]> {
	let targetUserId = userId;

	if (!targetUserId) {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		targetUserId = session?.user?.id;
	}

	if (!targetUserId) return [];

	const activities = await db.query.userActivity.findMany({
		where: eq(userActivity.userId, targetUserId),
	});

	// Group by course and count lessons
	const courseMap = new Map<string, { lessons: Set<number>; xp: number }>();

	activities.forEach((act) => {
		if (
			act.type !== "lesson_completed" &&
			act.type !== "enrolled" &&
			act.type !== "course_completed"
		)
			return;

		const metadata = act.metadata as {
			courseSlug?: string;
			courseId?: string;
			lessonIndex?: number;
		} | null;

		const courseId = act.courseId || metadata?.courseSlug || metadata?.courseId;

		if (!courseId) return;

		const existing = courseMap.get(courseId) || {
			lessons: new Set<number>(),
			xp: 0,
		};
		if (metadata?.lessonIndex !== undefined) {
			existing.lessons.add(metadata.lessonIndex);
		}
		existing.xp += act.xpEarned || 0;
		courseMap.set(courseId, existing);
	});

	return Array.from(courseMap.entries()).map(([slug, data]) => {
		const courseDef = mockCourses.find((c) => c.slug === slug);
		const totalLessons = courseDef?.modules || 5; // Fallback
		const progress = Math.min(
			100,
			data.lessons.size > 0
				? Math.round((data.lessons.size / totalLessons) * 100)
				: 0,
		);

		return {
			courseId: slug,
			courseCode: slug.toUpperCase(),
			courseTitle: courseDef?.title || slug.toUpperCase(),
			progress,
			completed: progress === 100,
		};
	});
}

/**
 * Records a course enrollment in the database activity feed.
 */
export async function recordEnrollment(courseSlug: string) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) return { error: "Unauthorized" };

	const course = mockCourses.find((c) => c.slug === courseSlug);

	try {
		await db.insert(userActivity).values({
			id: uuidv4(),
			userId: session.user.id,
			type: "enrolled",
			title: `ENROLLED: ${course?.title || courseSlug.toUpperCase()}`,
			description: `Operator joined the ${course?.title || courseSlug.toUpperCase()} program.`,
			courseId: courseSlug,
			metadata: { courseSlug },
		});
		return { success: true };
	} catch (error) {
		console.error("Failed to record enrollment:", error);
		return { error: "Database error" };
	}
}

/**
 * Synchronizes user's on-chain enrollments with the database activity feed.
 */
export async function syncUserEnrollments(
	userId: string,
	walletAddress: string,
) {
	if (!userId || !walletAddress) return;

	try {
		const program = getProgram();
		const learnerPubkey = new PublicKey(walletAddress);
		const onchainEnrollments = await getUserEnrollments(program, learnerPubkey);

		if (onchainEnrollments.length === 0) return;

		// Fetch existing 'enrolled' activities
		const existingActivities = await db.query.userActivity.findMany({
			where: and(
				eq(userActivity.userId, userId),
				eq(userActivity.type, "enrolled"),
			),
		});

		const existingSlugs = new Set(
			existingActivities.map(
				(a) => (a.metadata as { courseSlug?: string })?.courseSlug,
			),
		);

		// Insert missing ones
		for (const enroll of onchainEnrollments) {
			const slug = enroll.courseId;
			if (!slug) continue;

			// 1. Sync Enrollment Activity
			if (!existingSlugs.has(slug)) {
				const course = mockCourses.find((c) => c.slug === slug);
				await db.insert(userActivity).values({
					id: uuidv4(),
					userId,
					type: "enrolled",
					title: `ENROLLED: ${course?.title || slug.toUpperCase()}`,
					description: `Operator joined the ${course?.title || slug.toUpperCase()} program.`,
					courseId: slug,
					metadata: { courseSlug: slug },
				});
			}

			// 2. Sync Lesson Completions
			const lessonFlags = enroll.account.lessonFlags as BN[];
			const courseDef = mockCourses.find((c) => c.slug === slug);
			const lessonCount = courseDef?.modules || 10;

			// Fetch existing 'lesson_completed' for this course
			const existingLessons = await db.query.userActivity.findMany({
				where: and(
					eq(userActivity.userId, userId),
					eq(userActivity.type, "lesson_completed"),
					eq(userActivity.courseId, slug),
				),
			});

			const completedIndices = new Set(
				existingLessons.map(
					(a) => (a.metadata as { lessonIndex?: number })?.lessonIndex,
				),
			);

			for (let i = 0; i < lessonCount; i++) {
				const wordIndex = Math.floor(i / 64);
				const bitIndex = i % 64;
				const isDoneOnChain = !lessonFlags[wordIndex]
					.and(new BN(1).shln(bitIndex))
					.isZero();

				if (isDoneOnChain && !completedIndices.has(i)) {
					await db.insert(userActivity).values({
						id: uuidv4(),
						userId,
						type: "lesson_completed",
						title: `Completed Lesson: ${slug.toUpperCase()} #${i}`,
						description: `Successfully completed on-chain lesson tasks (Synced).`,
						xpEarned: courseDef?.xp_per_lesson || 100,
						courseId: slug,
						metadata: { courseSlug: slug, lessonIndex: i },
					});
				}
			}
		}
	} catch (error) {
		console.error(`Failed to sync enrollments for user ${userId}:`, error);
	}
}
