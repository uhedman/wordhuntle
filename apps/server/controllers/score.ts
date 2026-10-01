import { Request, Response } from "express";

import { ScoreService } from "../services/score";
import { CustomError } from "../utils/errors";

export const createGetLeaderboardHandler =
	(scoreService: ScoreService) => async (req: Request, res: Response) => {
		try {
			const result = await scoreService.getLeaderboard();
			res.json(result);
		} catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).json({ error: err.message });
			} else {
				console.error("Error obteniendo leaderboard:", err);
				res.status(500).json({ error: "Error obteniendo leaderboard" });
			}
		}
	};
