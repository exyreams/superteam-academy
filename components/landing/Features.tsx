'use client';

import { motion } from 'framer-motion';
import { Cpu, Terminal } from "lucide-react";
import { useTranslations } from "next-intl";

export function Features() {
  const t = useTranslations("Features");

  const features = [
    { icon: Cpu, key: 'proofs' },
    { icon: Terminal, key: 'compiler' },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 border-b border-ink-primary">
      {features.map((feature, i) => (
        <motion.div
          key={feature.key}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          className={`p-16 flex flex-col gap-6 group ${i === 0 ? 'border-r border-ink-primary' : ''}`}
        >
          <div>
            <feature.icon size={32} className="group-hover:text-ink-primary transition-colors" />
          </div>
          <h3 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[32px]">{t(`${feature.key}.title`)}</h3>
          <p className="text-ink-secondary">
            {t(`${feature.key}.description`)}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
