'use client';

import { useState } from 'react';
import { LeaderboardPeriod, LeaderboardTrack } from '@/lib/data/leaderboard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterControlsProps {
  onFilterChange: (period: LeaderboardPeriod, track: LeaderboardTrack) => void;
}

const trackOptions = [
  { value: 'all', label: 'FILTER: ALL TRACKS' },
  { value: 'rust', label: 'RUST FUNDAMENTALS' },
  { value: 'solana', label: 'SOLANA BASICS' },
  { value: 'anchor', label: 'ANCHOR FRAMEWORK' },
];

export function FilterControls({ onFilterChange }: FilterControlsProps) {
  const [activePeriod, setActivePeriod] = useState<LeaderboardPeriod>('weekly');
  const [activeTrack, setActiveTrack] = useState<LeaderboardTrack>('all');

  const handlePeriodChange = (period: LeaderboardPeriod) => {
    setActivePeriod(period);
    onFilterChange(period, activeTrack);
  };

  const handleTrackChange = (track: string) => {
    const newTrack = track as LeaderboardTrack;
    setActiveTrack(newTrack);
    onFilterChange(activePeriod, newTrack);
  };

  return (
    <div className="flex gap-6 mb-8 items-center">
      {/* Period Tab Group */}
      <div className="flex border border-ink-secondary">
        <button
          onClick={() => handlePeriodChange('weekly')}
          className={`px-4 py-2 text-[11px] uppercase tracking-widest border-r border-ink-secondary ${
            activePeriod === 'weekly'
              ? 'bg-ink-primary text-bg-base'
              : 'bg-transparent text-ink-secondary hover:bg-ink-primary/5'
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => handlePeriodChange('monthly')}
          className={`px-4 py-2 text-[11px] uppercase tracking-widest border-r border-ink-secondary ${
            activePeriod === 'monthly'
              ? 'bg-ink-primary text-bg-base'
              : 'bg-transparent text-ink-secondary hover:bg-ink-primary/5'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => handlePeriodChange('all-time')}
          className={`px-4 py-2 text-[11px] uppercase tracking-widest ${
            activePeriod === 'all-time'
              ? 'bg-ink-primary text-bg-base'
              : 'bg-transparent text-ink-secondary hover:bg-ink-primary/5'
          }`}
        >
          All-Time
        </button>
      </div>

      {/* Track Filter Dropdown */}
      <Select value={activeTrack} onValueChange={handleTrackChange}>
        <SelectTrigger className="w-[200px] h-auto py-2 px-3 text-[11px] uppercase tracking-widest border-ink-secondary bg-transparent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {trackOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-[11px] uppercase tracking-widest">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Cycle Info */}
      <div className="text-[10px] uppercase tracking-widest text-ink-secondary ml-auto">
        Cycle 42 {"//"} Stage 3
      </div>
    </div>
  );
}
