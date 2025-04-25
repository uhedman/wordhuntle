import { getTodayDataAPI } from "@/shared/api";
import { decrypt } from "@/shared/utils/desencrypt";
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
  const decryptedWords = decrypt(data.words, seed!); // TODO

  return {
    ...data,
    words: decryptedWords,
  };
});
