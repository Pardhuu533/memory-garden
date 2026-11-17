import { SeasonName } from "@/features/seasons/types";

export type BotanicalFamily = 
  | "tree"        // Pine, Maple, Ginkgo
  | "flower"      // Camellia, Peony, Iris
  | "grass_bamboo"// Bamboo, Reeds
  | "groundcover"; // Moss, Fern

export interface PlantSpecies {
  id: string;
  name: string;
  japaneseName: string;
  kanji: string;
  family: BotanicalFamily;
  symbolism: string; // The quiet poetic nuance
  favoredSeason: SeasonName;
  palette: {
    stroke: string;
    primaryWash: string;
    secondaryWash?: string;
    accentWash?: string;
  };
}

export interface GardenPlantInstance {
  id: string;
  memoryId: string;
  speciesId: string;
  plantedAt: string; // ISO date string
  seasonPlanted: SeasonName;
  position: {
    x: number; // Percentage 0-100 on canvas
    y: number; // Percentage 0-100 on canvas
    scale?: number;
    depth?: number; // Layer index (0 = background, 1 = midground, 2 = foreground)
  };
  notesCount?: number;
}
