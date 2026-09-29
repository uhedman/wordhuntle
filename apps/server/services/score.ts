import { ScoreRepository } from "../repositories/interfaces";

export type ScoreService = ReturnType<typeof createScoreService>;

export const createScoreService = (scoreRepo: ScoreRepository) => ({
	async getLeaderboard() {
		const daily = await scoreRepo.getDailyLeaderboard();
		const weekly = await scoreRepo.getWeeklyLeaderboard();
		const alltime = await scoreRepo.getAllTimeLeaderboard();

		return { daily, weekly, alltime };
	},
});
