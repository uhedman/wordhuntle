import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Grid } from "~/shared/types";
import { getTodayData } from "@/features/game/thunks/getTodayData";

interface GameState {
  seed: number | null;
  grid: Grid | null;
  words: string[] | null;
  maxPoints: number | null;
  loading: boolean; // TODO
  error: string | undefined;
}

const initialState: GameState = {
  seed: null,
  grid: null,
  words: null,
  maxPoints: null,
  loading: false, // TODO
  error: undefined,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSeed: (state, action: PayloadAction<number>) => {
      state.seed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodayData.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getTodayData.fulfilled, (state, action) => {
        state.grid = action.payload.grid;
        state.words = action.payload.words;
        state.maxPoints = action.payload.maxPoints;
      })
      .addCase(getTodayData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSeed } = gameSlice.actions;
export default gameSlice.reducer;
