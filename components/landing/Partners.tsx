'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';


const PartnerLogo = ({ name, src }: { name: string; src: string }) => (
  <Image 
    src={src} 
    alt={name}
    width={120}
    height={40}
    className="h-8 w-auto brightness-0 dark:invert transition-all opacity-70 hover:opacity-100"
  />
);

export function Partners() {
  const partners = [
    { name: "Solana", src: "/images/partners/solana.svg", showLabel: true },
    { name: "Jupiter", src: "/images/partners/jupyter.svg", showLabel: true },
    { name: "Helium", src: "/images/partners/helium.svg", showLabel: true },
    { name: "Hivemapper", src: "/images/partners/hivemapper.svg", showLabel: false }, // Text in logo
    { name: "Drift", src: "/images/partners/drift.svg", showLabel: true },
  ];

  // Duplicate the array enough times to ensure seamless loop on wide screens
  // 4x duplication ensures we have enough content to scroll smoothly
  const infinitePartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <div className="border-b border-ink-primary overflow-hidden py-10 flex relative z-0 bg-bg-base">
      <motion.div
        className="flex gap-24 items-center whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          },
        }}
      >
        {infinitePartners.map((partner, i) => (
          <div
            key={`${partner.name}-${i}`}
            className="flex items-center gap-2 grayscale opacity-60 hover:opacity-100 transition-all cursor-pointer group"
          >
            <PartnerLogo name={partner.name} src={partner.src} />
            {partner.showLabel && (
              <span className="uppercase tracking-widest font-bold text-xl text-ink-primary group-hover:text-ink-primary">
                {partner.name}
              </span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
