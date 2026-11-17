export type SeasonName = "spring" | "summer" | "autumn" | "winter";

export type Hemisphere = "northern" | "southern";

export interface SeasonInfo {
  name: SeasonName;
  displayName: string;
  japaneseName: string; // e.g., 春, 夏, 秋, 冬
  romajiName: string;   // Haru, Natsu, Aki, Fuyu
  subSeason: string;    // e.g. "Early Autumn", "Mid Summer", "Late Winter"
  solarTerm?: string;   // 24 solar terms inspiration e.g. "White Dew (Bai Lu)"
  description: string;
  palette: {
    skyTint: string;
    groundWash: string;
    accentWash: string;
    foliageHues: string[];
    inkIntensity: number; // 0.8 - 1.0 subtle wash variance
  };
}
