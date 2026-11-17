export interface GardenWorldDimensions {
  width: number;
  height: number;
}

export interface TodayPatchLocation {
  x: number; // e.g. 1800 in 3600 coordinate space
  y: number; // e.g. 680 in 900 coordinate space
}

export interface LayerProps {
  className?: string;
  width?: number;
  height?: number;
}
