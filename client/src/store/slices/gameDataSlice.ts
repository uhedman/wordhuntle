import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Grid } from "../../../../shared/types";
import { getTodayData } from "../../api";

interface gameDataState {
  todayCode: number | null;
  grid: Grid | null;
  words: string[] | null;
  maxPoints: number | null;
  total: number | null;
  gridLoading: boolean; // TODO
  gridError: string | undefined;
  wordsLoading: boolean; // TODO
  wordsError: string | undefined;
}

const initialState: gameDataState = {
  todayCode: null,
  grid: null,
  words: null,
  maxPoints: null,
  total: null,
  gridLoading: false, // TODO
  gridError: undefined,
  wordsLoading: false, // TODO
  wordsError: undefined,
};

const gameDataSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    setTodayCode: (state, action: PayloadAction<number>) => {
      return { ...state, todayCode: action.payload };
    },
    loadGameStorage: (state) => {
      const grid = JSON.parse(localStorage.getItem("grid") ?? "");
      const words = JSON.parse(localStorage.getItem("words") ?? "");
      const maxPoints = JSON.parse(localStorage.getItem("maxPoints") ?? "");
      const total = words.length;

      return { ...state, grid, words, maxPoints, total };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayData.pending, (state) => {
        return { ...state, gridLoading: true, gridError: undefined };
      })
      .addCase(fetchTodayData.fulfilled, (state, action) => {
        const { grid, words, maxPoints } = action.payload;
        localStorage.setItem("grid", JSON.stringify(grid));
        localStorage.setItem("words", JSON.stringify(words));
        localStorage.setItem("maxPoints", JSON.stringify(maxPoints));

        return { ...state, gridLoading: false, grid, words, maxPoints };
      })
      .addCase(fetchTodayData.rejected, (state, action) => {
        return {
          ...state,
          gridLoading: false,
          gridError: action.error.message,
        };
      });
  },
});

export const fetchTodayData = createAsyncThunk("game/todayData", async () => {
  const data = await getTodayData();
  return data as { grid: Grid, words: string[], maxPoints: number };
});

export const { setTodayCode, loadGameStorage } = gameDataSlice.actions;
export default gameDataSlice.reducer;
