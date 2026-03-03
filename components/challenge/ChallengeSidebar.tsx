/**
 * @fileoverview Sidebar component for challenges, displaying objectives,
 * test cases, and terminal output.
 */

"use client";

import { CheckCircleIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
import { LessonContent } from "@/components/lesson/LessonContent";
import { Lesson } from "@/lib/data/lesson";

/**
 * Props for the ChallengeSidebar component.
 */
interface ChallengeSidebarProps {
	lesson: Lesson;
	onComplete: () => void;
	isRunningTests: boolean;
	isLastLesson: boolean;
}

/**
 * Instructional and feedback sidebar for challenges.
 */
export function ChallengeSidebar({
	lesson,
	onComplete,
	isRunningTests,
	isLastLesson,
}: ChallengeSidebarProps) {
	return (
		<aside className="w-full flex flex-col h-full bg-bg-base overflow-hidden">
			{/* Objective Section */}
			<div className="p-6 border-b border-border bg-bg-base overflow-y-auto max-h-[40%] custom-scrollbar">
				<span className="block text-[10px] uppercase font-bold tracking-widest mb-3 text-ink-secondary">
					Objective
				</span>
				<div className="bg-bg-surface border border-border p-4 relative">
					{/* Card Accent */}
					<div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-bg-surface border-t border-l border-ink-primary" />

					<div className="text-[12px] leading-relaxed text-ink-primary max-w-none w-full">
						<LessonContent
							reference={lesson.ref || "CHALLENGE"}
							title="OBJECTIVE"
							content={
								typeof lesson.content === "string"
									? lesson.content
									: Array.isArray(lesson.content)
										? lesson.content
												.map((b: Record<string, unknown>) => {
													const children = b.children as Record<
														string,
														unknown
													>[];
													return (
														children?.map((c) => c.text as string).join("") ||
														""
													);
												})
												.join("\n\n")
										: ""
							}
							hints={lesson.hints}
						/>
					</div>
				</div>
			</div>

			{/* Test Cases Section */}
			<div className="flex-1 p-6 border-b border-border bg-ink-primary/5 overflow-y-auto custom-scrollbar">
				<span className="block text-[10px] uppercase font-bold tracking-widest mb-3 text-ink-secondary">
					Test Cases
				</span>
				<div className="space-y-3">
					{lesson.testCases?.map((test, i) => (
						<div
							key={i}
							className={`flex items-center gap-3 p-3 border-l-2 bg-bg-base ${
								test.status === "pass"
									? "border-green-600"
									: test.status === "fail"
										? "border-red-600"
										: "border-ink-secondary"
							}`}
						>
							{/* Status Dot */}
							<div
								className={`w-2 h-2 rounded-full shrink-0 ${
									test.status === "pass"
										? "bg-green-600"
										: test.status === "fail"
											? "bg-red-600"
											: "bg-ink-secondary"
								}`}
							/>

							<div className="flex-1 min-w-0">
								<div className="text-[11px] font-bold truncate">
									{test.name}
								</div>
								<div className="text-[10px] text-ink-secondary truncate">
									{test.description}
								</div>
							</div>

							{test.status === "fail" && (
								<XIcon className="w-4 h-4 text-red-600" />
							)}
							{test.status === "pass" && (
								<CheckIcon className="w-4 h-4 text-green-600" />
							)}
						</div>
					))}
				</div>
			</div>

			{/* Output Panel & Actions */}
			<div className="flex flex-col bg-ink-primary text-bg-base h-[40%]">
				<div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto custom-scrollbar">
					<span className="block text-[10px] uppercase font-bold tracking-widest mb-2 text-bg-base/50">
						Console Output
					</span>
					<pre className="whitespace-pre-wrap leading-relaxed text-bg-base/80">
						{lesson.consoleOutput || "> Ready..."}
					</pre>
				</div>

				<div className="p-0">
					<button
						onClick={onComplete}
						disabled={isRunningTests}
						className="w-full h-14 bg-[#2D5A27] hover:bg-[#23461F] text-white text-[12px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isRunningTests ? (
							<span>Running Checks...</span>
						) : (
							<>
								<CheckCircleIcon className="w-4 h-4" />
								{isLastLesson ? "Finish Course" : "Mark as Complete"}
							</>
						)}
					</button>
				</div>
			</div>
		</aside>
	);
}
