import { expect, test } from "@playwright/test";

test.describe("Smoke Test", () => {
	test("should load the application and render the navbar", async ({
		page,
	}) => {
		await page.goto("./");

		await expect(page.getByText("wordhuntle")).toBeVisible();
		await expect(
			page.getByRole("button", { name: "Iniciar sesión" }),
		).toBeVisible();
	});
});
