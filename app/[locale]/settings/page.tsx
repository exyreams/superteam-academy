import { SettingsView } from '@/components/settings/SettingsView';
import {
  getUserSettings,
  getSyncStatus,
  getSystemNotices,
  getSystemLog,
} from '@/lib/data/settings';

export default function SettingsPage() {
  const settings = getUserSettings();
  const syncStatus = getSyncStatus();
  const systemNotices = getSystemNotices();
  const systemLog = getSystemLog();

  return (
    <SettingsView
      settings={settings}
      syncStatus={syncStatus}
      systemNotices={systemNotices}
      systemLog={systemLog}
    />
  );
}
