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

test.describe("Game Flow", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("./");
		await page.evaluate(() => localStorage.clear());
		await page.reload();
	});

	test("should render the 4x4 grid and initial score", async ({ page }) => {
		const tiles = page.locator(".ratio .fs-1");
		await expect(tiles).toHaveCount(16);

		await expect(page.getByText("0 pts")).toBeVisible();
		await expect(page.getByText("0 palabras")).toBeVisible();
	});

	test("should rotate the grid", async ({ page }) => {
		await expect(page.locator(".ratio .fs-1")).toHaveCount(16);
		const tile0 = page.locator(".ratio .fs-1").nth(0);
		const initialLetter = await tile0.innerText();

		// Click rotate right (second button in rotation container)
		const rotateRightBtn = page
			.locator(".d-flex.justify-content-between > button")
			.nth(1);
		await rotateRightBtn.click();

		// Wait for rotation animation to complete and store to update
		await page.waitForTimeout(1100);

		// The letter in position 0 should have changed
		const newLetter = await tile0.innerText();
		expect(newLetter).toBeDefined();
		expect(newLetter).not.toBe(initialLetter);
	});

	test("should display 'Muy corta' when dragging fewer than 4 letters", async ({
		page,
	}) => {
		await expect(page.locator(".ratio .fs-1")).toHaveCount(16);
		const tiles = page.locator(".ratio");
		const box0 = await tiles.nth(0).boundingBox();
		const box1 = await tiles.nth(1).boundingBox();

		expect(box0).not.toBeNull();
		expect(box1).not.toBeNull();

		await page.mouse.move(box0!.x + box0!.width / 2, box0!.y + box0!.height / 2);
		await page.mouse.down();
		await page.mouse.move(box1!.x + box1!.width / 2, box1!.y + box1!.height / 2, {
			steps: 5,
		});
		await page.mouse.up();

		await expect(page.getByText("Muy corta")).toBeVisible();
	});

	test("should discover a valid word, increase points and show in words modal", async ({
		page,
	}) => {
		await expect(page.locator(".ratio .fs-1")).toHaveCount(16);

		// Read grid letters
		const letters = await page.locator(".ratio .fs-1").allInnerTexts();
		expect(letters.length).toBe(16);

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

		// Drag through target word using real mouse movements
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

		// Score and found count should update
		await expect(page.getByText("1 palabra")).toBeVisible();
		await expect(page.getByText("0 pts")).not.toBeVisible();

		// Open found words modal (eye icon next to palabra count)
		await page.locator(".d-flex.align-items-baseline button").click();

		const modal = page.locator(".modal-dialog");
		await expect(modal).toBeVisible();
		await expect(modal.locator(".modal-title")).toContainText(
			"Palabras encontradas",
		);
		await expect(
			modal.getByRole("link", { name: targetWord }),
		).toBeVisible();
	});
});
