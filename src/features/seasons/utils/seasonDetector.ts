import { Hemisphere, SeasonInfo, SeasonName } from "../types";

/**
 * Japanese 24 Solar Terms (Sekki / 節気) approximate dates for subtle poetic resonance
 */
interface SolarTermMapping {
  month: number; // 0-indexed (0 = Jan)
  day: number;
  term: string;
  kanji: string;
}

const SOLAR_TERMS: SolarTermMapping[] = [
  { month: 0, day: 5, term: "Slight Cold", kanji: "小寒" },
  { month: 0, day: 20, term: "Great Cold", kanji: "大寒" },
  { month: 1, day: 4, term: "Beginning of Spring", kanji: "立春" },
  { month: 1, day: 19, term: "Rain Water", kanji: "雨水" },
  { month: 2, day: 5, term: "Awakening of Insects", kanji: "啓蟄" },
  { month: 2, day: 20, term: "Spring Equinox", kanji: "春分" },
  { month: 3, day: 4, term: "Pure Brightness", kanji: "清明" },
  { month: 3, day: 20, term: "Grain Rain", kanji: "穀雨" },
  { month: 4, day: 5, term: "Beginning of Summer", kanji: "立夏" },
  { month: 4, day: 21, term: "Lesser Fullness", kanji: "小満" },
  { month: 5, day: 5, term: "Grain in Ear", kanji: "芒種" },
  { month: 5, day: 21, term: "Summer Solstice", kanji: "夏至" },
  { month: 6, day: 7, term: "Slight Heat", kanji: "小暑" },
  { month: 6, day: 22, term: "Great Heat", kanji: "大暑" },
  { month: 7, day: 7, term: "Beginning of Autumn", kanji: "立秋" },
  { month: 7, day: 23, term: "End of Heat", kanji: "処暑" },
  { month: 8, day: 7, term: "White Dew", kanji: "白露" },
  { month: 8, day: 23, term: "Autumn Equinox", kanji: "秋分" },
  { month: 9, day: 8, term: "Cold Dew", kanji: "寒露" },
  { month: 9, day: 23, term: "Frost's Descent", kanji: "霜降" },
  { month: 10, day: 7, term: "Beginning of Winter", kanji: "立冬" },
  { month: 10, day: 22, term: "Lesser Snow", kanji: "小雪" },
  { month: 11, day: 7, term: "Greater Snow", kanji: "大雪" },
  { month: 11, day: 22, term: "Winter Solstice", kanji: "冬至" },
];

/**
 * Base seasonal metadata
 */
export const SEASON_PALETTES: Record<
  SeasonName,
  {
    displayName: string;
    japaneseName: string;
    romajiName: string;
    description: string;
    palette: SeasonInfo["palette"];
  }
> = {
  spring: {
    displayName: "Spring",
    japaneseName: "春",
    romajiName: "Haru",
    description: "Tender green shoots and cherry blossoms emerging through mist.",
    palette: {
      skyTint: "#e6eeea",
      groundWash: "#e4ebdf",
      accentWash: "#c797a2", // Sakura
      foliageHues: ["#7c8f73", "#a4b494", "#5a6b52"],
      inkIntensity: 0.88,
    },
  },
  summer: {
    displayName: "Summer",
    japaneseName: "夏",
    romajiName: "Natsu",
    description: "Lush verdant moss, bamboo shade, and clear warm daylight.",
    palette: {
      skyTint: "#e2ecf0",
      groundWash: "#dde5d4",
      accentWash: "#56697a", // Indigo
      foliageHues: ["#4d5945", "#5a6b52", "#3c4a36"],
      inkIntensity: 0.95,
    },
  },
  autumn: {
    displayName: "Autumn",
    japaneseName: "秋",
    romajiName: "Aki",
    description: "Rustling maple foliage, golden ochre moss, and clear crisp air.",
    palette: {
      skyTint: "#f3ede3",
      groundWash: "#ebe0cf",
      accentWash: "#b85d43", // Vermilion / momiji
      foliageHues: ["#b58448", "#b94f38", "#6e5d48"],
      inkIntensity: 0.92,
    },
  },
  winter: {
    displayName: "Winter",
    japaneseName: "冬",
    romajiName: "Fuyu",
    description: "Sumi-e ink branches, quiet resting soil, and soft winter light.",
    palette: {
      skyTint: "#e7ebef",
      groundWash: "#e5e3de",
      accentWash: "#9a6575", // Muted plum / Camellia
      foliageHues: ["#3c4a36", "#50544f", "#727771"],
      inkIntensity: 0.85,
    },
  },
};

/**
 * Determines current season information based strictly on real calendar date and hemisphere.
 */
export function getCurrentSeason(
  date: Date = new Date(),
  hemisphere: Hemisphere = "northern"
): SeasonInfo {
  const month = date.getMonth(); // 0 = Jan, 11 = Dec
  const day = date.getDate();

  // Northern hemisphere baseline seasons
  let season: SeasonName;
  let subSeason = "";

  if (month === 2 || month === 3 || month === 4) {
    season = "spring";
    subSeason = month === 2 ? "Early Spring" : month === 3 ? "Mid Spring" : "Late Spring";
  } else if (month === 5 || month === 6 || month === 7) {
    season = "summer";
    subSeason = month === 5 ? "Early Summer" : month === 6 ? "Mid Summer" : "Late Summer";
  } else if (month === 8 || month === 9 || month === 10) {
    season = "autumn";
    subSeason = month === 8 ? "Early Autumn" : month === 9 ? "Mid Autumn" : "Late Autumn";
  } else {
    season = "winter";
    subSeason = month === 11 ? "Early Winter" : month === 0 ? "Mid Winter" : "Late Winter";
  }

  // Adjust for southern hemisphere (inverted 6 months)
  if (hemisphere === "southern") {
    const inversionMap: Record<SeasonName, SeasonName> = {
      spring: "autumn",
      summer: "winter",
      autumn: "spring",
      winter: "summer",
    };
    season = inversionMap[season];
    subSeason = subSeason
      .replace("Spring", "TempA")
      .replace("Summer", "TempB")
      .replace("Autumn", "Spring")
      .replace("Winter", "Summer")
      .replace("TempA", "Autumn")
      .replace("TempB", "Winter");
  }

  // Find active solar term
  let activeSolarTerm: SolarTermMapping | undefined;
  for (let i = SOLAR_TERMS.length - 1; i >= 0; i--) {
    const st = SOLAR_TERMS[i];
    if (month > st.month || (month === st.month && day >= st.day)) {
      activeSolarTerm = st;
      break;
    }
  }
  if (!activeSolarTerm) {
    activeSolarTerm = SOLAR_TERMS[SOLAR_TERMS.length - 1];
  }

  const meta = SEASON_PALETTES[season];

  return {
    name: season,
    displayName: meta.displayName,
    japaneseName: meta.japaneseName,
    romajiName: meta.romajiName,
    subSeason,
    solarTerm: activeSolarTerm ? `${activeSolarTerm.term} (${activeSolarTerm.kanji})` : undefined,
    description: meta.description,
    palette: meta.palette,
  };
}

/**
 * Helper to interpolate between two hex colors
 */
function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = color1.replace("#", "");
  const c2 = color2.replace("#", "");
  
  if (c1.length !== 6 || c2.length !== 6) return color1;

  const r1 = parseInt(c1.substring(0, 2), 16);
  const g1 = parseInt(c1.substring(2, 4), 16);
  const b1 = parseInt(c1.substring(4, 6), 16);

  const r2 = parseInt(c2.substring(0, 2), 16);
  const g2 = parseInt(c2.substring(2, 4), 16);
  const b2 = parseInt(c2.substring(4, 6), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Returns smoothly interpolated seasonal palette colors based on exact date progress.
 * Prevents abrupt visual cuts when scrolling across season boundaries.
 */
export function getSeasonTransition(
  date: Date = new Date(),
  hemisphere: Hemisphere = "northern"
): {
  currentSeason: SeasonInfo;
  interpolatedPalette: SeasonInfo["palette"];
} {
  const currentSeason = getCurrentSeason(date, hemisphere);
  
  // Seasonal cycle sequence
  const seasonSequence: SeasonName[] = ["spring", "summer", "autumn", "winter"];
  const currentIndex = seasonSequence.indexOf(currentSeason.name);
  const nextSeasonName = seasonSequence[(currentIndex + 1) % 4];

  const currentPalette = SEASON_PALETTES[currentSeason.name].palette;
  const nextPalette = SEASON_PALETTES[nextSeasonName].palette;

  // Day within a 90-day season quarter approximation
  const month = date.getMonth();
  const day = date.getDate();
  const seasonMonthIndex = month % 3; // 0, 1, 2
  const progress = (seasonMonthIndex * 30 + day) / 90; // 0.0 to 1.0

  // Only start blending in the last 20% of the season for subtle transition
  const blendFactor = progress > 0.75 ? (progress - 0.75) / 0.25 : 0;

  const interpolatedPalette: SeasonInfo["palette"] = {
    skyTint: interpolateColor(currentPalette.skyTint, nextPalette.skyTint, blendFactor),
    groundWash: interpolateColor(currentPalette.groundWash, nextPalette.groundWash, blendFactor),
    accentWash: interpolateColor(currentPalette.accentWash, nextPalette.accentWash, blendFactor),
    foliageHues: currentPalette.foliageHues,
    inkIntensity: currentPalette.inkIntensity + blendFactor * (nextPalette.inkIntensity - currentPalette.inkIntensity),
  };

  return {
    currentSeason,
    interpolatedPalette,
  };
}
