import { Request, Response } from "express";
import { puntuation } from "../../shared/utils/wordUtils";
import { getGrid } from "../../shared/utils/dailyGrid";
import { getWords } from "../../shared/utils/dailyWords";

let seed = Math.floor(Date.now() / 86400000);
let lastSeed = seed - 1;

let todayGrid = getGrid(seed);
let lastGrid = getGrid(lastSeed);

let todayWords = getWords(todayGrid);
let maxPoints = todayWords.reduce(
  (acc, word) => acc + puntuation(word.length),
  0,
);
let lastWords = getWords(lastGrid);

setInterval(() => {
  const newCode = Math.floor(Date.now() / 86400000);
  if (newCode !== seed) {
    seed = newCode;
    lastSeed = newCode - 1;

    todayGrid = getGrid(seed);
    lastGrid = getGrid(lastSeed);

    todayWords = getWords(todayGrid);
    lastWords = getWords(lastGrid);

    maxPoints = todayWords.reduce(
      (acc, word) => acc + puntuation(word.length),
      0,
    );

    console.log("Nuevo código diario:", seed);
  }
}, 60 * 1000);

export const getSeed = (req: Request, res: Response) => {
  res.json({ seed });
};

export const getTodayData = (req: Request, res: Response) => {
  res.json({ grid: todayGrid, words: todayWords, maxPoints });
};

export const getLastData = (req: Request, res: Response) => {
  res.json({ grid: lastGrid, words: lastWords });
};
