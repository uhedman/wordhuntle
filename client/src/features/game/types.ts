import { Grid, Pos } from "~/shared/types";

export interface TileData {
  id: number;
  letter: string;
  pos: Pos;
}

export interface Game {
  grid: Grid;
  words: string[];
  maxPoints: number;
}

export interface EncrypedGame {
  grid: Grid;
  words: string;
  maxPoints: number;
}
