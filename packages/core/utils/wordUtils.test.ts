import { describe, expect, it } from "vitest";

import { insert, puntuation } from "./wordUtils";

describe("wordUtils", () => {
	describe("puntuation", () => {
		it("should return 1 point for 4-letter words", () => {
			expect(puntuation(4)).toBe(1);
		});

		it("should calculate correct points for words longer than 4 letters", () => {
			expect(puntuation(5)).toBe(4);
			expect(puntuation(6)).toBe(6);
			expect(puntuation(7)).toBe(8);
			expect(puntuation(8)).toBe(10);
			expect(puntuation(9)).toBe(12);
		});
	});

	describe("insert", () => {
		it("should insert into an empty array", () => {
			const result = insert([], "caza");
			expect(result).toEqual(["caza"]);
		});

		it("should insert at the beginning if smaller than all elements", () => {
			const result = insert(["beta", "gamma"], "alpha");
			expect(result).toEqual(["alpha", "beta", "gamma"]);
		});

		it("should insert at the end if larger than all elements", () => {
			const result = insert(["alpha", "beta"], "gamma");
			expect(result).toEqual(["alpha", "beta", "gamma"]);
		});

		it("should insert in the middle in alphabetical order", () => {
			const result = insert(["alpha", "gamma"], "beta");
			expect(result).toEqual(["alpha", "beta", "gamma"]);
		});

		it("should not insert duplicate words and return array with same elements", () => {
			const initial = ["alpha", "beta", "gamma"];
			const result = insert(initial, "beta");
			expect(result).toEqual(["alpha", "beta", "gamma"]);
		});

		it("should not mutate the original array", () => {
			const initial = ["alpha", "gamma"];
			const result = insert(initial, "beta");
			expect(initial).toEqual(["alpha", "gamma"]);
			expect(result).toEqual(["alpha", "beta", "gamma"]);
		});
	});
});
