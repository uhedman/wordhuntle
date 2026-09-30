import { beforeEach, describe, expect, it } from "vitest";

import { ScoreRepository, WordRepository } from "../repositories/interfaces";
import { createMockScoreRepo } from "../repositories/mocks/scoreRepo";
import { createMockWordRepo } from "../repositories/mocks/wordRepo";
import { UserNotFoundError, ValidationError } from "../utils/errors";
import { createWordService } from "./word";

describe("Word Service", () => {
	let mockScoreRepo: ScoreRepository;
	let mockWordRepo: WordRepository;

	beforeEach(() => {
		mockScoreRepo = createMockScoreRepo();
		mockWordRepo = createMockWordRepo();
	});

	it("should throw UserNotFoundError if user not authenticated", async () => {
		const service = createWordService(mockScoreRepo, mockWordRepo);
		await expect(service.addWords(undefined, [])).rejects.toThrow(
			UserNotFoundError,
		);
	});

	it("should throw ValidationError if words list is invalid", async () => {
		const service = createWordService(mockScoreRepo, mockWordRepo);
		await expect(
			service.addWords("fake_id", "not_an_array" as unknown as string[]),
		).rejects.toThrow(ValidationError);
	});

	it("should throw ValidationError if words list contains non-string items", async () => {
		const service = createWordService(mockScoreRepo, mockWordRepo);
		await expect(
			service.addWords("fake_id", [123 as unknown as string]),
		).rejects.toThrow(ValidationError);
	});

	it("should insert words and update score successfully", async () => {
		const service = createWordService(mockScoreRepo, mockWordRepo);
		const result = await service.addWords("fake_id", ["hello", "world"]);

		expect(result.message).toBe("Palabras guardadas correctamente");
	});

	it("should accumulate score if existing score exists for today", async () => {
		mockScoreRepo.findByUserAndDate = async () => ({
			id: "score_1",
			userId: "fake_id",
			date: new Date(),
			points: 20,
			level: 1,
		});

		const service = createWordService(mockScoreRepo, mockWordRepo);
		const result = await service.addWords("fake_id", ["hello"]);

		expect(result.message).toBe("Palabras guardadas correctamente");
	});
});
