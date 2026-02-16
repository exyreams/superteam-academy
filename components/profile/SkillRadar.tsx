'use client';

import { SkillRadar as SkillRadarType } from '@/lib/data/credentials';

interface SkillRadarProps {
  skills: SkillRadarType;
}

export function SkillRadar({ skills }: SkillRadarProps) {
  // Convert skill percentages to SVG polygon points
  // Pentagon with 5 points, rotated -18deg to have point at top
  const maxRadius = 40;
  const centerX = 50;
  const centerY = 50;
  
  const skillValues = [
    skills.rust,
    skills.anchor,
    skills.security,
    skills.frontend,
    skills.governance,
  ];
  
  const skillLabels = ['Rust', 'Anchor', 'Security', 'Frontend', 'Governance'];
  
  // Calculate polygon points for outer pentagon (100%)
  const outerPoints = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180); // Start from top, -90deg offset
    const x = centerX + maxRadius * Math.cos(angle);
    const y = centerY + maxRadius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');
  
  // Calculate polygon points for middle pentagon (60%)
  const middlePoints = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const x = centerX + (maxRadius * 0.6) * Math.cos(angle);
    const y = centerY + (maxRadius * 0.6) * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');
  
  // Calculate polygon points for skill data
  const dataPoints = skillValues.map((value, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const radius = (value / 100) * maxRadius;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');
  
  // Label positions (outside the pentagon)
  const labelPositions = skillLabels.map((_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const x = centerX + (maxRadius + 12) * Math.cos(angle);
    const y = centerY + (maxRadius + 12) * Math.sin(angle);
    return { x, y };
  });
  
  return (
    <div className="border border-ink-secondary p-6 bg-bg-base relative">
      <span className="text-[10px] uppercase tracking-widest font-bold block mb-4">
        APTITUDE_RADAR
      </span>
      
      <div className="w-full h-[240px] flex items-center justify-center relative">
        <svg viewBox="0 0 100 100" className="w-[200px] h-[200px]">
          {/* Outer pentagon grid */}
          <polygon
            points={outerPoints}
            fill="none"
            stroke="rgba(13,20,18,0.1)"
            strokeWidth="0.5"
          />
          
          {/* Middle pentagon grid */}
          <polygon
            points={middlePoints}
            fill="none"
            stroke="rgba(13,20,18,0.1)"
            strokeWidth="0.5"
          />
          
          {/* Data polygon */}
          <polygon
            points={dataPoints}
            fill="rgba(13,20,18,0.2)"
            stroke="var(--ink-primary)"
            strokeWidth="1.5"
          />
        </svg>
        
        {/* Labels */}
        {skillLabels.map((label, i) => (
          <div
            key={label}
            className="absolute text-[10px] uppercase tracking-widest"
            style={{
              left: `${labelPositions[i].x}%`,
              top: `${labelPositions[i].y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
