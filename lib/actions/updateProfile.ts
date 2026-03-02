/**
 * @fileoverview Server actions for user profile management.
 * Handles database operations for updating user metadata and onboarding status.
 */
"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";

/**
 * Interface definition for updating user profile data.
 * Ensures strict typing across the onboarding and settings forms.
 */
export interface ProfileUpdateData {
	name?: string;
	bio?: string;
	location?: string;
	github?: string;
	twitter?: string;
	website?: string;
	language?: string;
	publicVisibility?: boolean;
	notifications?: {
		newCourses: boolean;
		leaderboardAlerts: boolean;
		directMessages: boolean;
	};
	onboardingCompleted?: boolean;
	preferredTracks?: string; // JSON string array e.g. '["rust","defi"]'
	avatarSeed?: string;
}

export async function updateUserProfile(data: ProfileUpdateData) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return { error: "Not authenticated" };
	}

	try {
		await db
			.update(user)
			.set({
				...(data.name !== undefined && { name: data.name }),
				...(data.bio !== undefined && { bio: data.bio }),
				...(data.location !== undefined && { location: data.location }),
				...(data.github !== undefined && { github: data.github }),
				...(data.twitter !== undefined && { twitter: data.twitter }),
				...(data.website !== undefined && { website: data.website }),
				...(data.language !== undefined && { language: data.language }),
				...(data.publicVisibility !== undefined && {
					publicVisibility: data.publicVisibility,
				}),
				...(data.notifications !== undefined && {
					notifications: data.notifications,
				}),
				...(data.onboardingCompleted !== undefined && {
					onboardingCompleted: data.onboardingCompleted,
				}),
				...(data.preferredTracks !== undefined && {
					preferredTracks: data.preferredTracks,
				}),
				...(data.avatarSeed !== undefined && {
					avatarSeed: data.avatarSeed,
				}),
				updatedAt: new Date(),
			})
			.where(eq(user.id, session.user.id));

		return { success: true };
	} catch (err) {
		console.error("Profile update failed:", err);
		return { error: "Failed to update profile" };
	}
}

export async function getUserProfileData() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		return null;
	}

	const dbUser = await db.query.user.findFirst({
		where: eq(user.id, session.user.id),
	});

	return dbUser ?? null;
}
