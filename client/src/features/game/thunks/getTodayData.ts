import { getTodayDataAPI } from "@/shared/api";
// import { decrypt } from "@/shared/utils/desencrypt";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GameData } from "../types";
import { RootState } from "@/shared/types";

export const getTodayData = createAsyncThunk<
  GameData,
  void,
  { rejectValue: string; state: RootState }
>("game/todayData", async () =>
  // (_, thunkAPI)
  {
    const data = await getTodayDataAPI();
    return data;
    // const seed = thunkAPI.getState().gameData.seed;
    // const decryptedWords = decrypt(data.words, seed!); // TODO

    // return {
    //   ...data,
    //   words: decryptedWords,
    // };
  }
);
