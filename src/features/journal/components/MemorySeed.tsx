import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MemorySeedProps {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  onComplete?: () => void;
}

/**
 * Tiny seed that animates from the paper position to the TodayPatch.
 * The visual style is a small irregular circle with warm brown tone.
 */
export function MemorySeed({ startX, startY, targetX, targetY, onComplete }: MemorySeedProps) {
  const shouldReduce = useReducedMotion();
  const duration = shouldReduce ? 0 : 0.7; // 700ms fits 600‑800ms spec

  return (
    <motion.div
      // Fixed positioning so we can animate across the viewport
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: "#8b5e34", // warm clay tone
        // start at paper centre
        translateX: startX - 6,
        translateY: startY - 6,
        pointerEvents: "none",
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        translateX: targetX - 6,
        translateY: targetY - 6,
        opacity: 0,
        scale: 0.6,
      }}
      transition={{ duration, ease: "easeInOut" }}
      onAnimationComplete={() => {
        onComplete?.();
      }}
    />
  );
}
