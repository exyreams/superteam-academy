// Activity feed data structures and mock data

export interface ActivityItem {
  id: string;
  type: 'lesson_completed' | 'level_up' | 'achievement' | 'course_completed';
  timestamp: string;
  title: string;
  description?: string;
  xpEarned?: number;
}

// Mock activity feed
export const mockActivityFeed: ActivityItem[] = [
  {
    id: 'activity-1',
    type: 'lesson_completed',
    timestamp: '2023-10-24T14:32:00Z',
    title: 'LESSON COMPLETED: ACCOUNT SERIALIZATION',
    description: '+150 XP EARNED',
    xpEarned: 150,
  },
  {
    id: 'activity-2',
    type: 'level_up',
    timestamp: '2023-10-23T09:15:00Z',
    title: 'MILESTONE: REACHED LEVEL 09',
    description: 'NEW CREDENTIAL UNLOCKED: "ANCHOR APPRENTICE"',
  },
  {
    id: 'activity-3',
    type: 'achievement',
    timestamp: '2023-10-22T16:45:00Z',
    title: 'ACHIEVEMENT UNLOCKED: FIRST DEPLOY',
    description: 'Successfully deployed your first program to devnet',
  },
  {
    id: 'activity-4',
    type: 'course_completed',
    timestamp: '2023-10-20T11:20:00Z',
    title: 'COURSE COMPLETED: DEFI FUNDAMENTALS',
    description: '+500 XP EARNED',
    xpEarned: 500,
  },
  {
    id: 'activity-5',
    type: 'lesson_completed',
    timestamp: '2023-10-19T15:10:00Z',
    title: 'LESSON COMPLETED: PDA FUNDAMENTALS',
    description: '+100 XP EARNED',
    xpEarned: 100,
  },
];

// Helper functions
export function getActivityFeed(userId?: string, limit: number = 10): ActivityItem[] {
  // In real app, fetch by userId with pagination
  return mockActivityFeed.slice(0, limit);
}

export function getRecentActivity(userId?: string): ActivityItem[] {
  return getActivityFeed(userId, 5);
}
