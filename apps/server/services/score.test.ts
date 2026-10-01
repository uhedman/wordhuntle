import { beforeEach, describe, expect, it, vi } from "vitest";

import { ScoreRepository } from "../repositories/interfaces";
import { createMockScoreRepo } from "../repositories/mocks/scoreRepo";
import { createScoreService } from "./score";

describe("Score Service", () => {
	let mockScoreRepo: ScoreRepository;

	beforeEach(() => {
		mockScoreRepo = createMockScoreRepo();
		mockScoreRepo.getDailyLeaderboard = vi.fn(async () => [
			{ username: "test_daily", points: 10 },
		]);
		mockScoreRepo.getWeeklyLeaderboard = vi.fn(async () => [
			{ username: "test_weekly", points: 20 },
		]);
		mockScoreRepo.getAllTimeLeaderboard = vi.fn(async () => [
			{ username: "test_alltime", points: 30 },
		]);
	});

	it("should return daily, weekly, alltime data", async () => {
		const service = createScoreService(mockScoreRepo);
		const result = await service.getLeaderboard();

		expect(Array.isArray(result.daily)).toBe(true);
		expect(Array.isArray(result.weekly)).toBe(true);
		expect(Array.isArray(result.alltime)).toBe(true);
		expect(result.daily[0].username).toBe("test_daily");
		expect(result.weekly[0].username).toBe("test_weekly");
		expect(result.alltime[0].username).toBe("test_alltime");
	});
});
