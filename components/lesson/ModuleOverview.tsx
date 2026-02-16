'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CheckCircleIcon, CircleIcon, RadioButtonIcon, LockIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import type { ModuleLesson } from '@/lib/data/lesson';

interface ModuleOverviewProps {
  moduleNumber: number;
  moduleTitle: string;
  lessons: ModuleLesson[];
  courseSlug: string;
}

export function ModuleOverview({ moduleNumber, moduleTitle, lessons, courseSlug }: ModuleOverviewProps) {
  const t = useTranslations('Lesson');

  const getLessonIcon = (lesson: ModuleLesson) => {
    if (lesson.locked) return <LockIcon size={16} className="text-ink-secondary" />;
    if (lesson.completed) return <CheckCircleIcon size={16} weight="fill" className="text-ink-primary" />;
    if (lesson.active) return <RadioButtonIcon size={16} weight="fill" className="text-ink-primary" />;
    return <CircleIcon size={16} className="text-ink-secondary" />;
  };

  return (
    <aside className="border-r border-ink-secondary flex flex-col bg-[rgba(13,20,18,0.02)] overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-ink-secondary/30">
        <div className="text-[10px] uppercase tracking-widest text-ink-secondary mb-1">
          {t('module')} {moduleNumber.toString().padStart(2, '0')}
        </div>
        <div className="font-bold uppercase text-[14px]">{moduleTitle}</div>
      </div>

      {/* Lesson List */}
      <ul className="list-none">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              href={`/courses/${courseSlug}/lessons/${lesson.id}`}
              className={cn(
                'flex items-center gap-3 px-6 py-4 border-b border-ink-secondary/20 transition-colors',
                lesson.active && 'bg-bg-base border-l-4 border-l-ink-primary pl-[20px]',
                lesson.completed && 'text-ink-tertiary',
                !lesson.locked && !lesson.active && 'hover:bg-[rgba(13,20,18,0.05)]',
                lesson.locked && 'cursor-not-allowed opacity-60'
              )}
            >
              {getLessonIcon(lesson)}
              <span className="text-[10px] uppercase tracking-widest">{lesson.number} {lesson.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
