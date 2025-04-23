import { getLastDataAPI } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LastGameData } from "@/features/history/types";

export const getLastData = createAsyncThunk<LastGameData>(
  "game/lastData",
  async () => {
    const data = await getLastDataAPI();
    return data;
  }
);
