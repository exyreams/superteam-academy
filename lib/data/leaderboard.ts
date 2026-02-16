// Leaderboard data structures and mock data

export type LeaderboardPeriod = 'weekly' | 'monthly' | 'all-time';
export type LeaderboardTrack = 'all' | 'rust' | 'solana' | 'anchor';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  walletAddress: string;
  avatar: string; // Bootstrap icon name
  xp: number;
  level: number;
  streak: number;
  isCurrentUser?: boolean;
}

export interface LeaderboardFilter {
  period: LeaderboardPeriod;
  track: LeaderboardTrack;
}

export interface UserStanding {
  globalRank: number;
  percentile: string; // "TOP 1%"
  xpToFirst: number;
  rewardsEligible: boolean;
}

// Mock leaderboard entries
export const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 'user-1',
    username: '0xFE2...99A',
    walletAddress: '0xFE2...99A',
    avatar: 'bi-shield-shaded',
    xp: 12400,
    level: 14,
    streak: 42,
  },
  {
    rank: 2,
    userId: 'user-9402',
    username: 'YOU (0xKD...92A)',
    walletAddress: '0xKD...92A',
    avatar: 'bi-person-fill',
    xp: 8420,
    level: 9,
    streak: 12,
    isCurrentUser: true,
  },
  {
    rank: 3,
    userId: 'user-3',
    username: '0xAB1...CC2',
    walletAddress: '0xAB1...CC2',
    avatar: 'bi-cpu',
    xp: 8100,
    level: 8,
    streak: 8,
  },
  {
    rank: 4,
    userId: 'user-4',
    username: 'SOL_DEV_99',
    walletAddress: '0x9D4...E1F',
    avatar: 'bi-incognito',
    xp: 7950,
    level: 8,
    streak: 21,
  },
  {
    rank: 5,
    userId: 'user-5',
    username: 'BLOCK_MASTER',
    walletAddress: '0x7C3...A2B',
    avatar: 'bi-code-square',
    xp: 7210,
    level: 7,
    streak: 3,
  },
  {
    rank: 6,
    userId: 'user-6',
    username: 'LAMPORT_GOD',
    walletAddress: '0x5B2...D9C',
    avatar: 'bi-hash',
    xp: 6800,
    level: 7,
    streak: 15,
  },
  {
    rank: 7,
    userId: 'user-7',
    username: 'RUST_NINJA',
    walletAddress: '0x3A1...F8E',
    avatar: 'bi-terminal',
    xp: 6420,
    level: 7,
    streak: 5,
  },
  {
    rank: 8,
    userId: 'user-8',
    username: 'ANCHOR_ACE',
    walletAddress: '0x2E9...B7D',
    avatar: 'bi-box',
    xp: 6100,
    level: 6,
    streak: 18,
  },
  {
    rank: 9,
    userId: 'user-9',
    username: 'SOLANA_SAGE',
    walletAddress: '0x1D8...C6A',
    avatar: 'bi-lightning',
    xp: 5890,
    level: 6,
    streak: 9,
  },
  {
    rank: 10,
    userId: 'user-10',
    username: 'WEB3_WARRIOR',
    walletAddress: '0x9C7...E5B',
    avatar: 'bi-globe',
    xp: 5650,
    level: 6,
    streak: 12,
  },
  {
    rank: 11,
    userId: 'user-11',
    username: 'CRYPTO_KING',
    walletAddress: '0x8B6...D4C',
    avatar: 'bi-gem',
    xp: 5420,
    level: 6,
    streak: 7,
  },
  {
    rank: 12,
    userId: 'user-12',
    username: 'DEFI_DEGEN',
    walletAddress: '0x7A5...C3B',
    avatar: 'bi-currency-exchange',
    xp: 5200,
    level: 5,
    streak: 14,
  },
  {
    rank: 13,
    userId: 'user-13',
    username: 'NFT_MASTER',
    walletAddress: '0x6D4...B2A',
    avatar: 'bi-image',
    xp: 4980,
    level: 5,
    streak: 6,
  },
  {
    rank: 14,
    userId: 'user-14',
    username: 'VALIDATOR_PRO',
    walletAddress: '0x5C3...A19',
    avatar: 'bi-server',
    xp: 4750,
    level: 5,
    streak: 11,
  },
  {
    rank: 15,
    userId: 'user-15',
    username: 'SMART_CONTRACT',
    walletAddress: '0x4B2...918',
    avatar: 'bi-file-code',
    xp: 4520,
    level: 5,
    streak: 4,
  },
  {
    rank: 16,
    userId: 'user-16',
    username: 'BLOCKCHAIN_BRO',
    walletAddress: '0x3A1...817',
    avatar: 'bi-link-45deg',
    xp: 4300,
    level: 4,
    streak: 8,
  },
  {
    rank: 17,
    userId: 'user-17',
    username: 'TOKEN_TRADER',
    walletAddress: '0x2E0...716',
    avatar: 'bi-coin',
    xp: 4100,
    level: 4,
    streak: 13,
  },
  {
    rank: 18,
    userId: 'user-18',
    username: 'PROGRAM_PILOT',
    walletAddress: '0x1D9...615',
    avatar: 'bi-airplane',
    xp: 3890,
    level: 4,
    streak: 2,
  },
  {
    rank: 19,
    userId: 'user-19',
    username: 'CHAIN_CHAMPION',
    walletAddress: '0x0C8...514',
    avatar: 'bi-award',
    xp: 3670,
    level: 4,
    streak: 10,
  },
  {
    rank: 20,
    userId: 'user-20',
    username: 'BYTE_BOSS',
    walletAddress: '0x9B7...413',
    avatar: 'bi-braces',
    xp: 3450,
    level: 4,
    streak: 5,
  },
];

// Mock user standing
export const mockUserStanding: UserStanding = {
  globalRank: 2,
  percentile: 'TOP 1%',
  xpToFirst: 3980,
  rewardsEligible: true,
};

// Helper functions
export function getLeaderboard(
  period: LeaderboardPeriod = 'weekly',
  track: LeaderboardTrack = 'all'
): LeaderboardEntry[] {
  // In real app, filter by period and track
  // For now, return mock data
  return mockLeaderboardData;
}

export function getUserStanding(userId?: string): UserStanding {
  // In real app, fetch by userId
  return mockUserStanding;
}

export function getCurrentUserRank(): number {
  const currentUser = mockLeaderboardData.find(entry => entry.isCurrentUser);
  return currentUser?.rank || 0;
}
