"use client";

import React from "react";
import { LayerProps } from "../types";
import { TOTAL_WORLD_WIDTH } from "../utils/timeCoordinates";

const SEGMENT_WIDTH = 2400;
const NUM_SEGMENTS = Math.ceil(TOTAL_WORLD_WIDTH / SEGMENT_WIDTH);

export function GardenPath({ className }: LayerProps) {
  const segments = Array.from({ length: NUM_SEGMENTS }, (_, i) => ({
    index: i,
    startX: i * SEGMENT_WIDTH,
  }));

  return (
    <g className={className} style={{ filter: "url(#watercolor-bleed)" }}>
      <defs>
        <linearGradient id="path-soil-wash" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d9cbb6" stopOpacity="0.55" />
          <stop offset="18%" stopColor="#cbb89f" stopOpacity="0.65" />
          <stop offset="35%" stopColor="#d4c3ab" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#c5b297" stopOpacity="0.75" />
          <stop offset="68%" stopColor="#d2c1aa" stopOpacity="0.55" />
          <stop offset="85%" stopColor="#c9b69c" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#d6c7b1" stopOpacity="0.55" />
        </linearGradient>

        <linearGradient id="stone-wash" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#beb5a6" />
          <stop offset="100%" stopColor="#9e9382" />
        </linearGradient>
      </defs>

      {segments.map(({ index, startX }) => (
        <g key={`path-segment-${index}`} transform={`translate(${startX}, 0)`}>
          {/* Main winding path ribbon */}
          <path
            d="M0,680 
               C220,670 420,695 620,665 
               C820,635 1020,655 1250,640 
               C1460,625 1680,650 1900,645 
               C2080,640 2260,670 2400,680
               L2400,725 
               C2260,715 2080,690 1900,690 
               C1680,695 1460,670 1250,685 
               C1020,700 820,680 620,710 
               C420,740 220,715 0,725 Z"
            fill="url(#path-soil-wash)"
            opacity="0.85"
          />

          {/* Broken hand-drawn sumi ink contours */}
          <g stroke="#6e6252" strokeWidth="0.65" fill="none" opacity="0.45">
            <path
              d="M0,682 
                 Q220,672 420,697 
                 T820,637 
                 Q1020,657 1250,642 
                 T1680,652 
                 Q1900,647 2080,642 
                 T2400,682"
              strokeDasharray="18 6 12 8 24 5"
            />
            <path
              d="M0,723 
                 Q220,713 420,738 
                 T820,678 
                 Q1020,698 1250,683 
                 T1680,693 
                 Q1900,688 2080,688 
                 T2400,723"
              strokeDasharray="14 8 22 5 10 7"
            />
          </g>

          {/* Stepping stones scattered along the path */}
          <g opacity="0.75">
            <ellipse cx="240" cy="695" rx="17" ry="9" fill="url(#stone-wash)" stroke="#4a4237" strokeWidth="0.75" />
            <ellipse cx="520" cy="685" rx="19" ry="10" fill="url(#stone-wash)" stroke="#4a4237" strokeWidth="0.75" />
            <ellipse cx="860" cy="660" rx="18" ry="10" fill="url(#stone-wash)" stroke="#4a4237" strokeWidth="0.75" />
            <ellipse cx="1180" cy="665" rx="21" ry="11" fill="url(#stone-wash)" stroke="#4a4237" strokeWidth="0.75" />
            <ellipse cx="1520" cy="655" rx="19" ry="10" fill="url(#stone-wash)" stroke="#4a4237" strokeWidth="0.75" />
            <ellipse cx="1860" cy="665" rx="22" ry="11" fill="url(#stone-wash)" stroke="#4a4237" strokeWidth="0.75" />
            <ellipse cx="2180" cy="680" rx="18" ry="9" fill="url(#stone-wash)" stroke="#4a4237" strokeWidth="0.75" />
          </g>
        </g>
      ))}
    </g>
  );
}
