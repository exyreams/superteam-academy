'use client';

import React from 'react';
import { Achievement } from '@/lib/data/achievements';
import { 
  FootprintsIcon, TrophyIcon, LightningIcon, CalendarCheckIcon, CalendarIcon, FireIcon, 
  CpuIcon, ShieldCheckIcon, StackIcon, UsersIcon, ChatCircleIcon, StarIcon, SealCheckIcon, 
  BugIcon, MedalIcon, RocketLaunchIcon, LockKeyIcon, Icon 
} from "@phosphor-icons/react";

const iconMap: Record<string, Icon> = {
  'bi-footprints': FootprintsIcon,
  'bi-trophy': TrophyIcon,
  'bi-lightning': LightningIcon,
  'bi-calendar-week': CalendarCheckIcon,
  'bi-calendar-month': CalendarIcon,
  'bi-fire': FireIcon,
  'bi-cpu-fill': CpuIcon,
  'bi-shield-lock': ShieldCheckIcon,
  'bi-layers': StackIcon,
  'bi-people-fill': UsersIcon,
  'bi-chat': ChatCircleIcon,
  'bi-star-fill': StarIcon,
  'bi-patch-check': SealCheckIcon,
  'bi-bug-fill': BugIcon,
  'bi-award': MedalIcon,
  'bi-rocket-takeoff-fill': RocketLaunchIcon,
};

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
        {slots.map((achievement, index) => {
          const IconComponent = achievement ? iconMap[achievement.icon] || TrophyIcon : LockKeyIcon;
          
          return (
            <div
              key={index}
              className={`aspect-square border flex items-center justify-center text-2xl relative group transition-all duration-300 ${
                achievement
                  ? 'border-ink-primary bg-ink-primary/5 text-ink-primary'
                  : 'border-dashed border-ink-secondary/30 text-ink-secondary/30'
              }`}
              title={achievement?.name || "Locked"}
            >
              <IconComponent weight={achievement ? "duotone" : "regular"} size={24} />
              
              {/* Corner accents for unlocked */}
              {achievement && (
                <>
                  <div className="absolute top-0 left-0 w-1 h-1 bg-ink-primary opacity-50" />
                  <div className="absolute bottom-0 right-0 w-1 h-1 bg-ink-primary opacity-50" />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
