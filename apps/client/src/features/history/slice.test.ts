import { describe, expect, it } from "vitest";

import { Grid } from "@wordhuntle/core/types";

import reducer, { setLastFound } from "./slice";
import { getLastData } from "./thunks/getLastData";

describe("history slice", () => {
	const initialState = {
		lastGrid: null,
		lastWord: null,
		lastWords: null,
		lastFound: [],
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
		const state = reducer(undefined, { type: "unknown" });
		expect(state.lastGrid).toBeNull();
		expect(state.lastFound).toEqual([]);
	});

	it("should handle setLastFound", () => {
		const state = reducer(
			initialState,
			setLastFound(["palabra1", "palabra2"]),
		);
		expect(state.lastFound).toEqual(["palabra1", "palabra2"]);
	});

	describe("extraReducers - getLastData", () => {
		it("should handle getLastData.pending", () => {
			const state = reducer(
				{ ...initialState, error: "Old error" },
				getLastData.pending("req-1", undefined),
			);
			expect(state.loading).toBe(true);
			expect(state.error).toBeUndefined();
		});

		it("should handle getLastData.fulfilled", () => {
			const payload = {
				grid: sampleGrid,
				word: "lastword",
				words: ["last", "word"],
			};
			const state = reducer(
				{ ...initialState, loading: true },
				getLastData.fulfilled(payload, "req-1", undefined),
			);
			expect(state.lastGrid).toEqual(sampleGrid);
			expect(state.lastWord).toBe("lastword");
			expect(state.lastWords).toEqual(["last", "word"]);
			expect(state.loading).toBe(false);
		});

		it("should handle getLastData.rejected", () => {
			const state = reducer(
				{ ...initialState, loading: true },
				getLastData.rejected(
					new Error("Failed to load last data"),
					"req-1",
					undefined,
				),
			);
			expect(state.loading).toBe(false);
			expect(state.error).toBe("Failed to load last data");
		});
	});
});
