import { expect, test } from "@playwright/test";

test.describe("Auth Flow", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("./");
		await page.evaluate(() => localStorage.clear());
		await page.reload();
	});

	test("should validate required fields in login form", async ({ page }) => {
		await page.getByRole("button", { name: "Iniciar sesión" }).click();

		const modal = page.locator(".modal-dialog");
		await expect(modal).toBeVisible();
		await expect(modal.locator(".modal-title")).toHaveText("Iniciar sesión");

		// Click submit without filling inputs
		await modal.getByRole("button", { name: "Iniciar sesión" }).click();

		// Error feedback should be displayed for empty inputs
		await expect(page.getByText("Por favor, ingrese un nombre de usuario")).toBeVisible();
		await expect(page.getByText("Por favor, ingrese una contraseña")).toBeVisible();
	});

	test("should switch between login and register views", async ({ page }) => {
		await page.getByRole("button", { name: "Iniciar sesión" }).click();
		const modal = page.locator(".modal-dialog");

		// Switch to register
		await modal.getByRole("button", { name: "Registrate" }).click();
		await expect(modal.locator(".modal-title")).toHaveText("Registrar");
		await expect(modal.getByLabel("Confirmar contraseña")).toBeVisible();

		// Switch back to login
		await modal.getByRole("button", { name: "Iniciar sesión" }).click();
		await expect(modal.locator(".modal-title")).toHaveText("Iniciar sesión");
	});

	test("should register a new user and allow logout", async ({ page }) => {
		await page.getByRole("button", { name: "Iniciar sesión" }).click();
		const modal = page.locator(".modal-dialog");

		// Switch to register
		await modal.getByRole("button", { name: "Registrate" }).click();

		// Fill registration form
		await modal.getByPlaceholder("Nombre de usuario").fill("nuevo_jugador");
		await modal.getByPlaceholder("Contraseña", { exact: true }).fill("password123");
		await modal.getByPlaceholder("Confirmar contraseña").fill("password123");

		// Submit registration
		await modal.getByRole("button", { name: "Registrar" }).click();

		// Modal switches to Profile
		await expect(modal.locator(".modal-title")).toHaveText("Perfil");
		const userButton = page.locator("#navbar-content button.rounded-pill");
		await expect(userButton).not.toHaveText("Iniciar sesión");

		// Log out
		await modal.getByRole("button", { name: "Cerrar sesión" }).click();

		// Navbar button returns to Iniciar sesión
		await expect(page.locator("#navbar-content button.rounded-pill")).toHaveText("Iniciar sesión");
	});

	test("should log in successfully with credentials", async ({ page }) => {
		await page.getByRole("button", { name: "Iniciar sesión" }).click();
		const modal = page.locator(".modal-dialog");

		await modal.getByPlaceholder("Nombre de usuario").fill("jugador_test");
		await modal.getByPlaceholder("Contraseña").fill("password123");

		await modal.getByRole("button", { name: "Iniciar sesión" }).click();

		await expect(modal.locator(".modal-title")).toHaveText("Perfil");
		const userButton = page.locator("#navbar-content button.rounded-pill");
		await expect(userButton).not.toHaveText("Iniciar sesión");
	});
});
