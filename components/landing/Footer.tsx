import Link from "next/link";
import { Logo } from "@/components/ui/logo";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Footer() {
  return (
    <footer className="bg-bg-base border-t border-ink-primary">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-20">
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Logo className="h-6 w-auto text-ink-primary" />
              <span className="font-bold uppercase tracking-widest text-[13px]">
                SUPERTEAM ACADEMY
              </span>
            </div>
            <p className="text-ink-secondary text-[11px] max-w-[200px]">
              The decentralized university for the Solana ecosystem. Owned by
              the students.
            </p>

            <div className="mt-8">
              <Select defaultValue="en">
                <SelectTrigger className="w-auto border-none p-0 h-auto bg-transparent text-ink-secondary hover:text-ink-primary font-mono text-[11px] uppercase ring-offset-0 focus:ring-0 flex justify-start gap-2 shadow-none data-placeholder:text-ink-secondary">
                  <span className="font-bold text-ink-primary">Language:</span>{" "}
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English (EN)</SelectItem>
                  <SelectItem value="es">Español (ES)</SelectItem>
                  <SelectItem value="pt-br">Português (PT-BR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-8 text-[11px] text-ink-secondary uppercase tracking-widest">
            © 2026 Superteam Academy // All rights reserved
          </div>
        </div>

        <div>
          <h4 className="uppercase tracking-widest text-ink-secondary text-[11px] mb-6">Network</h4>
          <ul className="flex flex-col gap-3">
            {[
              "Course Catalog",
              "Scholarships",
              "Mentorship",
              "Documentation",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-ink-secondary text-[11px] hover:text-ink-primary transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="uppercase tracking-widest text-ink-secondary text-[11px] mb-6">Socials</h4>
          <ul className="flex flex-col gap-3">
            {["Twitter / X", "Discord", "GitHub", "LinkedIn"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-ink-secondary text-[11px] hover:text-ink-primary transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>


      </div>
    </footer>
  );
}
