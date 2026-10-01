import { describe, expect, it } from "vitest";

import reducer, { closeModal, openModal } from "./slice";

describe("modal slice", () => {
	const initialState = {
		isOpen: false,
		content: "",
	};

	it("should handle initial state", () => {
		expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	it("should handle openModal", () => {
		const state = reducer(initialState, openModal("howToPlay"));
		expect(state.isOpen).toBe(true);
		expect(state.content).toBe("howToPlay");
	});

	it("should handle closeModal", () => {
		const openState = { isOpen: true, content: "settings" };
		const state = reducer(openState, closeModal());
		expect(state.isOpen).toBe(false);
		expect(state.content).toBe("");
	});
});
