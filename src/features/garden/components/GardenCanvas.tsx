"use client";

import React from "react";
import { GardenBackground } from "./GardenBackground";
import { GardenPath } from "./GardenPath";
import { GardenMidground } from "./GardenMidground";
import { TodayPatch } from "./TodayPatch";
import { GardenForeground } from "./GardenForeground";
import { TOTAL_WORLD_WIDTH, WORLD_HEIGHT, TODAY_WORLD_X } from "../utils/timeCoordinates";

interface GardenCanvasProps {
  className?: string;
  onOpen?: () => void;
}

/**
 * Continuous GardenCanvas spanning the full calendar-driven timeline (43,200px / ~1 year).
 * Coordinates Background, Path, Midground, Today's Patch (at 21,600px), and Foreground.
 */
export function GardenCanvas({ className, onOpen }: GardenCanvasProps) {
  return (
    <div
      className={`relative h-full flex-shrink-0 select-none ${className || ""}`}
      style={{ width: `${TOTAL_WORLD_WIDTH}px`, minWidth: `${TOTAL_WORLD_WIDTH}px` }}
    >
      <svg
        viewBox={`0 0 ${TOTAL_WORLD_WIDTH} ${WORLD_HEIGHT}`}
        className="w-full h-full block"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: Background (Sky wash, continuous hills, seasonal tree silhouettes) */}
        <GardenBackground width={TOTAL_WORLD_WIDTH} height={WORLD_HEIGHT} />

        {/* Layer 2: Subtle Garden Path (Winding watercolor trail & stepping stones) */}
        <GardenPath width={TOTAL_WORLD_WIDTH} height={WORLD_HEIGHT} />

        {/* Layer 3: Midground (Organically scattered rocks, ferns, wildflowers, moss mounds) */}
        <GardenMidground width={TOTAL_WORLD_WIDTH} height={WORLD_HEIGHT} />

        {/* Layer 4: Today's Empty Patch (Anchored at TODAY_WORLD_X = 21,600px) */}
        <TodayPatch x={TODAY_WORLD_X} y={645} onOpen={onOpen} />

        {/* Layer 5: Foreground (Rolling garden terraces, open clearings, deep earth base) */}
        <GardenForeground width={TOTAL_WORLD_WIDTH} height={WORLD_HEIGHT} />
      </svg>
    </div>
  );
}
