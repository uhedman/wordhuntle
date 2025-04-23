import { Request, Response } from "express";
import { dailyGame } from "../services/game";

export const getSeed = (req: Request, res: Response) => {
  res.json({ seed: dailyGame.getSeed() });
};

export const getTodayData = (req: Request, res: Response) => {
  res.json(dailyGame.getToday());
};

export const getLastData = (req: Request, res: Response) => {
  res.json(dailyGame.getLast());
};
