import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { DotGrid } from "@/components/shared/DotGrid";


// Newsletter Section
// Collects operator emails for technical updates and ecosystem opportunities.
export function Newsletter() {
  const t = useTranslations("Newsletter");

  return (
    <section className="py-16 md:py-20 px-6 md:px-12 border-t border-ink-secondary/20 dark:border-border bg-bg-base relative overflow-hidden">
      {/* Dot Grid Background */}
      {/* Dot Grid Background */}
      <DotGrid />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        {/* Newsletter Pitch */}
        <div>
          <h4 className="uppercase tracking-widest font-bold text-2xl mb-4">{t("title")}</h4>
          <p className="text-ink-secondary text-sm max-w-md">
            {t("description")}
          </p>
        </div>

        {/* Signup Form */}
        <div className="flex flex-col gap-4">
          <Input
            variant="landing"
            type="email"
            placeholder={t("placeholder")}
            className="w-full"
          />
          <Button
            variant="landingPrimary"
            className="rounded-none uppercase text-xs font-bold w-full py-4 h-auto"
          >
            {t("button")}
          </Button>
        </div>
      </div>
    </section>
  );
}
