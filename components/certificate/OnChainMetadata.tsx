'use client';

import { Certificate } from '@/lib/data/certificates';

interface OnChainMetadataProps {
  onChain: Certificate['onChain'];
}

export function OnChainMetadata({ onChain }: OnChainMetadataProps) {
  return (
    <div className="border border-ink-secondary p-4 relative">
      <div className="absolute -top-1 -left-1 w-2.5 h-2.5">
        <div className="absolute w-full h-px bg-ink-secondary top-1/2"></div>
        <div className="absolute h-full w-px bg-ink-secondary left-1/2"></div>
      </div>
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5">
        <div className="absolute w-full h-px bg-ink-secondary top-1/2"></div>
        <div className="absolute h-full w-px bg-ink-secondary left-1/2"></div>
      </div>
      <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5">
        <div className="absolute w-full h-px bg-ink-secondary top-1/2"></div>
        <div className="absolute h-full w-px bg-ink-secondary left-1/2"></div>
      </div>
      <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5">
        <div className="absolute w-full h-px bg-ink-secondary top-1/2"></div>
        <div className="absolute h-full w-px bg-ink-secondary left-1/2"></div>
      </div>
      
      <span className="absolute -top-2.5 left-3 bg-bg-base px-2 text-[10px] uppercase tracking-widest font-bold">
        On-Chain Metadata
      </span>
      
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex justify-between pb-1 border-b border-dotted border-ink-secondary/30">
          <span className="text-[10px] text-ink-secondary tracking-widest">ASSET TYPE</span>
          <span className="text-[11px] uppercase tracking-wide text-right max-w-[60%]">{onChain.assetType}</span>
        </div>
        <div className="flex justify-between pb-1 border-b border-dotted border-ink-secondary/30">
          <span className="text-[10px] text-ink-secondary tracking-widest">MINT ADDRESS</span>
          <span className="text-[11px] text-right max-w-[60%] break-all">{onChain.mintAddress}</span>
        </div>
        <div className="flex justify-between pb-1 border-b border-dotted border-ink-secondary/30">
          <span className="text-[10px] text-ink-secondary tracking-widest">OWNER</span>
          <span className="text-[11px] text-right max-w-[60%]">{onChain.owner}</span>
        </div>
        <div className="flex justify-between pb-1 border-b border-dotted border-ink-secondary/30">
          <span className="text-[10px] text-ink-secondary tracking-widest">METADATA URI</span>
          <span className="text-[11px] text-right max-w-[60%] text-blue-600 underline break-all">{onChain.metadataUri}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] text-ink-secondary tracking-widest">STATUS</span>
          <span className="bg-ink-primary text-white px-1.5 py-0.5 text-[9px] inline-flex items-center gap-1">
            <i className="bi bi-shield-check"></i> {onChain.status.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
