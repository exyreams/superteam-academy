'use client';

import { Course } from '@/lib/data/courses';
import { CourseCard } from './CourseCard';
import { useTranslations } from 'next-intl';

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  const t = useTranslations('Courses');

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <h3 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[32px]">
          {t('individualModules.title')}
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-ink-secondary">
          {t('individualModules.sort')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
