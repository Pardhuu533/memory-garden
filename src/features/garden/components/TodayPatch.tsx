"use client";

import React from "react";
import { TODAY_WORLD_X } from "../utils/timeCoordinates";

interface TodayPatchProps {
  x?: number;
  y?: number;
  className?: string;
}

/**
 * Today's Empty Patch
 * Anchored to the exact date coordinate of Today (TODAY_WORLD_X).
 * A small naturally cleared piece of fertile garden earth.
 * Non-clickable, peaceful, authentic part of the landscape.
 */
export function TodayPatch({ x = TODAY_WORLD_X, y = 645, className, onOpen }: TodayPatchProps & { onOpen?: () => void }) {
  const handleOpen = () => {
    onOpen?.();
  };
  const handleKeyDown = (e: React.KeyboardEvent<SVGGElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen?.();
    }
  };
  return (
    <g transform={`translate(${x}, ${y})`} className={className} style={{ filter: "url(#watercolor-bleed)" }} role="button" tabIndex={0} aria-label="Write today's memory" onClick={handleOpen} onKeyDown={handleKeyDown}>
      <defs>
        {/* Soft, rich moist soil pigment wash */}
        <radialGradient id="patch-earth-wash" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#8d745c" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#7a624b" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#685440" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#554432" stopOpacity="0.2" />
        </radialGradient>

        <linearGradient id="patch-moss-edge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#687c5c" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4f6044" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Gentle soft ground depression shadow */}
      <ellipse
        cx="0"
        cy="6"
        rx="68"
        ry="32"
        fill="#3b3127"
        opacity="0.12"
      />

      {/* Main fertile earth clearing */}
      <path
        d="M-58,-2 
           C-52,-20 -25,-26 4,-24 
           C32,-22 56,-14 62,3 
           C68,18 48,28 15,30 
           C-22,32 -54,24 -62,8 
           C-66,-1 -62,-8 -58,-2 Z"
        fill="url(#patch-earth-wash)"
      />

      {/* Organic rim of soft velvet moss framing the opening */}
      <path
        d="M-64,5 
           C-68,-10 -40,-26 2,-25 
           C42,-24 68,-8 64,12 
           C60,26 30,34 -8,32 
           C-44,30 -62,18 -64,5 Z"
        fill="none"
        stroke="url(#patch-moss-edge)"
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* Subtle organic sumi ink texture marks (tilled soil & quiet raked grain) */}
      <g stroke="#3e3227" strokeWidth="0.7" fill="none" opacity="0.45" strokeLinecap="round">
        {/* Soft hand-drawn contour lines of the cleared patch */}
        <path d="M-42,-2 Q-10,-12 28,-4" />
        <path d="M-36,8 Q2,2 38,7" />
        <path d="M-28,16 Q-2,12 24,18" />

        {/* Small gentle soil crumb marks */}
        <line x1="-15" y1="-6" x2="-12" y2="-6" strokeWidth="1.2" stroke="#4a3a2d" />
        <line x1="8" y1="4" x2="12" y2="4" strokeWidth="1.2" stroke="#4a3a2d" />
        <line x1="-4" y1="14" x2="0" y2="14" strokeWidth="1.2" stroke="#4a3a2d" />
        <line x1="22" y1="-1" x2="25" y2="-1" strokeWidth="1.2" stroke="#4a3a2d" />
      </g>

      {/* Delicate wild grass blades sprouting at the cleared patch edge */}
      <g stroke="#4f6044" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.8">
        {/* Left cluster */}
        <path d="M-56,2 Q-60,-12 -58,-18" />
        <path d="M-53,4 Q-54,-10 -49,-16" />
        <path d="M-50,6 Q-48,-8 -42,-14" />

        {/* Top-right cluster */}
        <path d="M42,-12 Q46,-24 44,-30" />
        <path d="M46,-10 Q52,-22 55,-27" />
        <path d="M50,-6 Q58,-16 62,-20" />

        {/* Bottom subtle shoots */}
        <path d="M-18,28 Q-22,38 -20,44" stroke="#5a6d4e" />
        <path d="M12,29 Q16,39 20,45" stroke="#5a6d4e" />
      </g>

      {/* Tiny soft cinnabar / ochre botanical petal or natural earth speck */}
      <circle cx="-24" cy="5" r="1.5" fill="#b94f38" opacity="0.6" />
      <circle cx="28" cy="12" r="1.2" fill="#c4925e" opacity="0.6" />
    </g>
  );
}
