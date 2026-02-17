'use client';

import { Logo } from '@/components/shared/logo';
import { ModeToggle } from '@/components/theme-toggle';
import { LanguageDropdown } from '@/components/LanguageDropdown';

interface TopBarProps {
  walletAddress?: string;
}

export function TopBar({ walletAddress = '0xKD...92A' }: TopBarProps) {
  return (
    <header className="border-b border-ink-secondary flex items-center justify-between px-6 bg-bg-base h-12">
      {/* Left: Logo and Brand */}
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-3">
          <Logo className="w-5 h-5" />
          <span className="font-bold uppercase tracking-wider text-[11px]">
            SUPERTEAM ACADEMY
          </span>
        </div>
      </div>

      {/* Right: Language, Theme Toggle and User */}
      <div className="flex gap-6 items-center">
        <LanguageDropdown />
        <ModeToggle />
        <div className="text-[11px]">
          USER: {walletAddress}
        </div>
      </div>
    </header>
  );
}
