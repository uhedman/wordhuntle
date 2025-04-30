import { Game } from "@/features/game/types";
import { LastGame } from "@/features/history/types";
import { getGrid, getSecretWord } from "~/shared/utils/dailyGrid";
import { getWords } from "~/shared/utils/dailyWords";
import { puntuation } from "~/shared/utils/wordUtils";

const seed = Math.floor(Date.now() / 86400000);

export const getSeedAPI = async () => {
  return { seed };
};

export const getTodayDataAPI = async (): Promise<Game> => {
  const todayGrid = getGrid(seed);
  const todayWord = getSecretWord(seed);
  const todayWords = getWords(todayGrid);
  const maxPoints = todayWords.reduce(
    (acc, word) => acc + puntuation(word.length),
    0
  );

  return { grid: todayGrid, word: todayWord, words: todayWords, maxPoints };
};

export const getLastDataAPI = async (): Promise<LastGame> => {
  const lastGrid = getGrid(seed - 1);
  const lastWord = getSecretWord(seed - 1);
  const lastWords = getWords(lastGrid).sort();

  return { grid: lastGrid, word: lastWord, words: lastWords };
};
