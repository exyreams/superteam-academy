'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CaretDown, CheckSquare, Square, Lock } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import type { Module } from '@/lib/data/course-detail';

interface ModuleListProps {
  modules: Module[];
  totalLessons: number;
  completedLessons: number;
  progress: number;
}

export function ModuleList({ modules, progress }: ModuleListProps) {
  const t = useTranslations('CourseDetail');
  const [expandedModules, setExpandedModules] = useState<string[]>(['mod-1', 'mod-2']);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  return (
    <div>
      {/* Curriculum Header */}
      <div className="flex justify-between items-end mb-4">
        <h3 className="uppercase font-bold tracking-widest">{t('curriculum.title')}</h3>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-ink-secondary">
            {t('curriculum.completion')}: {progress}%
          </div>
          <div className="h-1 bg-[rgba(13,20,18,0.1)] w-[150px] relative mt-1">
            <div
              className="h-full bg-ink-primary relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 -top-px h-[6px] w-px bg-ink-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Module List */}
      <div className="flex flex-col gap-2">
        {modules.map((module) => {
          const isExpanded = expandedModules.includes(module.id);
          const isLocked = module.lessons.every((l) => l.locked);

          return (
            <div
              key={module.id}
              className={cn(
                'border border-ink-secondary bg-[rgba(255,255,255,0.2)] p-4',
                isLocked && 'opacity-60'
              )}
            >
              {/* Module Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => !isLocked && toggleModule(module.id)}
              >
                <span className="font-bold uppercase tracking-wide">
                  MODULE {module.number.toString().padStart(2, '0')}: {module.title}
                </span>
                {isLocked ? (
                  <Lock size={16} className="text-ink-primary" />
                ) : (
                  <CaretDown
                    size={16}
                    className={cn(
                      'text-ink-primary transition-transform',
                      isExpanded && 'rotate-180'
                    )}
                  />
                )}
              </div>

              {/* Lesson List */}
              {isExpanded && !isLocked && (
                <div className="mt-3">
                  {module.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={cn(
                        'flex items-center justify-between py-2',
                        index < module.lessons.length - 1 && 'border-b border-dashed border-ink-secondary/30'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckSquare size={14} weight="fill" className="text-ink-primary" />
                        ) : (
                          <Square size={14} className="text-ink-primary" />
                        )}
                        <span className="text-[13px]">
                          {module.number}.{index + 1} {lesson.title}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-ink-secondary">
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
