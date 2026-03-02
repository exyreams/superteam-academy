/**
 * @fileoverview Mobile navigation sheet component.
 * Provides a slide-out menu with links for small screens.
 */
"use client";

import {
	BookIcon,
	ChalkboardTeacherIcon,
	GearIcon,
	ListIcon,
	ShieldCheckIcon,
	SquaresFourIcon,
	TrophyIcon,
	UserIcon,
	UsersIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Logo } from "@/components/shared/logo";
import { WalletButton } from "@/components/shared/WalletButton";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function MobileNav() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	const navItems = [
		{
			icon: SquaresFourIcon,
			label: "Dashboard",
			href: "/dashboard",
			active: pathname === "/dashboard",
		},
		{
			icon: BookIcon,
			label: "Courses",
			href: "/courses",
			active: pathname?.includes("/courses"),
		},
		{
			icon: TrophyIcon,
			label: "Leaderboard",
			href: "/leaderboard",
			active: pathname === "/leaderboard",
		},
		{
			icon: UsersIcon,
			label: "Community",
			href: "/community",
			active: pathname === "/community",
		},
	];

	const bottomItems = [
		{
			icon: UserIcon,
			label: "Profile",
			href: "/profile",
			active: pathname?.includes("/profile"),
		},
		{
			icon: ChalkboardTeacherIcon,
			label: "Creator",
			href: "/creator",
			active: pathname === "/creator",
		},
		{
			icon: ShieldCheckIcon,
			label: "Admin",
			href: "/admin",
			active: pathname === "/admin",
		},
		{
			icon: GearIcon,
			label: "Settings",
			href: "/settings",
			active: pathname === "/settings",
		},
	];

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="lg:hidden text-ink-primary -ml-2 mr-2"
				>
					<ListIcon size={24} />
					<span className="sr-only">Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side="left"
				className="bg-bg-surface border-r border-ink-secondary/20 dark:border-border w-[300px] p-0 flex flex-col"
			>
				<SheetHeader className="p-6 border-b border-ink-secondary/20 dark:border-border">
					<SheetTitle className="sr-only">Navigation Menu</SheetTitle>
					<SheetDescription className="sr-only">
						Mobile navigation for the application
					</SheetDescription>
					<div className="flex items-center gap-3">
						<Logo className="h-5 w-auto text-ink-primary" />
						<span className="font-bold uppercase tracking-widest text-[11px] text-ink-primary">
							SUPERTEAM ACADEMY
						</span>
					</div>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
					<div className="flex flex-col gap-1">
						<span className="text-[10px] uppercase tracking-widest text-ink-secondary px-4 mb-2">
							Menu
						</span>
						{navItems.map((item) => {
							const Icon = item.icon;
							return (
								<Link
									key={item.label}
									href={item.href}
									onClick={() => setOpen(false)}
									className={cn(
										"flex items-center gap-3 px-4 py-2 rounded-none border border-transparent transition-colors hover:bg-ink-primary/5 hover:border-ink-primary/20",
										item.active &&
											"bg-ink-primary/5 border-ink-primary text-ink-primary",
									)}
								>
									<Icon
										size={18}
										weight={item.active ? "fill" : "regular"}
										className={cn(
											item.active ? "text-ink-primary" : "text-ink-primary/70",
										)}
									/>
									<span
										className={cn(
											"font-bold uppercase tracking-widest text-xs",
											item.active ? "text-ink-primary" : "text-ink-primary/70",
										)}
									>
										{item.label}
									</span>
								</Link>
							);
						})}
					</div>

					<div className="mt-auto flex flex-col gap-1 pt-4 border-t border-ink-secondary/10">
						<div className="px-4 mb-2">
							<WalletButton />
						</div>
						<span className="text-[10px] uppercase tracking-widest text-ink-secondary px-4 mb-1">
							Account
						</span>
						{bottomItems.map((item) => {
							const Icon = item.icon;
							return (
								<Link
									key={item.label}
									href={item.href}
									onClick={() => setOpen(false)}
									className={cn(
										"flex items-center gap-3 px-4 py-2 rounded-none border border-transparent transition-colors hover:bg-ink-primary/5 hover:border-ink-primary/20",
										item.active &&
											"bg-ink-primary/5 border-ink-primary text-ink-primary",
									)}
								>
									<Icon
										size={18}
										weight={item.active ? "fill" : "regular"}
										className={cn(
											item.active ? "text-ink-primary" : "text-ink-primary/70",
										)}
									/>
									<span
										className={cn(
											"font-bold uppercase tracking-widest text-xs",
											item.active ? "text-ink-primary" : "text-ink-primary/70",
										)}
									>
										{item.label}
									</span>
								</Link>
							);
						})}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
