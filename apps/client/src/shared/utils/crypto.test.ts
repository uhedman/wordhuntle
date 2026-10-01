import { describe, expect, it } from "vitest";

import { decrypt, decryptOne } from "./decrypt";
import { encrypt } from "./encrypt";

describe("crypto utils (encrypt and decrypt)", () => {
	const seed = 12345;

	it("should encrypt and decrypt a single string with decryptOne", async () => {
		const originalText = "palabraSecreta";
		const encrypted = await encrypt(originalText, seed);

		expect(typeof encrypted).toBe("string");
		expect(encrypted).toContain(":");

		const decrypted = await decryptOne(encrypted, seed);
		expect(decrypted).toBe(originalText);
	});

	it("should encrypt and decrypt a list of words with decrypt", async () => {
		const words = ["casa", "perro", "gato", "arbol"];
		const encrypted = await encrypt(JSON.stringify(words), seed);

		const decrypted = await decrypt(encrypted, seed);
		expect(decrypted).toEqual(words);
	});

	it("should produce different ciphertexts for the same input due to random IV", async () => {
		const text = "repetido";
		const encrypted1 = await encrypt(text, seed);
		const encrypted2 = await encrypt(text, seed);

		expect(encrypted1).not.toBe(encrypted2);

		const decrypted1 = await decryptOne(encrypted1, seed);
		const decrypted2 = await decryptOne(encrypted2, seed);
		expect(decrypted1).toBe(text);
		expect(decrypted2).toBe(text);
	});

	it("should fail to decrypt with an incorrect seed", async () => {
		const originalText = "secreto";
		const encrypted = await encrypt(originalText, seed);

		await expect(decryptOne(encrypted, 99999)).rejects.toThrow();
	});
});
