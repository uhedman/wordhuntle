import { GameData } from "@/features/game/types";
import { LastGameData } from "@/features/history/types";
import { getGrid } from "~/shared/utils/dailyGrid";
import { getWords } from "~/shared/utils/dailyWords";
import { puntuation } from "~/shared/utils/wordUtils";

const seed = Math.floor(Date.now() / 86400000);

export const getSeedAPI = async () => {
  return { seed };
};

export const getTodayDataAPI = async (): Promise<GameData> => {
  const todayGrid = getGrid(seed);
  const todayWords = getWords(todayGrid);
  const maxPoints = todayWords.reduce(
    (acc, word) => acc + puntuation(word.length),
    0
  );

  return { grid: todayGrid, words: todayWords, maxPoints };
};

export const getLastDataAPI = async (): Promise<LastGameData> => {
  const lastGrid = getGrid(seed - 1);
  const lastWords = getWords(lastGrid).sort();

  return { grid: lastGrid, words: lastWords };
};
