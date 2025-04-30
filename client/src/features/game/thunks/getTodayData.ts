import { getTodayDataAPI } from "@/shared/api";
import { decrypt, decryptOne } from "@/shared/utils/desencrypt";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Game } from "../types";
import { RootState } from "@/shared/types";

export const getTodayData = createAsyncThunk<
  Game,
  void,
  { rejectValue: string; state: RootState }
>("game/todayData", async (_, thunkAPI) => {
  const data = await getTodayDataAPI();
  const seed = thunkAPI.getState().game.seed;

  return {
    ...data,
    word: decryptOne(data.word, seed!),
    words: decrypt(data.words, seed!),
  };
});
