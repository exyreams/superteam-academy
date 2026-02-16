'use client';

import { UserProfile } from '@/lib/data/user';

interface ProfileHeroProps {
  profile: UserProfile;
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-8 p-8 border border-ink-primary bg-white/30 relative">
      {/* Corner crosshairs */}
      <div className="absolute -top-1 -left-1 w-2.5 h-2.5">
        <div className="absolute w-full h-px bg-ink-secondary top-1/2"></div>
        <div className="absolute h-full w-px bg-ink-secondary left-1/2"></div>
      </div>
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5">
        <div className="absolute w-full h-px bg-ink-secondary top-1/2"></div>
        <div className="absolute h-full w-px bg-ink-secondary left-1/2"></div>
      </div>
      
      {/* Avatar */}
      <div className="w-[180px] h-[180px] border border-ink-primary bg-[#D1DEDC] p-2">
        <div className="w-full h-full bg-ink-secondary flex items-center justify-center text-bg-base text-[80px]">
          <i className="bi bi-shield-shaded"></i>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="flex flex-col justify-between">
        <div>
          <span className="bg-ink-primary text-bg-base px-2 py-1 text-[10px] uppercase tracking-widest inline-block mb-2">
            OPERATOR_ID: {profile.id.split('-')[1]}
          </span>
          <h1 className="font-display text-[56px] leading-none -tracking-wider mt-2">
            {profile.displayName}
          </h1>
          <p className="text-ink-secondary max-w-[500px] mt-3">
            {profile.bio}
          </p>
        </div>
        
        <div>
          <div className="text-[10px] uppercase tracking-widest text-ink-secondary mb-4">
            ENROLLED SINCE: {profile.enrolledSince} {"//"} LOC: {profile.location}
          </div>
          <div className="flex gap-4">
            {profile.socialLinks.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-2 py-1 border border-ink-primary/10 hover:border-ink-primary hover:bg-ink-primary/5 uppercase tracking-widest"
              >
                <i className="bi bi-github"></i> GitHub
              </a>
            )}
            {profile.socialLinks.twitter && (
              <a
                href={profile.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-2 py-1 border border-ink-primary/10 hover:border-ink-primary hover:bg-ink-primary/5 uppercase tracking-widest"
              >
                <i className="bi bi-twitter-x"></i> Twitter
              </a>
            )}
            {profile.socialLinks.portfolio && (
              <a
                href={profile.socialLinks.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-2 py-1 border border-ink-primary/10 hover:border-ink-primary hover:bg-ink-primary/5 uppercase tracking-widest"
              >
                <i className="bi bi-globe"></i> Portfolio
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
