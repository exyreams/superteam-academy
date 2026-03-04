/**
 * @fileoverview User profile and statistics data structures and mock data.
 * Defines interfaces for UserProfile, UserStats, CourseProgress, and provides helper functions for data retrieval.
 */

/**
 * Detailed user profile information.
 */
export interface UserProfile {
	id: string;
	username: string;
	displayName: string;
	walletAddress: string;
	avatar?: string;
	avatarSeed?: string;
	bio?: string;
	location?: string;
	enrolledSince: string;
	socialLinks: {
		github?: string;
		githubHandle?: string;
		twitter?: string;
		twitterHandle?: string;
		portfolio?: string;
		portfolioDisplay?: string;
	};
	isPublic: boolean;
	reputation?: number;
	level?: number;
}

/**
 * User activity statistics and level progress.
 */
export interface UserStats {
	xp: number;
	level: number;
	xpToNextLevel: number;
	levelProgress: number; // 0-100
	globalRank: number;
	streak: {
		current: number;
		calendar: StreakDay[];
	};
}

/**
 * Represents a single day in the user's activity streak.
 */
export interface StreakDay {
	date: string;
	active: boolean;
}

/**
 * High-level progress tracking for a single course enrollment.
 */
export interface CourseProgress {
	courseId: string;
	courseCode: string; // e.g., "RUST-101"
	courseTitle: string;
	progress: number; // 0-100
	currentLesson?: {
		id: string;
		title: string;
	};
	completed: boolean;
}

// Mock user profile
export const mockUserProfile: UserProfile = {
	id: "user-9402",
	username: "0xKONRAD",
	displayName: "0xKONRAD",
	walletAddress: "0xKD...92A",
	bio: "Senior Solana Dev specializing in Anchor and Program Security. Building decentralized economies since 2021.",
	location: "BERLIN_DE",
	enrolledSince: "OCT_2023",
	socialLinks: {
		github: "https://github.com/0xkonrad",
		twitter: "https://twitter.com/0xkonrad",
		portfolio: "https://0xkonrad.dev",
	},
	isPublic: true,
};

// Generate streak calendar (last 14 days, 12 active)
const generateStreakCalendar = (): StreakDay[] => {
	const days: StreakDay[] = [];
	const today = new Date();

	for (let i = 13; i >= 0; i--) {
		const date = new Date(today);
		date.setDate(date.getDate() - i);
		days.push({
			date: date.toISOString().split("T")[0],
			active: i < 12, // Last 12 days active
		});
	}

	return days;
};

// Mock user stats
export const mockUserStats: UserStats = {
	xp: 8420,
	level: 9,
	xpToNextLevel: 1580,
	levelProgress: 82, // (8420 / (8420 + 1580)) * 100
	globalRank: 2104,
	streak: {
		current: 12,
		calendar: generateStreakCalendar(),
	},
};

// Mock course progress data
export const mockCourseProgress: CourseProgress[] = [
	{
		courseId: "rust-101",
		courseCode: "RUST-101",
		courseTitle: "RUST FUNDAMENTALS",
		progress: 72,
		currentLesson: {
			id: "lesson-4-3",
			title: "Program Derived Addresses",
		},
		completed: false,
	},
	{
		courseId: "anchor-202",
		courseCode: "ANCH-202",
		courseTitle: "ANCHOR_FW",
		progress: 34,
		currentLesson: {
			id: "lesson-1-2",
			title: "IDL Generation",
		},
		completed: false,
	},
	{
		courseId: "solana-basics",
		courseCode: "SOL-BASIC",
		courseTitle: "SOLANA FUNDAMENTALS",
		progress: 100,
		completed: true,
	},
	{
		courseId: "defi-101",
		courseCode: "DEFI-101",
		courseTitle: "DEFI FUNDAMENTALS",
		progress: 100,
		completed: true,
	},
	{
		courseId: "rust-advanced",
		courseCode: "RUST-ADV",
		courseTitle: "ADVANCED RUST",
		progress: 42,
		completed: false,
	},
	{
		courseId: "programs",
		courseCode: "PROGRAMS",
		courseTitle: "PROGRAM DEVELOPMENT",
		progress: 12,
		completed: false,
	},
];

// Recommended courses
export interface RecommendedCourse {
	id: string;
	code: string;
	title: string;
	difficulty: "BEG" | "INT" | "ADV";
}

export const mockRecommendedCourses: RecommendedCourse[] = [
	{
		id: "security-404",
		code: "SEC-404",
		title: "SECURITY AUDITING",
		difficulty: "ADV",
	},
	{
		id: "spl-102",
		code: "SPL-102",
		title: "TOKEN PROGRAM",
		difficulty: "INT",
	},
	{
		id: "ops-301",
		code: "OPS-301",
		title: "VALIDATOR OPS",
		difficulty: "INT",
	},
];

// Helper functions
export function getUserProfile(): UserProfile {
	// In real app, fetch by userId
	return mockUserProfile;
}

export function getUserStats(): UserStats {
	// In real app, fetch by userId
	return mockUserStats;
}

export function getCourseProgress(): CourseProgress[] {
	// In real app, fetch by userId
	return mockCourseProgress;
}

export function getActiveCourses(): CourseProgress[] {
	return mockCourseProgress.filter((c) => !c.completed && c.progress > 0);
}

export function getRecommendedCourses(): RecommendedCourse[] {
	return mockRecommendedCourses;
}
