import { Grid } from "@wordhuntle/core/types";
import { getGrid, getSecretWord } from "@wordhuntle/core/utils/dailyGrid";
import { getWords } from "@wordhuntle/core/utils/dailyWords";
import { puntuation } from "@wordhuntle/core/utils/wordUtils";

import { encrypt } from "../utils/encrypt";

interface TodayGameData {
	grid: Grid;
	word: string;
	words: string;
	maxPoints: number;
}

interface LastGameData {
	grid: Grid;
	word: string;
	words: string[];
}

let cachedSeed: number | null = null;
let cachedTodayData: TodayGameData | null = null;
let cachedLastData: LastGameData | null = null;

function getCurrentSeed(): number {
	return Math.floor(Date.now() / 86400000);
}

function calculateToday(seed: number): TodayGameData {
	const grid = getGrid(seed);
	const word = getSecretWord(seed);
	const words = getWords(grid);
	const maxPoints = words.reduce(
		(acc: number, word: string) => acc + puntuation(word.length),
		0,
	);
	return {
		grid,
		word: encrypt(word, seed),
		words: encrypt(JSON.stringify(words), seed),
		maxPoints,
	};
}

function calculateLast(lastSeed: number): LastGameData {
	const grid = getGrid(lastSeed);
	const word = getSecretWord(lastSeed);
	const words = getWords(grid).sort();
	return { grid, word, words };
}

function updateIfStale(): void {
	const currentSeed = getCurrentSeed();
	if (cachedSeed !== currentSeed || !cachedTodayData || !cachedLastData) {
		cachedSeed = currentSeed;
		cachedTodayData = calculateToday(currentSeed);
		cachedLastData = calculateLast(currentSeed - 1);
	}
}

export const gameService = {
	getSeed: (): number => {
		updateIfStale();
		return cachedSeed!;
	},
	getTodayData: () => {
		updateIfStale();
		return cachedTodayData!;
	},
	getLastData: () => {
		updateIfStale();
		return cachedLastData!;
	},
	getMaxPoints: (): number => {
		updateIfStale();
		return cachedTodayData!.maxPoints;
	},
};
