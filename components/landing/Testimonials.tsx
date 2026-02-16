export function Testimonials() {
  return (
    <section className="bg-ink-primary text-bg-base px-12 py-20">
      <div className="u-tiny u-caps mb-8 opacity-60">
        Student Intelligence Report
      </div>
      <blockquote className="u-display text-[32px] max-w-[800px] mb-6 leading-tight">
        &quot;The Superteam Academy curriculum didn&apos;t just teach me
        syntax—it taught me how to think in parallel execution. I went from a
        web2 dev to shipping my first DeFi protocol in 3 months.&quot;
      </blockquote>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 border border-bg-base bg-[#2b55c9]"></div>
        <div>
          <div className="u-bold uppercase">CYPHER_DOG</div>
          <div className="u-tiny u-caps opacity-60">
            Lead Engineer @ Drift
          </div>
        </div>
      </div>
    </section>
  );
}
