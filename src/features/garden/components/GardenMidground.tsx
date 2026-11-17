"use client";

import React from "react";
import { LayerProps } from "../types";
import { TOTAL_WORLD_WIDTH, worldXToDate } from "../utils/timeCoordinates";
import { getCurrentSeason } from "@/features/seasons/utils/seasonDetector";

const SEGMENT_WIDTH = 2400;
const NUM_SEGMENTS = Math.ceil(TOTAL_WORLD_WIDTH / SEGMENT_WIDTH);

export function GardenMidground({ className }: LayerProps) {
  const segments = Array.from({ length: NUM_SEGMENTS }, (_, i) => {
    const startX = i * SEGMENT_WIDTH;
    const centerDate = worldXToDate(startX + SEGMENT_WIDTH / 2);
    const season = getCurrentSeason(centerDate);
    return { index: i, startX, season };
  });

  return (
    <g className={className} style={{ filter: "url(#watercolor-bleed)" }}>
      <defs>
        <radialGradient id="moss-mound-wash" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#788b68" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#5d704e" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#435237" stopOpacity="0.75" />
        </radialGradient>

        <linearGradient id="rock-shade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#b4aba0" />
          <stop offset="60%" stopColor="#968c7e" />
          <stop offset="100%" stopColor="#756b5e" />
        </linearGradient>
      </defs>

      {segments.map(({ index, startX, season }) => (
        <g key={`mid-segment-${index}`} transform={`translate(${startX}, 0)`}>
          {/* Weathered Moss Mound near x=160 */}
          <g transform="translate(160, 560)">
            <ellipse cx="0" cy="0" rx="34" ry="16" fill="url(#moss-mound-wash)" />
            <g stroke="#3a4835" strokeWidth="0.85" fill="none" strokeLinecap="round">
              <path d="M-12,-4 Q-16,-18 -12,-24" />
              <path d="M-8,-2 Q-10,-15 -5,-20" />
              <path d="M-2,-3 Q0,-16 6,-22" />
              <path d="M4,-4 Q8,-14 12,-18" />
            </g>
          </g>

          {/* Group of River Stones near x=460 */}
          <g transform="translate(460, 580)">
            <ellipse cx="0" cy="0" rx="26" ry="14" fill="url(#rock-shade)" stroke="#4e4539" strokeWidth="0.9" />
            <ellipse cx="22" cy="6" rx="18" ry="10" fill="url(#rock-shade)" stroke="#4e4539" strokeWidth="0.8" />
            <ellipse cx="-18" cy="4" rx="15" ry="9" fill="url(#rock-shade)" stroke="#4e4539" strokeWidth="0.7" />
          </g>

          {/* Mountain Fern near x=820 */}
          <g transform="translate(820, 545)">
            <g stroke="#435538" strokeWidth="0.8" fill="none" strokeLinecap="round">
              <path d="M0,20 Q-18,-6 -34,-16" />
              <path d="M-10,12 Q-20,4 -24,-2" />
              <path d="M-16,6 Q-26,-2 -30,-8" />
              <path d="M2,20 Q12,-10 28,-22" />
              <path d="M8,10 Q18,2 22,-4" />
              <path d="M14,4 Q24,-4 26,-12" />
              <path d="M0,20 Q2,-16 0,-32" />
            </g>
          </g>

          {/* Seasonal Botanical Feature (adapts gracefully to the season of this calendar date) */}
          {season.name === "autumn" && (
            <g transform="translate(1240, 575)">
              {/* Cinnabar maple leaf & ochre sprigs */}
              <path d="M0,0 Q6,-6 10,-2 Q14,-8 16,-3 Q20,-6 18,2 Q12,6 8,4 Q2,6 0,0 Z" fill="#b94f38" opacity="0.75" />
              <path d="M22,6 Q30,-2 36,4 Q32,12 24,10 Z" fill="#caa34d" opacity="0.8" />
              {/* Velvet moss cushion */}
              <ellipse cx="40" cy="15" rx="28" ry="12" fill="url(#moss-mound-wash)" />
            </g>
          )}

          {season.name === "winter" && (
            <g transform="translate(1240, 575)">
              {/* Quiet winter stone with Camellia blossom */}
              <ellipse cx="0" cy="0" rx="28" ry="14" fill="url(#rock-shade)" stroke="#4a4237" strokeWidth="0.85" />
              <circle cx="18" cy="-4" r="3.5" fill="#9a6575" opacity="0.85" />
              <circle cx="18" cy="-4" r="1.2" fill="#dca0ac" />
            </g>
          )}

          {season.name === "spring" && (
            <g transform="translate(1240, 575)">
              {/* Tender green shoots and Sakura wildflower cluster */}
              <g stroke="#5d6e52" strokeWidth="0.75" fill="none">
                <path d="M0,15 Q-4,2 -8,-8" />
                <path d="M2,15 Q4,4 10,-6" />
              </g>
              <circle cx="-8" cy="-8" r="3.2" fill="#c797a2" opacity="0.85" />
              <circle cx="10" cy="-6" r="3" fill="#c797a2" opacity="0.85" />
            </g>
          )}

          {season.name === "summer" && (
            <g transform="translate(1240, 575)">
              {/* Muted Indigo Wildflowers and lush grass */}
              <ellipse cx="0" cy="0" rx="32" ry="15" fill="url(#moss-mound-wash)" />
              <circle cx="-10" cy="-14" r="2.8" fill="#56697a" opacity="0.85" />
              <circle cx="8" cy="-12" r="2.6" fill="#56697a" opacity="0.85" />
            </g>
          )}

          {/* Woodland Mushroom cluster near x=1680 */}
          <g transform="translate(1680, 580)">
            <path d="M0,10 L0,2" stroke="#d5c8b5" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M-6,2 Q0,-5 6,2 Z" fill="#b87455" stroke="#4a3528" strokeWidth="0.5" />
            <path d="M7,11 L8,4" stroke="#d5c8b5" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M3,4 Q8,-1 13,4 Z" fill="#caa34d" stroke="#4a3528" strokeWidth="0.5" />
          </g>

          {/* Weathered Stone & Fern near x=2080 */}
          <g transform="translate(2080, 565)">
            <ellipse cx="0" cy="0" rx="28" ry="14" fill="url(#rock-shade)" stroke="#463e33" strokeWidth="0.8" />
            <g stroke="#3f5235" strokeWidth="0.75" fill="none" strokeLinecap="round">
              <path d="M12,4 Q24,-10 40,-18" />
              <path d="M18,0 Q26,-6 30,-12" />
              <path d="M24,-4 Q32,-10 36,-16" />
            </g>
          </g>
        </g>
      ))}
    </g>
  );
}
