'use client';

import { UserStats } from '@/lib/data/courses';
import { useTranslations } from 'next-intl';

interface SessionStatsProps {
  stats: UserStats;
}

export function SessionStats({ stats }: SessionStatsProps) {
  const t = useTranslations('Courses');

  const statItems = [
    { label: t('stats.totalXP'), value: stats.totalXP.toLocaleString() },
    { label: t('stats.coursesActive'), value: stats.coursesActive.toString().padStart(2, '0') },
    { label: t('stats.completionRate'), value: `${stats.completionRate}%` },
    { label: t('stats.certificates'), value: stats.certificates.toString().padStart(2, '0') },
  ];

  return (
    <div>
      <span className="bg-ink-primary text-bg-base px-2 py-1 text-[10px] uppercase tracking-widest inline-block mb-4">
        {t('stats.title')}
      </span>

      <div className="mt-4">
        {statItems.map((item, index) => (
          <div
            key={item.label}
            className={`flex justify-between py-2 ${
              index < statItems.length - 1 ? 'border-b border-dashed border-border' : ''
            }`}
          >
            <span className="text-[10px] uppercase tracking-widest text-ink-secondary">
              {item.label}
            </span>
            <span className="font-bold font-mono">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
