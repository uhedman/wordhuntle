import { Grid } from "@/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

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
      .addCase(fetchTodayGrid.pending, (state) => {
        return { ...state, gridLoading: true, gridError: undefined };
      })
      .addCase(fetchTodayGrid.fulfilled, (state, action) => {
        localStorage.setItem("grid", JSON.stringify(action.payload));

        return { ...state, gridLoading: false, grid: action.payload };
      })
      .addCase(fetchTodayGrid.rejected, (state, action) => {
        return {
          ...state,
          gridLoading: false,
          gridError: action.error.message,
        };
      })

      .addCase(fetchTodayWords.pending, (state) => {
        return { ...state, wordsLoading: true, wordsError: undefined };
      })
      .addCase(fetchTodayWords.fulfilled, (state, action) => {
        const { words, maxPoints } = action.payload;
        localStorage.setItem("words", JSON.stringify(words));
        localStorage.setItem("maxPoints", JSON.stringify(maxPoints));

        return { ...state, wordsLoading: false, words, maxPoints };
      })
      .addCase(fetchTodayWords.rejected, (state, action) => {
        return {
          ...state,
          wordsLoading: false,
          wordsError: action.error.message,
        };
      });
  },
});

export const fetchTodayGrid = createAsyncThunk("game/todayGrid", async () => {
  const res = await fetch("/api/todayGrid");
  const data = await res.json();
  return data.grid as Grid;
});

export const fetchTodayWords = createAsyncThunk("game/todayWords", async () => {
  const res = await fetch("/api/todayWords");
  const data = await res.json();
  return data as { words: string[]; maxPoints: number };
});

export const { setTodayCode, loadGameStorage } = gameDataSlice.actions;
export default gameDataSlice.reducer;
