'use client';

import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';
import { UserHUD } from '@/components/dashboard/UserHUD';
import { StreakCalendar } from '@/components/dashboard/StreakCalendar';
import { AchievementGrid } from '@/components/dashboard/AchievementGrid';
import { CourseCard } from '@/components/dashboard/CourseCard';
import { RecommendedCourseCard } from '@/components/dashboard/RecommendedCourseCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { UserStats, CourseProgress, RecommendedCourse } from '@/lib/data/user';
import { Achievement } from '@/lib/data/achievements';
import { ActivityItem } from '@/lib/data/activity';
import { Button } from '@/components/ui/button';

interface DashboardViewProps {
  userStats: UserStats;
  activeCourses: CourseProgress[];
  recommendedCourses: RecommendedCourse[];
  achievements: Achievement[];
  recentActivity: ActivityItem[];
}

export function DashboardView({
  userStats,
  activeCourses,
  recommendedCourses,
  achievements,
  recentActivity,
}: DashboardViewProps) {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* App Shell Grid */}
      <div className="grid grid-cols-[60px_1fr_350px] grid-rows-[48px_1fr] h-screen max-w-full">
        {/* Top Bar - spans all columns */}
        <div className="col-span-3">
          <TopBar />
        </div>

        {/* Nav Rail */}
        <NavRail />

        {/* Main Stage */}
        <section className="p-8 overflow-y-auto flex flex-col gap-10">
          {/* Active Courses */}
          <div>
            <div className="flex justify-between items-end mb-6 border-b border-ink-secondary/20 dark:border-border pb-2">
              <div>
                <span className="bg-ink-primary text-bg-base px-2 py-1 text-[10px] uppercase tracking-widest inline-block mb-2">
                  Current Operations
                </span>
                <h2 className="font-display text-[32px] leading-none -tracking-wider">
                  ACTIVE COURSES
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
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
                <h2 className="font-display text-[32px] leading-none -tracking-wider">
                  RECOMMENDED TRACKS
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
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
                <h2 className="font-display text-[32px] leading-none -tracking-wider">
                  RECENT ACTIVITY
                </h2>
              </div>
            </div>
            <ActivityFeed activities={recentActivity} />
          </div>
        </section>

        {/* Context Panel (Right Sidebar) */}
        <aside className="border-l border-ink-secondary/20 dark:border-border bg-bg-base p-6 flex flex-col gap-8 overflow-y-auto">
          <UserHUD stats={userStats} />
          
          <StreakCalendar streak={userStats.streak} />
          
          <AchievementGrid achievements={achievements} />
          
          <Button
            className="bg-ink-primary text-bg-base hover:bg-ink-primary/90 rounded-none uppercase text-[11px] font-bold px-4 py-2 h-auto tracking-widest w-full justify-center mt-auto"
          >
            OPEN TERMINAL [F1]
          </Button>
        </aside>
      </div>
    </div>
  );
}
