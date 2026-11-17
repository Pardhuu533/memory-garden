import { PlantSpecies } from "../types";

export const BOTANICAL_SPECIES: PlantSpecies[] = [
  {
    id: "japanese_maple",
    name: "Japanese Maple",
    japaneseName: "Momiji",
    kanji: "紅葉",
    family: "tree",
    symbolism: "Peace, patience, and changing seasons",
    favoredSeason: "autumn",
    palette: {
      stroke: "#2d2a27",
      primaryWash: "#b85d43", // Deep vermilion
      secondaryWash: "#c4925e", // Warm ochre
      accentWash: "#6e3b2e",
    },
  },
  {
    id: "black_pine",
    name: "Japanese Black Pine",
    japaneseName: "Matsu",
    kanji: "松",
    family: "tree",
    symbolism: "Endurance, longevity, and steady heart",
    favoredSeason: "winter",
    palette: {
      stroke: "#22201e",
      primaryWash: "#314438", // Pine green
      secondaryWash: "#4a5d51",
      accentWash: "#594d3f",
    },
  },
  {
    id: "ginkgo",
    name: "Ginkgo Biloba",
    japaneseName: "Ichou",
    kanji: "銀杏",
    family: "tree",
    symbolism: "Hope, resilience, and calm memory",
    favoredSeason: "autumn",
    palette: {
      stroke: "#2d2a27",
      primaryWash: "#caa34d", // Golden ochre
      secondaryWash: "#dfbf6a",
      accentWash: "#8f7236",
    },
  },
  {
    id: "camellia",
    name: "Winter Camellia",
    japaneseName: "Tsubaki",
    kanji: "椿",
    family: "flower",
    symbolism: "Quiet grace and devotion through cold days",
    favoredSeason: "winter",
    palette: {
      stroke: "#2d2a27",
      primaryWash: "#a84b5c", // Rose carmine
      secondaryWash: "#4d5c48", // Dark leaf green
      accentWash: "#dca0ac",
    },
  },
  {
    id: "bamboo",
    name: "Bamboo Grove",
    japaneseName: "Take",
    kanji: "竹",
    family: "grass_bamboo",
    symbolism: "Flexibility, upright spirit, and gentle strength",
    favoredSeason: "summer",
    palette: {
      stroke: "#282522",
      primaryWash: "#6b7d5a", // Sage bamboo
      secondaryWash: "#8a9e77",
      accentWash: "#465538",
    },
  },
  {
    id: "mountain_fern",
    name: "Mountain Fern",
    japaneseName: "Shida",
    kanji: "羊歯",
    family: "groundcover",
    symbolism: "Humility, sanctuary, and new beginnings",
    favoredSeason: "spring",
    palette: {
      stroke: "#2d2a27",
      primaryWash: "#738865",
      secondaryWash: "#98ad8a",
      accentWash: "#4e5e44",
    },
  },
  {
    id: "moss_cushion",
    name: "Velvet Moss",
    japaneseName: "Koke",
    kanji: "苔",
    family: "groundcover",
    symbolism: "Time passing gently and natural quietude",
    favoredSeason: "summer",
    palette: {
      stroke: "#2c2825",
      primaryWash: "#5a6b52",
      secondaryWash: "#788a6f",
      accentWash: "#3b4736",
    },
  },
];

export function getSpeciesById(id: string): PlantSpecies {
  return (
    BOTANICAL_SPECIES.find((s) => s.id === id) || BOTANICAL_SPECIES[0]
  );
}
