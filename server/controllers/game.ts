import { Request, Response } from "express";
import { dailyGame } from "../services/game";
import { encrypt } from "../utils/encrypt";

export const getSeed = (req: Request, res: Response) => {
  res.json({ seed: dailyGame.getSeed() });
};

export const getTodayData = (req: Request, res: Response) => {
  const today = dailyGame.getToday();
  const seed = dailyGame.getSeed();
  const encryptedWords = encrypt(JSON.stringify(today.words), seed);

  res.json({
    ...today,
    words: encryptedWords,
  });
};

export const getLastData = (req: Request, res: Response) => {
  res.json(dailyGame.getLast());
};
