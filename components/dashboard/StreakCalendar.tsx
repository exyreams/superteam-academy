'use client';

import { StreakDay } from '@/lib/data/user';

interface StreakCalendarProps {
  streak: {
    current: number;
    calendar: StreakDay[];
  };
}

export function StreakCalendar({ streak }: StreakCalendarProps) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        <span className="text-[10px] uppercase tracking-widest font-bold">Active Streak</span>
        <span className="font-display text-xl">{streak.current}D</span>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {streak.calendar.map((day, index) => {
          const dayNumber = new Date(day.date).getDate();
          return (
            <div
              key={index}
              className={`aspect-square border flex items-center justify-center text-[9px] ${
                day.active
                  ? 'bg-ink-primary text-bg-base border-ink-primary'
                  : 'border-ink-tertiary text-ink-tertiary'
              }`}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}
