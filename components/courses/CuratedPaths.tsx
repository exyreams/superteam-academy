'use client';

import { useTranslations } from 'next-intl';
import { LearningPath } from '@/lib/data/courses';
import { Layers, Cpu } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

interface CuratedPathsProps {
  paths: LearningPath[];
}

export function CuratedPaths({ paths }: CuratedPathsProps) {
  const t = useTranslations('Courses');

  const getIcon = (iconName: string) => {
    const icons: Record<string, typeof Layers> = {
      Layers,
      Cpu,
    };
    return icons[iconName] || Layers;
  };

  return (
    <div className="mb-16">
      <div className="flex justify-between items-end mb-6">
        <h3 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[32px]">
          {t('curatedPaths.title')}
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-ink-secondary">
          {t('curatedPaths.subtitle')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paths.map((path) => {
          const Icon = getIcon(path.icon);
          return (
            <Link
              key={path.id}
              href={`/courses/paths/${path.slug}`}
              className="border border-ink-secondary bg-bg-base hover:border-ink-primary hover:shadow-[4px_4px_0_rgba(13,20,18,0.1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all relative group"
            >
              {/* Corner accents */}
              <div className="absolute -top-px -left-px w-2 h-2 border-t-2 border-l-2 border-ink-primary" />
              <div className="absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 border-ink-primary" />

              <div className="grid grid-cols-[1.2fr_1fr] min-h-[200px]">
                {/* Visual */}
                <div className="bg-[rgba(92,110,106,0.05)] border-r border-ink-secondary relative flex items-center justify-center bg-[linear-gradient(45deg,var(--ink-secondary)_1px,transparent_1px)] bg-size-[10px_10px]">
                  <Icon size={48} className="text-ink-primary" />
                  <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-ink-secondary">
                    REF: {path.ref}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-ink-secondary mb-1">
                      {t(`curatedPaths.tracks.${path.track}`)}
                    </div>
                    <h4 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[28px] mb-2">
                      {path.title}
                    </h4>
                    <p className="text-ink-secondary text-[11px] leading-relaxed">
                      {path.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 border border-ink-secondary">
                        {path.modules} {t('curatedPaths.modules')}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 border border-ink-secondary">
                        {path.duration}
                      </span>
                    </div>

                    {path.progress > 0 ? (
                      <>
                        <div className="h-1 bg-[rgba(13,20,18,0.1)] w-full relative mb-2">
                          <div
                            className="h-full bg-ink-primary relative"
                            style={{ width: `${path.progress}%` }}
                          >
                            <div className="absolute right-0 -top-px h-[6px] w-px bg-ink-primary" />
                          </div>
                        </div>
                        <div className="text-[10px] text-right uppercase tracking-widest">
                          {path.progress}% {t('curatedPaths.complete')}
                        </div>
                      </>
                    ) : (
                      <Button
                        variant="landingSecondary"
                        className="w-full rounded-none uppercase text-[10px] font-bold px-3 py-2 h-auto tracking-widest"
                      >
                        {t('curatedPaths.startPath')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
