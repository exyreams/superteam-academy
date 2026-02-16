'use client';

import { Achievement } from '@/lib/data/achievements';

interface BadgeShowcaseProps {
  achievements: Achievement[];
  maxSlots?: number;
}

export function BadgeShowcase({ achievements, maxSlots = 8 }: BadgeShowcaseProps) {
  const slots = Array.from({ length: maxSlots }, (_, i) => achievements[i] || null);
  
  return (
    <div className="border border-ink-secondary p-6 bg-bg-base">
      <span className="text-[10px] uppercase tracking-widest font-bold block mb-4">
        ACHIEVEMENTS // SHOWCASE
      </span>
      
      <div className="grid grid-cols-4 gap-3">
        {slots.map((achievement, index) => (
          <div
            key={index}
            className={`aspect-square border-dashed border flex items-center justify-center text-2xl ${
              achievement ? 'border-ink-secondary' : 'border-ink-secondary/30'
            }`}
            title={achievement?.name}
          >
            {achievement ? (
              <i className={`${achievement.icon} text-ink-primary`}></i>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
