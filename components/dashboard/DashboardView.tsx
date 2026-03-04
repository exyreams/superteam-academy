/**
 * @fileoverview Main dashboard view component, assembling user stats, course progress, and activity feed.
 */

"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { AchievementGrid } from "@/components/dashboard/AchievementGrid";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { RecommendedCourseCard } from "@/components/dashboard/RecommendedCourseCard";
import { StreakCalendar } from "@/components/dashboard/StreakCalendar";
import { UserHUD } from "@/components/dashboard/UserHUD";
import { NavRail } from "@/components/layout/NavRail";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Achievement } from "@/lib/data/achievements";
import { ActivityItem } from "@/lib/data/activity";
import { CourseProgress, RecommendedCourse, UserStats } from "@/lib/data/user";
import { useOnchainStats } from "@/lib/hooks/use-onchain-stats";

/** Dashboard view props. */
interface DashboardViewProps {
	userStats: UserStats;
	activeCourses: CourseProgress[];
	recommendedCourses: RecommendedCourse[];
	achievements: Achievement[];
	recentActivity: ActivityItem[];
}

/**
 * DashboardView Component
 * The central hub for the user, displaying their progress, next steps, and social status.
 * Merges server-side stats with real-time on-chain data for accurate XP/Level display.
 */
export function DashboardView({
	userStats,
	activeCourses,
	recommendedCourses,
	achievements,
	recentActivity,
}: DashboardViewProps) {
	const { publicKey } = useWallet();
	const onchainStats = useOnchainStats(publicKey?.toString());

	// Merge on-chain real-time data with server-side stats
	const displayStats = {
		...userStats,
		xp: onchainStats.loading ? userStats.xp : onchainStats.xp,
		level: onchainStats.loading ? userStats.level : onchainStats.level,
		levelProgress: onchainStats.loading
			? userStats.levelProgress
			: onchainStats.levelProgress,
		xpToNextLevel: onchainStats.loading
			? userStats.xpToNextLevel
			: onchainStats.xpToNextLevel,
	};
	return (
		<div className="min-h-screen bg-bg-base">
			{/* App Shell Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-[60px_1fr_350px] lg:grid-rows-[48px_1fr] min-h-screen lg:h-screen lg:overflow-hidden max-w-full">
				{/* Top Bar - spans all columns */}
				<div className="col-span-1 lg:col-span-3">
					<TopBar />
				</div>

				{/* Nav Rail */}
				<NavRail />

				{/* Main Stage */}
				<section className="p-4 lg:p-8 overflow-visible lg:overflow-y-auto flex flex-col gap-10">
					{/* Active Courses */}
					<div>
						<div className="flex justify-between items-end mb-6 border-b border-ink-secondary/20 dark:border-border pb-2">
							<div>
								<span className="bg-ink-primary text-bg-base px-2 py-1 text-[10px] uppercase tracking-widest inline-block mb-2">
									Current Operations
								</span>
								<h2 className="font-display text-2xl lg:text-[32px] leading-none -tracking-wider">
									ACTIVE COURSES
								</h2>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{activeCourses.map((course) => (
								<CourseCard key={course.courseId} course={course} />
							))}
						</div>
					</div>

					{/* Recommended Tracks */}
					<div>
						<div className="flex justify-between items-end mb-6 border-b border-border pb-2">
							<div>
								<span className="bg-ink-primary text-bg-base px-2 py-1 text-[10px] uppercase tracking-widest inline-block mb-2">
									Next Targets
								</span>
								<h2 className="font-display text-2xl lg:text-[32px] leading-none -tracking-wider">
									RECOMMENDED TRACKS
								</h2>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{recommendedCourses.map((course) => (
								<RecommendedCourseCard key={course.id} course={course} />
							))}
						</div>
					</div>

					{/* Recent Activity */}
					<div>
						<div className="flex justify-between items-end mb-6 border-b border-border pb-2">
							<div>
								<span className="bg-ink-primary text-bg-base px-2 py-1 text-[10px] uppercase tracking-widest inline-block mb-2">
									Log History
								</span>
								<h2 className="font-display text-2xl lg:text-[32px] leading-none -tracking-wider">
									RECENT ACTIVITY
								</h2>
							</div>
						</div>
						<ActivityFeed activities={recentActivity} />
					</div>
				</section>

				{/* Context Panel (Right Sidebar) */}
				<aside className="border-t lg:border-t-0 lg:border-l border-ink-secondary/20 dark:border-border bg-bg-base p-6 flex flex-col gap-8 overflow-visible lg:overflow-y-auto">
					<UserHUD stats={displayStats} />

					<StreakCalendar streak={displayStats.streak} />

					<AchievementGrid achievements={achievements} />

					<Button className="bg-ink-primary text-bg-base hover:bg-ink-primary/90 rounded-none uppercase text-[11px] font-bold px-4 py-2 h-auto tracking-widest w-full justify-center mt-auto">
						OPEN TERMINAL [F1]
					</Button>
				</aside>
			</div>
		</div>
	);
}
