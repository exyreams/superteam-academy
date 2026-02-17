'use client';

import { useState } from 'react';
import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';
import { RankCard } from '@/components/leaderboard/RankCard';
import { FilterControls } from '@/components/leaderboard/FilterControls';
import { UserStanding } from '@/components/leaderboard/UserStanding';
import { SeasonalPrizes } from '@/components/leaderboard/SeasonalPrizes';
import { LeaderboardEntry, LeaderboardPeriod, LeaderboardTrack, UserStanding as UserStandingType } from '@/lib/data/leaderboard';

interface LeaderboardViewProps {
  initialEntries: LeaderboardEntry[];
  userStanding: UserStandingType;
}

export function LeaderboardView({ initialEntries, userStanding }: LeaderboardViewProps) {
  const [entries] = useState(initialEntries);

  const handleFilterChange = (period: LeaderboardPeriod, track: LeaderboardTrack) => {
    // In real app, fetch filtered data
    console.log('Filter changed:', period, track);
  };

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
        <section className="p-8 overflow-y-auto flex flex-col">
          {/* Section Header */}
          <div className="flex justify-between items-end mb-6 border-b border-border pb-2">
            <div>
              <span className="bg-ink-primary text-bg-base px-2 py-1 text-[10px] uppercase tracking-widest inline-block mb-2">
                Global Ranking
              </span>
              <h2 className="font-display text-[32px] leading-none -tracking-wider">
                OPERATOR LEADERBOARD
              </h2>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-ink-secondary">
              Updated: 1m ago
            </div>
          </div>

          {/* Filter Controls */}
          <FilterControls onFilterChange={handleFilterChange} />

          {/* Ranking Table */}
          <div className="flex flex-col gap-2">
            {entries.map((entry) => (
              <RankCard key={entry.userId} entry={entry} showCrosshair={entry.rank <= 2} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-4 text-[10px] uppercase tracking-widest text-ink-secondary">
            -- [ VIEW NEXT 50 OPERATORS ] --
          </div>
        </section>

        {/* Context Panel (Right Sidebar) */}
        <aside className="border-l border-border bg-bg-base p-6 flex flex-col gap-8 overflow-y-auto">
          <UserStanding standing={userStanding} />
          
          <SeasonalPrizes />
          
          {/* Activity Feed */}
          <div className="mt-auto border border-ink-secondary p-4 bg-ink-primary/5">
            <div className="text-[10px] uppercase tracking-widest font-bold mb-3">
              Activity Feed
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[10px]">
                <span className="text-ink-secondary">14:02</span> {"//"} 0xFE2... gained +500 XP
              </div>
              <div className="text-[10px]">
                <span className="text-ink-secondary">13:45</span> {"//"} YOU completed &apos;PDA&apos; module
              </div>
              <div className="text-[10px]">
                <span className="text-ink-secondary">12:10</span> {"//"} LAMPORT_GOD reached Level 7
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
