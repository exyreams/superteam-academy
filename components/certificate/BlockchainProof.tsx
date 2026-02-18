'use client';

interface BlockchainProofProps {
  signature: string;
}

export function BlockchainProof({ signature }: BlockchainProofProps) {
  return (
    <div className="mt-auto">
      <div className="text-[10px] text-ink-secondary tracking-widest mb-2">
        BLOCKCHAIN PROOF OF WORK
      </div>
      <div className="bg-ink-primary text-bg-base p-3 text-[10px] font-mono break-all">
        SIG: {signature}
      </div>
    </div>
  );
}
