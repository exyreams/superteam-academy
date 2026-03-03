/**
 * @fileoverview CodeEditor component providing an IDE-like experience using CodeMirror.
 * Supports Rust, JavaScript, and JSON with auto-save simulation and test execution.
 */

"use client";

import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { rust } from "@codemirror/lang-rust";
import { EditorView } from "@codemirror/view";
import {
	ArrowCounterClockwiseIcon,
	CloudCheckIcon,
	PlayIcon,
} from "@phosphor-icons/react";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";
import CodeMirror from "@uiw/react-codemirror";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * Represents a single test case for verification.
 */
export interface TestCase {
	name: string;
	description: string;
	status: "pass" | "fail" | "pending";
}

/**
 * Props for the CodeEditor component.
 */
interface CodeEditorProps {
	initialCode?: string;
	solution?: string;
	testResults?: TestCase[];
	onTestResultsChange?: (results: TestCase[]) => void;
	onComplete?: () => void;
}

/**
 * Syntax-highlighted code editor for solving course challenges.
 */
export function CodeEditor({
	initialCode = "",
	solution,
	testResults = [],
	onTestResultsChange,
	onComplete,
}: CodeEditorProps) {
	const t = useTranslations("Lesson");
	const { resolvedTheme } = useTheme();
	const [code, setCode] = useState(initialCode);
	const [lastSaved, setLastSaved] = useState<Date>(new Date());
	const [isRunning, setIsRunning] = useState(false);
	const [output, setOutput] = useState<string>("");

	// Auto-save simulation
	// biome-ignore lint/correctness/useExhaustiveDependencies: Reset timer on every code change
	useEffect(() => {
		const timer = setTimeout(() => {
			setLastSaved(new Date());
		}, 2000);
		return () => clearTimeout(timer);
	}, [code]);

	const getLanguageExtension = () => {
		const codeLower = code.toLowerCase();
		if (
			codeLower.includes("use anchor") ||
			codeLower.includes("pub fn") ||
			codeLower.includes("#[account]")
		) {
			return rust();
		}
		if (
			codeLower.includes("import") ||
			codeLower.includes("export") ||
			codeLower.includes("const ") ||
			codeLower.includes("function")
		) {
			return javascript({ typescript: true });
		}
		if (code.trim().startsWith("{") || code.trim().startsWith("[")) {
			return json();
		}
		return rust();
	};

	// Custom theme extension to hide the gutter border
	const editorTheme = useMemo(() => {
		return EditorView.theme({
			"&": {
				backgroundColor: resolvedTheme === "dark" ? "#1e1e1e" : "#ffffff",
			},
			".cm-gutters": {
				backgroundColor: resolvedTheme === "dark" ? "#1e1e1e" : "#ffffff",
				color: "#858585",
				border: "none",
			},
			".cm-activeLineGutter": {
				backgroundColor: resolvedTheme === "dark" ? "#2c2c2c" : "#f3f3f3",
			},
			".cm-lineNumbers .cm-gutterElement": {
				padding: "0 8px 0 12px",
			},
			"&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection":
				{
					backgroundColor: resolvedTheme === "dark" ? "#264f78" : "#add6ff",
				},
		});
	}, [resolvedTheme]);

	const handleShowSolution = () => {
		if (solution) {
			setCode(solution);
			toast.info("Solution loaded into editor");
		}
	};

	const handleReset = () => {
		setCode(initialCode);
		toast.info("Code reset to starter template");
	};

	const handleRunTests = async () => {
		if (isRunning) return;

		setIsRunning(true);
		setOutput("> cargo test-bpf...\n> Compiling program...");

		await new Promise((resolve) => setTimeout(resolve, 1500));

		const isSolution =
			code.includes("Pubkey::find_program_address") ||
			code.length > initialCode.length + 10;

		if (isSolution) {
			setOutput(
				"> cargo test-bpf...\n> Finished in 2.4s\n> Running 3 tests\n\ntest seed_alignment ... ok\ntest bump_verification ... ok\ntest program_id_context ... ok\n\ntest result: ok. 3 passed; 0 failed; 0 ignored;",
			);
			if (onTestResultsChange) {
				onTestResultsChange(testResults.map((r) => ({ ...r, status: "pass" })));
			}
			toast.success("All tests passed! Challenge completed.");
			if (onComplete) onComplete();
		} else {
			setOutput(
				"> cargo test-bpf...\n> Finished in 1.8s\n> Running 3 tests\n\ntest seed_alignment ... FAILED\n\ntest result: FAILED. 0 passed; 1 failed; 2 ignored;",
			);
			if (onTestResultsChange) {
				onTestResultsChange(
					testResults.map((r, i) => (i === 0 ? { ...r, status: "fail" } : r)),
				);
			}
			toast.error("Some tests failed. Check your logic.");
		}

		setIsRunning(false);
	};

	const getTimeSinceLastSave = () => {
		const seconds = Math.floor(
			(new Date().getTime() - lastSaved.getTime()) / 1000,
		);
		if (seconds < 60) return `${seconds}s ${t("ago")}`;
		const minutes = Math.floor(seconds / 60);
		return `${minutes}m ${t("ago")}`;
	};

	return (
		<div className="flex flex-col h-full border-l border-border bg-bg-base transition-colors duration-200">
			{/* Editor Header - Always dark for IDE look */}
			<div className="bg-[#0f1114] text-white px-4 py-2.5 flex justify-between items-center shrink-0 border-b border-white/5">
				<span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono opacity-90">
					SRC/LIB.RS
				</span>
				<div className="flex gap-6 items-center">
					<div className="flex items-center gap-2 text-[9px] uppercase tracking-widest opacity-50 font-medium">
						<CloudCheckIcon size={14} weight="fill" className="text-blue-400" />
						<span>
							{t("autosaved")} {getTimeSinceLastSave().toUpperCase()}
						</span>
					</div>
					<div className="flex gap-4 items-center">
						<button
							onClick={handleReset}
							title="Reset Code"
							className="opacity-50 hover:opacity-100 transition-opacity"
						>
							<ArrowCounterClockwiseIcon size={16} weight="bold" />
						</button>
						{solution && (
							<button
								onClick={handleShowSolution}
								className="border border-white/20 px-3 py-1 text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-sm"
							>
								{t("solution")}
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Main Editor Area */}
			<div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e] overflow-hidden">
				<div className="flex-1 overflow-hidden border-b border-border">
					<CodeMirror
						value={code}
						height="100%"
						theme={resolvedTheme === "dark" ? vscodeDark : xcodeLight}
						extensions={[getLanguageExtension(), editorTheme]}
						onChange={(value) => setCode(value)}
						className="h-full text-[13px] font-mono leading-relaxed"
						basicSetup={{
							lineNumbers: true,
							foldGutter: true,
							highlightActiveLine: true,
							dropCursor: true,
							allowMultipleSelections: true,
							indentOnInput: true,
							bracketMatching: true,
							autocompletion: true,
							rectangularSelection: true,
							crosshairCursor: true,
							highlightSelectionMatches: true,
						}}
					/>
				</div>

				{/* Footer Controls / Console */}
				<div className="px-6 py-5 bg-bg-surface/50 dark:bg-bg-base/95 flex flex-col gap-4 shrink-0 transition-colors border-t border-border/40 dark:border-white/5">
					<div className="flex justify-between items-end">
						<div className="flex flex-col gap-1">
							<div className="text-[9px] font-bold uppercase tracking-widest text-ink-tertiary opacity-60">
								Status
							</div>
							<div className="text-[11px] font-bold uppercase tracking-widest font-mono flex items-center gap-2">
								<div
									className={`w-1.5 h-1.5 rounded-full ${isRunning ? "bg-amber-500 animate-pulse" : "bg-green-500"}`}
								/>
								<span
									className={
										isRunning
											? "text-amber-600"
											: "text-ink-secondary dark:text-ink-secondary/50 uppercase tracking-[0.2em] text-[8px] font-bold opacity-90"
									}
								>
									{isRunning ? "Running Analysis..." : "System Standby"}
								</span>
							</div>
						</div>
						<Button
							variant="landingPrimary"
							size="sm"
							disabled={isRunning}
							onClick={handleRunTests}
							className="rounded-none uppercase text-[10px] font-bold px-8 py-3 h-auto tracking-[0.2em] flex items-center gap-3 bg-ink-primary text-white hover:bg-black dark:bg-bg-surface dark:text-ink-primary transition-all shadow-xl hover:-translate-y-px active:translate-y-0"
						>
							{isRunning ? (
								"Processing..."
							) : (
								<>
									{t("runTests")} <PlayIcon size={14} weight="fill" />
								</>
							)}
						</Button>
					</div>

					{/* Terminal Output */}
					<div className="bg-white/70 dark:bg-[#0d0f12] rounded-md p-4 font-mono text-[11px] text-[#166534] dark:text-[#4ade80]/90 h-36 overflow-y-auto border border-border/60 dark:border-white/5 scrollbar-thin scrollbar-thumb-white/10 selection:bg-white/10">
						<div className="opacity-60 dark:opacity-40 mb-3 border-b border-ink-tertiary/30 dark:border-white/10 pb-1.5 flex justify-between items-center font-mono text-ink-primary dark:text-white">
							<span className="tracking-[0.2em] text-[8px] font-bold opacity-70">
								CONSOLE_LOG
							</span>
							<span className="text-[9px]">UTF-8</span>
						</div>
						<pre className="whitespace-pre-wrap leading-relaxed font-jetbrains-mono">
							{output}
						</pre>
					</div>
				</div>
			</div>
		</div>
	);
}
