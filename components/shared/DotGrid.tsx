import { cn } from "@/lib/utils";

interface DotGridProps {
  className?: string;
}

export function DotGrid({ className }: DotGridProps) {
  return (
    <div 
      className={cn(
        "absolute inset-0 z-0 pointer-events-none",
        "bg-[radial-gradient(var(--color-ink-secondary)_1px,transparent_1px)]",
        "bg-size-[24px_24px]", 
        "opacity-20", // Increased from 15% to 20%
        className
      )} 
    />
  );
}
