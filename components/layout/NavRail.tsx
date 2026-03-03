/**
 * @fileoverview Left-side navigation rail for desktop view.
 * Provides a vertical set of icon-based links for quick access to core sections.
 */
"use client";

import {
	BookIcon,
	ChalkboardTeacherIcon,
	GearIcon,
	ShieldCheckIcon,
	SignInIcon,
	SquaresFourIcon,
	TrophyIcon,
	UserIcon,
	UserPlusIcon,
	UsersIcon,
} from "@phosphor-icons/react";
import { Link, usePathname } from "@/i18n/routing";
import { useSession } from "@/lib/auth/client";
import { cn } from "@/lib/utils";

export function NavRail() {
	const pathname = usePathname();
	const { data: session, isPending } = useSession();

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

	return (
		<aside className="border-r border-ink-secondary/20 dark:border-border hidden lg:flex flex-col items-center pt-6 bg-bg-struct gap-5 sticky top-12 h-[calc(100vh-48px)]">
			{/* Navigation Items */}
			<div className="flex flex-col gap-5">
				{navItems.map((item) => {
					const Icon = item.icon;
					return (
						<Link
							key={item.label}
							href={item.href}
							className={cn(
								"w-8 h-8 flex items-center justify-center relative transition-all border border-transparent hover:bg-ink-primary/5",
								item.active && "border-ink-secondary/20 bg-ink-primary/5",
							)}
							title={item.label}
						>
							<Icon
								size={18}
								className="text-ink-primary"
								weight={item.active ? "duotone" : "regular"}
							/>
						</Link>
					);
				})}
			</div>

			{/* Authenticated Links (Profile, Creator, Admin) */}
			{isPending ? (
				<div className="flex flex-col gap-5 mt-auto mb-2">
					<div className="w-8 h-8 bg-ink-primary/5 animate-pulse border border-ink-secondary/10" />
					<div className="w-8 h-8 bg-ink-primary/5 animate-pulse border border-ink-secondary/10" />
					<div className="w-8 h-8 bg-ink-primary/5 animate-pulse border border-ink-secondary/10" />
				</div>
			) : session ? (
				<>
					<Link
						href="/profile"
						className={cn(
							"w-8 h-8 flex items-center justify-center relative transition-all border border-transparent hover:bg-ink-primary/5 mt-auto",
							pathname?.includes("/profile") &&
								"border-ink-secondary/20 bg-ink-primary/5",
						)}
						title="Profile"
					>
						<UserIcon
							size={18}
							className="text-ink-primary"
							weight={pathname?.includes("/profile") ? "duotone" : "regular"}
						/>
					</Link>

					<Link
						href="/creator"
						className={cn(
							"w-8 h-8 flex items-center justify-center relative transition-all border border-transparent hover:bg-ink-primary/5 mb-2",
							pathname === "/creator" &&
								"border-ink-secondary/20 bg-ink-primary/5",
						)}
						title="Creator Studio"
					>
						<ChalkboardTeacherIcon
							size={18}
							className="text-ink-primary"
							weight={pathname === "/creator" ? "duotone" : "regular"}
						/>
					</Link>

					{/* Admin Dashboard (Admins Only) */}
					{(session.user as { role?: string }).role === "admin" && (
						<Link
							href="/admin"
							className={cn(
								"w-8 h-8 flex items-center justify-center relative transition-all border border-transparent hover:bg-ink-primary/5 mb-2",
								pathname === "/admin" &&
									"border-ink-secondary/20 bg-ink-primary/5",
							)}
							title="Admin Dashboard"
						>
							<ShieldCheckIcon
								size={18}
								className="text-ink-primary"
								weight={pathname === "/admin" ? "duotone" : "regular"}
							/>
						</Link>
					)}
				</>
			) : (
				/* Unauthenticated Links (Login, Signup) */
				<>
					<Link
						href="/login"
						className={cn(
							"w-8 h-8 flex items-center justify-center relative transition-all border border-transparent hover:bg-ink-primary/5 mt-auto mb-2",
							pathname === "/login" &&
								"border-ink-secondary/20 bg-ink-primary/5",
						)}
						title="Login"
					>
						<SignInIcon
							size={18}
							className="text-ink-primary"
							weight={pathname === "/login" ? "duotone" : "regular"}
						/>
					</Link>

					<Link
						href="/signup"
						className={cn(
							"w-8 h-8 flex items-center justify-center relative transition-all border border-transparent hover:bg-ink-primary/5 mb-2",
							pathname === "/signup" &&
								"border-ink-secondary/20 bg-ink-primary/5",
						)}
						title="Initialize Operator"
					>
						<UserPlusIcon
							size={18}
							className="text-ink-primary"
							weight={pathname === "/signup" ? "duotone" : "regular"}
						/>
					</Link>
				</>
			)}

			{/* Settings at bottom (always visible) */}
			<Link
				href="/settings"
				className={cn(
					"w-8 h-8 flex items-center justify-center relative transition-all border border-transparent hover:bg-ink-primary/5 mb-6",
					pathname === "/settings" &&
						"border-ink-secondary/20 bg-ink-primary/5",
				)}
				title="Settings"
			>
				<GearIcon
					size={18}
					className="text-ink-primary"
					weight={pathname === "/settings" ? "duotone" : "regular"}
				/>
			</Link>
		</aside>
	);
}
