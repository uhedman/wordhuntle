import jwt from "jsonwebtoken";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
	ScoreRepository,
	UserRepository,
	WordRepository,
} from "../repositories/interfaces";
import { createMockScoreRepo } from "../repositories/mocks/scoreRepo";
import { createMockUserRepo } from "../repositories/mocks/userRepo";
import { createMockWordRepo } from "../repositories/mocks/wordRepo";
import {
	InvalidCredentialsError,
	UserAlreadyExistsError,
	UserNotFoundError,
	ValidationError,
} from "../utils/errors";
import { createAuthService } from "./auth";

describe("Auth Service", () => {
	let mockUserRepo: UserRepository;
	let mockScoreRepo: ScoreRepository;
	let mockWordRepo: WordRepository;

	beforeEach(() => {
		mockUserRepo = createMockUserRepo();
		mockScoreRepo = createMockScoreRepo();
		mockWordRepo = createMockWordRepo();

		vi.spyOn(jwt, "sign").mockReturnValue("fake_token" as never);
		vi.spyOn(jwt, "verify").mockReturnValue({ id: "fake_id" } as never);
	});

	describe("login", () => {
		it("should throw InvalidCredentialsError if user not found", async () => {
			const service = createAuthService(
				mockUserRepo,
				mockScoreRepo,
				mockWordRepo,
			);
			await expect(service.login("test", "pwd")).rejects.toThrow(
				InvalidCredentialsError,
			);
		});

		it("should return tokens if successful", async () => {
			mockUserRepo.findByUsername = vi.fn(async () => ({
				id: "fake_id",
				username: "test",
				passwordHash: "hash",
				createdAt: new Date(),
			}));
			mockUserRepo.validatePassword = vi.fn(async () => true);

			const service = createAuthService(
				mockUserRepo,
				mockScoreRepo,
				mockWordRepo,
			);
			const result = await service.login("test", "pwd");

			expect(result.accessToken).toBe("fake_token");
			expect(result.message).toBe("Login exitoso");
		});
	});

	describe("me", () => {
		it("should throw UserNotFoundError if user not found", async () => {
			const service = createAuthService(
				mockUserRepo,
				mockScoreRepo,
				mockWordRepo,
			);
			await expect(service.me("fake_id")).rejects.toThrow(
				UserNotFoundError,
			);
		});
	});

	describe("register", () => {
		it("should throw ValidationError if validation fails", async () => {
			const service = createAuthService(
				mockUserRepo,
				mockScoreRepo,
				mockWordRepo,
			);
			await expect(
				service.register({ username: "", password: "" }),
			).rejects.toThrow(ValidationError);
		});

		it("should throw UserAlreadyExistsError if user already exists", async () => {
			mockUserRepo.findByUsername = vi.fn(async () => ({
				id: "fake_id",
				username: "test",
				passwordHash: "hash",
				createdAt: new Date(),
			}));

			const service = createAuthService(
				mockUserRepo,
				mockScoreRepo,
				mockWordRepo,
			);
			await expect(
				service.register({
					username: "test1234",
					password: "password123",
				}),
			).rejects.toThrow(UserAlreadyExistsError);
		});
	});

	describe("refresh", () => {
		it("should throw InvalidCredentialsError if no token provided", () => {
			const service = createAuthService(
				mockUserRepo,
				mockScoreRepo,
				mockWordRepo,
			);
			expect(() => service.refresh(undefined)).toThrow(
				InvalidCredentialsError,
			);
		});

		it("should return new access token if valid", () => {
			const service = createAuthService(
				mockUserRepo,
				mockScoreRepo,
				mockWordRepo,
			);
			const result = service.refresh("valid_token");

			expect(result.accessToken).toBe("fake_token");
		});
	});
});
