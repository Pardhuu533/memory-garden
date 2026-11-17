"use client";

import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface WashiPaperProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "sheet" | "scroll" | "card" | "tanzaku";
  elevated?: boolean;
}

/**
 * WashiPaper represents a physical sheet of Japanese handmade paper.
 * Features warm fibrous texture, subtle organic borders, and soft shadows.
 */
export function WashiPaper({
  children,
  className,
  variant = "sheet",
  elevated = false,
  ...props
}: WashiPaperProps) {
  const variantStyles = {
    sheet: "p-6 md:p-8 rounded-sm bg-[#faf6ee] border border-[#e4dcce]",
    card: "p-4 md:p-5 rounded-sm bg-[#fdfbf7] border border-[#ebe2d3]",
    scroll: "p-6 md:p-10 rounded-sm bg-[#f7f2e7] border-y-2 border-x border-[#dfd4c0]",
    tanzaku: "p-4 w-40 min-h-[300px] rounded-sm bg-[#faf5ea] border border-[#e2d7c5] shadow-sm",
  };

  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        elevated ? "shadow-[0_4px_20px_-4px_rgba(75,65,55,0.08)]" : "shadow-none",
        className
      )}
      {...props}
    >
      {/* Subtle organic paper texture layer */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-[0.035] mix-blend-multiply bg-[radial-gradient(#2d2823_1px,transparent_1px)] [background-size:16px_16px]" 
        aria-hidden="true" 
      />
      
      {/* Paper Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
