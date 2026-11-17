"use client";

import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InkTextProps extends HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4";
  tone?: "sumi" | "soft" | "faint" | "vermilion" | "moss" | "ochre";
  vertical?: boolean; // Traditional tategaki vertical text support
}

/**
 * InkText delivers typography with physical ink-wash weight and character.
 */
export function InkText({
  children,
  as: Component = "span",
  tone = "sumi",
  vertical = false,
  className,
  ...props
}: InkTextProps) {
  const toneClasses = {
    sumi: "text-[#2c2825]",
    soft: "text-[#585149]",
    faint: "text-[#857c72]",
    vermilion: "text-[#b94f38]",
    moss: "text-[#4d5945]",
    ochre: "text-[#b58448]",
  };

  return (
    <Component
      className={cn(
        "font-serif antialiased",
        toneClasses[tone],
        vertical && "[writing-mode:vertical-rl] text-orientation-upright tracking-widest leading-loose",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
