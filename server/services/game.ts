import { getGrid, getSecretWord } from "../../shared/utils/dailyGrid";
import { getWords } from "../../shared/utils/dailyWords";
import { puntuation } from "../../shared/utils/wordUtils";

let seed = Math.floor(Date.now() / 86400000);
let lastSeed = seed - 1;

let todayGrid = getGrid(seed);
let todayWord = getSecretWord(seed);
let todayWords = getWords(todayGrid);
let maxPoints = todayWords.reduce(
  (acc, word) => acc + puntuation(word.length),
  0
);

let lastGrid = getGrid(lastSeed);
let lastWord = getSecretWord(lastSeed);
let lastWords = getWords(lastGrid).sort();

setInterval(() => {
  const newSeed = Math.floor(Date.now() / 86400000);
  if (newSeed !== seed) {
    seed = newSeed;
    lastSeed = newSeed - 1;

    todayGrid = getGrid(seed);
    todayWord = getSecretWord(seed);
    todayWords = getWords(todayGrid);
    maxPoints = todayWords.reduce(
      (acc, word) => acc + puntuation(word.length),
      0
    );

    lastGrid = getGrid(lastSeed);
    lastWord = getSecretWord(lastSeed);
    lastWords = getWords(lastGrid).sort();

    console.log("New daily seed:", seed);
  }
}, 60 * 1000);

export const dailyGame = {
  getSeed: () => seed,
  getToday: () => ({
    grid: todayGrid,
    word: todayWord,
    words: todayWords,
    maxPoints,
  }),
  getLast: () => ({
    grid: lastGrid,
    word: lastWord,
    words: lastWords,
  }),
  getMaxPoints: () => maxPoints,
};
