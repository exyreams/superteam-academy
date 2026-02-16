'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Grid3x3, Code, Building2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type FilterCategory = 'all' | 'dev' | 'defi';

export function CourseFilters() {
  const t = useTranslations('Courses');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [activeFilters, setActiveFilters] = useState<string[]>(['DIFFICULTY: ANY', 'DURATION: < 10H']);

  const filters: { id: FilterCategory; icon: typeof Grid3x3; label: string }[] = [
    { id: 'all', icon: Grid3x3, label: t('filters.all') },
    { id: 'dev', icon: Code, label: t('filters.dev') },
    { id: 'defi', icon: Building2, label: t('filters.defi') },
  ];

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  return (
    <>
      <div className="flex gap-4">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                'border border-ink-secondary px-4 py-2 text-[11px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all',
                activeFilter === filter.id
                  ? 'bg-ink-primary text-bg-base border-ink-primary'
                  : 'bg-transparent text-ink-primary hover:bg-ink-primary hover:text-bg-base'
              )}
            >
              <Icon size={14} />
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex gap-2 mt-4 items-center">
          <span className="text-[10px] uppercase tracking-widest text-ink-secondary py-1.5">
            {t('filters.active')}:
          </span>
          {activeFilters.map((filter) => (
            <div
              key={filter}
              className="text-[10px] uppercase tracking-widest px-2 py-1 border border-ink-secondary bg-ink-primary text-bg-base flex items-center gap-1 cursor-pointer hover:opacity-80"
              onClick={() => removeFilter(filter)}
            >
              {filter} <X size={10} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
