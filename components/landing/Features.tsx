'use client';

import { motion } from 'framer-motion';
import { ShieldCheckIcon,TerminalWindowIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

// Features Section
// Displays key technological advantages in a responsive grid.
// Each feature includes a localized title, description, and an icon.
export function Features() {
  const t = useTranslations("Features");

  // Configuration for features - mapping icons to translation keys
  const features = [
    { icon: ShieldCheckIcon, key: 'proofs' },
    { icon: TerminalWindowIcon, key: 'compiler' },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 border-b border-ink-secondary/20 dark:border-border">
      {features.map((feature, i) => (
        <motion.div
          key={feature.key}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          // Right border logic: only apply border to the first item (left side) on desktop
          className={`p-8 md:p-16 flex flex-col gap-6 group ${i === 0 ? 'border-b md:border-b-0 md:border-r border-ink-secondary/20 dark:border-border' : ''}`}
        >
          {/* Feature Icon - Phosphor Icons Library */}
          <div>
            <feature.icon size={32} className="group-hover:text-ink-primary transition-colors" />
          </div>

          {/* Localized Content */}
          <h3 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[32px]">{t(`${feature.key}.title`)}</h3>
          <p className="text-ink-secondary">
            {t(`${feature.key}.description`)}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
