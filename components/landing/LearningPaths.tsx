import Link from "next/link";
import { cn } from "@/lib/utils";

const tracks = [
  {
    path: "Path 01 // Beginner",
    title: "SOLANA FUNDAMENTALS",
    desc: "Master the base layer. Accounts, transactions, and the Sealevel runtime.",
    progress: 1, // 1 active out of 4
    meta: "12 MODULES // 40 XP",
  },
  {
    path: "Path 02 // Intermediate",
    title: "ANCHOR FRAMEWORK",
    desc: "Rapid program development using the industry-standard Rust DSL.",
    progress: 2, // 2 active out of 4
    meta: "8 MODULES // 120 XP",
  },
  {
    path: "Path 03 // Advanced",
    title: "PROTOCOL SECURITY",
    desc: "Audit techniques, common attack vectors, and invariant testing.",
    progress: 3, // 3 active out of 4
    meta: "15 MODULES // 300 XP",
  },
];

export function LearningPaths() {
  return (
    <section className="px-12 py-20 border-b border-ink-primary">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="u-tiny u-caps u-dim block mb-2">
            Available Operations
          </span>
          <h2 className="u-display text-[48px]">LEARNING PATHS</h2>
        </div>
        <Link
          href="#"
          className="text-ink-primary text-[11px] font-bold u-caps hover:opacity-60 transition-opacity"
        >
          View all tracks —&gt;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track, i) => (
          <div
            key={i}
            className="border border-ink-secondary p-8 relative bg-[rgba(255,255,255,0.2)]"
          >
            {/* Corner Accent */}
            <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-ink-primary" />

            <div className="u-tiny u-dim u-caps mb-2">{track.path}</div>
            <h3 className="u-display text-[32px] mb-3">{track.title}</h3>
            <p className="u-dim text-sm mb-6 min-h-[40px]">{track.desc}</p>

            <div className="h-[2px] bg-line-grid my-6 flex gap-1">
              {[0, 1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={cn(
                    "flex-1 h-full",
                    step <= track.progress
                      ? "bg-ink-primary"
                      : "bg-ink-tertiary"
                  )}
                />
              ))}
            </div>

            <span className="u-tiny u-bold">{track.meta}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
