"use client";

import { Logo } from "@/components/shared/logo";
import { ModeToggle } from "@/components/theme-toggle";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import Image from "next/image";

import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { getXpBalance, calculateLevel } from "@/lib/anchor/services";
import { Link } from "@/i18n/routing";
import { useSession, signOut } from "@/lib/auth/client";
import { SignOut } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/MobileNav";

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

			{/* Right: Language, Theme Toggle and User */}
			<div className="flex gap-4 items-center">
				<LanguageDropdown />
				<ModeToggle />
				<div className="hidden lg:flex items-center gap-4">
					<div className="h-6 w-px bg-ink-secondary/20 dark:bg-border mx-2" />

					{wallet.publicKey && (
						<div className="flex flex-col items-end mr-2">
							<span className="text-[10px] font-bold uppercase tracking-widest text-[#0E9F6E] dark:text-[#14F195] leading-none">
								LVL {level}
							</span>
							<span className="text-xs text-ink-secondary leading-none mt-1">
								{xp.toLocaleString()} XP
							</span>
						</div>
					)}

					{isPending ? (
						<div className="h-9 w-24 bg-ink-secondary/20 animate-pulse rounded-md" />
					) : session ? (
						<div className="flex items-center gap-3 bg-ink-secondary/10 px-3 py-1.5 rounded-full border border-ink-secondary/20">
							<div className="w-6 h-6 rounded-full bg-blue-500 overflow-hidden relative">
								{session.user.image ? (
									<Image
										src={session.user.image}
										alt="Avatar"
										fill
										className="object-cover"
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center text-[10px] text-white font-bold uppercase bg-linear-to-br from-indigo-500 to-purple-600">
										{session.user.name?.[0] || "U"}
									</div>
								)}
							</div>
							<div className="flex flex-col">
								<span className="text-xs font-bold leading-none">
									{session.user.name || "User"}
								</span>
								{(session.user as unknown as { role: string }).role ===
									"admin" && (
									<span className="text-[9px] text-purple-500 font-bold uppercase tracking-wider mt-0.5">
										Admin
									</span>
								)}
							</div>
							<button
								onClick={() =>
									signOut({
										fetchOptions: { onSuccess: () => window.location.reload() },
									})
								}
								className="ml-2 text-ink-secondary hover:text-red-500 transition-colors"
							>
								<SignOut weight="bold" />
							</button>
						</div>
					) : (
						<Button
							asChild
							variant="outline"
							className="rounded-none uppercase text-xs font-bold px-4 py-2 h-auto gap-3 border-ink-secondary/20 hover:bg-ink-primary/5 text-ink-primary"
						>
							<Link href="/auth/login">Login / Sign up</Link>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
