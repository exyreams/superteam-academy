'use client';

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/shared/logo";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Navbar() {
  const t = useTranslations("Navbar");

  return (
    <nav className="h-16 border-b border-ink-primary flex items-center justify-between px-12 bg-bg-base sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Logo className="h-6 w-auto text-ink-primary" />
        <span className="font-bold uppercase tracking-widest text-[13px]">
          {t("brand")}
        </span>
      </div>
      <div className="flex gap-8">
        {[
          { label: t("links.catalog"), href: "/courses" },
          { label: t("links.leaderboard"), href: "/leaderboard" },
          { label: t("links.rewards"), href: "/rewards" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-ink-primary text-[11px] font-bold uppercase tracking-widest hover:opacity-60 transition-opacity"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex gap-4">
        <Button
          asChild
          variant="landingSecondary"
          className="rounded-none uppercase text-xs font-bold px-4 py-2 h-auto gap-3"
        >
          <Link href="/dashboard">{t("cta.dashboard")}</Link>
        </Button>
        <Button
          asChild
          variant="landingPrimary"
          className="rounded-none uppercase text-xs font-bold px-4 py-2 h-auto gap-3"
        >
          <Link href="/courses">{t("cta.start")}</Link>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
}
