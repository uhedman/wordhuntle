import { getLastDataAPI } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LastGame } from "@/features/history/types";

export const getLastData = createAsyncThunk<LastGame>(
  "game/lastData",
  async () => {
    const data = await getLastDataAPI();
    return data;
  }
);
