"use client";

import React from "react";
import { LayerProps } from "../types";
import { TOTAL_WORLD_WIDTH, worldXToDate } from "../utils/timeCoordinates";
import { getCurrentSeason } from "@/features/seasons/utils/seasonDetector";

const SEGMENT_WIDTH = 2400;
const NUM_SEGMENTS = Math.ceil(TOTAL_WORLD_WIDTH / SEGMENT_WIDTH);

export function GardenForeground({ className }: LayerProps) {
  const segments = Array.from({ length: NUM_SEGMENTS }, (_, i) => {
    const startX = i * SEGMENT_WIDTH;
    const centerDate = worldXToDate(startX + SEGMENT_WIDTH / 2);
    const season = getCurrentSeason(centerDate);
    return { index: i, startX, season };
  });

  return (
    <g className={className} style={{ filter: "url(#watercolor-bleed)" }}>
      <defs>
        {/* Layer 1: Mid-foreground terrain wash */}
        <linearGradient id="ground-wash-upper" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7a8d6e" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#677a5b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#546648" stopOpacity="0.95" />
        </linearGradient>

        {/* Layer 2: Main foreground terrain wash */}
        <linearGradient id="ground-wash-lower" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5f7253" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#4f6144" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#3d4d33" stopOpacity="1" />
        </linearGradient>

        {/* Deep earth base fill */}
        <linearGradient id="deep-earth-base" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#48583c" />
          <stop offset="60%" stopColor="#3b4831" />
          <stop offset="100%" stopColor="#2e3826" />
        </linearGradient>
      </defs>

      {segments.map(({ index, startX }) => (
        <g key={`fg-segment-${index}`} transform={`translate(${startX}, 0)`}>
          {/* Upper Rolling Grassy Knoll Bank (Seamless entry/exit at y=600) */}
          <path
            d="M0,600 
               Q220,530 480,560 
               T1020,520 
               Q1320,580 1580,540 
               T2140,510 
               Q2300,560 2400,600 
               L2400,900 L0,900 Z"
            fill="url(#ground-wash-upper)"
          />

          {/* Sumi ink contour line along the upper knoll */}
          <path
            d="M0,602 
               Q220,532 480,562 
               T1020,522 
               Q1320,582 1580,542 
               T2140,512 
               Q2300,562 2400,602"
            stroke="#3c4a35"
            strokeWidth="0.8"
            strokeDasharray="24 6 16 8 32 4"
            fill="none"
            opacity="0.5"
          />

          {/* Main Foreground Rolling Terraces (Seamless entry/exit at y=710) */}
          <path
            d="M0,710 
               Q180,650 420,680 
               T920,640 
               Q1200,700 1460,665 
               T1980,660 
               Q2220,700 2400,710 
               L2400,900 L0,900 Z"
            fill="url(#ground-wash-lower)"
          />

          {/* Main terrace contour line */}
          <path
            d="M0,712 
               Q180,652 420,682 
               T920,642 
               Q1200,702 1460,667 
               T1980,662 
               Q2220,702 2400,712"
            stroke="#2c3826"
            strokeWidth="0.9"
            strokeDasharray="18 5 30 7 12 6"
            fill="none"
            opacity="0.6"
          />

          {/* Low Ground Bank Anchoring the Viewport Bottom (Seamless entry/exit at y=790) */}
          <path
            d="M0,790 
               Q280,740 580,770 
               T1180,750 
               Q1520,810 1840,775 
               T2400,790 
               L2400,900 L0,900 Z"
            fill="url(#deep-earth-base)"
          />

          {/* Delicate Grass Tufts along the foreground banks */}
          <g stroke="#283421" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.65">
            <g transform="translate(180, 705)">
              <path d="M0,0 Q-4,-12 -2,-18" />
              <path d="M3,0 Q5,-14 9,-19" />
              <path d="M-3,0 Q-8,-10 -11,-15" />
            </g>
            <g transform="translate(680, 665)">
              <path d="M0,0 Q-3,-14 0,-22" />
              <path d="M4,0 Q8,-16 12,-20" />
            </g>
            <g transform="translate(1380, 660)">
              <path d="M0,0 Q-6,-14 -3,-22" />
              <path d="M3,0 Q0,-16 6,-24" />
              <path d="M6,0 Q12,-12 16,-18" />
            </g>
            <g transform="translate(1960, 665)">
              <path d="M0,0 Q-4,-14 -2,-20" />
              <path d="M3,0 Q5,-15 10,-21" />
            </g>
          </g>
        </g>
      ))}
    </g>
  );
}
