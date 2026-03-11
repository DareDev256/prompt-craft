"use client";

import { motion } from "framer-motion";
import { COSTARScore, DIMENSION_LABELS } from "@/lib/costar";

interface COSTARRadarProps {
  score: COSTARScore;
  /** px size of the chart (square) */
  size?: number;
}

const DIMENSIONS = Object.keys(DIMENSION_LABELS) as (keyof COSTARScore & string)[];
const MAX_VAL = 5;

/** Convert a dimension index + value to an SVG point on the hex. */
function toPoint(index: number, value: number, cx: number, cy: number, radius: number) {
  const angle = (Math.PI * 2 * index) / DIMENSIONS.length - Math.PI / 2;
  const r = (value / MAX_VAL) * radius;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function polygonPoints(values: number[], cx: number, cy: number, radius: number): string {
  return values
    .map((v, i) => {
      const p = toPoint(i, v, cx, cy, radius);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

export function COSTARRadar({ score, size = 200 }: COSTARRadarProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.38;

  const values = DIMENSIONS.map((d) => score[d] as number);
  const scorePoints = polygonPoints(values, cx, cy, radius);

  // Concentric rings at 20/40/60/80/100%
  const rings = [1, 2, 3, 4, 5];

  return (
    <div className="relative" style={{ width: size, height: size }} role="img" aria-label={`COSTAR radar chart. ${DIMENSIONS.map((d, i) => `${DIMENSION_LABELS[d]}: ${values[i]} of 5`).join(", ")}`}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        {/* Concentric hex rings */}
        {rings.map((ring) => (
          <polygon
            key={ring}
            points={polygonPoints(DIMENSIONS.map(() => ring), cx, cy, radius)}
            fill="none"
            stroke="rgba(255,140,0,0.08)"
            strokeWidth={ring === MAX_VAL ? 1.5 : 0.5}
          />
        ))}

        {/* Axis lines from center to each vertex */}
        {DIMENSIONS.map((_, i) => {
          const p = toPoint(i, MAX_VAL, cx, cy, radius);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,140,0,0.12)"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Score polygon — animated */}
        <motion.polygon
          points={polygonPoints(DIMENSIONS.map(() => 0), cx, cy, radius)}
          animate={{ points: scorePoints }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          fill="rgba(255,140,0,0.15)"
          stroke="#ff8c00"
          strokeWidth={2}
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(255,140,0,0.5))" }}
        />

        {/* Score vertices — glowing dots */}
        {DIMENSIONS.map((d, i) => {
          const p = toPoint(i, values[i], cx, cy, radius);
          const p0 = toPoint(i, 0, cx, cy, radius);
          return (
            <motion.circle
              key={d}
              r={3}
              fill="#ff8c00"
              initial={{ cx: p0.x, cy: p0.y, opacity: 0 }}
              animate={{ cx: p.x, cy: p.y, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + i * 0.05 }}
              style={{ filter: "drop-shadow(0 0 4px #ff8c00)" }}
            />
          );
        })}

        {/* Axis labels */}
        {DIMENSIONS.map((d, i) => {
          const labelRadius = radius + 18;
          const p = toPoint(i, MAX_VAL, cx, cy, labelRadius);
          return (
            <text
              key={d}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-pixel"
              style={{
                fontSize: "6px",
                fill: values[i] >= 3 ? "#ff8c00" : values[i] >= 1 ? "rgba(255,215,0,0.5)" : "rgba(255,68,68,0.4)",
              }}
            >
              {DIMENSION_LABELS[d]}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
