import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="h-16 border-b border-ink-primary flex items-center justify-between px-12 bg-bg-base sticky top-0 z-100">
      <div className="flex items-center gap-4">
        <span className="u-bold u-caps text-[13px]">
          SUPERTEAM_ACADEMY // V.2.11
        </span>
      </div>
      <div className="flex gap-8">
        {["Curriculum", "Ecosystem", "Bounties", "Leaderboard"].map((item) => (
          <Link
            key={item}
            href="#"
            className="text-ink-primary text-[11px] font-bold u-caps hover:opacity-60 transition-opacity"
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="flex gap-4">
        <Button
          asChild
          variant="landingSecondary"
          className="rounded-none uppercase text-xs font-bold px-4 py-2 h-auto gap-3"
        >
          <Link href="#">Login</Link>
        </Button>
        <Button
          asChild
          variant="landingPrimary"
          className="rounded-none uppercase text-xs font-bold px-4 py-2 h-auto gap-3"
        >
          <Link href="#">Initialize</Link>
        </Button>
      </div>
    </nav>
  );
}
