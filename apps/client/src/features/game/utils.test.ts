import { describe, expect, it } from "vitest";

import { Grid } from "@wordhuntle/core/types";

import { rotateLeft, rotateRight } from "./utils";

describe("game utils", () => {
	const sampleGrid: Grid = [
		["a", "b", "c", "d"],
		["e", "f", "g", "h"],
		["i", "j", "k", "l"],
		["m", "n", "o", "p"],
	];

	describe("rotateRight", () => {
		it("should rotate grid 90 degrees clockwise", () => {
			const rotated = rotateRight(sampleGrid);
			expect(rotated).toEqual([
				["m", "i", "e", "a"],
				["n", "j", "f", "b"],
				["o", "k", "g", "c"],
				["p", "l", "h", "d"],
			]);
		});

		it("should return to original grid after 4 right rotations", () => {
			let current = sampleGrid;
			for (let i = 0; i < 4; i++) {
				current = rotateRight(current);
			}
			expect(current).toEqual(sampleGrid);
		});
	});

	describe("rotateLeft", () => {
		it("should rotate grid 90 degrees counter-clockwise", () => {
			const rotated = rotateLeft(sampleGrid);
			expect(rotated).toEqual([
				["d", "h", "l", "p"],
				["c", "g", "k", "o"],
				["b", "f", "j", "n"],
				["a", "e", "i", "m"],
			]);
		});

		it("should return to original grid after 4 left rotations", () => {
			let current = sampleGrid;
			for (let i = 0; i < 4; i++) {
				current = rotateLeft(current);
			}
			expect(current).toEqual(sampleGrid);
		});

		it("should negate a right rotation when followed by a left rotation", () => {
			const rotatedRight = rotateRight(sampleGrid);
			const restored = rotateLeft(rotatedRight);
			expect(restored).toEqual(sampleGrid);
		});
	});
});
