import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Grid } from "~/shared/types";
import { getTodayData } from "@/features/game/thunks/getTodayData";
import { Rotation } from "./types";
import { rotateRight, rotateLeft } from "./utils";

interface GameState {
  seed: number | null;
  grid: Grid | null;
  word: string | null;
  words: string[] | null;
  maxPoints: number | null;
  loading: boolean; // TODO
  error: string | undefined;
}

const initialState: GameState = {
  seed: null,
  grid: null,
  word: null,
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
    rotateGrid: (state, action: PayloadAction<Rotation>) => {
      if (!state.grid) return;

      state.grid =
        action.payload === "right"
          ? rotateRight(state.grid)
          : rotateLeft(state.grid);
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
        state.word = action.payload.word;
        state.words = action.payload.words;
        state.maxPoints = action.payload.maxPoints;
      })
      .addCase(getTodayData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSeed, rotateGrid } = gameSlice.actions;
export default gameSlice.reducer;
