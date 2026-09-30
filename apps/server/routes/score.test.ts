import type { Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import app from "../app";
import { mongooseScoreRepo } from "../repositories/mongoose/scoreRepo";
import { ValidationError } from "../utils/errors";

describe("Score Routes", () => {
	let server: Server;
	let baseUrl: string;

	beforeAll(async () => {
		vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(mongooseScoreRepo, "getDailyLeaderboard").mockResolvedValue(
			[],
		);
		vi.spyOn(mongooseScoreRepo, "getWeeklyLeaderboard").mockResolvedValue(
			[],
		);
		vi.spyOn(mongooseScoreRepo, "getAllTimeLeaderboard").mockResolvedValue(
			[],
		);

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

	afterAll(async () => {
		return new Promise<void>((resolve, reject) => {
			server.close((err) => {
				if (err) return reject(err);
				resolve();
			});
		});
	});

	it("should return 200 and leaderboards for /api/score/leaderboard", async () => {
		const res = await fetch(`${baseUrl}/api/score/leaderboard`);
		expect(res.status).toBe(200);

		const data = (await res.json()) as {
			daily: unknown[];
			weekly: unknown[];
			alltime: unknown[];
		};
		expect(Array.isArray(data.daily)).toBe(true);
		expect(Array.isArray(data.weekly)).toBe(true);
		expect(Array.isArray(data.alltime)).toBe(true);
	});

	it("should return custom status code if a CustomError is thrown", async () => {
		vi.spyOn(
			mongooseScoreRepo,
			"getDailyLeaderboard",
		).mockRejectedValueOnce(new ValidationError("Parametro invalido"));

		const res = await fetch(`${baseUrl}/api/score/leaderboard`);
		expect(res.status).toBe(400);
		const data = (await res.json()) as { error: string };
		expect(data.error).toBe("Parametro invalido");
	});

	it("should return 500 if database throws an unexpected error", async () => {
		vi.spyOn(
			mongooseScoreRepo,
			"getDailyLeaderboard",
		).mockRejectedValueOnce(new Error("DB failure"));

		const res = await fetch(`${baseUrl}/api/score/leaderboard`);
		expect(res.status).toBe(500);
		const data = (await res.json()) as { error: string };
		expect(data.error).toBe("Error obteniendo leaderboard");
	});
});
