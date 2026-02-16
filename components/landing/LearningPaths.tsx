'use client';

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function LearningPaths() {
  const t = useTranslations("LearningPaths");

  const tracks = [
    {
      key: "beginner",
      progress: 1, // 1 active out of 4
    },
    {
      key: "intermediate",
      progress: 2, // 2 active out of 4
    },
    {
      key: "advanced",
      progress: 3, // 3 active out of 4
    },
  ];

  return (
    <section className="px-12 py-20 border-b border-ink-primary">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-ink-secondary block mb-2">
            {t("subtitle")}
          </span>
          <h2 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[48px]">{t("title")}</h2>
        </div>
        <Link
          href="/courses"
          className="text-ink-primary text-[11px] font-bold uppercase tracking-widest hover:opacity-60 transition-opacity"
        >
          {t("viewAll")}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track, i) => (
          <div
            key={i}
            className="border border-ink-secondary p-8 relative bg-[rgba(255,255,255,0.2)]"
          >
            {/* Corner Accent */}
            <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-ink-primary" />

            <div className="text-[11px] text-ink-secondary uppercase tracking-widest mb-2">{t(`tracks.${track.key}.path`)}</div>
            <h3 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[32px] mb-3">{t(`tracks.${track.key}.title`)}</h3>
            <p className="text-ink-secondary text-sm mb-6 min-h-[40px]">{t(`tracks.${track.key}.description`)}</p>

            <div className="h-[2px] bg-line-grid my-6 flex gap-1">
              {[0, 1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={cn(
                    "flex-1 h-full",
                    step <= track.progress
                      ? "bg-ink-primary"
                      : "bg-ink-tertiary"
                  )}
                />
              ))}
            </div>

            <span className="text-[11px] font-bold">{t(`tracks.${track.key}.meta`)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
