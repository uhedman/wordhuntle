import { describe, expect, it } from "vitest";

import { Grid } from "@wordhuntle/core/types";

import reducer, { rotateGrid, setSeed } from "./slice";
import { getTodayData } from "./thunks/getTodayData";

describe("game slice", () => {
	const initialState = {
		seed: null,
		grid: null,
		word: null,
		words: null,
		maxPoints: null,
		loading: false,
		error: undefined,
	};

	const sampleGrid: Grid = [
		["a", "b", "c", "d"],
		["e", "f", "g", "h"],
		["i", "j", "k", "l"],
		["m", "n", "o", "p"],
	];

	it("should handle initial state", () => {
		expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	it("should handle setSeed", () => {
		const state = reducer(initialState, setSeed(2026));
		expect(state.seed).toBe(2026);
	});

	it("should ignore rotateGrid if grid is null", () => {
		const state = reducer(initialState, rotateGrid("right"));
		expect(state.grid).toBeNull();
	});

	it("should rotate grid right when grid is present", () => {
		const stateWithGrid = { ...initialState, grid: sampleGrid };
		const state = reducer(stateWithGrid, rotateGrid("right"));
		expect(state.grid).not.toBeNull();
		expect(state.grid).not.toEqual(sampleGrid);
		expect(state.grid?.[0][0]).toBe("m");
	});

	it("should rotate grid left when grid is present", () => {
		const stateWithGrid = { ...initialState, grid: sampleGrid };
		const state = reducer(stateWithGrid, rotateGrid("left"));
		expect(state.grid).not.toBeNull();
		expect(state.grid).not.toEqual(sampleGrid);
		expect(state.grid?.[0][0]).toBe("d");
	});

	describe("extraReducers - getTodayData", () => {
		it("should handle getTodayData.pending", () => {
			const state = reducer(
				{ ...initialState, error: "Previous error" },
				getTodayData.pending("req-1", undefined),
			);
			expect(state.loading).toBe(true);
			expect(state.error).toBeUndefined();
		});

		it("should handle getTodayData.fulfilled", () => {
			const payload = {
				grid: sampleGrid,
				word: "testword",
				words: ["test", "word"],
				maxPoints: 100,
			};
			const state = reducer(
				{ ...initialState, loading: true },
				getTodayData.fulfilled(payload, "req-1", undefined),
			);
			expect(state.grid).toEqual(sampleGrid);
			expect(state.word).toBe("testword");
			expect(state.words).toEqual(["test", "word"]);
			expect(state.maxPoints).toBe(100);
		});

		it("should handle getTodayData.rejected", () => {
			const state = reducer(
				{ ...initialState, loading: true },
				getTodayData.rejected(
					new Error("Failed to load today data"),
					"req-1",
					undefined,
				),
			);
			expect(state.loading).toBe(false);
			expect(state.error).toBe("Failed to load today data");
		});
	});
});
