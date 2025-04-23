import { Grid, Pos } from "~/shared/types";

export interface TileData {
  letter: string;
  id: number;
  pos: Pos;
}

export interface HistoryState {
  lastGrid: Grid | null;
  lastWords: string[] | null;
  lastFound: string[];
  loading: boolean;
  error: string | undefined;
}

export interface GameData {
  grid: Grid;
  words: string[];
  maxPoints: number;
}

export type LastGameData = Omit<GameData, "maxPoints">;
