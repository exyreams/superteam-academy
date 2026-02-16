import { DashboardView } from '@/components/dashboard/DashboardView';
import { getUserStats, getActiveCourses, getRecommendedCourses } from '@/lib/data/user';
import { getLatestAchievements } from '@/lib/data/achievements';
import { getRecentActivity } from '@/lib/data/activity';

export default function DashboardPage() {
  const userStats = getUserStats();
  const activeCourses = getActiveCourses();
  const recommendedCourses = getRecommendedCourses();
  const achievements = getLatestAchievements();
  const recentActivity = getRecentActivity();

  return (
    <DashboardView
      userStats={userStats}
      activeCourses={activeCourses}
      recommendedCourses={recommendedCourses}
      achievements={achievements}
      recentActivity={recentActivity}
    />
  );
}
