/**
 * @fileoverview CourseCard component for the course catalog and dashboard.
 * Displays a summary of a course, including its thumbnail, title, difficulty,
 * and real-time on-chain progress.
 */

"use client";

import {
	CoinsIcon,
	DesktopIcon,
	FileCodeIcon,
	LockIcon,
	PackageIcon,
	ShieldCheckIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Course } from "@/lib/data/courses";
import { useCourseProgress } from "@/lib/hooks/use-course";

/**
 * Props for the CourseCard component.
 */
interface CourseCardProps {
	course: Course;
}

/**
 * Renders a clickable card representing a single course.
 */
export function CourseCard({ course }: CourseCardProps) {
	const t = useTranslations("Courses");

	// Fetch actual on-chain progress if not explicitly provided
	const { data: dynamicProgress } = useCourseProgress(
		course.slug,
		course.totalLessons,
	);
	const displayedProgress =
		course.progress !== undefined ? course.progress : dynamicProgress || 0;

	const getCategoryLabel = (category: string) => {
		const labels: Record<string, string> = {
			rust: "RUST",
			core: "CORE",
			spl: "SPL",
			security: "SEC",
			web3: "WEB3",
			defi: "DEFI",
			other: "XXX",
		};
		return labels[category] || "XXX";
	};

	const renderCategoryIcon = (
		category: string | undefined,
		locked: boolean | undefined,
	) => {
		const className = `absolute ${locked ? "text-ink-secondary" : "text-ink-primary"}`;
		const size = 32;

		switch (category) {
			case "rust":
				return <FileCodeIcon size={size} className={className} />;
			case "core":
				return <PackageIcon size={size} className={className} />;
			case "spl":
				return <CoinsIcon size={size} className={className} />;
			case "security":
				return <ShieldCheckIcon size={size} className={className} />;
			case "web3":
				return <DesktopIcon size={size} className={className} />;
			default:
				// Use default icon if no category or unknown category is provided
				return <DesktopIcon size={size} className={className} />;
		}
	};

	const getDifficultyLabel = (diff: string | number) => {
		if (diff === 1 || diff === "1") return t("difficulty.beginner");
		if (diff === 2 || diff === "2") return t("difficulty.intermediate");
		if (diff === 3 || diff === "3") return t("difficulty.advanced");
		return t(`difficulty.${diff}`) || diff;
	};

	return (
		<Link
			href={course.isLocked ? "#" : `/courses/${course.slug}`}
			className={`border border-border bg-bg-surface relative flex flex-col transition-all ${
				course.isLocked
					? "opacity-70 cursor-not-allowed"
					: "hover:border-ink-primary hover:shadow-[4px_4px_0_var(--color-border)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
			}`}
		>
			{/* Corner accents */}
			<div className="absolute -top-px -left-px w-2 h-2 border-t-2 border-l-2 border-ink-primary" />
			<div className="absolute -bottom-px -right-px w-2 h-2 border-b-2 border-r-2 border-ink-primary" />

			{/* Thumbnail */}
			<div className="h-[140px] border-b border-border bg-ink-secondary/5 relative overflow-hidden flex items-center justify-center">
				{course.imageUrl ? (
					<Image
						src={course.imageUrl}
						alt={course.title}
						width={400}
						height={140}
						className="w-full h-full object-cover opacity-80"
					/>
				) : (
					<>
						<div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--color-line-grid)_10px,var(--color-line-grid)_20px)]" />
						{renderCategoryIcon(course.category, course.isLocked)}
						<div className="absolute top-2 right-2 text-[10px] uppercase tracking-widest px-2 py-1 border border-border bg-bg-surface">
							{getCategoryLabel(course.category || "other")}
						</div>
					</>
				)}
			</div>

			{/* Content */}
			<div className="p-4 flex-1 flex flex-col">
				<div className="flex-1">
					<h4 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[28px] mb-1">
						{course.title}
					</h4>
					<p className="text-ink-secondary text-[11px] leading-relaxed">
						{course.description}
					</p>
				</div>

				<div className="mt-4">
					<div className="flex justify-between mb-2">
						<span className="text-[10px] uppercase tracking-widest px-2 py-1 border border-border">
							{getDifficultyLabel(course.difficulty)}
						</span>
						<span className="text-[10px] uppercase tracking-widest">
							{course.isLocked ? (
								<>
									<LockIcon size={10} className="inline mr-1" />
									{t("locked")}
								</>
							) : (
								course.duration
							)}
						</span>
					</div>

					{!course.isLocked && (
						<div className="h-1 bg-ink-secondary/10 w-full relative overflow-hidden">
							<div
								className="h-full bg-ink-primary relative transition-all"
								style={{ width: `${displayedProgress}%` }}
							>
								{displayedProgress > 0 && (
									<div className="absolute right-0 -top-px h-[6px] w-px bg-ink-primary" />
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</Link>
	);
}
