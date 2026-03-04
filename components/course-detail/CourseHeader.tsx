/**
 * @fileoverview CourseHeader component for the course detail page.
 * Displays course title, instructor information, metadata, and enrollment actions.
 */

"use client";

import {
	ChartBarIcon,
	ClockIcon,
	StarIcon,
	TrophyIcon,
} from "@phosphor-icons/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { useClaimCredential, useEnroll } from "@/lib/hooks/use-course";

/** Course information and enrollment state for the header section. */
interface CourseHeaderProps {
	courseSlug: string;
	title: string;
	courseRef: string;
	category: string;
	description: string;
	instructor: {
		name: string;
		username: string;
	};
	duration: string;
	difficulty: string;
	xpBounty: number;
	enrolled: boolean;
	progress: number;
	credentialAsset?: string | null;
	nextLessonId?: string;
}

/**
 * Renders the header section of the course detail page.
 */
export function CourseHeader({
	courseSlug,
	title,
	courseRef,
	category,
	description,
	instructor,
	duration,
	difficulty,
	xpBounty,
	enrolled,
	progress,
	credentialAsset,
	nextLessonId,
}: CourseHeaderProps) {
	const t = useTranslations("CourseDetail");
	const wallet = useWallet();
	const router = useRouter();
	const enrollMutation = useEnroll(courseSlug);
	const claimMutation = useClaimCredential(courseSlug);

	const handleEnroll = async () => {
		if (!wallet.connected || !wallet.publicKey) {
			toast.error("Please connect your wallet first");
			return;
		}
		enrollMutation.mutate();
	};

	return (
		<div className="mb-10">
			{/* Breadcrumbs / Meta */}
			<div className="flex items-center gap-2 mb-4">
				<span className="text-[10px] tracking-widest text-ink-secondary uppercase">
					{category}
				</span>
				<span className="w-1 h-1 rounded-full bg-ink-secondary/30" />
				<span className="text-[10px] tracking-widest text-ink-secondary uppercase">
					{courseRef}
				</span>
			</div>

			<h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tighter uppercase leading-[0.9]">
				{title}
			</h1>

			<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
				<div className="flex flex-wrap items-center gap-6">
					{/* Instructor */}
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-ink-primary flex items-center justify-center">
							<span className="text-bg-base font-bold text-xs">
								{instructor.username.slice(1, 3).toUpperCase()}
							</span>
						</div>
						<div>
							<div className="text-[10px] uppercase tracking-widest text-ink-secondary leading-none mb-1">
								{t("header.instructor")}
							</div>
							<div className="text-sm font-bold uppercase">
								{instructor.name}
							</div>
						</div>
					</div>

					{/* Stats */}
					<div className="flex items-center gap-6 border-l border-ink-secondary/10 pl-6 h-10">
						<div className="flex items-center gap-2">
							<ClockIcon size={16} className="text-ink-secondary" />
							<span className="text-xs font-bold uppercase">{duration}</span>
						</div>
						<div className="flex items-center gap-2">
							<ChartBarIcon size={16} className="text-ink-secondary" />
							<span className="text-xs font-bold uppercase tracking-wide">
								{difficulty}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<TrophyIcon size={16} className="text-ink-primary font-bold" />
							<span className="text-xs font-black uppercase tracking-tight">
								{xpBounty} XP
							</span>
						</div>
					</div>
				</div>

				{/* Action Button */}
				<div className="flex items-center gap-2">
					{enrolled ? (
						<>
							{progress === 100 && !credentialAsset ? (
								<Button
									className="bg-green-600 text-white hover:bg-green-700 font-bold uppercase tracking-widest h-12 px-8 flex items-center gap-2"
									onClick={() => claimMutation.mutate()}
									disabled={claimMutation.isPending}
								>
									{claimMutation.isPending ? (
										"Issuing..."
									) : (
										<>
											CLAIM CERTIFICATE <TrophyIcon size={18} weight="bold" />
										</>
									)}
								</Button>
							) : (
								<Button
									className="bg-ink-primary text-bg-base hover:bg-ink-primary/90 font-bold uppercase tracking-widest h-12 px-8"
									onClick={() => {
										if (credentialAsset) {
											router.push("/profile");
										} else if (nextLessonId) {
											router.push(
												`/courses/${courseSlug}/lessons/${nextLessonId}`,
											);
										} else {
											router.push(`/courses/${courseSlug}/lessons`);
										}
									}}
								>
									{credentialAsset ? "VIEW CREDENTIAL" : t("buttons.continue")}
								</Button>
							)}
						</>
					) : (
						<Button
							className="bg-ink-primary text-bg-base hover:bg-ink-primary/90 font-bold uppercase tracking-widest h-12 px-8"
							onClick={handleEnroll}
							disabled={enrollMutation.isPending}
						>
							{enrollMutation.isPending
								? t("buttons.enrolling")
								: t("buttons.enroll")}
						</Button>
					)}
					<Button
						variant="outline"
						size="icon"
						className="h-12 w-12 border-ink-secondary/20 hover:bg-ink-secondary/5"
					>
						<StarIcon size={20} />
					</Button>
				</div>
			</div>

			<p className="text-ink-secondary text-sm max-w-2xl leading-relaxed uppercase tracking-tight font-medium opacity-80">
				{description}
			</p>
		</div>
	);
}
