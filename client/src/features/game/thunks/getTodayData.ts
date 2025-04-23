import { getTodayDataAPI } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTodayData = createAsyncThunk("game/todayData", async () => {
  const data = await getTodayDataAPI();
  return data;
});
