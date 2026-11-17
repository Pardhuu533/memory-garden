"use client";

import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PaperButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "subtle" | "vermilion";
  size?: "sm" | "md" | "lg";
}

/**
 * Quiet, hand-drawn aesthetic button with sumi ink styling.
 */
export function PaperButton({
  children,
  className,
  variant = "primary",
  size = "md",
  disabled,
  ...props
}: PaperButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-serif transition-all duration-200 select-none cursor-pointer focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs tracking-wider",
    md: "px-4.5 py-2 text-sm tracking-wide",
    lg: "px-6 py-2.5 text-base tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-[#f3ede1] text-[#2c2825] border border-[#d6c9b3] hover:bg-[#eae1d0] hover:border-[#b8a78e] active:translate-y-[0.5px]",
    secondary:
      "bg-transparent text-[#5c544d] border border-[#ded5c5] hover:text-[#2c2825] hover:border-[#b8a78e]",
    subtle:
      "bg-transparent text-[#7a7065] hover:text-[#2c2825] hover:bg-[#ede5d6]/50",
    vermilion:
      "bg-[#b94f38]/10 text-[#a03c27] border border-[#b94f38]/30 hover:bg-[#b94f38]/15 hover:border-[#b94f38]/50",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
