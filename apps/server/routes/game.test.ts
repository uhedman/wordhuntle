import type { Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import app from "../app";

describe("Game Routes", () => {
	let server: Server;
	let baseUrl: string;

	// antes de todos los tests, se ejecuta UNA vez, para levantar el servidor
	beforeAll(async () => {
		return new Promise<void>((resolve, reject) => {
			server = app.listen(0, () => {
				const addr = server.address();
				const port = typeof addr === "string" ? 0 : addr?.port;
				baseUrl = `http://localhost:${port}`;
				resolve();
			});
			server.on("error", reject);
		});
	});

	// después de todos los tests, se ejecuta UNA vez, para cerrar el servidor
	afterAll(async () => {
		return new Promise<void>((resolve, reject) => {
			server.close((err) => {
				if (err) return reject(err);
				resolve();
			});
		});
	});

	it("should return 200 and a seed for /api/game/seed", async () => {
		const res = await fetch(`${baseUrl}/api/game/seed`);
		expect(res.status).toBe(200);

		const data = (await res.json()) as { seed: string };
		expect(data.seed).toBeDefined();
	});

	it("should return 200 and today's data for /api/game/todayData", async () => {
		const res = await fetch(`${baseUrl}/api/game/todayData`);
		expect(res.status).toBe(200);

		const data = (await res.json()) as { word: string; words: string };
		expect(data.word).toBeDefined();
		expect(data.words).toBeDefined();
	});

	it("should return 200 and last data for /api/game/lastData", async () => {
		const res = await fetch(`${baseUrl}/api/game/lastData`);
		expect(res.status).toBe(200);

		const data = (await res.json()) as { word: string; words: string[] };
		expect(data.word).toBeDefined();
		expect(Array.isArray(data.words)).toBe(true);
	});
});
