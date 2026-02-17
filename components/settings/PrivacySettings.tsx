'use client';

import { useState } from 'react';
import { UserSettings } from '@/lib/data/settings';

interface PrivacySettingsProps {
  settings: UserSettings['privacy'];
}

export function PrivacySettings({ settings }: PrivacySettingsProps) {
  const [privacy, setPrivacy] = useState(settings);

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="border-b border-border pb-2 mb-2 flex items-center gap-2 font-bold uppercase tracking-widest text-[11px]">
        <i className="bi bi-eye-slash"></i> Privacy &amp; Data
      </div>

      {/* Public Visibility */}
      <div className="flex items-center justify-between py-2">
        <div>
          <div className="font-bold uppercase tracking-widest text-[11px]">Public Visibility</div>
          <div className="text-[10px] text-ink-secondary tracking-widest">
            Show profile on global leaderboard
          </div>
        </div>
        <div
          onClick={() => togglePrivacy('publicVisibility')}
          className={`w-4 h-4 border border-ink-primary cursor-pointer flex items-center justify-center ${
            privacy.publicVisibility ? 'bg-ink-primary' : ''
          }`}
        >
          {privacy.publicVisibility && (
            <div className="w-2 h-2 bg-bg-base"></div>
          )}
        </div>
      </div>

      {/* Anonymous Analytics */}
      <div className="flex items-center justify-between py-2">
        <div>
          <div className="font-bold uppercase tracking-widest text-[11px]">Anonymous Analytics</div>
          <div className="text-[10px] text-ink-secondary tracking-widest">
            Help improve Academy telemetry
          </div>
        </div>
        <div
          onClick={() => togglePrivacy('anonymousAnalytics')}
          className={`w-4 h-4 border border-ink-primary cursor-pointer flex items-center justify-center ${
            privacy.anonymousAnalytics ? 'bg-ink-primary' : ''
          }`}
        >
          {privacy.anonymousAnalytics && (
            <div className="w-2 h-2 bg-bg-base"></div>
          )}
        </div>
      </div>

      {/* Data Archive */}
      <div className="flex flex-col gap-1.5 mt-3">
        <label className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest">
          Data Archive
        </label>
        <button className="border border-ink-secondary bg-transparent px-3 py-2.5 text-[11px] uppercase tracking-widest text-left hover:bg-ink-primary hover:text-bg-base hover:border-ink-primary transition-colors flex items-center gap-2">
          <i className="bi bi-download"></i> Export Operator Data (.JSON)
        </button>
      </div>

      {/* Save Button */}
      <div className="mt-auto pt-5">
        <button className="bg-ink-primary text-bg-base border border-ink-primary px-5 py-2.5 text-[12px] uppercase tracking-widest font-bold w-full hover:bg-ink-primary/90 transition-colors">
          Commit Changes to Mainnet
        </button>
      </div>
    </div>
  );
}
