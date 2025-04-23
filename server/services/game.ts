import { getGrid } from "../../shared/utils/dailyGrid";
import { getWords } from "../../shared/utils/dailyWords";
import { puntuation } from "../../shared/utils/wordUtils";

let seed = Math.floor(Date.now() / 86400000);
let lastSeed = seed - 1;

let todayGrid = getGrid(seed);
let lastGrid = getGrid(lastSeed);

let todayWords = getWords(todayGrid);
let maxPoints = todayWords.reduce(
  (acc, word) => acc + puntuation(word.length),
  0
);
let lastWords = getWords(lastGrid).sort();

setInterval(() => {
  const newSeed = Math.floor(Date.now() / 86400000);
  if (newSeed !== seed) {
    seed = newSeed;
    lastSeed = newSeed - 1;

    todayGrid = getGrid(seed);
    lastGrid = getGrid(lastSeed);

    todayWords = getWords(todayGrid);
    lastWords = getWords(lastGrid).sort();

    maxPoints = todayWords.reduce(
      (acc, word) => acc + puntuation(word.length),
      0
    );

    console.log("New daily seed:", seed);
  }
}, 60 * 1000);

export const dailyGame = {
  getSeed: () => seed,
  getToday: () => ({ grid: todayGrid, words: todayWords, maxPoints }),
  getLast: () => ({ grid: lastGrid, words: lastWords }),
  getMaxPoints: () => maxPoints,
};
