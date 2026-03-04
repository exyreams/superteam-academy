/**
 * @fileoverview Secondary navigation bar (TopBar) for authenticated users.
 * Displays XP balance, level, and user menu.
 */
"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { MobileNav } from "@/components/layout/MobileNav";
import { UserMenu } from "@/components/layout/UserMenu";
import { Logo } from "@/components/shared/logo";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { calculateLevel, getXpBalance } from "@/lib/anchor/services";
import { useSession } from "@/lib/auth/client";

export function TopBar() {
	const wallet = useWallet();
	const { data: session, isPending } = useSession();

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
				<Link
					href="/"
					className="flex items-center gap-3 hover:opacity-80 transition-opacity"
				>
					<Logo className="w-5 h-5 text-ink-primary" />
					<span className="font-bold uppercase tracking-wider text-[11px] text-ink-primary">
						SUPERTEAM ACADEMY
					</span>
				</Link>
			</div>

			{/* Right: User */}
			<div className="flex gap-4 items-center">
				<div className="flex items-center gap-2 text-ink-primary">
					{wallet.publicKey && (
						<div className="hidden sm:flex flex-col items-end mr-2">
							<span className="text-[10px] font-bold uppercase tracking-widest text-[#0E9F6E] dark:text-[#14F195] leading-none">
								LVL {level}
							</span>
							<span className="text-xs text-ink-secondary leading-none mt-1">
								{xp.toLocaleString()} XP
							</span>
						</div>
					)}
					<div className="hidden sm:block h-6 w-px bg-ink-secondary/20 dark:bg-border mx-2" />
					{isPending ? (
						<div className="h-9 w-24 bg-ink-secondary/20 animate-pulse rounded-md" />
					) : session ? (
						<div className="flex items-center gap-3">
							<div className="hidden lg:flex items-center gap-2 mx-1 pr-2">
								<LanguageDropdown variant="detailed" />
								<ModeToggle />
							</div>
							<UserMenu session={session} />
						</div>
					) : (
						<Button
							asChild
							variant="outline"
							className="rounded-none uppercase text-xs font-bold px-4 py-2 h-auto gap-3 border-ink-secondary/20 hover:bg-ink-primary/5 text-ink-primary"
						>
							<Link href="/auth">Login / Sign up</Link>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
