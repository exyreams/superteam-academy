import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <section className="py-20 px-12 border-t border-ink-primary bg-bg-base">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h4 className="uppercase tracking-widest font-bold text-2xl mb-4">Newsletter</h4>
          <p className="text-ink-secondary text-sm max-w-md">
            Get weekly technical updates and ecosystem opportunities delivered
            straight to your inbox.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="OPERATOR@EMAIL.COM"
            className="bg-transparent border border-ink-primary p-4 w-full font-mono text-sm focus:outline-none focus:bg-[rgba(13,20,18,0.02)]"
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
