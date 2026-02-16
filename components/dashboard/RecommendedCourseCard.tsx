'use client';

import { Link } from '@/i18n/routing';
import { RecommendedCourse } from '@/lib/data/user';
import { Button } from '@/components/ui/button';

interface RecommendedCourseCardProps {
  course: RecommendedCourse;
}

export function RecommendedCourseCard({ course }: RecommendedCourseCardProps) {
  return (
    <div className="card border border-ink-secondary p-6 relative bg-bg-base transition-all duration-200 hover:border-ink-primary hover:shadow-[4px_4px_0_rgba(13,20,18,0.1)] hover:-translate-x-0.5 hover:-translate-y-0.5 flex flex-col justify-between min-h-[160px]">
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-ink-primary"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-ink-primary"></div>
      
      <div>
        <span className="text-[10px] uppercase tracking-widest text-ink-secondary">
          {course.code} {"//"} {course.difficulty}
        </span>
        <h4 className="font-display text-xl leading-none mt-1">
          {course.title}
        </h4>
      </div>
      
      <Link href={`/courses/${course.id}`}>
        <Button
          variant="outline"
          className="rounded-none uppercase text-[11px] font-bold px-2 py-1 h-auto tracking-widest mt-3 w-full"
        >
          ENROLL
        </Button>
      </Link>
    </div>
  );
}
