"use client";

import React from "react";
import { LayerProps } from "../types";
import { TOTAL_WORLD_WIDTH, WORLD_HEIGHT, worldXToDate } from "../utils/timeCoordinates";
import { getCurrentSeason } from "@/features/seasons/utils/seasonDetector";

const SEGMENT_WIDTH = 2400;
const NUM_SEGMENTS = Math.ceil(TOTAL_WORLD_WIDTH / SEGMENT_WIDTH); // 18 segments

export function GardenBackground({ className }: LayerProps) {
  const segments = Array.from({ length: NUM_SEGMENTS }, (_, i) => {
    const startX = i * SEGMENT_WIDTH;
    const centerDate = worldXToDate(startX + SEGMENT_WIDTH / 2);
    const season = getCurrentSeason(centerDate);
    return { index: i, startX, season };
  });

  return (
    <g className={className} style={{ filter: "url(#watercolor-bleed)" }}>
      <defs>
        <linearGradient id="sky-wash" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e4eaec" stopOpacity="0.45" />
          <stop offset="35%" stopColor="#f3eee3" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#faf6ee" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="mist-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#faf6ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#f3ebd9" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#faf6ee" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Sky subtle atmospheric wash across full world width */}
      <rect x="0" y="0" width={TOTAL_WORLD_WIDTH} height={WORLD_HEIGHT * 0.65} fill="url(#sky-wash)" />

      {/* Render continuous modular landscape segments across the entire calendar buffer */}
      {segments.map(({ index, startX, season }) => (
        <g key={`bg-segment-${index}`} transform={`translate(${startX}, 0)`}>
          {/* Atmospheric soft clouds / mist */}
          <g opacity="0.32">
            <path
              d="M100,90 Q280,60 480,85 T950,80 Q1100,105 1300,90 T1800,85 Q2050,70 2300,85 L2400,160 L0,160 Z"
              fill="#f0eae0"
            />
            <path
              d="M50,55 Q200,35 380,50 T750,45 Q900,65 1100,55 T1600,50 Q1900,68 2200,55 L2400,120 L0,120 Z"
              fill="#ebf0f2"
              opacity="0.6"
            />
          </g>

          {/* Far Distant Mountain Ridges with Seasonal Ground Wash Tint */}
          <path
            d="M0,320 
               Q180,240 380,270 
               T820,230 
               Q1080,290 1340,250 
               T1840,210 
               Q2120,270 2400,320 
               L2400,600 L0,600 Z"
            fill={season.palette.groundWash}
            opacity="0.45"
          />

          {/* Distant soft sumi ink ridge line */}
          <path
            d="M0,322 
               Q180,242 380,272 
               T820,232 
               Q1080,292 1340,252 
               T1840,212 
               Q2120,272 2400,322"
            stroke="#7c8879"
            strokeWidth="0.8"
            strokeDasharray="8 4 12 3"
            opacity="0.3"
            fill="none"
          />

          {/* Mid-distance Rolling Misty Hills */}
          <path
            d="M0,410 
               Q240,330 520,370 
               T1080,320 
               Q1380,390 1660,345 
               T2220,310 
               Q2320,360 2400,410 
               L2400,700 L0,700 Z"
            fill={season.palette.groundWash}
            opacity="0.7"
          />

          {/* Distant Tree & Grove Silhouettes adapted subtly to season */}
          <g opacity="0.35" fill={season.palette.foliageHues[0] || "#4a5647"}>
            {/* Cluster A */}
            <path
              d="M280,365 Q285,330 290,365 M295,360 Q302,320 310,360 M315,368 Q320,335 328,368 M340,362 Q348,315 358,362 Z"
              stroke="#3b4638"
              strokeWidth="1.5"
            />
            <ellipse cx="300" cy="345" rx="18" ry="12" />
            <ellipse cx="345" cy="340" rx="22" ry="14" />

            {/* Bamboo cluster near x=740 */}
            <g stroke="#3a4838" strokeWidth="1" opacity="0.6" fill="none">
              <line x1="720" y1="345" x2="722" y2="300" />
              <line x1="728" y1="340" x2="732" y2="295" />
              <line x1="735" y1="342" x2="738" y2="298" />
              <line x1="744" y1="345" x2="746" y2="305" />
            </g>

            {/* Distant Pine silhouette near x=1420 */}
            <path
              d="M1410,335 Q1418,290 1425,335 M1430,330 Q1442,280 1455,330 M1460,338 Q1468,300 1475,338 Z"
              stroke="#2d382c"
              strokeWidth="1.5"
            />
            <ellipse cx="1435" cy="305" rx="16" ry="8" />
            <ellipse cx="1450" cy="295" rx="20" ry="10" />

            {/* Cluster B near x=1920 */}
            <ellipse cx="1900" cy="335" rx="26" ry="15" opacity="0.6" />
            <ellipse cx="1935" cy="328" rx="32" ry="18" opacity="0.7" />
            <ellipse cx="1975" cy="334" rx="24" ry="14" opacity="0.6" />
          </g>

          {/* Atmospheric Horizon Mist */}
          <rect x="0" y="360" width={SEGMENT_WIDTH} height="160" fill="url(#mist-gradient)" />
        </g>
      ))}
    </g>
  );
}
