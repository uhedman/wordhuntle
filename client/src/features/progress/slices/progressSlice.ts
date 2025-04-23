import { getFromStorage } from "@/shared/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Progress } from "~/shared/types";

const initialState: Progress = {
  found: getFromStorage<string[]>("found") ?? [],
  level: getFromStorage<number>("level") ?? 0,
  points: getFromStorage<number>("points") ?? 0,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    resetProgress: (state) => {
      state.level = 0;
      state.found = [];
      state.points = 0;
    },
    updateProgress: (state, action: PayloadAction<Progress>) => {
      state.found = action.payload.found;
      state.level = action.payload.level;
      state.points = action.payload.points;
    },
  },
});

export const { resetProgress, updateProgress } = progressSlice.actions;
export default progressSlice.reducer;
