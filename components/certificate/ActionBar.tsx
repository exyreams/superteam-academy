'use client';

export function ActionBar() {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4">
      <button className="bg-ink-primary text-bg-base border border-ink-primary px-5 py-3 text-[11px] uppercase tracking-widest inline-flex items-center justify-center gap-2 hover:bg-ink-primary/90 transition-colors w-full md:w-auto">
        <i className="bi bi-download"></i> Download PNG
      </button>
      <button className="bg-transparent border border-ink-secondary text-ink-primary px-5 py-3 text-[11px] uppercase tracking-widest inline-flex items-center justify-center gap-2 hover:border-ink-primary hover:bg-ink-primary hover:text-bg-base transition-colors w-full md:w-auto">
        <i className="bi bi-twitter-x"></i> Share on X
      </button>
      <button className="bg-transparent border border-ink-secondary text-ink-primary px-5 py-3 text-[11px] uppercase tracking-widest inline-flex items-center justify-center gap-2 hover:border-ink-primary hover:bg-ink-primary hover:text-bg-base transition-colors w-full md:w-auto">
        <i className="bi bi-linkedin"></i> Share on LinkedIn
      </button>
      <button className="bg-transparent border border-ink-secondary text-ink-primary px-5 py-3 text-[11px] uppercase tracking-widest inline-flex items-center justify-center gap-2 md:ml-auto hover:border-ink-primary hover:bg-ink-primary hover:text-bg-base transition-colors w-full md:w-auto">
        <i className="bi bi-box-arrow-up-right"></i> View on Solana Explorer
      </button>
    </div>
  );
}
