'use client';

import { UserStanding as UserStandingType } from '@/lib/data/leaderboard';
import { StatCard } from '@/components/shared/StatCard';

interface UserStandingProps {
  standing: UserStandingType;
}

export function UserStanding({ standing }: UserStandingProps) {
  return (
    <div className="border border-ink-primary bg-bg-surface p-4 relative">
      <span className="absolute -top-2.5 left-3 bg-bg-base px-2 text-[10px] uppercase tracking-widest font-bold">
        YOUR STANDING
      </span>
      
      <div className="grid grid-cols-2 gap-4 mt-3">
        <StatCard label="GLOBAL RANK" value={`#${standing.globalRank.toString().padStart(2, '0')}`} />
        <StatCard label="PERCENTILE" value={standing.percentile} />
        <StatCard label="XP TO #1" value={standing.xpToFirst.toLocaleString()} />
        <StatCard label="REWARDS" value={standing.rewardsEligible ? 'ELIGIBLE' : 'LOCKED'} />
      </div>
    </div>
  );
}
