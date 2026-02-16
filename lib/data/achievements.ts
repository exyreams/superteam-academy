// Achievement definitions and mock data

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // Bootstrap icon name
  unlockedAt?: string;
  category: 'progress' | 'streak' | 'skill' | 'community' | 'special';
}

export const achievementDefinitions: Achievement[] = [
  // Progress achievements
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: 'bi-footprints',
    category: 'progress',
  },
  {
    id: 'course-completer',
    name: 'Course Completer',
    description: 'Complete your first course',
    icon: 'bi-trophy',
    category: 'progress',
  },
  {
    id: 'speed-runner',
    name: 'Speed Runner',
    description: 'Complete 5 lessons in one day',
    icon: 'bi-lightning',
    category: 'progress',
  },
  
  // Streak achievements
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: 'bi-calendar-week',
    category: 'streak',
  },
  {
    id: 'monthly-master',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: 'bi-calendar-month',
    category: 'streak',
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Maintain a 100-day streak',
    icon: 'bi-fire',
    category: 'streak',
  },
  
  // Skill achievements
  {
    id: 'rust-rookie',
    name: 'Rust Rookie',
    description: 'Complete Rust Fundamentals',
    icon: 'bi-cpu-fill',
    category: 'skill',
  },
  {
    id: 'anchor-expert',
    name: 'Anchor Expert',
    description: 'Master the Anchor Framework',
    icon: 'bi-shield-lock',
    category: 'skill',
  },
  {
    id: 'full-stack-solana',
    name: 'Full Stack Solana',
    description: 'Complete both frontend and backend tracks',
    icon: 'bi-layers',
    category: 'skill',
  },
  
  // Community achievements
  {
    id: 'helper',
    name: 'Helper',
    description: 'Help 10 other learners',
    icon: 'bi-people-fill',
    category: 'community',
  },
  {
    id: 'first-comment',
    name: 'First Comment',
    description: 'Leave your first comment',
    icon: 'bi-chat',
    category: 'community',
  },
  {
    id: 'top-contributor',
    name: 'Top Contributor',
    description: 'Be in top 100 contributors',
    icon: 'bi-star-fill',
    category: 'community',
  },
  
  // Special achievements
  {
    id: 'early-adopter',
    name: 'Early Adopter',
    description: 'Join in the first month',
    icon: 'bi-patch-check',
    category: 'special',
  },
  {
    id: 'bug-hunter',
    name: 'Bug Hunter',
    description: 'Report a valid bug',
    icon: 'bi-bug-fill',
    category: 'special',
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Get 100% on a challenge',
    icon: 'bi-award',
    category: 'special',
  },
  {
    id: 'first-deploy',
    name: 'First Deploy',
    description: 'Deploy your first program',
    icon: 'bi-rocket-takeoff-fill',
    category: 'special',
  },
];

// Mock unlocked achievements for user
export const mockUserAchievements: Achievement[] = [
  {
    ...achievementDefinitions.find(a => a.id === 'early-adopter')!,
    unlockedAt: '2023-10-15T10:30:00Z',
  },
  {
    ...achievementDefinitions.find(a => a.id === 'bug-hunter')!,
    unlockedAt: '2023-10-18T14:22:00Z',
  },
  {
    ...achievementDefinitions.find(a => a.id === 'streak-master')!,
    unlockedAt: '2023-10-20T09:15:00Z',
  },
  {
    ...achievementDefinitions.find(a => a.id === 'first-deploy')!,
    unlockedAt: '2023-10-22T16:45:00Z',
  },
];

// Helper functions
export function getUserAchievements(userId?: string): Achievement[] {
  // In real app, fetch by userId
  return mockUserAchievements;
}

export function getLatestAchievements(userId?: string, count: number = 4): Achievement[] {
  return mockUserAchievements.slice(0, count);
}
