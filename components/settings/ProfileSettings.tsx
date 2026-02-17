'use client';

import { UserSettings } from '@/lib/data/settings';

interface ProfileSettingsProps {
  settings: UserSettings['profile'];
}

export function ProfileSettings({ settings }: ProfileSettingsProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="border-b border-ink-secondary pb-2 mb-2 flex items-center gap-2 font-bold uppercase tracking-widest text-[11px]">
        <i className="bi bi-person-bounding-box"></i> Operator Profile
      </div>
      
      {/* Avatar Upload */}
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 border border-ink-primary flex items-center justify-center bg-ink-primary/5 text-2xl">
          <i className={settings.avatar}></i>
        </div>
        <div>
          <button className="border border-ink-secondary bg-transparent px-4 py-2 text-[11px] uppercase tracking-widest hover:bg-ink-primary hover:text-bg-base hover:border-ink-primary transition-colors">
            Upload New Avatar
          </button>
          <div className="text-[10px] text-ink-secondary mt-1 tracking-widest">
            SVG, PNG, JPG (MAX 2MB)
          </div>
        </div>
      </div>

      {/* Display Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest">
          Display Name
        </label>
        <input
          type="text"
          defaultValue={settings.displayName}
          className="bg-transparent border border-ink-secondary px-2.5 py-2.5 text-[13px] focus:border-ink-primary focus:bg-ink-primary/5 outline-none"
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest">
          Bio / Terminal Greeting
        </label>
        <textarea
          defaultValue={settings.bio}
          className="bg-transparent border border-ink-secondary px-2.5 py-2.5 text-[13px] h-20 resize-none focus:border-ink-primary focus:bg-ink-primary/5 outline-none"
        />
      </div>

      {/* Social Links */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest">
          Social Protocol Links (X / GitHub)
        </label>
        <input
          type="text"
          defaultValue={settings.socialLinks.twitter}
          placeholder="@handle"
          className="bg-transparent border border-ink-secondary px-2.5 py-2.5 text-[13px] mb-2 focus:border-ink-primary focus:bg-ink-primary/5 outline-none"
        />
        <input
          type="text"
          defaultValue={settings.socialLinks.github}
          placeholder="github.com/username"
          className="bg-transparent border border-ink-secondary px-2.5 py-2.5 text-[13px] focus:border-ink-primary focus:bg-ink-primary/5 outline-none"
        />
      </div>
    </div>
  );
}
