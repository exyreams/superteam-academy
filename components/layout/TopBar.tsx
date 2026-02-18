'use client';

import { Logo } from '@/components/shared/logo';
import { ModeToggle } from '@/components/theme-toggle';
import { LanguageDropdown } from '@/components/LanguageDropdown';
import { WalletButton } from "@/components/shared/WalletButton";
import { Link } from "@/i18n/routing";

import { MobileNav } from '@/components/layout/MobileNav';

export function TopBar() {
  return (
    <header className="border-b border-ink-secondary/20 dark:border-border flex items-center justify-between px-6 bg-bg-struct h-12 sticky top-0 z-40">
      {/* Left: Logo and Brand */}
      <div className="flex gap-6 items-center">
        <MobileNav />
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Logo className="w-5 h-5 text-ink-primary" />
          <span className="font-bold uppercase tracking-wider text-[11px] text-ink-primary">
            SUPERTEAM ACADEMY
          </span>
        </Link>
      </div>

      {/* Right: Language, Theme Toggle and User */}
      <div className="flex gap-4 items-center">
        <LanguageDropdown />
        <ModeToggle />
        <div className="hidden lg:flex items-center gap-4">
          <div className="h-6 w-px bg-ink-secondary/20 dark:bg-border mx-2" />
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
