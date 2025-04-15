import { puntuation } from "../../../shared/utils/wordUtils";
import { getGrid } from "../../../shared/utils/dailyGrid";
import { getWords } from "../../../shared/utils/dailyWords";

const todayCode = Math.floor(Date.now() / 86400000);

export const getTodayCode = async () => {
  return { code: todayCode };
};

export const getTodayData = async () => {
  const todayGrid = getGrid(todayCode);
  const todayWords = getWords(todayGrid);
  const maxPoints = todayWords.reduce(
    (acc, word) => acc + puntuation(word.length),
    0,
  );

  return { grid: todayGrid, words: todayWords, maxPoints };
};

export const getLastData = async () => {
  const lastGrid = getGrid(todayCode - 1);
  const lastWords = getWords(lastGrid);

  return { grid: lastGrid, words: lastWords };
};
