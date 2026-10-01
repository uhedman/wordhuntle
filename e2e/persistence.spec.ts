import { expect, test } from "@playwright/test";
import { Grid } from "@wordhuntle/core/types";
import { getWords } from "@wordhuntle/core/utils/dailyWords";

function findWordPath(grid: Grid, word: string): number[] | null {
	const directions = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	for (let r = 0; r < 4; r++) {
		for (let c = 0; c < 4; c++) {
			if (grid[r][c] === word[0]) {
				const visited = new Set<number>();
				const path: number[] = [];

				const dfs = (currR: number, currC: number, idx: number): boolean => {
					const tileIdx = currR * 4 + currC;
					visited.add(tileIdx);
					path.push(tileIdx);

					if (idx === word.length - 1) return true;

					for (const [dr, dc] of directions) {
						const nr = currR + dr;
						const nc = currC + dc;
						const nextTile = nr * 4 + nc;
						if (
							nr >= 0 &&
							nr < 4 &&
							nc >= 0 &&
							nc < 4 &&
							!visited.has(nextTile) &&
							grid[nr][nc] === word[idx + 1]
						) {
							if (dfs(nr, nc, idx + 1)) return true;
						}
					}

					visited.delete(tileIdx);
					path.pop();
					return false;
				};

				if (dfs(r, c, 0)) return path;
			}
		}
	}
	return null;
}

test.describe("Persistence Flow", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("./");
		await page.evaluate(() => localStorage.clear());
		await page.reload();
	});

	test("should persist theme preference across page reloads", async ({
		page,
	}) => {
		const html = page.locator("html");
		const initialTheme = await html.getAttribute("data-bs-theme");

		// Toggle theme (first navbar button with sun/moon icon)
		const themeToggle = page.locator("nav button").first();
		await themeToggle.click();

		const expectedTheme = initialTheme === "dark" ? "light" : "dark";
		await expect(html).toHaveAttribute("data-bs-theme", expectedTheme);

		// Reload page
		await page.reload();

		// Theme should persist
		await expect(html).toHaveAttribute("data-bs-theme", expectedTheme);
	});

	test("should persist game progress (points and found words) across page reloads", async ({
		page,
	}) => {
		await expect(page.locator(".ratio .fs-1")).toHaveCount(16);

		// Read grid and find a word
		const letters = await page.locator(".ratio .fs-1").allInnerTexts();
		const grid: Grid = [
			letters.slice(0, 4).map((l) => l.toLowerCase()) as [string, string, string, string],
			letters.slice(4, 8).map((l) => l.toLowerCase()) as [string, string, string, string],
			letters.slice(8, 12).map((l) => l.toLowerCase()) as [string, string, string, string],
			letters.slice(12, 16).map((l) => l.toLowerCase()) as [string, string, string, string],
		];

		const validWords = getWords(grid);
		expect(validWords.length).toBeGreaterThan(0);

		const targetWord = validWords[0];
		const path = findWordPath(grid, targetWord);
		expect(path).not.toBeNull();

		// Trace target word using real mouse movements
		const tiles = page.locator(".ratio");
		for (let i = 0; i < path!.length; i++) {
			const box = await tiles.nth(path![i]).boundingBox();
			expect(box).not.toBeNull();
			const x = box!.x + box!.width / 2;
			const y = box!.y + box!.height / 2;

			if (i === 0) {
				await page.mouse.move(x, y);
				await page.mouse.down();
			} else {
				await page.mouse.move(x, y, { steps: 5 });
			}
		}
		await page.mouse.up();

		await expect(page.getByText("1 palabra")).toBeVisible();
		await expect(page.getByText("0 pts")).not.toBeVisible();

		// Reload the page
		await page.reload();

		// Progress should persist
		await expect(page.getByText("1 palabra")).toBeVisible();
		await expect(page.getByText("0 pts")).not.toBeVisible();

		// Verify word appears in words modal
		await page.locator(".d-flex.align-items-baseline button").click();
		const modal = page.locator(".modal-dialog");
		await expect(modal).toBeVisible();
		await expect(modal.locator(".modal-title")).toContainText(
			"Palabras encontradas",
		);
		await expect(modal.getByRole("link", { name: targetWord })).toBeVisible();
	});
});
