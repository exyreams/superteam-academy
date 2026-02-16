export function StatsStrip() {
  const stats = [
    { label: "Active Students", value: "12,402" },
    { label: "Nodes Validated", value: "856" },
    { label: "Bounties Won", value: "$2.4M" },
    { label: "Job Placements", value: "92%" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-b border-ink-primary bg-bg-base">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`p-8 text-center border-b md:border-b-0 border-ink-primary ${
            index !== stats.length - 1 ? "md:border-r" : ""
          } ${index % 2 === 0 ? "border-r md:border-r-0" : ""}`}
        >
          <span className="block text-[11px] text-ink-secondary uppercase tracking-widest mb-2">
            {stat.label}
          </span>
          <span className="block font-display font-bold leading-[0.9] -tracking-[0.02em] text-[48px]">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
