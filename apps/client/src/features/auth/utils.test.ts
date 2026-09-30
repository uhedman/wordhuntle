import { describe, expect, it } from "vitest";

import { showPasswordError, showUsernameError } from "./utils";

describe("auth utils", () => {
	describe("showUsernameError", () => {
		it("should return error for empty username", () => {
			expect(showUsernameError("")).toBe(
				"Por favor, ingrese un nombre de usuario",
			);
		});

		it("should return error for username shorter than 3 chars", () => {
			expect(showUsernameError("ab")).toBe(
				"El nombre de usuario debe tener entre 3 y 20 caracteres",
			);
		});

		it("should return error for username longer than 20 chars", () => {
			expect(showUsernameError("a".repeat(21))).toBe(
				"El nombre de usuario debe tener entre 3 y 20 caracteres",
			);
		});

		it("should return error for username with invalid characters", () => {
			expect(showUsernameError("user@name")).toBe(
				"El nombre de usuario solo puede contener letras, números y guiones bajos",
			);
			expect(showUsernameError("user-name")).toBe(
				"El nombre de usuario solo puede contener letras, números y guiones bajos",
			);
			expect(showUsernameError("user name")).toBe(
				"El nombre de usuario solo puede contener letras, números y guiones bajos",
			);
		});

		it("should return fallback for otherwise valid username", () => {
			expect(showUsernameError("valid_user")).toBe(
				"Error inesperado en el nombre de usuario",
			);
		});
	});

	describe("showPasswordError", () => {
		it("should return error for empty password", () => {
			expect(showPasswordError("")).toBe(
				"Por favor, ingrese una contraseña",
			);
		});

		it("should return error for password shorter than 8 chars", () => {
			expect(showPasswordError("1234567")).toBe(
				"La contraseña debe tener al menos 8 caracteres",
			);
		});

		it("should return error if passwords do not match", () => {
			expect(showPasswordError("password123", false)).toBe(
				"Las contraseñas deben coincidir",
			);
		});

		it("should return fallback message if no matching condition failed", () => {
			expect(showPasswordError("password123", true)).toBe(
				"Error inesperado en la contraseña",
			);
		});
	});
});
