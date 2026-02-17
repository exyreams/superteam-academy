'use client';

import { Certificate } from '@/lib/data/certificates';

interface CourseMasteryProps {
  mastery: Certificate['mastery'];
}

export function CourseMastery({ mastery }: CourseMasteryProps) {
  const percentage = (mastery.finalScore / mastery.maxScore) * 100;

  return (
    <div className="border border-ink-secondary p-4 relative">
      <span className="absolute -top-2.5 left-3 bg-bg-base px-2 text-[10px] uppercase tracking-widest font-bold">
        Course Mastery
      </span>
      
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-[10px] tracking-widest">FINAL ASSESSMENT</span>
          <span className="text-[10px] font-bold">{mastery.finalScore}/{mastery.maxScore}</span>
        </div>
        <div className="h-1 bg-ink-primary/10 w-full">
          <div className="h-full bg-ink-primary" style={{ width: `${percentage}%` }}></div>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="border border-ink-primary/10 p-2 text-center">
            <div className="text-[10px] text-ink-secondary tracking-widest">XP EARNED</div>
            <div className="font-bold">+{mastery.xpEarned.toLocaleString()}</div>
          </div>
          <div className="border border-ink-primary/10 p-2 text-center">
            <div className="text-[10px] text-ink-secondary tracking-widest">RANK UP</div>
            <div className="font-bold">LVL {mastery.rankAchieved}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
