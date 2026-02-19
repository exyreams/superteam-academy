'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

interface LessonNavigationProps {
  courseSlug: string;
  prevLessonId?: string;
  nextLessonId?: string;
  nextLessonType?: 'content' | 'challenge';
}

export function LessonNavigation({ courseSlug, prevLessonId, nextLessonId, nextLessonType = 'content' }: LessonNavigationProps) {
  const t = useTranslations('Lesson');

  return (
    <div className="mt-12 flex gap-4">
      {prevLessonId ? (
        <Link href={`/courses/${courseSlug}/lessons/${prevLessonId}`}>
          <Button
            variant="outline"
            className="rounded-none uppercase text-[10px] font-bold px-4 py-2 h-auto tracking-widest flex items-center gap-2"
          >
            <CaretLeftIcon size={12} weight="bold" /> {t('previous')}
          </Button>
        </Link>
      ) : (
        <Button
          variant="outline"
          disabled
          className="rounded-none uppercase text-[10px] font-bold px-4 py-2 h-auto tracking-widest flex items-center gap-2 opacity-50 cursor-not-allowed"
        >
          <CaretLeftIcon size={12} weight="bold" /> {t('previous')}
        </Button>
      )}

      {nextLessonId ? (
        <Link href={`/courses/${courseSlug}/lessons/${nextLessonId}`}>
          <Button
            variant="landingPrimary"
            className="rounded-none uppercase text-[10px] font-bold px-4 py-2 h-auto tracking-widest flex items-center gap-2"
          >
            {nextLessonType === 'challenge' ? 'START CHALLENGE' : t('nextLesson')} <CaretRightIcon size={12} weight="bold" />
          </Button>
        </Link>
      ) : (
        <Button
          variant="landingPrimary"
          disabled
          className="rounded-none uppercase text-[10px] font-bold px-4 py-2 h-auto tracking-widest flex items-center gap-2 opacity-50 cursor-not-allowed"
        >
          {t('nextLesson')} <CaretRightIcon size={12} weight="bold" />
        </Button>
      )}
    </div>
  );
}
