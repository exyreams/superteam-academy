export function Partners() {
  const partners = [
    "SOLANA FOUNDATION",
    "JUPITER",
    "HELIUM",
    "HIVE_MAPPER",
    "DRIFT_PROTOCOL",
  ];

  return (
    <div className="px-12 py-10 border-b border-ink-primary flex justify-between items-center opacity-60 grayscale">
      {partners.map((partner) => (
        <span key={partner} className="u-caps u-bold text-lg">
          {partner}
        </span>
      ))}
    </div>
  );
}
