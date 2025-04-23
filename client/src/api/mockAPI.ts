import { puntuation } from "~/shared/utils/wordUtils";
import { getGrid } from "~/shared/utils/dailyGrid";
import { getWords } from "~/shared/utils/dailyWords";
import { GameData, LastGameData } from "@/types";

const seed = Math.floor(Date.now() / 86400000);

export const fetchSeed = async () => {
  return { seed };
};

export const fetchTodayData = async (): Promise<GameData> => {
  const todayGrid = getGrid(seed);
  const todayWords = getWords(todayGrid);
  const maxPoints = todayWords.reduce(
    (acc, word) => acc + puntuation(word.length),
    0
  );

  return { grid: todayGrid, words: todayWords, maxPoints };
};

export const fetchLastData = async (): Promise<LastGameData> => {
  const lastGrid = getGrid(seed - 1);
  const lastWords = getWords(lastGrid).sort();

  return { grid: lastGrid, words: lastWords };
};
