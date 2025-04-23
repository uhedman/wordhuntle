import { Grid, Pos } from "~/shared/types";

export interface TileData {
  id: number;
  letter: string;
  pos: Pos;
}

export interface GameData {
  grid: Grid;
  words: string[];
  maxPoints: number;
}

export interface EncrypedGameData {
  grid: Grid;
  words: string;
  maxPoints: number;
}
