export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'rust' | 'core' | 'spl' | 'security' | 'web3' | 'defi' | 'other';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: string; // e.g., "4H 30M"
  durationMinutes: number;
  progress: number; // 0-100
  isLocked: boolean;
  modules: number;
  xp: number;
}

export interface LearningPath {
  id: string;
  slug: string;
  ref: string;
  track: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
  icon: string; // lucide icon name
  modules: number;
  duration: string;
  xp: number;
  progress: number;
  courses: string[]; // course IDs
}

export interface UserStats {
  totalXP: number;
  coursesActive: number;
  completionRate: number;
  certificates: number;
  currentStreak: number;
  level: number;
}

export interface LastAccessedCourse {
  courseId: string;
  title: string;
  progress: number;
  lessons: {
    title: string;
    completed: boolean;
  }[];
}

// Mock courses data
export const mockCourses: Course[] = [
  {
    id: 'rust-syntax',
    slug: 'rust-syntax',
    title: 'RUST SYNTAX',
    description: 'Memory safety without garbage collection. The basics of Rust.',
    category: 'rust',
    difficulty: 'beginner',
    duration: '4H 30M',
    durationMinutes: 270,
    progress: 100,
    isLocked: false,
    modules: 8,
    xp: 400,
  },
  {
    id: 'account-model',
    slug: 'account-model',
    title: 'ACCOUNT MODEL',
    description: 'Everything is an account. Deep dive into the Solana storage model.',
    category: 'core',
    difficulty: 'intermediate',
    duration: '6H 15M',
    durationMinutes: 375,
    progress: 12,
    isLocked: false,
    modules: 10,
    xp: 600,
  },
  {
    id: 'token-program',
    slug: 'token-program',
    title: 'TOKEN PROGRAM',
    description: 'Minting fungible tokens and managing token accounts.',
    category: 'spl',
    difficulty: 'intermediate',
    duration: '3H 45M',
    durationMinutes: 225,
    progress: 0,
    isLocked: false,
    modules: 6,
    xp: 350,
  },
  {
    id: 'security-audit',
    slug: 'security-audit',
    title: 'SECURITY AUDIT',
    description: 'Common attack vectors and how to prevent them in your programs.',
    category: 'security',
    difficulty: 'advanced',
    duration: '8H 00M',
    durationMinutes: 480,
    progress: 0,
    isLocked: false,
    modules: 12,
    xp: 800,
  },
  {
    id: 'client-side',
    slug: 'client-side',
    title: 'CLIENT SIDE',
    description: 'Connecting wallets and sending transactions from React.',
    category: 'web3',
    difficulty: 'beginner',
    duration: '5H 20M',
    durationMinutes: 320,
    progress: 0,
    isLocked: false,
    modules: 9,
    xp: 450,
  },
  {
    id: 'program-architecture',
    slug: 'program-architecture',
    title: 'PROGRAM ARCH',
    description: 'Design patterns for scalable Solana programs.',
    category: 'other',
    difficulty: 'expert',
    duration: '10H 00M',
    durationMinutes: 600,
    progress: 0,
    isLocked: true,
    modules: 15,
    xp: 1200,
  },
];

// Mock learning paths
export const mockLearningPaths: LearningPath[] = [
  {
    id: 'solana-fundamentals',
    slug: 'solana-fundamentals',
    ref: 'SL-001',
    track: 'beginner',
    title: 'SOLANA FUNDAMENTALS',
    description: 'Complete introduction to the Solana ecosystem. From wallet basics to your first on-chain program.',
    icon: 'Layers',
    modules: 12,
    duration: '~24 HOURS',
    xp: 1200,
    progress: 45,
    courses: ['rust-syntax', 'account-model', 'client-side'],
  },
  {
    id: 'defi-developer',
    slug: 'defi-developer',
    ref: 'DF-202',
    track: 'advanced',
    title: 'DEFI DEVELOPER',
    description: 'Master liquidity pools, AMMs, and lending protocols. Security auditing included.',
    icon: 'Cpu',
    modules: 8,
    duration: '~32 HOURS',
    xp: 2400,
    progress: 0,
    courses: ['token-program', 'security-audit'],
  },
];

// Mock user stats
export const mockUserStats: UserStats = {
  totalXP: 8420,
  coursesActive: 3,
  completionRate: 68,
  certificates: 3,
  currentStreak: 7,
  level: 9,
};

// Mock last accessed course
export const mockLastAccessed: LastAccessedCourse = {
  courseId: 'rust-syntax',
  title: 'RUST FUNDAMENTALS',
  progress: 72,
  lessons: [
    { title: 'VARIABLES & MUTABILITY', completed: true },
    { title: 'DATA TYPES', completed: true },
    { title: 'OWNERSHIP', completed: false },
  ],
};
