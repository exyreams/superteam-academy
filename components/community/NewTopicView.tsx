"use client";

import {
	ArrowLeftIcon,
	CodeIcon,
	PaperPlaneRightIcon,
	WarningIcon,
} from "@phosphor-icons/react";
import posthog from "posthog-js";
import { useState } from "react";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import { NavRail } from "@/components/layout/NavRail";
import { TopBar } from "@/components/layout/TopBar";
import { DotGrid } from "@/components/shared/DotGrid";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function NewTopicView() {
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("architecture");
	const [body, setBody] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;
		posthog.capture("community_post_submitted", {
			category,
			title_length: title.length,
			body_length: body.length,
		});
	};

	return (
		<div className="min-h-screen bg-bg-base relative">
			<DotGrid />

			<div className="grid grid-cols-1 lg:grid-cols-[60px_1fr_350px] lg:grid-rows-[48px_1fr] min-h-screen lg:h-screen lg:overflow-hidden max-w-full relative z-10">
				<div className="col-span-1 lg:col-span-3">
					<TopBar />
				</div>

				<NavRail />

				<main className="p-4 lg:p-8 flex flex-col gap-10 overflow-visible lg:overflow-y-auto w-full">
					{/* Header */}
					<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-ink-secondary/20 dark:border-border pb-6">
						<div>
							<Link
								href="/community"
								className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-ink-secondary hover:text-ink-primary transition-colors mb-4"
							>
								<ArrowLeftIcon /> ABORT TRANSMISSION
							</Link>
							<h1 className="font-display text-4xl lg:text-5xl leading-none -tracking-wider text-ink-primary">
								NEW TRANSMISSION
							</h1>
							<p className="text-ink-secondary mt-2 max-w-xl text-sm font-mono">
								Initiate a new global protocol. All active operatives will
								receive broadcast.
							</p>
						</div>
					</div>

					<div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
						{/* Form Section */}
						<div className="border border-ink-primary bg-surface/50 p-6 md:p-8 relative">
							{/* Corner Accents */}
							<div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-ink-primary"></div>
							<div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-ink-primary"></div>
							<div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-ink-primary"></div>
							<div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-ink-primary"></div>

							<form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
								{/* Title Input */}
								<div>
									<label className="block text-[10px] uppercase tracking-widest font-bold text-ink-primary mb-2">
										Subject Header
									</label>
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-secondary font-mono">
											$&gt;
										</span>
										<input
											type="text"
											placeholder="e.g. Protocol analysis requested..."
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											className="w-full bg-bg-base border border-ink-secondary/50 p-3 pl-8 font-mono text-sm text-ink-primary focus:border-ink-primary focus:outline-none transition-colors placeholder:text-ink-tertiary"
										/>
									</div>
								</div>

								{/* Category Select */}
								<div>
									<label className="block text-[10px] uppercase tracking-widest font-bold text-ink-primary mb-2">
										Transmission Category
									</label>
									<select
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										className="w-full bg-bg-base border border-ink-secondary/50 p-3 font-mono text-sm text-ink-primary focus:border-ink-primary focus:outline-none transition-colors appearance-none cursor-pointer"
									>
										<option value="architecture">ARCHITECTURE</option>
										<option value="discussion">DISCUSSION</option>
										<option value="networking">NETWORKING</option>
										<option value="support">SYSTEM_SUPPORT</option>
									</select>
								</div>

								{/* Markdown Body */}
								<div>
									<div className="flex justify-between items-end mb-2">
										<label className="block text-[10px] uppercase tracking-widest font-bold text-ink-primary">
											Payload Buffer
										</label>
										<span className="text-[10px] uppercase tracking-widest text-ink-secondary flex items-center gap-1">
											<CodeIcon weight="bold" /> Markdown Supported
										</span>
									</div>
									<textarea
										rows={12}
										placeholder="// Enter execution sequences or raw thoughts here..."
										value={body}
										onChange={(e) => setBody(e.target.value)}
										className="w-full bg-bg-base border border-ink-secondary/50 p-4 font-mono text-sm text-ink-primary focus:border-ink-primary focus:outline-none transition-colors placeholder:text-ink-tertiary resize-y"
									/>
								</div>

								{/* Actions */}
								<div className="flex items-center justify-between pt-6 border-t border-ink-secondary/20">
									<div className="flex items-center gap-2 text-[#FFB020] text-[10px] uppercase tracking-widest bg-[#FFB020]/10 px-2 py-1 font-bold">
										<WarningIcon />
										Public Broadcast
									</div>

									<div className="flex items-center gap-4">
										<Button
											variant="ghost"
											className="rounded-none text-ink-secondary hover:text-ink-primary uppercase text-xs tracking-widest font-bold"
											asChild
										>
											<Link href="/community">Cancel</Link>
										</Button>
										<Button
											type="submit"
											className="bg-ink-primary hover:bg-ink-primary/90 text-bg-base rounded-none uppercase text-xs font-bold px-8 tracking-widest flex items-center gap-2"
										>
											<PaperPlaneRightIcon weight="fill" />
											DEPLOY POST
										</Button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</main>

				<CommunitySidebar />
			</div>
		</div>
	);
}
