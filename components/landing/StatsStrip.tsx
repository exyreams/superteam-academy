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
          <span className="block u-tiny text-ink-secondary u-caps mb-2">
            {stat.label}
          </span>
          <span className="block u-display text-[48px]">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
