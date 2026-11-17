import { Hemisphere } from "@/features/seasons/types";

export interface GardenSettings {
  hemisphere: Hemisphere;
  paperTone: "natural" | "aged" | "mist";
  showSolarTerms: boolean;
}

export const DEFAULT_SETTINGS: GardenSettings = {
  hemisphere: "northern",
  paperTone: "natural",
  showSolarTerms: true,
};
