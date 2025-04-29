import { setLastFound } from "@/features/history/slice";
import { getLastData } from "@/features/history/thunks/getLastData";
import { RootState } from "@/shared/types";
import { getFromStorage } from "@/shared/utils/storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSeed } from "@/features/game/slice";
import { resetProgress } from "@/features/progress/slice";
import { getTodayData } from "@/features/game/thunks/getTodayData";

export const loadGame = createAsyncThunk<void, number, { state: RootState }>(
  "game/load",
  async (seed: number, thunkAPI) => {
    const storageSeed = getFromStorage<number>("seed");
    if (seed !== storageSeed) {
      if (seed - 1 === storageSeed) {
        const found = getFromStorage<string[]>("found") ?? [];
        thunkAPI.dispatch(setLastFound(found));
      }
      thunkAPI.dispatch(resetProgress());
    }

    thunkAPI.dispatch(setSeed(seed));
    await thunkAPI.dispatch(getTodayData());
    thunkAPI.dispatch(getLastData());
  }
);
