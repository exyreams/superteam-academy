/**
 * @fileoverview Radar chart component for visualizing user skill aptitudes.
 */
"use client";

import {
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
	ResponsiveContainer,
} from "recharts";
import { SkillRadar as SkillRadarType } from "@/lib/data/credentials";

interface SkillRadarProps {
	skills: SkillRadarType;
}

export function SkillRadar({ skills }: SkillRadarProps) {
	const data = [
		{ subject: "Rust", A: skills.rust, fullMark: 100 },
		{ subject: "Anchor", A: skills.anchor, fullMark: 100 },
		{ subject: "Security", A: skills.security, fullMark: 100 },
		{ subject: "Frontend", A: skills.frontend, fullMark: 100 },
		{ subject: "Governance", A: skills.governance, fullMark: 100 },
	];

	return (
		<div className="border border-border p-6 bg-bg-surface relative h-full min-h-[300px] flex flex-col">
			<span className="text-[10px] uppercase tracking-widest font-bold block mb-4">
				APTITUDE_RADAR
			</span>

			<div className="flex-1 w-full h-full min-h-[200px]">
				<ResponsiveContainer width="100%" height="100%">
					<RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
						<PolarGrid stroke="var(--ink-secondary)" strokeOpacity={0.2} />
						<PolarAngleAxis
							dataKey="subject"
							tick={{
								fill: "var(--ink-primary)",
								fontSize: 10,
								fontWeight: "bold",
							}}
						/>
						<PolarRadiusAxis
							angle={30}
							domain={[0, 100]}
							tick={false}
							axisLine={false}
						/>
						<Radar
							name="Skills"
							dataKey="A"
							stroke="var(--ink-primary)"
							strokeWidth={2}
							fill="var(--ink-primary)"
							fillOpacity={0.1}
						/>
					</RadarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
