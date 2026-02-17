'use client';

import { Logo } from '@/components/shared/logo';
import { Certificate } from '@/lib/data/certificates';

interface CertificateDisplayProps {
  certificate: Certificate;
}

export function CertificateDisplay({ certificate }: CertificateDisplayProps) {
  return (
    <div className="relative aspect-video bg-white border-2 border-ink-primary p-12 flex flex-col justify-between shadow-[20px_20px_0_rgba(13,20,18,0.05)]"
      style={{
        backgroundImage: `linear-gradient(45deg, rgba(13,20,18,0.02) 25%, transparent 25%, transparent 75%, rgba(13,20,18,0.02) 75%, rgba(13,20,18,0.02)),
                         linear-gradient(45deg, rgba(13,20,18,0.02) 25%, transparent 25%, transparent 75%, rgba(13,20,18,0.02) 75%, rgba(13,20,18,0.02))`,
        backgroundSize: '4px 4px',
        backgroundPosition: '0 0, 2px 2px',
      }}
    >
      {/* Inner Border */}
      <div className="absolute top-3 left-3 right-3 bottom-3 border border-ink-secondary pointer-events-none"></div>

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <div className="font-display font-bold text-2xl border-b-4 border-ink-primary">
            SUPERTEAM ACADEMY
          </div>
        </div>
        <div className="text-[10px] text-right text-ink-secondary">
          CERTIFICATE NO.<br />
          <span className="font-bold text-ink-primary">{certificate.certificateNo}</span>
        </div>
      </div>

      {/* Body */}
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-widest text-ink-secondary mb-4">
          This is to certify that
        </div>
        <div className="font-mono text-xl border-b border-ink-primary inline-block px-8 pb-1 mb-4">
          {certificate.recipient}
        </div>
        <div className="text-[10px] uppercase tracking-widest text-ink-secondary mt-4 mb-2">
          Has successfully mastered
        </div>
        <div className="font-display text-6xl font-bold uppercase leading-none mb-2">
          {certificate.courseName}
        </div>
        <div className="text-ink-secondary text-[12px]">
          {certificate.courseDescription}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end">
        <div className="text-[10px] text-ink-secondary">
          DATE OF ISSUE<br />
          <span className="font-bold text-ink-primary">{certificate.issueDate}</span>
        </div>
        <div className="w-20 h-20 border-2 border-dashed border-ink-primary rounded-full flex items-center justify-center text-[10px] font-bold text-center -rotate-15">
          OFFICIAL<br />ACADEMY<br />SEAL
        </div>
        <div className="text-[10px] text-ink-secondary text-right">
          VALIDATED BY<br />
          <span className="font-bold text-ink-primary">{certificate.validator}</span>
        </div>
      </div>
    </div>
  );
}
