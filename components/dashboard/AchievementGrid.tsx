'use client';

import { Achievement } from '@/lib/data/achievements';

interface AchievementGridProps {
  achievements: Achievement[];
  maxSlots?: number;
}

export function AchievementGrid({ achievements, maxSlots = 8 }: AchievementGridProps) {
  const slots = Array.from({ length: maxSlots }, (_, i) => achievements[i] || null);
  
  return (
    <div>
      <span className="text-[10px] uppercase tracking-widest font-bold block mb-3">
        Latest Achievements
      </span>
      
      <div className="grid grid-cols-4 gap-3">
        {slots.map((achievement, index) => (
          <div
            key={index}
            className={`aspect-square border flex items-center justify-center text-2xl ${
              achievement
                ? 'border-ink-secondary'
                : 'border-dashed border-ink-secondary opacity-30'
            }`}
            title={achievement?.name}
          >
            {achievement ? (
              <i className={achievement.icon}></i>
            ) : (
              <i className="bi bi-lock"></i>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
