'use client';

import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";

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
    <section className="px-12 py-20 border-b border-ink-primary bg-bg-base relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-end mb-12"
      >
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
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track, i) => (
          <motion.div
            key={track.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card variant="landing" className="p-8 h-full">
              {/* Corner Accent */}
              <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-ink-primary" />

              <span className="text-[11px] text-ink-secondary uppercase tracking-widest mb-2 block">{t(`tracks.${track.key}.path`)}</span>
              <h3 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[32px] mb-3">{t(`tracks.${track.key}.title`)}</h3>
              <p className="text-ink-secondary text-sm mb-6 min-h-[40px] leading-relaxed">{t(`tracks.${track.key}.description`)}</p>

              <div className="h-[2px] bg-line-grid my-6 flex gap-1">
                {[0, 1, 2, 3].map((step) => (
                  <motion.div
                    key={step}
                    className={cn(
                      "flex-1 h-full",
                      step <= track.progress
                        ? "bg-ink-primary"
                        : "bg-ink-tertiary"
                    )}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 + step * 0.1 }}
                    style={{ transformOrigin: 'left' }}
                  />
                ))}
              </div>

              <span className="text-[11px] font-bold">{t(`tracks.${track.key}.meta`)}</span>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
