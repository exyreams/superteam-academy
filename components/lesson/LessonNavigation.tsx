'use client';

import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { CaretLeftIcon, CaretRightIcon, CheckCircleIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'sonner';

interface LessonNavigationProps {
  courseSlug: string;
  prevLessonId?: string;
  nextLessonId?: string;
  nextLessonType?: 'content' | 'challenge';
}

export function LessonNavigation({ courseSlug, prevLessonId, nextLessonId, nextLessonType = 'content' }: LessonNavigationProps) {
  const t = useTranslations('Lesson');
  const router = useRouter();
  const wallet = useWallet();
  const [isCompleting, setIsCompleting] = useState(false);

  const handleCompleteAndNext = async () => {
    if (!wallet.publicKey) {
      toast.error("Please connect your wallet to save progress.");
      return;
    }
    
    setIsCompleting(true);
    try {
      const res = await fetch('/api/lesson/complete', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
             courseSlug: courseSlug,
             learnerAddress: wallet.publicKey.toBase58(),
             // Note: using hardcoded 0 index temporarily until module layout fully passes lessonIndex
             lessonIndex: 0 
         })
      });
      
      if (!res.ok) {
         const errorData = await res.json();
         throw new Error(errorData.error || "Failed to mark complete");
      }
      
      toast.success("Lesson Complete! Progress saved on-chain");
      
      if (nextLessonId) {
         router.push(`/courses/${courseSlug}/lessons/${nextLessonId}`);
      }
    } catch (error) {
        console.error(error);
        toast.error(`Error saving progress: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
        setIsCompleting(false);
    }
  };

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
          <Button
            variant="landingPrimary"
            className="rounded-none uppercase text-[10px] font-bold px-4 py-2 h-auto tracking-widest flex items-center gap-2"
            onClick={handleCompleteAndNext}
            disabled={isCompleting}
          >
            {isCompleting ? (
                "Saving Progress..."
            ) : nextLessonType === 'challenge' ? (
                <>START CHALLENGE <CaretRightIcon size={12} weight="bold" /></>
            ) : (
                <>Complete & {t('nextLesson')} <CheckCircleIcon size={12} weight="bold" /></>
            )}
          </Button>
      ) : (
        <Button
          variant="landingPrimary"
          onClick={handleCompleteAndNext}
          disabled={isCompleting}
          className="rounded-none uppercase text-[10px] font-bold px-4 py-2 h-auto tracking-widest flex items-center gap-2"
        >
          {isCompleting ? "Saving Progress..." : (<>Mark Course Complete <CheckCircleIcon size={12} weight="bold" /></>)}
        </Button>
      )}
    </div>
  );
}
