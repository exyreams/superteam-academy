'use client';

import React from 'react';
import { Achievement } from '@/lib/data/achievements';
import { 
  Footprints, Trophy, Lightning, CalendarCheck, Calendar, Fire, 
  Cpu, ShieldCheck, Stack, Users, ChatCircle, Star, SealCheck, 
  Bug, Medal, RocketLaunch, LockKey 
} from "@phosphor-icons/react";

const iconMap: Record<string, React.ElementType> = {
  'bi-footprints': Footprints,
  'bi-trophy': Trophy,
  'bi-lightning': Lightning,
  'bi-calendar-week': CalendarCheck,
  'bi-calendar-month': Calendar,
  'bi-fire': Fire,
  'bi-cpu-fill': Cpu,
  'bi-shield-lock': ShieldCheck,
  'bi-layers': Stack,
  'bi-people-fill': Users,
  'bi-chat': ChatCircle,
  'bi-star-fill': Star,
  'bi-patch-check': SealCheck,
  'bi-bug-fill': Bug,
  'bi-award': Medal,
  'bi-rocket-takeoff-fill': RocketLaunch,
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
          const IconComponent = achievement ? iconMap[achievement.icon] || Trophy : LockKey;
          
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
