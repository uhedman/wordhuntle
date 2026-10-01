import { EncryptedGame } from "@/features/game/types";
import { LastGame } from "@/features/history/types";
import { encrypt } from "@/shared/utils/encrypt";

import { getGrid, getSecretWord } from "@wordhuntle/core/utils/dailyGrid";
import { getWords } from "@wordhuntle/core/utils/dailyWords";
import { puntuation } from "@wordhuntle/core/utils/wordUtils";

const seed = Math.floor(Date.now() / 86400000);

export const getSeedAPI = async () => {
	return { seed };
};

export const getTodayDataAPI = async (): Promise<EncryptedGame> => {
	const todayGrid = getGrid(seed);
	const todayWord = getSecretWord(seed);
	const todayWords = getWords(todayGrid);
	const maxPoints = todayWords.reduce(
		(acc: number, word: string) => acc + puntuation(word.length),
		0,
	);

	return {
		grid: todayGrid,
		word: await encrypt(todayWord, seed),
		words: await encrypt(JSON.stringify(todayWords), seed),
		maxPoints,
	};
};

export const getLastDataAPI = async (): Promise<LastGame> => {
	const lastGrid = getGrid(seed - 1);
	const lastWord = getSecretWord(seed - 1);
	const lastWords = getWords(lastGrid).sort();

	return { grid: lastGrid, word: lastWord, words: lastWords };
};
