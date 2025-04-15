import { RequestHandler } from "express";
import { puntuation } from "../../shared/utils/wordUtils";
import { getGrid } from "../../shared/utils/dailyGrid";
import { getWords } from "../../shared/utils/dailyWords";

let todayCode = Math.floor(Date.now() / 86400000);
let lastCode = todayCode - 1;

let todayGrid = getGrid(todayCode);
let lastGrid = getGrid(lastCode);

let todayWords = getWords(todayGrid);
let maxPoints = todayWords.reduce(
  (acc, word) => acc + puntuation(word.length),
  0,
);
let lastWords = getWords(lastGrid);

setInterval(() => {
  const newCode = Math.floor(Date.now() / 86400000);
  if (newCode !== todayCode) {
    todayCode = newCode;
    lastCode = newCode - 1;

    todayGrid = getGrid(todayCode);
    lastGrid = getGrid(lastCode);

    todayWords = getWords(todayGrid);
    lastWords = getWords(lastGrid);

    maxPoints = todayWords.reduce(
      (acc, word) => acc + puntuation(word.length),
      0,
    );

    console.log("Nuevo código diario:", todayCode);
  }
}, 60 * 1000);

export const getTodayCode: RequestHandler = (req, res) => {
  res.json({ code: todayCode });
};

export const getTodayData: RequestHandler = (req, res) => {
  res.json({ grid: todayGrid, words: todayWords, maxPoints });
};

export const getLastData: RequestHandler = (req, res) => {
  res.json({ grid: lastGrid, words: lastWords });
};
