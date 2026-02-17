'use client';

import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { InterfaceSettings } from '@/components/settings/InterfaceSettings';
import { PrivacySettings } from '@/components/settings/PrivacySettings';
import { SyncStatus } from '@/components/settings/SyncStatus';
import { SystemNotices } from '@/components/settings/SystemNotices';
import { SystemLog } from '@/components/settings/SystemLog';
import {
  UserSettings,
  SyncStatus as SyncStatusType,
  SystemNotice,
  SystemLogEntry,
} from '@/lib/data/settings';

interface SettingsViewProps {
  settings: UserSettings;
  syncStatus: SyncStatusType;
  systemNotices: SystemNotice[];
  systemLog: SystemLogEntry[];
}

export function SettingsView({
  settings,
  syncStatus,
  systemNotices,
  systemLog,
}: SettingsViewProps) {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* App Shell Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[60px_1fr_350px] lg:grid-rows-[48px_1fr] min-h-screen lg:h-screen lg:overflow-hidden max-w-full">
        {/* Top Bar - spans all columns */}
        <div className="col-span-1 lg:col-span-3">
          <TopBar />
        </div>

        {/* Nav Rail */}
        <NavRail />

        {/* Main Stage */}
        <section className="p-4 lg:p-8 overflow-visible lg:overflow-y-auto flex flex-col gap-12">
          {/* Section Header */}
          <div className="border-b border-border pb-2">
            <span className="bg-ink-primary text-bg-base px-2 py-1 text-[10px] uppercase tracking-widest inline-block mb-2">
              User Configuration
            </span>
            <div className="flex justify-between items-end">
              <h2 className="font-display text-2xl lg:text-[32px] leading-none -tracking-wider">
                SYSTEM SETTINGS
              </h2>
              <div className="text-[10px] uppercase tracking-widest text-ink-secondary">
                Node ID: 4492-AX
              </div>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            <ProfileSettings settings={settings.profile} />
            <AccountSettings settings={settings.account} />
            <InterfaceSettings settings={settings.interface} />
            <PrivacySettings settings={settings.privacy} />
          </div>
        </section>

        {/* Context Panel (Right Sidebar) */}
        <aside className="border-t lg:border-t-0 lg:border-l border-border bg-bg-base p-6 flex flex-col gap-8 overflow-visible lg:overflow-y-auto">
          <SyncStatus status={syncStatus} />
          <SystemNotices notices={systemNotices} />
          <SystemLog entries={systemLog} />
        </aside>
      </div>
    </div>
  );
}
