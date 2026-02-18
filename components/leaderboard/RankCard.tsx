'use client';

import { LeaderboardEntry } from '@/lib/data/leaderboard';

interface RankCardProps {
  entry: LeaderboardEntry;
  showCrosshair?: boolean;
}

export function RankCard({ entry, showCrosshair = false }: RankCardProps) {
  return (
    <div
      className={`grid grid-cols-[60px_50px_1fr_120px_80px_100px] items-center px-6 py-3 border relative transition-all ${
        entry.isCurrentUser
          ? 'bg-ink-primary text-bg-base border-ink-primary'
          : 'border-border bg-bg-surface hover:border-ink-primary hover:shadow-[4px_4px_0_rgba(13,20,18,0.1)] dark:hover:shadow-[4px_4px_0_rgba(255,255,255,0.1)]'
      }`}
    >
      {/* Crosshair decoration for top ranks */}
      {showCrosshair && entry.rank === 1 && (
        <div className="absolute -top-1 -left-1 w-2.5 h-2.5">
          <div className="absolute w-full h-px bg-ink-secondary top-1/2"></div>
          <div className="absolute h-full w-px bg-ink-secondary left-1/2"></div>
        </div>
      )}
      {showCrosshair && entry.rank === 2 && entry.isCurrentUser && (
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5">
          <div className="absolute w-full h-px bg-bg-base top-1/2"></div>
          <div className="absolute h-full w-px bg-bg-base left-1/2"></div>
        </div>
      )}
      
      {/* Rank Number */}
      <div className="font-display text-2xl font-bold">
        {entry.rank.toString().padStart(2, '0')}
      </div>
      
      {/* Avatar */}
      <div
        className={`w-8 h-8 border flex items-center justify-center text-base ${
          entry.isCurrentUser
            ? 'border-bg-base/30 bg-bg-base/10'
            : 'border-ink-secondary bg-ink-primary/5'
        }`}
      >
        <i className={entry.avatar}></i>
      </div>
      
      {/* Username */}
      <div className="font-bold pl-3">
        {entry.username}
      </div>
      
      {/* XP */}
      <div className="font-display text-xl text-right pr-6">
        {entry.xp.toLocaleString()}{' '}
        <span className={`text-[10px] ${entry.isCurrentUser ? 'opacity-40' : 'text-ink-secondary'}`}>
          XP
        </span>
      </div>
      
      {/* Level Badge */}
      <div>
        <span className="text-[10px] border border-current px-1.5 py-0.5 inline-block uppercase tracking-widest">
          LVL {entry.level}
        </span>
      </div>
      
      {/* Streak */}
      <div className="text-right text-[10px] font-medium">
        {entry.streak}
        <span className={entry.isCurrentUser ? 'opacity-60' : 'text-ink-secondary'}>
          D STREAK
        </span>
      </div>
    </div>
  );
}
