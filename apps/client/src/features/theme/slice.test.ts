import { describe, expect, it } from "vitest";

import reducer, { toggleTheme } from "./slice";

describe("theme slice", () => {
	it("should return the initial state", () => {
		const state = reducer(undefined, { type: "unknown" });
		expect(["light", "dark"]).toContain(state.value);
	});

	it("should toggle from light to dark", () => {
		const state = reducer({ value: "light" }, toggleTheme());
		expect(state.value).toBe("dark");
	});

	it("should toggle from dark to light", () => {
		const state = reducer({ value: "dark" }, toggleTheme());
		expect(state.value).toBe("light");
	});
});
