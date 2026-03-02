/**
 * @fileoverview Settings page view component.
 * Layout for all settings sections, system logs, and notices.
 */
"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { NavRail } from "@/components/layout/NavRail";
import { TopBar } from "@/components/layout/TopBar";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { InterfaceSettings } from "@/components/settings/InterfaceSettings";
import { PrivacySettings } from "@/components/settings/PrivacySettings";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { SyncStatus } from "@/components/settings/SyncStatus";
import { SystemLog } from "@/components/settings/SystemLog";
import { SystemNotices } from "@/components/settings/SystemNotices";
import { DotGrid } from "@/components/shared/DotGrid";
import { useSession } from "@/lib/auth/client";
import {
	mockSyncStatus,
	mockSystemLog,
	mockSystemNotices,
	SystemLogEntry,
	SystemNotice,
} from "@/lib/data/settings";

export function SettingsView() {
	const { data: session } = useSession();
	const t = useTranslations("Settings.view");

	const [logs, setLogs] = useState<SystemLogEntry[]>(mockSystemLog);
	const [notices, setNotices] = useState<SystemNotice[]>(mockSystemNotices);

	useEffect(() => {
		try {
			const savedLogs = localStorage.getItem("systemLogs");
			const savedNotices = localStorage.getItem("systemNotices");
			if (savedLogs || savedNotices) {
				setTimeout(() => {
					if (savedLogs) setLogs(JSON.parse(savedLogs));
					if (savedNotices) setNotices(JSON.parse(savedNotices));
				}, 0);
			}
		} catch {}
	}, []);

	return (
		<div className="min-h-screen bg-bg-base">
			{/* App Shell Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-[60px_1fr_350px] lg:grid-rows-[48px_1fr] min-h-screen lg:h-screen lg:overflow-hidden max-w-full">
				{/* Top Bar */}
				<div className="col-span-1 lg:col-span-3">
					<TopBar />
				</div>

				{/* Nav Rail */}
				<NavRail />

				{/* Main Stage */}
				<section className="p-4 lg:p-8 overflow-visible lg:overflow-y-auto flex flex-col gap-12 relative">
					<DotGrid opacity={0.15} />
					{/* Section Header */}
					<div className="border-b border-border pb-2">
						<span className="bg-ink-primary text-bg-base px-2 py-1 text-[10px] uppercase tracking-widest inline-block mb-2">
							{t("badge")}
						</span>
						<div className="flex justify-between items-end">
							<h2 className="font-display text-2xl lg:text-[32px] leading-none -tracking-wider">
								{t("title")}
							</h2>
							<div className="text-[10px] uppercase tracking-widest text-ink-secondary hidden sm:block">
								{session?.user?.email ?? "—"}
							</div>
						</div>
					</div>

					{/* Settings Grid */}
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
						<ProfileSettings />
						<AccountSettings />
						<InterfaceSettings />
						<PrivacySettings />
					</div>
				</section>

				{/* Context Panel */}
				<aside className="relative border-t lg:border-t-0 lg:border-l border-border bg-bg-base overflow-hidden flex flex-col">
					<div className="relative z-10 p-6 flex flex-col gap-8 flex-1 overflow-visible lg:overflow-y-auto">
						<SyncStatus status={mockSyncStatus} />
						<SystemNotices notices={notices} />
						<SystemLog entries={logs} />
					</div>
				</aside>
			</div>
		</div>
	);
}
