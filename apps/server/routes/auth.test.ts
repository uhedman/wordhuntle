import jwt from "jsonwebtoken";
import type { Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import app from "../app";
import { mongooseScoreRepo } from "../repositories/mongoose/scoreRepo";
import { mongooseUserRepo } from "../repositories/mongoose/userRepo";
import { mongooseWordRepo } from "../repositories/mongoose/wordRepo";

describe("Auth Routes", () => {
	let server: Server;
	let baseUrl: string;

	beforeAll(async () => {
		vi.spyOn(console, "error").mockImplementation(() => {});
		vi.spyOn(jwt, "sign").mockReturnValue("fake_token" as never);
		vi.spyOn(jwt, "verify").mockReturnValue({ id: "user_123" } as never);
		vi.spyOn(mongooseUserRepo, "findByUsername").mockResolvedValue(null);
		vi.spyOn(mongooseScoreRepo, "findByUserAndDate").mockResolvedValue(
			null,
		);
		vi.spyOn(mongooseWordRepo, "findByUserAndDate").mockResolvedValue([]);

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

	describe("GET /api/auth/me", () => {
		it("should return 401 without token", async () => {
			const res = await fetch(`${baseUrl}/api/auth/me`);
			expect(res.status).toBe(401);
		});

		it("should return 401 with invalid authorization format", async () => {
			const res = await fetch(`${baseUrl}/api/auth/me`, {
				headers: { Authorization: "Basic 12345" },
			});
			expect(res.status).toBe(401);
		});

		it("should return 401 with invalid or expired token", async () => {
			vi.spyOn(jwt, "verify").mockImplementationOnce(() => {
				throw new Error("jwt malformed");
			});
			const res = await fetch(`${baseUrl}/api/auth/me`, {
				headers: { Authorization: "Bearer bad_token" },
			});
			expect(res.status).toBe(401);
		});

		it("should return 401 if user not found in database", async () => {
			vi.spyOn(jwt, "verify").mockReturnValueOnce({
				id: "user_123",
			} as never);
			vi.spyOn(mongooseUserRepo, "findById").mockResolvedValueOnce(null);

			const res = await fetch(`${baseUrl}/api/auth/me`, {
				headers: { Authorization: "Bearer valid_token" },
			});
			expect(res.status).toBe(401);
		});

		it("should return 500 if database throws an unexpected error", async () => {
			vi.spyOn(jwt, "verify").mockReturnValueOnce({
				id: "user_123",
			} as never);
			vi.spyOn(mongooseUserRepo, "findById").mockRejectedValueOnce(
				new Error("DB failure"),
			);

			const res = await fetch(`${baseUrl}/api/auth/me`, {
				headers: { Authorization: "Bearer valid_token" },
			});
			expect(res.status).toBe(500);
		});

		it("should return 200 with valid token", async () => {
			vi.spyOn(jwt, "verify").mockReturnValueOnce({
				id: "user_123",
			} as never);
			vi.spyOn(mongooseUserRepo, "findById").mockResolvedValueOnce({
				id: "user_123",
				username: "testuser",
				passwordHash: "hash",
				createdAt: new Date(),
			});

			const res = await fetch(`${baseUrl}/api/auth/me`, {
				headers: { Authorization: "Bearer valid_token" },
			});
			expect(res.status).toBe(200);
			const data = (await res.json()) as { user: { username: string } };
			expect(data.user.username).toBe("testuser");
		});
	});

	describe("POST /api/auth/login", () => {
		it("should return 401 with non-existent user", async () => {
			const res = await fetch(`${baseUrl}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username: "test", password: "pwd" }),
			});
			expect(res.status).toBe(401);
		});

		it("should return 401 with incorrect password", async () => {
			vi.spyOn(mongooseUserRepo, "findByUsername").mockResolvedValueOnce({
				id: "user_123",
				username: "testuser",
				passwordHash: "hash",
				createdAt: new Date(),
			});
			vi.spyOn(
				mongooseUserRepo,
				"validatePassword",
			).mockResolvedValueOnce(false);

			const res = await fetch(`${baseUrl}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: "testuser",
					password: "wrong_password",
				}),
			});
			expect(res.status).toBe(401);
		});

		it("should return 500 if database throws an unexpected error", async () => {
			vi.spyOn(mongooseUserRepo, "findByUsername").mockRejectedValueOnce(
				new Error("DB down"),
			);

			const res = await fetch(`${baseUrl}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: "testuser",
					password: "password123",
				}),
			});
			expect(res.status).toBe(500);
		});

		it("should return 200 with valid credentials", async () => {
			vi.spyOn(mongooseUserRepo, "findByUsername").mockResolvedValueOnce({
				id: "user_123",
				username: "testuser",
				passwordHash: "hash",
				createdAt: new Date(),
			});
			vi.spyOn(
				mongooseUserRepo,
				"validatePassword",
			).mockResolvedValueOnce(true);

			const res = await fetch(`${baseUrl}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: "testuser",
					password: "password123",
				}),
			});
			expect(res.status).toBe(200);
			const data = (await res.json()) as {
				message: string;
				accessToken: string;
				user: { username: string };
			};
			expect(data.message).toBe("Login exitoso");
			expect(data.user.username).toBe("testuser");
			expect(data.accessToken).toBeDefined();
		});
	});

	describe("POST /api/auth/register", () => {
		it("should return 400 with missing data", async () => {
			const res = await fetch(`${baseUrl}/api/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({}),
			});
			expect(res.status).toBe(400);
		});

		it("should return 409 if user already exists", async () => {
			vi.spyOn(mongooseUserRepo, "findByUsername").mockResolvedValueOnce({
				id: "user_123",
				username: "existing_user",
				passwordHash: "hash",
				createdAt: new Date(),
			});

			const res = await fetch(`${baseUrl}/api/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: "existing_user",
					password: "password123",
				}),
			});
			expect(res.status).toBe(409);
		});

		it("should return 500 if database throws an unexpected error", async () => {
			vi.spyOn(mongooseUserRepo, "findByUsername").mockRejectedValueOnce(
				new Error("DB error"),
			);

			const res = await fetch(`${baseUrl}/api/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: "newuser",
					password: "password123",
				}),
			});
			expect(res.status).toBe(500);
		});

		it("should return 201 with valid data", async () => {
			vi.spyOn(mongooseUserRepo, "findByUsername").mockResolvedValueOnce(
				null,
			);
			vi.spyOn(mongooseUserRepo, "hashPassword").mockResolvedValueOnce(
				"hashed_pwd",
			);
			vi.spyOn(mongooseUserRepo, "create").mockResolvedValueOnce({
				id: "user_123",
				username: "newuser",
				passwordHash: "hashed_pwd",
				createdAt: new Date(),
			});

			const res = await fetch(`${baseUrl}/api/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: "newuser",
					password: "password123",
				}),
			});
			expect(res.status).toBe(201);
			const data = (await res.json()) as {
				message: string;
				user: { username: string };
				accessToken: string;
			};
			expect(data.message).toBe("Usuario registrado con éxito");
			expect(data.user.username).toBe("newuser");
			expect(data.accessToken).toBeDefined();
		});
	});

	describe("POST /api/auth/refresh", () => {
		it("should return 401 without token", async () => {
			const res = await fetch(`${baseUrl}/api/auth/refresh`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({}),
			});
			expect(res.status).toBe(401);
		});

		it("should return 403 if refresh token is invalid", async () => {
			vi.spyOn(jwt, "verify").mockImplementationOnce(() => {
				throw new Error("Invalid token");
			});

			const res = await fetch(`${baseUrl}/api/auth/refresh`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refreshToken: "bad_refresh_token" }),
			});
			expect(res.status).toBe(403);
		});

		it("should return 500 if unexpected error occurs during refresh", async () => {
			const res = await fetch(`${baseUrl}/api/auth/refresh`, {
				method: "POST",
				headers: { "Content-Type": "text/plain" },
				body: "not json",
			});
			expect(res.status).toBe(500);
		});

		it("should return 200 with valid token", async () => {
			vi.spyOn(jwt, "verify").mockReturnValueOnce({
				id: "user_123",
			} as never);
			vi.spyOn(jwt, "sign").mockReturnValueOnce("new_access" as never);

			const res = await fetch(`${baseUrl}/api/auth/refresh`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refreshToken: "valid_refresh" }),
			});
			expect(res.status).toBe(200);
			const data = (await res.json()) as { accessToken: string };
			expect(data.accessToken).toBe("new_access");
		});
	});
});
