import { mock } from "node:test";

import { ScoreRepository } from "../interfaces";

export const createMockScoreRepo = (): ScoreRepository => ({
	findByUserAndDate: mock.fn(async () => null),
	upsert: mock.fn(async () => undefined),
	getDailyLeaderboard: mock.fn(async () => []),
	getWeeklyLeaderboard: mock.fn(async () => []),
	getAllTimeLeaderboard: mock.fn(async () => []),
});
