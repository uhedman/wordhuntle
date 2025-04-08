import { puntuation } from "../utils/aux.mjs";
import { getGrid } from "../utils/dailyGrid.mjs";
import { getWords } from "../utils/dailyWords.mjs";

let todayCode = Math.floor(Date.now() / 86400000);
let lastCode = todayCode - 1;

let todayGrid = getGrid(todayCode);
let lastGrid = getGrid(lastCode);

let todayWords = getWords(todayGrid);
let maxPoints = todayWords.reduce((acc, word) => acc + puntuation(word.length), 0);
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

    maxPoints = todayWords.reduce((acc, word) => acc + puntuation(word.length), 0);

    console.log("Nuevo código diario:", todayCode);
  }
}, 60 * 1000);

// Handlers que simplemente devuelven las copias
export const getTodayCode = (req, res) => {
  res.json({ code: todayCode });
};

export const getTodayGrid = (req, res) => {
  res.json({ grid: todayGrid });
};

export const getLastGrid = (req, res) => {
  res.json({ grid: lastGrid });
};

export const getTodayWords = (req, res) => {
  res.json({ words: todayWords, maxPoints });
};

export const getLastWords = (req, res) => {
  res.json({ words: lastWords });
};
