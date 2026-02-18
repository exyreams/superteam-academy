'use client';

import { UserStats } from '@/lib/data/user';
import { StatCard } from '@/components/shared/StatCard';
import { Progress } from '@/components/ui/progress';
import { Coins, Globe } from '@phosphor-icons/react';

interface UserHUDProps {
  stats: UserStats;
}

export function UserHUD({ stats }: UserHUDProps) {
  return (
    <div className="border border-border p-4 relative">
      <span className="absolute -top-2.5 left-3 bg-bg-base px-2 text-[10px] uppercase tracking-widest font-bold">
        OPERATOR PROFILE
      </span>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <StatCard 
          label="XP BALANCE" 
          value={stats.xp.toLocaleString()} 
          icon={<Coins size={16} weight="duotone" />}
        />
        <StatCard 
          label="GLOBAL RANK" 
          value={`#${stats.globalRank.toLocaleString()}`} 
          icon={<Globe size={16} weight="duotone" />}
        />
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-[10px] mb-1">
          <span className="uppercase font-bold tracking-widest">LEVEL {stats.level}</span>
          <span className="text-ink-secondary uppercase tracking-widest">
            {stats.xpToNextLevel.toLocaleString()} XP TO LVL {stats.level + 1}
          </span>
        </div>
        <Progress value={stats.levelProgress} />
      </div>
    </div>
  );
}
