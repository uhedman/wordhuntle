export type Grid = [
  [string, string, string, string],
  [string, string, string, string],
  [string, string, string, string],
  [string, string, string, string],
];

export type Pos = [number, number];
export type Tile = { letter: string; id: number; pos: [number, number] };
