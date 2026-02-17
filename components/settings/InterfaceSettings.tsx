'use client';

import { useState } from 'react';
import { UserSettings } from '@/lib/data/settings';

interface InterfaceSettingsProps {
  settings: UserSettings['interface'];
}

export function InterfaceSettings({ settings }: InterfaceSettingsProps) {
  const [notifications, setNotifications] = useState(settings.notifications);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="border-b border-ink-secondary pb-2 mb-2 flex items-center gap-2 font-bold uppercase tracking-widest text-[11px]">
        <i className="bi bi-sliders"></i> Interface Prefs
      </div>

      {/* System Language */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest">
          System Language
        </label>
        <select
          defaultValue={settings.language}
          className="bg-transparent border border-ink-secondary px-2.5 py-2.5 text-[13px] uppercase tracking-widest cursor-pointer focus:border-ink-primary outline-none"
        >
          <option value="en-us">English (EN-US)</option>
          <option value="rust">Rust (STD-LIB)</option>
          <option value="ja-jp">Japanese (JA-JP)</option>
        </select>
      </div>

      {/* Terminal Theme */}
      <div className="flex items-center justify-between py-2">
        <div>
          <div className="font-bold uppercase tracking-widest text-[11px]">Terminal Theme</div>
          <div className="text-[10px] text-ink-secondary tracking-widest">
            Toggle between Light and Dark core
          </div>
        </div>
        <button className="border border-ink-secondary bg-transparent px-3 py-1 text-[10px] uppercase tracking-widest hover:bg-ink-primary hover:text-bg-base transition-colors">
          {settings.theme === 'light' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Notifications */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest">
          Notifications
        </label>
        
        <div className="flex items-center justify-between py-2">
          <span className="text-[10px] tracking-widest">New Course Releases</span>
          <div
            onClick={() => toggleNotification('newCourses')}
            className={`w-4 h-4 border border-ink-primary cursor-pointer flex items-center justify-center ${
              notifications.newCourses ? 'bg-ink-primary' : ''
            }`}
          >
            {notifications.newCourses && (
              <div className="w-2 h-2 bg-bg-base"></div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-[10px] tracking-widest">Leaderboard Rank Alerts</span>
          <div
            onClick={() => toggleNotification('leaderboardAlerts')}
            className={`w-4 h-4 border border-ink-primary cursor-pointer flex items-center justify-center ${
              notifications.leaderboardAlerts ? 'bg-ink-primary' : ''
            }`}
          >
            {notifications.leaderboardAlerts && (
              <div className="w-2 h-2 bg-bg-base"></div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-[10px] tracking-widest">Direct Messages</span>
          <div
            onClick={() => toggleNotification('directMessages')}
            className={`w-4 h-4 border border-ink-primary cursor-pointer flex items-center justify-center ${
              notifications.directMessages ? 'bg-ink-primary' : ''
            }`}
          >
            {notifications.directMessages && (
              <div className="w-2 h-2 bg-bg-base"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
