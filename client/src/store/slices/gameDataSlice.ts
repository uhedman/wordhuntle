import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Grid } from "~/shared/types";
import { fetchTodayData } from "@/api";
import { getFromStorage } from "@/utils/storage";

interface gameDataState {
  seed: number | null;
  grid: Grid | null;
  words: string[] | null;
  maxPoints: number | null;
  total: number | null;
  loading: boolean; // TODO
  error: string | undefined;
}

const initialState: gameDataState = {
  seed: null,
  grid: null,
  words: null,
  maxPoints: null,
  total: null,
  loading: false, // TODO
  error: undefined,
};

const gameDataSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    setseed: (state, action: PayloadAction<number>) => {
      return { ...state, seed: action.payload };
    },
    loadGameStorage: (state) => {
      const grid = getFromStorage<Grid>("grid");
      const words = getFromStorage<string[]>("words");
      const maxPoints = getFromStorage<number>("maxPoints");
      const total = words?.length ?? null;

      return { ...state, grid, words, maxPoints, total };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayDataThunk.pending, (state) => {
        return { ...state, loading: true, error: undefined };
      })
      .addCase(fetchTodayDataThunk.fulfilled, (state, action) => {
        const { grid, words, maxPoints } = action.payload;
        localStorage.setItem("grid", JSON.stringify(grid));
        localStorage.setItem("words", JSON.stringify(words));
        localStorage.setItem("maxPoints", JSON.stringify(maxPoints));

        return { ...state, loading: false, grid, words, maxPoints };
      })
      .addCase(fetchTodayDataThunk.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

export const fetchTodayDataThunk = createAsyncThunk(
  "game/todayData",
  async () => {
    const data = await fetchTodayData();
    return data as { grid: Grid; words: string[]; maxPoints: number };
  },
);

export const { setseed, loadGameStorage } = gameDataSlice.actions;
export default gameDataSlice.reducer;
