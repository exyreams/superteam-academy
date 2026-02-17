'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function Counter({ end, duration = 2, prefix = '', suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsStrip() {
  const stats = [
    { label: "Active Students", value: 12402, prefix: '', suffix: '' },
    { label: "Nodes Validated", value: 856, prefix: '', suffix: '' },
    { label: "Bounties Won", value: 2.4, prefix: '$', suffix: 'M' },
    { label: "Job Placements", value: 92, prefix: '', suffix: '%' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border bg-bg-base">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`p-8 text-center border-b md:border-b-0 border-border ${
            index !== stats.length - 1 ? "md:border-r" : ""
          } ${index % 2 === 0 ? "border-r md:border-r-0" : ""}`}
        >
          <span className="block text-[11px] text-ink-secondary uppercase tracking-widest mb-2">
            {stat.label}
          </span>
          <span className="block font-display font-bold leading-[0.9] -tracking-[0.02em] text-[48px]">
            <Counter 
              end={stat.value} 
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          </span>
        </motion.div>
      ))}
    </div>
  );
}
