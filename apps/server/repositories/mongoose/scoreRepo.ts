import Score from "../../models/Score";
import { LeaderboardEntry, ScoreDTO, ScoreRepository } from "../interfaces";

function getStartOfWeek() {
	const d = new Date();
	d.setHours(0, 0, 0, 0);
	d.setDate(d.getDate() - d.getDay());
	return d;
}

export const mongooseScoreRepo: ScoreRepository = {
	async findByUserAndDate(
		userId: string,
		date: Date,
	): Promise<ScoreDTO | null> {
		const score = await Score.findOne({ user: userId, date });
		if (!score) return null;
		return {
			id: score._id.toString(),
			userId: score.user.toString(),
			level: score.level,
			points: score.points,
			date: score.date,
		};
	},

	async upsert(
		userId: string,
		date: Date,
		points: number,
		level: number,
	): Promise<void> {
		await Score.findOneAndUpdate(
			{ user: userId, date },
			{ points, level },
			{ upsert: true, new: true },
		);
	},

	async getDailyLeaderboard(): Promise<LeaderboardEntry[]> {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const result = await Score.aggregate([
			{ $match: { date: { $gte: today } } },
			{
				$group: {
					_id: "$user",
					points: { $sum: "$points" },
				},
			},
			{ $sort: { points: -1 } },
			{ $limit: 10 },
			{
				$lookup: {
					from: "users",
					localField: "_id",
					foreignField: "_id",
					as: "user",
				},
			},
			{ $unwind: "$user" },
			{ $project: { _id: 0, username: "$user.username", points: 1 } },
		]);
		return result as LeaderboardEntry[];
	},

	async getWeeklyLeaderboard(): Promise<LeaderboardEntry[]> {
		const startOfWeek = getStartOfWeek();
		const weekly = await Score.aggregate([
			{ $match: { date: { $gte: startOfWeek } } },
			{
				$group: {
					_id: "$user",
					points: { $sum: "$points" },
				},
			},
			{ $sort: { points: -1 } },
			{ $limit: 10 },
			{
				$lookup: {
					from: "users",
					localField: "_id",
					foreignField: "_id",
					as: "user",
				},
			},
			{ $unwind: "$user" },
			{ $project: { _id: 0, username: "$user.username", points: 1 } },
		]);
		return weekly as LeaderboardEntry[];
	},

	async getAllTimeLeaderboard(): Promise<LeaderboardEntry[]> {
		const alltime = await Score.aggregate([
			{
				$group: {
					_id: "$user",
					points: { $sum: "$points" },
				},
			},
			{ $sort: { points: -1 } },
			{ $limit: 10 },
			{
				$lookup: {
					from: "users",
					localField: "_id",
					foreignField: "_id",
					as: "user",
				},
			},
			{ $unwind: "$user" },
			{ $project: { _id: 0, username: "$user.username", points: 1 } },
		]);
		return alltime as LeaderboardEntry[];
	},
};
