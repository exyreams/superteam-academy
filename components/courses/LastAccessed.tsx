'use client';

import { LastAccessedCourse } from '@/lib/data/courses';
import { CheckSquare, Square } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

interface LastAccessedProps {
  course: LastAccessedCourse;
}

export function LastAccessed({ course }: LastAccessedProps) {
  const t = useTranslations('Courses');

  return (
    <div className="border border-dashed border-ink-secondary p-4 bg-[rgba(13,20,18,0.02)] relative">
      {/* Crosshairs */}
      <div className="absolute -top-[5px] -right-[5px] w-[10px] h-[10px]">
        <div className="absolute bg-ink-secondary w-full h-px top-1/2" />
        <div className="absolute bg-ink-secondary h-full w-px left-1/2" />
      </div>
      <div className="absolute -bottom-[5px] -left-[5px] w-[10px] h-[10px]">
        <div className="absolute bg-ink-secondary w-full h-px top-1/2" />
        <div className="absolute bg-ink-secondary h-full w-px left-1/2" />
      </div>

      <div className="text-[10px] uppercase tracking-widest text-ink-secondary mb-2">
        {t('lastAccessed.title')}
      </div>
      <h4 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[28px]">
        {course.title}
      </h4>

      <div className="h-1 bg-[rgba(13,20,18,0.1)] w-full relative my-3">
        <div
          className="h-full bg-ink-primary relative"
          style={{ width: `${course.progress}%` }}
        >
          <div className="absolute right-0 top-px h-[6px] w-px bg-ink-primary" />
        </div>
      </div>

      <div className="flex flex-col gap-2 my-3">
        {course.lessons.map((lesson, index) => (
          <div key={index} className="flex gap-2 items-center">
            {lesson.completed ? (
              <CheckSquare size={14} className="text-ink-secondary" />
            ) : (
              <Square size={14} className="text-ink-secondary" />
            )}
            <span className={`text-[10px] uppercase tracking-widest ${lesson.completed ? '' : 'font-bold'}`}>
              {lesson.title}
            </span>
          </div>
        ))}
      </div>

      <Button
        asChild
        variant="landingPrimary"
        className="w-full rounded-none uppercase text-[10px] font-bold px-3 py-2 h-auto tracking-widest mt-4"
      >
        <Link href={`/courses/${course.courseId}`}>
          {t('lastAccessed.resume')}
        </Link>
      </Button>
    </div>
  );
}
