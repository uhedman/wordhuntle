import { describe, expect, it } from "vitest";

import { getGrid, getSecretWord } from "./dailyGrid";

describe("dailyGrid", () => {
	describe("getSecretWord", () => {
		it("should return an 8-letter word", () => {
			const word = getSecretWord(12345);
			expect(typeof word).toBe("string");
			expect(word.length).toBe(8);
		});

		it("should be deterministic for the same dayCode", () => {
			const word1 = getSecretWord(20000);
			const word2 = getSecretWord(20000);
			expect(word1).toBe(word2);
		});

		it("should generate different secret words for different dayCodes", () => {
			const word1 = getSecretWord(100);
			const word2 = getSecretWord(101);
			expect(word1).not.toBe(word2);
		});
	});

	describe("getGrid", () => {
		it("should return a 4x4 grid filled with single lowercase letters", () => {
			const grid = getGrid(20000);
			expect(grid.length).toBe(4);

			for (let i = 0; i < 4; i++) {
				expect(grid[i].length).toBe(4);
				for (let j = 0; j < 4; j++) {
					const cell = grid[i][j];
					expect(typeof cell).toBe("string");
					expect(cell.length).toBe(1);
					expect(cell).toMatch(/^[a-z]$/);
				}
			}
		});

		it("should be deterministic for the same dayCode", () => {
			const grid1 = getGrid(12345);
			const grid2 = getGrid(12345);
			expect(grid1).toEqual(grid2);
		});

		it("should contain the letters of the secret word", () => {
			const dayCode = 20260;
			const secretWord = getSecretWord(dayCode);
			const grid = getGrid(dayCode);

			// Count occurrences of letters in secret word and grid
			const gridLetters = grid.flat();
			for (const char of secretWord) {
				expect(gridLetters).toContain(char);
			}
		});
	});
});
