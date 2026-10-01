import { Request, Response } from "express";

import { gameService } from "../services/game";

export const getSeed = (req: Request, res: Response) => {
	res.json({ seed: gameService.getSeed() });
};

export const getTodayData = (req: Request, res: Response) => {
	res.json(gameService.getTodayData());
};

export const getLastData = (req: Request, res: Response) => {
	res.json(gameService.getLastData());
};
