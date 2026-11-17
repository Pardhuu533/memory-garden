"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { GardenCanvas } from "./GardenCanvas";
import { HankoStamp } from "@/components/ui/HankoStamp";
import { MemoryPaper } from "@/features/journal/components/MemoryPaper";
import { MemorySeed } from "@/features/journal/components/MemorySeed";

import {
  TODAY_WORLD_X,
  worldXToDate,
  formatGardenDateLabel,
} from "../utils/timeCoordinates";

export function GardenShell() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isPaperOpen, setIsPaperOpen] = useState(false);
  const [draftText, setDraftText] = useState("");
  // Determine user's actual local date
  const today = useMemo(() => new Date(), []);
  const [currentCenterDate, setCurrentCenterDate] = useState<Date>(today);
  // paper/seed flow state
  const [isTransforming, setIsTransforming] = useState(false);
  const [showSeed, setShowSeed] = useState(false);
  const [seedPos, setSeedPos] = useState<{ startX: number; startY: number; targetX: number; targetY: number } | null>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const openPaper = () => setIsPaperOpen(true);
  const closePaper = () => setIsPaperOpen(false);

  // Handle Done click: capture paper position and start transformation
  const handleDone = () => {
    if (!paperRef.current) return;
    const paperRect = paperRef.current.getBoundingClientRect();
    const startX = paperRect.left + paperRect.width / 2;
    const startY = paperRect.top + paperRect.height / 2;

    const patchEl = document.querySelector('[aria-label="Write today\'s memory"]') as HTMLElement;
    const patchRect = patchEl?.getBoundingClientRect();
    const targetX = patchRect ? patchRect.left + patchRect.width / 2 : startX;
    const targetY = patchRect ? patchRect.top + patchRect.height / 2 : startY;

    setSeedPos({ startX, startY, targetX, targetY });
    setIsTransforming(true);
  };

  // Called by MemoryPaper after its transformation animation finishes
  const handleTransformComplete = () => {
    setIsTransforming(false);
    setShowSeed(true);
    // Optionally close the paper overlay now that it has transformed
    setIsPaperOpen(false);
  };

  // Called by MemorySeed after it reaches the TodayPatch
  const handleSeedComplete = () => {
    setShowSeed(false);
    setSeedPos(null);
  };


  // Return focus to TodayPatch when the paper closes
  useEffect(() => {
    if (!isPaperOpen) {
      const patch = document.querySelector('[aria-label="Write today\'s memory"]') as HTMLElement;
      patch?.focus();
    }
  }, [isPaperOpen]);
  // Center the viewport on Today's coordinate (TODAY_WORLD_X) upon initial load
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const centerViewport = () => {
      const viewportWidth = container.clientWidth;
      const targetScroll = Math.max(0, TODAY_WORLD_X - viewportWidth / 2);
      container.scrollLeft = targetScroll;
      setCurrentCenterDate(worldXToDate(TODAY_WORLD_X, today));
    };

    centerViewport();
    // Run after next layout pass to guarantee accurate clientWidth
    const frameId = requestAnimationFrame(centerViewport);
    return () => cancelAnimationFrame(frameId);
  }, [today]);

  // Handle horizontal scroll to update the dynamic date & season indicator in real-time
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const viewportCenter = container.scrollLeft + container.clientWidth / 2;
    const dateAtCenter = worldXToDate(viewportCenter, today);
    setCurrentCenterDate(dateAtCenter);
  }, [today]);

  // Mouse Drag to Pan (desktop exploration enhancement)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeftState(container.scrollLeft);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const container = scrollContainerRef.current;
      if (!container) return;

      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.25; // Smooth drag factor
      container.scrollLeft = scrollLeftState - walk;
    },
    [isDragging, startX, scrollLeftState]
  );

  const handleMouseUpOrLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Format current center date & season label
  const dateInfo = useMemo(() => {
    return formatGardenDateLabel(currentCenterDate);
  }, [currentCenterDate]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#faf6ee] select-none">
      {/* Paper texture overlay across the entire garden world */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.04] mix-blend-multiply bg-[radial-gradient(#3a3229_1px,transparent_1px)] [background-size:20px_20px]"
        aria-hidden="true"
      />

      {/* Subtle vignette wash around canvas edges for physical journal depth */}
      <div
        className="pointer-events-none fixed inset-0 z-30 shadow-[inset_0_0_90px_rgba(110,95,78,0.07)]"
        aria-hidden="true"
      />

      {/* =========================================================================
          MINIMAL INTERFACE OVERLAYS
          Only two small, quiet elements:
          1. Dynamic Date/season indicator at viewport center (e.g., "Late Summer · September 15")
          2. Understated settings control mark
          ========================================================================= */}

      {/* Dynamic Date & Season Indicator (Updates seamlessly as user scrolls) */}
      <div className="fixed top-5 left-6 md:top-7 md:left-8 z-50 pointer-events-auto flex items-center gap-3">
        <HankoStamp kanji="記憶" size="sm" />
        <div className="flex flex-col">
          <span className="font-serif text-xs md:text-sm tracking-widest text-[#5c544d] antialiased transition-all duration-150">
            {dateInfo.fullLabel}
          </span>
          {dateInfo.solarTerm && (
            <span className="font-serif text-[10px] text-[#8e857b] tracking-wider hidden sm:inline">
              {dateInfo.solarTerm}
            </span>
          )}
        </div>
      </div>

      {/* Understated Settings Control Mark (Tiny non-interactive three-dot ink mark) */}
      <div
        className="fixed top-5 right-6 md:top-7 md:right-8 z-50 pointer-events-auto p-2 text-[#7d756d] hover:text-[#2c2825] transition-colors duration-200 cursor-default"
        title="Settings"
        aria-label="Settings"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-70 hover:opacity-100 transition-opacity"
        >
          <circle cx="9" cy="4" r="1.4" fill="#5c544d" />
          <circle cx="9" cy="9" r="1.4" fill="#5c544d" />
          <circle cx="9" cy="14" r="1.4" fill="#5c544d" />
        </svg>
      </div>

      {/* =========================================================================
          HORIZONTAL GARDEN WORLD VIEWPORT
          ========================================================================= */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`w-full h-full overflow-x-auto overflow-y-hidden no-scrollbar overscroll-none touch-pan-x ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        <GardenCanvas onOpen={openPaper} />
        {/* Render MemoryPaper overlay when open */}
        {isPaperOpen && (
          <MemoryPaper
            date={today}
            draft={draftText}
            onChange={setDraftText}
            onDone={handleDone}
            onClose={closePaper}
            isTransforming={isTransforming}
            onTransformComplete={handleTransformComplete}
            paperRef={paperRef}
          />
        )}
        {showSeed && seedPos && (
          <MemorySeed
            startX={seedPos.startX}
            startY={seedPos.startY}
            targetX={seedPos.targetX}
            targetY={seedPos.targetY}
            onComplete={handleSeedComplete}
          />
        )}
      </div>
    </div>
  );
}
