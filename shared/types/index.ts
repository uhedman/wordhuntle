export type Grid = [
  [string, string, string, string],
  [string, string, string, string],
  [string, string, string, string],
  [string, string, string, string]
];

export type Pos = [number, number];

export interface Progress {
  found: string[];
  level: number;
  points: number;
}
