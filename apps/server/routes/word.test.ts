import jwt from "jsonwebtoken";
import type { Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import app from "../app";
import { mongooseScoreRepo } from "../repositories/mongoose/scoreRepo";
import { mongooseWordRepo } from "../repositories/mongoose/wordRepo";

describe("Word Routes", () => {
	let server: Server;
	let baseUrl: string;

	beforeAll(async () => {
		vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(jwt, "verify").mockReturnValue({
			id: "fake_user_id",
		} as never);
		vi.spyOn(mongooseWordRepo, "insertMany").mockResolvedValue(
			undefined as never,
		);
		vi.spyOn(mongooseScoreRepo, "findByUserAndDate").mockResolvedValue(
			null,
		);
		vi.spyOn(mongooseScoreRepo, "upsert").mockResolvedValue(
			undefined as never,
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

	it("should return 401 for /api/word without token", async () => {
		const res = await fetch(`${baseUrl}/api/word`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ words: ["test"] }),
		});
		expect(res.status).toBe(401);
	});

	it("should return 400 for /api/word with invalid words format (not an array)", async () => {
		const res = await fetch(`${baseUrl}/api/word`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer faketoken",
			},
			body: JSON.stringify({ words: "not_an_array" }),
		});
		expect(res.status).toBe(400);
	});

	it("should return 400 for /api/word with array containing non-strings", async () => {
		const res = await fetch(`${baseUrl}/api/word`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer faketoken",
			},
			body: JSON.stringify({ words: [123, null] }),
		});
		expect(res.status).toBe(400);
	});

	it("should return 500 if word repository insert throws an unexpected error", async () => {
		vi.spyOn(mongooseWordRepo, "insertMany").mockRejectedValueOnce(
			new Error("DB insert failure"),
		);

		const res = await fetch(`${baseUrl}/api/word`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer faketoken",
			},
			body: JSON.stringify({ words: ["test"] }),
		});
		expect(res.status).toBe(500);
		expect(await res.text()).toBe("Error interno del servidor");
	});

	it("should return 500 if score repository upsert throws an unexpected error", async () => {
		vi.spyOn(mongooseScoreRepo, "upsert").mockRejectedValueOnce(
			new Error("DB upsert failure"),
		);

		const res = await fetch(`${baseUrl}/api/word`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer faketoken",
			},
			body: JSON.stringify({ words: ["test"] }),
		});
		expect(res.status).toBe(500);
		expect(await res.text()).toBe("Error interno del servidor");
	});

	it("should return 200 for /api/word with valid token and data", async () => {
		const res = await fetch(`${baseUrl}/api/word`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer faketoken",
			},
			body: JSON.stringify({ words: ["test"] }),
		});
		expect(res.status).toBe(200);
	});

	it("should return 200 and accumulate points when score already exists for today", async () => {
		vi.spyOn(mongooseScoreRepo, "findByUserAndDate").mockResolvedValueOnce({
			id: "score_123",
			userId: "fake_user_id",
			date: new Date(),
			points: 50,
			level: 2,
		});

		const res = await fetch(`${baseUrl}/api/word`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer faketoken",
			},
			body: JSON.stringify({ words: ["test"] }),
		});
		expect(res.status).toBe(200);
	});
});
