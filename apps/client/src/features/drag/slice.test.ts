import { describe, expect, it } from "vitest";

import reducer, { back, start, stop, write } from "./slice";

describe("drag slice", () => {
	const initialState = {
		word: "",
		isDragging: false,
		tiles: Array(16).fill(false),
		path: [],
	};

	it("should handle initial state", () => {
		expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	it("should handle start", () => {
		const state = reducer(
			initialState,
			start({ id: 0, letter: "C", pos: [0, 0] }),
		);
		expect(state.isDragging).toBe(true);
		expect(state.word).toBe("C");
		expect(state.tiles[0]).toBe(true);
		expect(state.path).toEqual([[0, 0]]);
	});

	it("should handle write", () => {
		const startState = reducer(
			initialState,
			start({ id: 0, letter: "C", pos: [0, 0] }),
		);
		const state = reducer(
			startState,
			write({ id: 1, letter: "A", pos: [0, 1] }),
		);
		expect(state.word).toBe("CA");
		expect(state.tiles[0]).toBe(true);
		expect(state.tiles[1]).toBe(true);
		expect(state.path).toEqual([
			[0, 0],
			[0, 1],
		]);
	});

	it("should handle back", () => {
		let state = reducer(
			initialState,
			start({ id: 0, letter: "C", pos: [0, 0] }),
		);
		state = reducer(state, write({ id: 1, letter: "A", pos: [0, 1] }));
		state = reducer(state, back(1));

		expect(state.word).toBe("C");
		expect(state.tiles[1]).toBe(false);
		expect(state.tiles[0]).toBe(true);
		expect(state.path).toEqual([[0, 0]]);
	});

	it("should handle stop", () => {
		let state = reducer(
			initialState,
			start({ id: 0, letter: "C", pos: [0, 0] }),
		);
		state = reducer(state, write({ id: 1, letter: "A", pos: [0, 1] }));
		state = reducer(state, stop());

		expect(state.word).toBe("");
		expect(state.isDragging).toBe(false);
		expect(state.tiles.every((t) => t === false)).toBe(true);
		expect(state.path).toEqual([]);
	});
});
