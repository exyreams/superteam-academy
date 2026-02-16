import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/ui/logo";

export function Navbar() {
  return (
    <nav className="h-16 border-b border-ink-primary flex items-center justify-between px-12 bg-bg-base sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Logo className="h-6 w-auto text-ink-primary" />
        <span className="font-bold uppercase tracking-widest text-[13px]">
          SUPERTEAM ACADEMY
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
        <ModeToggle />
      </div>
    </nav>
  );
}
