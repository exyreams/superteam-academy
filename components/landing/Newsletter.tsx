import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


// Newsletter Section
// Collects operator emails for technical updates and ecosystem opportunities.
export function Newsletter() {
  return (
    <section className="py-20 px-12 border-t border-ink-secondary/20 dark:border-border bg-bg-base">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Newsletter Pitch */}
        <div>
          <h4 className="uppercase tracking-widest font-bold text-2xl mb-4">Newsletter</h4>
          <p className="text-ink-secondary text-sm max-w-md">
            Get weekly technical updates and ecosystem opportunities delivered
            straight to your inbox.
          </p>
        </div>

        {/* Signup Form */}
        <div className="flex flex-col gap-4">
          <Input
            variant="landing"
            type="email"
            placeholder="OPERATOR@EMAIL.COM"
            className="w-full"
          />
          <Button
            variant="landingPrimary"
            className="rounded-none uppercase text-xs font-bold w-full py-4 h-auto"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
