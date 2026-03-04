/**
 * @fileoverview Component for showcasing user achievements and badges.
 */
"use client";

import * as Icons from "@phosphor-icons/react";
import { Achievement } from "@/lib/data/achievements";

/** Array of achievements/certificates earned by the user. */
/** Maximum number of display slots (default: 8). */
interface BadgeShowcaseProps {
	achievements: Achievement[];
	maxSlots?: number;
}

/**
 * BadgeShowcase Component
 * Displays a grid of user achievements with Phosphor icons.
 * Unlocked items show duotone icons and corner accents.
 */
export function BadgeShowcase({
	achievements,
	maxSlots = 8,
}: BadgeShowcaseProps) {
	const slots = Array.from(
		{ length: maxSlots },
		(_, i) => achievements[i] || null,
	);

	return (
		<div className="border border-border p-6 bg-bg-surface h-full relative overflow-hidden group">
			{/* Subtle background pattern */}
			<div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,var(--ink-primary)_1px,transparent_1px)] bg-size-[20px_20px]"></div>

			<span className="text-[10px] uppercase tracking-widest font-bold block mb-6 relative z-10">
				ACHIEVEMENTS {"//"} SHOWCASE
			</span>

			<div className="grid grid-cols-4 gap-4 relative z-10">
				{slots.map((achievement, index) => {
					// Map icon names to Phosphor components if possible, or fallback to default
					const iconKey =
						achievement?.icon
							.replace("bi-", "")
							.split("-")
							.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
							.join("") || "";
					const IconsMap = Icons as unknown as Record<
						string,
						React.ElementType
					>;
					const IconComponent =
						IconsMap[iconKey + "Logo"] || IconsMap[iconKey] || Icons.SealCheck;

					return (
						<div
							key={index}
							className={`aspect-square border flex items-center justify-center transition-all duration-300 relative group/item
								${
									achievement
										? "border-ink-primary bg-ink-primary/5 hover:bg-ink-primary hover:text-bg-base cursor-help"
										: "border-ink-secondary/20 bg-transparent opacity-40"
								}
							`}
							title={
								achievement
									? `${achievement.name}: ${achievement.description}`
									: "Locked Achievement"
							}
						>
							{achievement ? (
								<IconComponent
									size={24}
									weight="duotone"
									className="transition-transform group-hover/item:scale-110"
								/>
							) : (
								<Icons.Lock
									size={16}
									weight="light"
									className="text-ink-secondary"
								/>
							)}

							{/* Corner accent for unlocked items */}
							{achievement && (
								<div className="absolute top-0 right-0 w-2 h-2 bg-ink-primary"></div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
