import { Grid, Pos } from "@wordhuntle/core/types";

export type Rotation = "left" | "right";

export interface TileData {
	id: number;
	letter: string;
	pos: Pos;
}

export interface Game {
	grid: Grid;
	word: string;
	words: string[];
	maxPoints: number;
}

export interface EncrypedGame {
	grid: Grid;
	word: string;
	words: string;
	maxPoints: number;
}
