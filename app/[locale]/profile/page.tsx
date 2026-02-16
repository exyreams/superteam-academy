import { ProfileView } from '@/components/profile/ProfileView';
import { getUserProfile, getCourseProgress } from '@/lib/data/user';
import { getUserAchievements } from '@/lib/data/achievements';
import { getUserCredentials, getUserSkillRadar } from '@/lib/data/credentials';

export default function ProfilePage() {
  const profile = getUserProfile();
  const achievements = getUserAchievements();
  const credentials = getUserCredentials();
  const skillRadar = getUserSkillRadar();
  const courses = getCourseProgress();
  const globalRank = 142; // From profile context

  return (
    <ProfileView
      profile={profile}
      achievements={achievements}
      credentials={credentials}
      skillRadar={skillRadar}
      courses={courses}
      globalRank={globalRank}
    />
  );
}
