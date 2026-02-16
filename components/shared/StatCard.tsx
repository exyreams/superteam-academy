'use client';

interface StatCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export function StatCard({ label, value, className = '' }: StatCardProps) {
  return (
    <div className={className}>
      <span className="text-[10px] uppercase tracking-widest text-ink-secondary block mb-1">
        {label}
      </span>
      <div className="font-display text-2xl leading-none">
        {value}
      </div>
    </div>
  );
}
