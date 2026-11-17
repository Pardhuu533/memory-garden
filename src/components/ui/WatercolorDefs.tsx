"use client";

import React from "react";

/**
 * Shared SVG filter definitions for watercolor pigment bleeding,
 * hand-drawn ink roughness, and physical paper fibers.
 */
export function WatercolorDefs() {
  return (
    <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
      <defs>
        {/* Subtle watercolor edge bleed filter */}
        <filter id="watercolor-bleed" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="0.4" result="blurred" />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" opacity="0.85" />
          </feMerge>
        </filter>

        {/* Hand-drawn rough ink stroke filter */}
        <filter id="rough-ink" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.08"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Soft paper fiber noise */}
        <filter id="washi-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.15
                    0 0 0 0 0.13
                    0 0 0 0 0.10
                    0 0 0 0.04 0"
          />
        </filter>
      </defs>
    </svg>
  );
}
