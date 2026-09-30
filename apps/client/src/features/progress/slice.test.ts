import { describe, expect, it } from "vitest";

import reducer, { resetProgress, updateProgress } from "./slice";

describe("progress slice", () => {
	it("should handle resetProgress", () => {
		const currentState = {
			found: ["caza", "casa"],
			level: 2,
			points: 5,
		};
		const state = reducer(currentState, resetProgress());
		expect(state).toEqual({
			found: [],
			level: 0,
			points: 0,
		});
	});

	it("should handle updateProgress", () => {
		const emptyState = {
			found: [],
			level: 0,
			points: 0,
		};
		const newProgress = {
			found: ["perro", "gato"],
			level: 3,
			points: 15,
		};
		const state = reducer(emptyState, updateProgress(newProgress));
		expect(state).toEqual(newProgress);
	});
});
