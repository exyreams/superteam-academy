'use client';

import { Link } from '@/i18n/routing';
import { CourseProgress } from '@/lib/data/user';
import { ProgressBar } from '@/components/shared/ProgressBar';

interface CourseCardProps {
  course: CourseProgress;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.courseId}`}>
      <div className="card border border-ink-secondary p-6 relative bg-bg-base transition-all duration-200 hover:border-ink-primary hover:shadow-[4px_4px_0_rgba(13,20,18,0.1)] hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between min-h-[180px]">
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-ink-primary"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-ink-primary"></div>
        
        <div>
          <div className="text-[10px] uppercase tracking-widest text-ink-secondary mb-1">
            {course.courseCode} {"//"} LESSON {course.currentLesson ? course.currentLesson.id.split('-')[1] : '01'}
          </div>
          <h3 className="font-display text-2xl leading-none mb-1">
            {course.courseTitle}
          </h3>
        </div>
        
        <div>
          <div className="flex justify-between text-[10px] mb-2">
            <span className="uppercase tracking-widest">PROGRESS</span>
            <span className="uppercase tracking-widest">{course.progress}%</span>
          </div>
          <ProgressBar progress={course.progress} />
          
          {course.currentLesson && (
            <div className="mt-4">
              <span className="text-[10px] uppercase tracking-widest font-bold">
                Resume: {course.currentLesson.title} →
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
