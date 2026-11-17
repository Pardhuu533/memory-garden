import { SeasonName } from "@/features/seasons/types";

export interface MemoryEntry {
  id: string;
  createdAt: string; // ISO date string
  dateString: string; // e.g., "2026-09-14"
  thoughtText: string;
  season: SeasonName;
  solarTerm?: string;
  plantSpeciesId: string;
  canvasPosition: {
    x: number; // 0-100%
    y: number; // 0-100%
  };
  reflectionDepth?: "whisper" | "note" | "essay"; // Length classification for visual density
}

export interface PlantSeedDraft {
  thoughtText: string;
  speciesId: string;
  position?: {
    x: number;
    y: number;
  };
}
