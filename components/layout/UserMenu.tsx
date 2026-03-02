/**
 * @fileoverview User account menu component.
 * Provides access to dashboard, theme settings, language selection, and logout.
 */
"use client";

import {
	GearIcon,
	GlobeIcon,
	PaletteIcon,
	SignOutIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { CustomAvatar } from "@/components/shared/CustomAvatar";
import { ModeToggle } from "@/components/theme-toggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth/client";

interface UserMenuProps {
	session: {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			avatarSeed?: string | null;
			[key: string]: unknown;
		};
	};
}

export function UserMenu({ session }: UserMenuProps) {
	const user = session.user;
	const avatarSeed =
		(user as { avatarSeed?: string | null }).avatarSeed || user.id;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="flex items-center gap-3 bg-ink-secondary/10 px-3 py-1.5 border border-ink-secondary/20 hover:bg-ink-secondary/20 transition-colors focus:outline-none">
					<div className="w-6 h-6 shrink-0 overflow-hidden relative border border-ink-primary/20">
						{user.image ? (
							<Image
								src={user.image}
								alt="Avatar"
								fill
								className="object-cover"
							/>
						) : (
							<CustomAvatar
								seed={avatarSeed}
								size={24}
								className="border-none"
							/>
						)}
					</div>
					<span className="text-xs font-bold leading-none">
						{user.name || "Operator"}
					</span>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuItem className="gap-2 cursor-pointer">
					<GearIcon size={16} weight="bold" />
					<span>Dashboard</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />

				<div className="px-2 py-1.5 flex flex-col gap-2">
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-2 text-xs font-medium text-ink-secondary">
							<PaletteIcon size={14} />
							<span>Theme</span>
						</div>
						<ModeToggle />
					</div>
					<div className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-2 text-xs font-medium text-ink-secondary">
							<GlobeIcon size={14} />
							<span>Lang</span>
						</div>
						<LanguageDropdown className="w-[80px]" />
					</div>
				</div>

				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="gap-2 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10"
					onClick={() =>
						signOut({
							fetchOptions: { onSuccess: () => window.location.reload() },
						})
					}
				>
					<SignOutIcon size={16} weight="bold" />
					<span>Sign Out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
