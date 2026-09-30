import { describe, expect, it } from "vitest";

import { Grid } from "../types";
import { getGrid } from "./dailyGrid";
import { getWords } from "./dailyWords";

describe("dailyWords", () => {
	describe("getWords", () => {
		it("should return an empty array if no valid words can be formed", () => {
			const emptyGrid: Grid = [
				["x", "x", "x", "x"],
				["x", "x", "x", "x"],
				["x", "x", "x", "x"],
				["x", "x", "x", "x"],
			];
			const words = getWords(emptyGrid);
			expect(words).toEqual([]);
		});

		it("should return words with length >= 4 from a valid grid", () => {
			const grid = getGrid(12345);
			const words = getWords(grid);

			expect(Array.isArray(words)).toBe(true);
			expect(words.length).toBeGreaterThan(0);

			for (const word of words) {
				expect(typeof word).toBe("string");
				expect(word.length).toBeGreaterThanOrEqual(4);
			}
		});

		it("should return unique words with no duplicates", () => {
			const grid = getGrid(20000);
			const words = getWords(grid);
			const uniqueWords = new Set(words);

			expect(words.length).toBe(uniqueWords.size);
		});

		it("should be deterministic for the same grid", () => {
			const grid = getGrid(9999);
			const words1 = getWords(grid);
			const words2 = getWords(grid);

			expect(words1).toEqual(words2);
		});
	});
});
