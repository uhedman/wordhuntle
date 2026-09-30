import { describe, expect, it } from "vitest";

import { validateAuthInput } from "./authValidator";

describe("validateAuthInput", () => {
	const VALID_USERNAME = "valid_user";
	const VALID_PASSWORD = "password123";

	describe("when given valid inputs", () => {
		it("should return null for valid username and password", () => {
			const result = validateAuthInput(VALID_USERNAME, VALID_PASSWORD);
			expect(result).toBe(null);
		});

		it("should allow usernames at the minimum boundary of 3 characters", () => {
			expect(validateAuthInput("abc", VALID_PASSWORD)).toBe(null);
		});

		it("should allow usernames at the maximum boundary of 20 characters", () => {
			expect(validateAuthInput("a".repeat(20), VALID_PASSWORD)).toBe(
				null,
			);
		});

		it("should allow passwords at the minimum boundary of 8 characters", () => {
			expect(validateAuthInput(VALID_USERNAME, "12345678")).toBe(null);
		});

		it("should allow letters, numbers, spaces, and underscores in username", () => {
			expect(validateAuthInput("User 123_test", VALID_PASSWORD)).toBe(
				null,
			);
		});
	});

	describe("when required fields are missing", () => {
		it("should return 'Faltan datos' if username is empty", () => {
			expect(validateAuthInput("", VALID_PASSWORD)).toBe(
				"Missing fields",
			);
		});

		it("should return 'Faltan datos' if password is empty", () => {
			expect(validateAuthInput(VALID_USERNAME, "")).toBe(
				"Missing fields",
			);
		});

		it("should return 'Faltan datos' if username is null or undefined", () => {
			expect(validateAuthInput(null, VALID_PASSWORD)).toBe(
				"Missing fields",
			);
			expect(validateAuthInput(undefined, VALID_PASSWORD)).toBe(
				"Missing fields",
			);
		});

		it("should return 'Faltan datos' if password is null or undefined", () => {
			expect(validateAuthInput(VALID_USERNAME, null)).toBe(
				"Missing fields",
			);
			expect(validateAuthInput(VALID_USERNAME, undefined)).toBe(
				"Missing fields",
			);
		});
	});

	describe("when field types are not strings", () => {
		it("should return 'Formato inválido' if username is not a string", () => {
			expect(validateAuthInput(12345, VALID_PASSWORD)).toBe(
				"Invalid format",
			);
			expect(validateAuthInput(["user"], VALID_PASSWORD)).toBe(
				"Invalid format",
			);
		});

		it("should return 'Formato inválido' if password is not a string", () => {
			expect(validateAuthInput(VALID_USERNAME, 12345678)).toBe(
				"Invalid format",
			);
			expect(
				validateAuthInput(VALID_USERNAME, { pass: "12345678" }),
			).toBe("Invalid format");
		});
	});

	describe("when username length is invalid", () => {
		it("should return an error if username has fewer than 3 characters", () => {
			expect(validateAuthInput("ab", VALID_PASSWORD)).toBe(
				"Username length must be between 3 and 20 characters",
			);
		});

		it("should return an error if username has more than 20 characters", () => {
			expect(validateAuthInput("a".repeat(21), VALID_PASSWORD)).toBe(
				"Username length must be between 3 and 20 characters",
			);
		});
	});

	describe("when password length is invalid", () => {
		it("should return an error if password has fewer than 8 characters", () => {
			expect(validateAuthInput(VALID_USERNAME, "1234567")).toBe(
				"Password length must be at least 8 characters",
			);
		});
	});

	describe("when username contains disallowed characters", () => {
		it("should reject usernames containing special characters or hyphens", () => {
			const invalidUsernames = [
				"user@email.com",
				"user-name",
				"user#123",
				"user!name",
				"user$name",
				"user.name",
			];

			for (const username of invalidUsernames) {
				expect(validateAuthInput(username, VALID_PASSWORD)).toBe(
					"Username must contain only letters, numbers and underscores",
				);
			}
		});
	});
});
