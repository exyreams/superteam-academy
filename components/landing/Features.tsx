'use client';

import { Cpu, Terminal } from "lucide-react";
import { useTranslations } from "next-intl";

export function Features() {
  const t = useTranslations("Features");

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 border-b border-ink-primary">
      <div className="p-16 border-r border-ink-primary flex flex-col gap-6">
        <Cpu size={32} />
        <h3 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[32px]">{t("proofs.title")}</h3>
        <p className="text-ink-secondary">
          {t("proofs.description")}
        </p>
      </div>
      <div className="p-16 flex flex-col gap-6">
        <Terminal size={32} />
        <h3 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[32px]">{t("compiler.title")}</h3>
        <p className="text-ink-secondary">
          {t("compiler.description")}
        </p>
      </div>
    </section>
  );
}
