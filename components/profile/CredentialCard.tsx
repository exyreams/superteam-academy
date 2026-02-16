'use client';

import { Credential } from '@/lib/data/credentials';

interface CredentialCardProps {
  credential: Credential;
}

export function CredentialCard({ credential }: CredentialCardProps) {
  return (
    <div className="border border-ink-secondary p-3 bg-white">
      <div
        className="w-full aspect-square mb-3 relative overflow-hidden"
        style={{ background: credential.gradient }}
      >
        <i
          className={`${credential.icon} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[64px]`}
          style={{ color: credential.gradient.includes('#D1DEDC') ? 'var(--ink-primary)' : 'white' }}
        ></i>
        
        {credential.verified && (
          <div className="absolute top-1 right-1 bg-[#00FF00] text-black text-[8px] font-bold px-1 py-0.5">
            VERIFIED
          </div>
        )}
      </div>
      
      <div className="text-[10px] font-bold uppercase tracking-widest">
        {credential.track}
      </div>
      <div className="text-[10px] text-ink-secondary uppercase tracking-widest">
        LEVEL {credential.level} {"//"} {credential.tier}
      </div>
      
      <div className="mt-3">
        <a
          href={`https://solscan.io/token/${credential.mintAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-widest text-ink-secondary hover:text-ink-primary"
        >
          VIEW_ON_SOLSCAN ↗
        </a>
      </div>
    </div>
  );
}
