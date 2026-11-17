"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HankoStampProps {
  kanji?: string; // Default: 記憶 (Memory) or 庭 (Garden)
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Traditional Japanese Vermilion Seal (Hanko / 印鑑)
 * Represents an authentic physical artist stamp on washi paper.
 */
export function HankoStamp({
  kanji = "記憶",
  label,
  size = "md",
  className,
}: HankoStampProps) {
  const sizeClasses = {
    sm: "w-7 h-7 text-[10px] p-0.5 border-[1.5px]",
    md: "w-9 h-9 text-xs p-1 border-2",
    lg: "w-12 h-12 text-sm p-1.5 border-2",
  };

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center justify-center select-none font-serif tracking-tighter",
        className
      )}
      title={label || kanji}
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-[3px] border-[#b94f38]/80 text-[#b94f38] bg-[#b94f38]/[0.04]",
          "rotate-[-1.5deg] shadow-[inset_0_0_4px_rgba(185,79,56,0.15)]",
          sizeClasses[size]
        )}
        style={{
          boxShadow: "0 0 0 1px rgba(185, 79, 56, 0.1)",
        }}
      >
        <span className="font-bold opacity-90 leading-none select-none">
          {kanji}
        </span>
      </div>
      {label && (
        <span className="text-[10px] mt-1 text-[#706861] tracking-widest uppercase font-serif">
          {label}
        </span>
      )}
    </div>
  );
}
