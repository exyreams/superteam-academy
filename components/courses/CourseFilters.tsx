'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Terminal, SquaresFour, Code, Buildings, X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

type FilterCategory = 'all' | 'dev' | 'defi';

export function CourseFilters() {
  const t = useTranslations('Courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [activeFilters, setActiveFilters] = useState<string[]>(['DIFFICULTY: ANY', 'DURATION: < 10H']);

  const filters: { id: FilterCategory; icon: typeof SquaresFour; label: string }[] = [
    { id: 'all', icon: SquaresFour, label: t('filters.all') },
    { id: 'dev', icon: Code, label: t('filters.dev') },
    { id: 'defi', icon: Buildings, label: t('filters.defi') },
  ];

  const handleFilterClick = (filterId: FilterCategory) => {
    setActiveFilter(filterId);
    
    // Add category to active filters if not already present
    const filterLabel = `CATEGORY: ${filters.find(f => f.id === filterId)?.label.toUpperCase()}`;
    if (!activeFilters.includes(filterLabel)) {
      // Remove any existing category filter first
      const newFilters = activeFilters.filter(f => !f.startsWith('CATEGORY:'));
      if (filterId !== 'all') {
        setActiveFilters([...newFilters, filterLabel]);
      } else {
        setActiveFilters(newFilters);
      }
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  return (
    <>
      {/* Search Bar */}
      <div className="flex-1 border border-ink-secondary flex items-center px-4 bg-bg-base mb-4">
        <Terminal className="text-ink-secondary mr-3" size={16} />
        <input
          type="text"
          className="border-none bg-transparent w-full py-3 font-mono text-[13px] text-ink-primary placeholder:text-ink-secondary focus:outline-none"
          placeholder={t('search.placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="text-[10px] text-ink-secondary uppercase tracking-widest animate-pulse">_</span>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-4">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id)}
              className={cn(
                'border border-ink-secondary px-4 py-2 text-[11px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all',
                activeFilter === filter.id
                  ? 'bg-ink-primary text-bg-base border-ink-primary'
                  : 'bg-transparent text-ink-primary hover:bg-ink-primary hover:text-bg-base'
              )}
            >
              <Icon size={14} weight={activeFilter === filter.id ? 'fill' : 'regular'} />
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex gap-2 items-center">
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
