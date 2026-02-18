import { Link } from '@/i18n/routing';
import { CourseProgress } from '@/lib/data/user';
import { Progress } from '@/components/ui/progress';
import { CodeIcon } from '@phosphor-icons/react';

interface CourseCardProps {
  course: CourseProgress;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.courseId}`}>
      <div className="card border border-border relative bg-bg-surface transition-all duration-200 hover:border-ink-primary hover:shadow-[4px_4px_0_rgba(13,20,18,0.1)] dark:hover:shadow-[4px_4px_0_rgba(255,255,255,0.1)] hover:bg-ink-primary/5 hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer grid grid-cols-[100px_1fr] min-h-[160px] rounded-none group overflow-hidden">
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-ink-primary z-10"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-ink-primary z-10"></div>
        
        {/* Visual Section */}
        <div className="border-r border-ink-secondary/20 relative flex items-center justify-center bg-ink-secondary/5">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, var(--ink-secondary) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
          <CodeIcon size={32} className="text-ink-primary relative z-10" weight="duotone" />
          
          <div className="absolute bottom-2 left-2 text-[8px] uppercase tracking-widest text-ink-secondary">
             {course.courseCode}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              <div className="text-[10px] uppercase tracking-widest text-ink-secondary">
                 {"//"} LESSON {course.currentLesson ? course.currentLesson.id.split('-')[1] : '01'}
              </div>
            </div>
            
            <h3 className="font-display text-xl leading-none mb-3 group-hover:text-ink-primary/80 transition-colors">
              {course.courseTitle}
            </h3>
          </div>
          
          <div className="space-y-3">
             <div className="flex justify-between text-[10px]">
               <span className="uppercase tracking-widest font-bold">PROGRESS</span>
               <span className="font-mono">{course.progress}%</span>
             </div>
             
             <Progress value={course.progress} />
             
             {course.currentLesson && (
               <div className="pt-2 border-t border-ink-secondary/10 mt-1">
                 <span className="text-[10px] uppercase tracking-widest text-ink-primary block truncate">
                   RESUME: {course.currentLesson.title} →
                 </span>
               </div>
             )}
          </div>
        </div>
      </div>
    </Link>
  );
}
