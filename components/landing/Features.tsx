import { Cpu, Terminal } from "lucide-react";

export function Features() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 border-b border-ink-primary">
      <div className="p-16 border-r border-ink-primary flex flex-col gap-6">
        <Cpu size={32} />
        <h3 className="u-display text-[32px]">ON-CHAIN PROOFS</h3>
        <p className="u-dim text-ink-secondary">
          Every module you complete issues a non-transferable credential to your
          wallet. Build a cryptographically verifiable resume as you learn.
        </p>
      </div>
      <div className="p-16 flex flex-col gap-6">
        <Terminal size={32} />
        <h3 className="u-display text-[32px]">LIVE COMPILER</h3>
        <p className="u-dim text-ink-secondary">
          No environment setup required. Write, test, and deploy Solana programs
          directly in our browser-based IDE with real-time feedback.
        </p>
      </div>
    </section>
  );
}
