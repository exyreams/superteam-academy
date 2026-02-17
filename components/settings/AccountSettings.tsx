'use client';

import { UserSettings } from '@/lib/data/settings';

interface AccountSettingsProps {
  settings: UserSettings['account'];
}

export function AccountSettings({ settings }: AccountSettingsProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="border-b border-border pb-2 mb-2 flex items-center gap-2 font-bold uppercase tracking-widest text-[11px]">
        <i className="bi bi-shield-lock"></i> Account &amp; Auth
      </div>

      {/* Primary Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest">
          Primary Email
        </label>
        <input
          type="email"
          defaultValue={settings.email}
          className="bg-transparent border border-ink-secondary px-2.5 py-2.5 text-[13px] focus:border-ink-primary focus:bg-ink-primary/5 outline-none"
        />
      </div>

      {/* Connected Wallets */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest">
          Connected Wallets
        </label>
        {settings.wallets.map((wallet) => (
          <div
            key={wallet.provider}
            className="flex items-center justify-between border border-border px-3 py-3"
          >
            <span className="text-[10px] tracking-widest">
              {wallet.provider} {wallet.address && `(${wallet.address})`}
            </span>
            {wallet.connected ? (
              <span className="text-[10px] font-bold" style={{ color: '#2D6A4F' }}>
                CONNECTED
              </span>
            ) : (
              <button className="border border-ink-secondary bg-transparent px-3 py-1 text-[10px] uppercase tracking-widest hover:bg-ink-primary hover:text-bg-base transition-colors">
                Link
              </button>
            )}
          </div>
        ))}
      </div>

      {/* OAuth Providers */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-ink-secondary uppercase tracking-widest">
          OAuth Providers
        </label>
        {settings.oauthProviders.map((provider) => (
          <div
            key={provider.name}
            className="flex items-center justify-between border border-border px-3 py-3"
          >
            <span className="flex items-center gap-2">
              <i className={provider.icon}></i> {provider.name}
            </span>
            {provider.linked ? (
              <span className="text-[10px] font-bold tracking-widest">LINKED</span>
            ) : (
              <button className="border border-ink-secondary bg-transparent px-3 py-1 text-[10px] uppercase tracking-widest hover:bg-ink-primary hover:text-bg-base transition-colors">
                Link
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
