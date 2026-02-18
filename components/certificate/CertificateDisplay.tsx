'use client';

import { Logo } from '@/components/shared/logo';
import { Certificate } from '@/lib/data/certificates';

interface CertificateDisplayProps {
  certificate: Certificate;
}

export function CertificateDisplay({ certificate }: CertificateDisplayProps) {
  return (
    <div className="relative aspect-video bg-white border border-zinc-950 p-4 md:p-12 flex flex-col justify-between shadow-[5px_5px_0_rgba(13,20,18,0.1)] md:shadow-[10px_10px_0_rgba(13,20,18,0.1)] dark:shadow-[5px_5px_0_rgba(255,255,255,0.1)] dark:md:shadow-[10px_10px_0_rgba(255,255,255,0.1)]"
      style={{
        backgroundImage: `linear-gradient(45deg, rgba(13,20,18,0.02) 25%, transparent 25%, transparent 75%, rgba(13,20,18,0.02) 75%, rgba(13,20,18,0.02)),
                         linear-gradient(45deg, rgba(13,20,18,0.02) 25%, transparent 25%, transparent 75%, rgba(13,20,18,0.02) 75%, rgba(13,20,18,0.02))`,
        backgroundSize: '4px 4px',
        backgroundPosition: '0 0, 2px 2px',
      }}
    >
      {/* Inner Border */}
      <div className="absolute top-2 left-2 right-2 bottom-2 md:top-3 md:left-3 md:right-3 md:bottom-3 border border-zinc-300 pointer-events-none"></div>

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 md:gap-3">
          <Logo className="text-zinc-950 w-5 h-5 md:w-8 md:h-8" />
          <div className="font-display font-bold text-xs md:text-2xl text-zinc-950">
            SUPERTEAM ACADEMY
          </div>
        </div>
        <div className="text-[7px] md:text-[10px] text-right text-zinc-500">
          CERTIFICATE NO.<br />
          <span className="font-bold text-zinc-950">{certificate.certificateNo}</span>
        </div>
      </div>

      {/* Body */}
      <div className="text-center">
        <div className="text-[7px] md:text-[10px] uppercase tracking-widest text-zinc-500 mb-1 md:mb-4">
          This is to certify that
        </div>
        <div className="font-mono text-sm md:text-xl border-b border-zinc-950 inline-block px-4 md:px-8 pb-0.5 md:pb-1 mb-2 md:mb-4 text-zinc-950">
          {certificate.recipient}
        </div>
        <div className="text-[7px] md:text-[10px] uppercase tracking-widest text-zinc-500 mt-2 md:mt-4 mb-1 md:mb-2">
          Has successfully mastered
        </div>
        <div className="font-display text-2xl md:text-6xl font-bold uppercase leading-none mb-1 md:mb-2 text-zinc-950">
          {certificate.courseName}
        </div>
        <div className="text-zinc-500 text-[8px] md:text-[12px]">
          {certificate.courseDescription}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end">
        <div className="text-[7px] md:text-[10px] text-zinc-500">
          DATE OF ISSUE<br />
          <span className="font-bold text-zinc-950">{certificate.issueDate}</span>
        </div>
        <div className="w-12 h-12 md:w-20 md:h-20 border md:border-2 border-dashed border-zinc-950 rounded-full flex items-center justify-center text-[6px] md:text-[10px] font-bold text-center -rotate-15 text-zinc-950">
          OFFICIAL<br />ACADEMY<br />SEAL
        </div>
        <div className="text-[7px] md:text-[10px] text-zinc-500 text-right">
          VALIDATED BY<br />
          <span className="font-bold text-zinc-950">{certificate.validator}</span>
        </div>
      </div>
    </div>
  );
}
