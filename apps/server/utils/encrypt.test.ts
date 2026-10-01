import { describe, expect, it } from "vitest";

import { encrypt } from "./encrypt";

describe("encrypt", () => {
	it("should return a string containing IV and encrypted data separated by colon", () => {
		const text = "secret-word";
		const seed = 123456;

		const result = encrypt(text, seed);

		expect(typeof result).toBe("string");
		expect(result).toContain(":");

		const parts = result.split(":");
		expect(parts.length).toBe(2);
		expect(parts[0].length).toBeGreaterThan(0);
		expect(parts[1].length).toBeGreaterThan(0);
	});

	it("should produce different IVs for the same input", () => {
		const text = "secret-word";
		const seed = 123456;

		const result1 = encrypt(text, seed);
		const result2 = encrypt(text, seed);

		expect(result1).not.toBe(result2);
	});
});
