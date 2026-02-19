'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface CourseHeaderProps {
  title: string;
  courseRef: string;
  category: string;
  description: string;
  instructor: {
    name: string;
    username: string;
  };
  duration: string;
  difficulty: string;
  xpBounty: number;
  enrolled: boolean;
}

export function CourseHeader({
  title,
  courseRef,
  category,
  description,
  instructor,
  duration,
  difficulty,
  xpBounty,
  enrolled,
}: CourseHeaderProps) {
  const t = useTranslations('CourseDetail');

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="mb-6 border-b border-border pb-4 relative">
        <span className="bg-ink-primary text-bg-base px-3 py-1 text-[10px] uppercase tracking-widest inline-block mb-3">
          {t('header.label')} {'//'} {category}
        </span>
        <h1 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[32px] md:text-[48px]">
          {title}
        </h1>
        <div className="absolute bottom-[-3px] right-0 text-[10px] uppercase tracking-widest text-ink-secondary">
          REF: {courseRef}
        </div>
      </div>

      {/* Course Info Card */}
      <div className="border border-border bg-bg-surface relative">
        {/* Corner decorations */}
        <div className="absolute -top-px -left-px w-2 h-2 border-t-2 border-l-2 border-ink-primary" />
        <div className="absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 border-ink-primary" />

        <div className="flex flex-col md:grid md:grid-cols-[1fr_200px] gap-8 md:gap-12 p-6">
          {/* Left: Description and Metadata */}
          <div>
            <p className="text-ink-secondary text-sm md:text-[14px] leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex flex-wrap gap-4 md:gap-8">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-ink-secondary mb-1">
                  {t('metadata.instructor')}
                </div>
                <div className="font-bold">{instructor.username}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-ink-secondary mb-1">
                  {t('metadata.duration')}
                </div>
                <div className="font-bold">{duration}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-ink-secondary mb-1">
                  {t('metadata.difficulty')}
                </div>
                <div className="font-bold uppercase">{difficulty}</div>
              </div>
            </div>
          </div>

          {/* Right: XP and Enroll */}
          <div className="border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-6 flex flex-row md:flex-col justify-between items-center md:items-stretch gap-4 md:gap-0">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-ink-secondary mb-1">
                {t('xpBounty')}
              </div>
              <div className="font-display font-bold text-[36px] leading-none">
                {xpBounty.toLocaleString()}{' '}
                <span className="text-[14px] align-middle">XP</span>
              </div>
            </div>
            <Button
              variant="landingPrimary"
              className="w-auto md:w-full rounded-none uppercase text-[10px] font-bold px-6 md:px-3 py-3 h-auto tracking-widest"
            >
              {enrolled ? t('buttons.continue') : t('buttons.enroll')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
