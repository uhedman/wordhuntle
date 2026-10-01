import { api } from "@/shared/api";
import { RootState } from "@/shared/types";
import { decrypt, decryptOne } from "@/shared/utils/decrypt";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { Game } from "../types";

export const getTodayData = createAsyncThunk<
	Game,
	void,
	{ rejectValue: string; state: RootState }
>("game/todayData", async (_, thunkAPI) => {
	const data = await api.getTodayDataAPI();
	const seed = thunkAPI.getState().game.seed;

	return {
		...data,
		word: await decryptOne(data.word, seed!),
		words: await decrypt(data.words, seed!),
	};
});
