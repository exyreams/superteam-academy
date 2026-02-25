'use client';

import { Logo } from '@/components/shared/logo';
import { ModeToggle } from '@/components/theme-toggle';
import { LanguageDropdown } from '@/components/LanguageDropdown';
import { WalletButton } from "@/components/shared/WalletButton";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { getXpBalance, calculateLevel } from "@/lib/anchor/services";
import { Link } from "@/i18n/routing";

import { MobileNav } from '@/components/layout/MobileNav';

export function TopBar() {
  const wallet = useWallet();
  const [xp, setXp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);

  useEffect(() => {
    let mounted = true;

    if (wallet.publicKey) {
      getXpBalance(wallet.publicKey).then((balance) => {
        if (mounted) {
          setXp(balance);
          setLevel(calculateLevel(balance));
        }
      });
    } else {
      setTimeout(() => {
        if (mounted) {
           setXp(0);
           setLevel(1);
        }
      }, 0);
    }
    
    return () => {
      mounted = false;
    };
  }, [wallet.publicKey]);

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
          {wallet.publicKey && (
             <div className="flex flex-col items-end mr-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0E9F6E] dark:text-[#14F195] leading-none">LVL {level}</span>
                <span className="text-xs text-ink-secondary leading-none mt-1">{xp.toLocaleString()} XP</span>
             </div>
          )}
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
