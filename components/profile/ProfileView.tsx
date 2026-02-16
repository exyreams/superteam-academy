'use client';

import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';
import { ProfileHero } from '@/components/profile/ProfileHero';
import { SkillRadar } from '@/components/profile/SkillRadar';
import { BadgeShowcase } from '@/components/profile/BadgeShowcase';
import { CredentialCard } from '@/components/profile/CredentialCard';
import { CourseLedger } from '@/components/profile/CourseLedger';
import { StatCard } from '@/components/shared/StatCard';
import { UserProfile, CourseProgress } from '@/lib/data/user';
import { Achievement } from '@/lib/data/achievements';
import { Credential, SkillRadar as SkillRadarType } from '@/lib/data/credentials';

interface ProfileViewProps {
  profile: UserProfile;
  achievements: Achievement[];
  credentials: Credential[];
  skillRadar: SkillRadarType;
  courses: CourseProgress[];
  globalRank: number;
}

export function ProfileView({
  profile,
  achievements,
  credentials,
  skillRadar,
  courses,
  globalRank,
}: ProfileViewProps) {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* App Shell Grid */}
      <div className="grid grid-cols-[60px_1fr_400px] grid-rows-[48px_1fr] h-screen max-w-full">
        {/* Top Bar - spans all columns */}
        <div className="col-span-3">
          <TopBar />
        </div>

        {/* Nav Rail */}
        <NavRail />

        {/* Main Stage */}
        <section className="p-8 overflow-y-auto flex flex-col gap-10">
          {/* Profile Hero */}
          <ProfileHero profile={profile} />

          {/* Skill Matrix */}
          <div className="grid grid-cols-2 gap-6">
            <SkillRadar skills={skillRadar} />
            <BadgeShowcase achievements={achievements} />
          </div>

          {/* Credentials */}
          <div>
            <div className="flex justify-between items-end mb-6 border-b border-ink-primary pb-2">
              <div>
                <span className="bg-ink-primary text-bg-base px-2 py-1 text-[10px] uppercase tracking-widest inline-block mb-2">
                  ON-CHAIN_PROOFS
                </span>
                <h2 className="font-display text-[32px] leading-none -tracking-wider">
                  EVOLVING cNFTs
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {credentials.map((credential) => (
                <CredentialCard key={credential.id} credential={credential} />
              ))}
            </div>
          </div>
        </section>

        {/* Context Panel (Right Sidebar) */}
        <aside className="border-l border-ink-secondary bg-bg-base p-6 flex flex-col gap-8 overflow-y-auto">
          {/* Quick Stats */}
          <div className="border border-ink-primary p-4 relative">
            <span className="absolute -top-2.5 left-3 bg-bg-base px-2 text-[10px] uppercase tracking-widest font-bold">
              QUICK_STATS
            </span>
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="RANK" value={`#${globalRank}`} />
              <StatCard label="VOUCHERS" value="12" />
            </div>
          </div>

          {/* Course Ledger */}
          <CourseLedger courses={courses} />

          {/* Metadata JSON */}
          <div className="mt-auto">
            <div className="mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest">
                METADATA.JSON
              </span>
            </div>
            <div className="bg-ink-primary/5 p-3 font-mono text-[11px] leading-relaxed">
              {`{`}<br />
              &nbsp;&nbsp;&quot;operator&quot;: &quot;{profile.walletAddress}&quot;,<br />
              &nbsp;&nbsp;&quot;reputation&quot;: 8420,<br />
              &nbsp;&nbsp;&quot;class&quot;: &quot;Architect&quot;,<br />
              &nbsp;&nbsp;&quot;verified&quot;: true<br />
              {`}`}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
