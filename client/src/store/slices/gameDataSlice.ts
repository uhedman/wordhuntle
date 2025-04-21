import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Grid } from "~/shared/types";
import { fetchTodayData } from "@/api";

interface gameDataState {
  seed: number | null;
  grid: Grid | null;
  words: string[] | null;
  maxPoints: number | null;
  loading: boolean; // TODO
  error: string | undefined;
}

const initialState: gameDataState = {
  seed: null,
  grid: null,
  words: null,
  maxPoints: null,
  loading: false, // TODO
  error: undefined,
};

const gameDataSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    setSeed: (state, action: PayloadAction<number>) => {
      state.seed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayDataThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchTodayDataThunk.fulfilled, (state, action) => {
        state.grid = action.payload.grid;
        state.words = action.payload.words;
        state.maxPoints = action.payload.maxPoints;
      })
      .addCase(fetchTodayDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const fetchTodayDataThunk = createAsyncThunk(
  "game/todayData",
  async () => {
    const data = await fetchTodayData();
    return data as { grid: Grid; words: string[]; maxPoints: number };
  }
);

export const { setSeed } = gameDataSlice.actions;
export default gameDataSlice.reducer;
