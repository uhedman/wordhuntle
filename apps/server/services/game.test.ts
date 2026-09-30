import { afterEach, describe, expect, it, vi } from "vitest";

import { gameService } from "./game";

describe("gameService", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("getToday", () => {
		it("should return today's game structure with valid types", () => {
			const today = gameService.getTodayData();

			expect(today).toBeDefined();
			expect(Array.isArray(today.grid)).toBe(true);
			expect(typeof today.word).toBe("string");
			expect(today.word.length).toBeGreaterThan(0);
			expect(typeof today.words).toBe("string");
			expect(today.words.length).toBeGreaterThan(0);
			expect(typeof today.maxPoints).toBe("number");
			expect(today.maxPoints).toBeGreaterThan(0);
		});

		it("should provide a 4x4 matrix for grid", () => {
			const { grid } = gameService.getTodayData();

			expect(grid.length).toBe(4);
			for (const row of grid) {
				expect(row.length).toBe(4);
				for (const letter of row) {
					expect(typeof letter).toBe("string");
					expect(letter.length).toBe(1);
				}
			}
		});

		it("should return the same cached instance across consecutive calls", () => {
			const firstCall = gameService.getTodayData();
			const secondCall = gameService.getTodayData();

			expect(firstCall).toBe(secondCall);
		});
	});

	describe("getLast", () => {
		it("should return yesterday's game data with sorted words", () => {
			const last = gameService.getLastData();

			expect(last).toBeDefined();
			expect(Array.isArray(last.grid)).toBe(true);
			expect(last.grid.length).toBe(4);
			expect(typeof last.word).toBe("string");
			expect(Array.isArray(last.words)).toBe(true);

			const wordsCopy = [...last.words];
			const sortedCopy = [...last.words].sort();
			expect(wordsCopy).toEqual(sortedCopy);
		});

		it("should return the same cached instance across consecutive calls", () => {
			const firstCall = gameService.getLastData();
			const secondCall = gameService.getLastData();

			expect(firstCall).toBe(secondCall);
		});
	});

	describe("getMaxPoints", () => {
		it("should match maxPoints from getToday()", () => {
			const today = gameService.getTodayData();
			const maxPoints = gameService.getMaxPoints();

			expect(maxPoints).toBe(today.maxPoints);
		});
	});

	describe("when date advances to a new day", () => {
		it("should recalculate and update seed and game data", () => {
			const currentNow = Date.now();
			const currentSeed = Math.floor(currentNow / 86400000);

			const dateSpy = vi.spyOn(Date, "now").mockReturnValue(currentNow);
			expect(gameService.getSeed()).toBe(currentSeed);

			const nextDayTimestamp = currentNow + 86400000;
			dateSpy.mockReturnValue(nextDayTimestamp);

			const newSeed = gameService.getSeed();
			expect(newSeed).toBe(currentSeed + 1);

			const newLast = gameService.getLastData();
			expect(newLast).toBeDefined();
		});
	});
});
