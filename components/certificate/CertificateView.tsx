'use client';

import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';
import { CertificateDisplay } from '@/components/certificate/CertificateDisplay';
import { ActionBar } from '@/components/certificate/ActionBar';
import { OnChainMetadata } from '@/components/certificate/OnChainMetadata';
import { CourseMastery } from '@/components/certificate/CourseMastery';
import { BlockchainProof } from '@/components/certificate/BlockchainProof';
import { Certificate } from '@/lib/data/certificates';

interface CertificateViewProps {
  certificate: Certificate;
}

export function CertificateView({ certificate }: CertificateViewProps) {
  return (
    <div className="min-h-screen bg-bg-base overflow-x-hidden">
      {/* App Shell Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[60px_1fr_350px] lg:grid-rows-[48px_1fr] min-h-screen lg:h-screen lg:overflow-hidden max-w-full">
        {/* Top Bar - spans all columns */}
        <div className="col-span-1 lg:col-span-3">
          <TopBar />
        </div>

        {/* Nav Rail */}
        <NavRail />

        {/* Main Stage */}
        <section className="p-4 lg:p-10 overflow-visible lg:overflow-y-auto flex flex-col gap-8">
          {/* Section Header */}
          <div className="border-b border-border pb-3">
            <span className="bg-ink-primary text-bg-base px-2 py-1 text-[10px] uppercase tracking-widest inline-block">
              Credential Issued
            </span>
            <h2 className="font-display text-2xl lg:text-[32px] leading-none -tracking-wider mt-2">
              {certificate.courseName} {"//"} COMPLETION
            </h2>
          </div>

          {/* Certificate Display */}
          <CertificateDisplay certificate={certificate} />

          {/* Action Bar */}
          <ActionBar />
        </section>

        {/* Context Panel (Right Sidebar) */}
        <aside className="border-t lg:border-t-0 lg:border-l border-border bg-bg-base p-6 flex flex-col gap-8 overflow-visible lg:overflow-y-auto">
          <OnChainMetadata onChain={certificate.onChain} />
          <CourseMastery mastery={certificate.mastery} />
          <BlockchainProof signature={certificate.onChain.signature} />
        </aside>
      </div>
    </div>
  );
}
