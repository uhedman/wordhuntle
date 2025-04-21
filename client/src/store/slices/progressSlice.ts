import { createSlice, ThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { insert, puntuation } from "~/shared/utils/wordUtils";
import { RootState } from "@/store";
import { getFromStorage } from "@/utils/storage";

interface ProgressData {
  found: string[];
  level: number;
  points: number;
}

const initialState: ProgressData = {
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
    updateProgress: (
      state,
      action: PayloadAction<{ found: string[]; level: number; points: number }>
    ) => {
      state.found = action.payload.found;
      state.level = action.payload.level;
      state.points = action.payload.points;
    },
  },
});

export const addWord =
  (
    word: string
  ): ThunkAction<
    void,
    RootState,
    unknown,
    PayloadAction<{ found: string[]; level: number; points: number }>
  > =>
  (dispatch, getState) => {
    const state = getState();
    const { found, points } = state.progress;
    const { maxPoints } = state.gameData;

    if (!found.includes(word)) {
      const newFound = insert(found, word);
      const newPoints = points + puntuation(word.length);
      const level = Math.floor(Math.sqrt(newPoints / maxPoints!) * 8);

      dispatch(updateProgress({ level, found: newFound, points: newPoints }));
    }
  };

export const { resetProgress, updateProgress } = progressSlice.actions;
export default progressSlice.reducer;
