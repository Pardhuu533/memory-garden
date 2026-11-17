import { Hemisphere } from "@/features/seasons/types";
import { getCurrentSeason } from "@/features/seasons/utils/seasonDetector";

/**
 * Time scale: 120 horizontal pixels per calendar day.
 * Provides a gentle, continuous pace of exploration.
 */
export const PIXELS_PER_DAY = 120;

/**
 * Buffer range: 180 days past and 180 days future (~1 year continuous buffer)
 */
export const DAYS_PAST = 180;
export const DAYS_FUTURE = 180;
export const TOTAL_BUFFER_DAYS = DAYS_PAST + DAYS_FUTURE;

/**
 * Stable world coordinate of Today (the central anchor)
 */
export const TODAY_WORLD_X = DAYS_PAST * PIXELS_PER_DAY; // 21,600px
export const TOTAL_WORLD_WIDTH = TOTAL_BUFFER_DAYS * PIXELS_PER_DAY; // 43,200px
export const WORLD_HEIGHT = 900;

const MS_PER_DAY = 86400000;

/**
 * Normalizes a date to local midnight for stable day-offset calculations
 */
export function getMidnight(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Converts any calendar Date to a stable horizontal world X position.
 * Perfectly handles leap years, variable month lengths, and year boundaries.
 */
export function dateToWorldX(date: Date, anchorDate: Date = new Date()): number {
  const anchorMidnight = getMidnight(anchorDate);
  const targetMidnight = getMidnight(date);

  // Calendar day diff calculation using local year/month/date
  const utc1 = Date.UTC(anchorMidnight.getFullYear(), anchorMidnight.getMonth(), anchorMidnight.getDate());
  const utc2 = Date.UTC(targetMidnight.getFullYear(), targetMidnight.getMonth(), targetMidnight.getDate());

  const diffDays = Math.round((utc2 - utc1) / MS_PER_DAY);
  return TODAY_WORLD_X + diffDays * PIXELS_PER_DAY;
}

/**
 * Converts a horizontal world X coordinate to the exact corresponding calendar Date.
 * Uses native Date.setDate arithmetic, guaranteeing daylight saving and leap-year safety.
 */
export function worldXToDate(worldX: number, anchorDate: Date = new Date()): Date {
  const anchorMidnight = getMidnight(anchorDate);
  const diffDays = (worldX - TODAY_WORLD_X) / PIXELS_PER_DAY;
  const wholeDays = Math.round(diffDays);

  const result = new Date(anchorMidnight);
  result.setDate(result.getDate() + wholeDays);
  return result;
}

/**
 * Returns the stable world X position of Today.
 */
export function getTodayWorldX(): number {
  return TODAY_WORLD_X;
}

/**
 * Formats the quiet handwritten date & season indicator for the viewport header.
 * Example: "Late Summer · September 15"
 */
export function formatGardenDateLabel(
  date: Date,
  hemisphere: Hemisphere = "northern"
): {
  subSeason: string;
  monthDay: string;
  fullLabel: string;
  solarTerm?: string;
} {
  const season = getCurrentSeason(date, hemisphere);

  const monthDay = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(date);

  return {
    subSeason: season.subSeason,
    monthDay,
    fullLabel: `${season.subSeason} · ${monthDay}`,
    solarTerm: season.solarTerm,
  };
}
