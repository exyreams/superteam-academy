export function Testimonials() {
  return (
    <section className="bg-ink-primary dark:bg-transparent dark:border-y dark:border-ink-secondary/20 text-bg-base dark:text-ink-primary px-12 py-20">
      <div className="text-[11px] uppercase tracking-widest mb-8 opacity-60">
        Student Intelligence Report
      </div>
      <blockquote className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[32px] max-w-[800px] mb-6">
        &quot;The Superteam Academy curriculum didn&apos;t just teach me
        syntax—it taught me how to think in parallel execution. I went from a
        web2 dev to shipping my first DeFi protocol in 3 months.&quot;
      </blockquote>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 border border-bg-base bg-[#2b55c9]"></div>
        <div>
          <div className="font-bold uppercase tracking-widest">CYPHER_DOG</div>
          <div className="text-[11px] uppercase tracking-widest opacity-60">
            Lead Engineer @ Drift
          </div>
        </div>
      </div>
    </section>
  );
}
