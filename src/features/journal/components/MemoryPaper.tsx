"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InkText } from "@/components/ui/InkText";

interface MemoryPaperProps {
  date: Date;
  draft: string;
  onChange: (text: string) => void;
  onDone: () => void;
  onClose: () => void;
  /** When true, paper transforms into a seed */
  isTransforming?: boolean;
  /** Called after transformation animation completes */
  onTransformComplete?: () => void;
  /** Ref to outer motion div for position calculations */
  paperRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * MemoryPaper – a physical‑looking paper overlay that appears above the garden.
 * It displays the current date in a handwritten style, a prompt, and a multiline textarea.
 * The component animates in with a gentle rise using Framer Motion.
 */
export function MemoryPaper({ date, draft, onChange, onDone, onClose, isTransforming = false, onTransformComplete, paperRef }: MemoryPaperProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto‑focus the textarea when the paper opens.
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.4, ease: "easeInOut" } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
        onKeyDown={(e) => { if (e.key === 'Escape') { onClose(); } }}
      >


        {/* Paper container */}
                  {/* Paper container */}
          <motion.div
            ref={paperRef}
            className="relative max-w-[720px] w-[90vw] bg-[#fdf9f4] border border-[#e0d8c8] shadow-lg p-6 rounded-lg z-10 pointer-events-auto"
            initial={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
            animate={isTransforming ? { scale: 0.2, rotate: -10, opacity: 0, y: 40 } : { scale: 1, rotate: 0, opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onAnimationComplete={() => {
              if (isTransforming) {
                onTransformComplete?.();
              }
            }}
          >
          {/* Date – handwritten style */}
          <InkText as="h2" tone="sumi" className="text-2xl mb-2 block">
            {formattedDate}
          </InkText>

          {/* Prompt */}
          <p className="text-sm text-[#5c544d] mb-3">What do you want to remember about today?</p>

          {/* Multiline textarea */}
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => onChange(e.target.value)}
            rows={6}
            className="w-full p-2 border border-[#d3cbc2] rounded focus:outline-none focus:ring-2 focus:ring-[#c5bba8] bg-[#fbf8f2] text-[#2c2825] font-serif"
            placeholder="Type your memory here..."
          />

          {/* Action buttons */}
          <div className="flex justify-end mt-4 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-[#7d756d] hover:text-[#2c2825] transition-colors"
              aria-label="Close paper"
            >
              ✕
            </button>
            <button
              type="button"
              onClick={onDone}
              className="px-4 py-1 bg-[#e3d8c9] text-[#2c2825] rounded hover:bg-[#d5cbbd] transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
