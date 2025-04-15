import { createSlice, ThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { insert, puntuation } from "~/shared/utils/wordUtils";
import { RootState } from "@/store";
import { getFromStorage } from "@/utils/storage";

interface ProgressData {
  found: string[] | null;
  level: number | null;
  points: number | null;
}

const initialState: ProgressData = {
  found: null,
  level: null,
  points: null,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    resetProgress: (state) => {
      localStorage.setItem("found", "[]");
      localStorage.setItem("level", "0");
      localStorage.setItem("points", "0");

      return { ...state, level: 0, found: [], points: 0 };
    },
    updateProgress: (
      state,
      action: PayloadAction<{ found: string[]; level: number; points: number }>,
    ) => {
      const { found, level, points } = action.payload;
      localStorage.setItem("found", JSON.stringify(found));
      localStorage.setItem("level", JSON.stringify(level));
      localStorage.setItem("points", JSON.stringify(points));

      return { ...state, found, level, points };
    },
  },
});

export const addWord =
  (
    word: string,
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

    if (found === null || points === null || maxPoints === null) return; // TODO

    if (!found.includes(word)) {
      const newFound = insert(found, word);
      const newPoints = points + puntuation(word.length);
      const level = Math.floor(Math.sqrt(newPoints / maxPoints) * 8);

      dispatch(updateProgress({ level, found: newFound, points: newPoints }));
    }
  };

export const loadProgressStorage =
  (): ThunkAction<
    void,
    RootState,
    unknown,
    PayloadAction<{ found: string[]; level: number; points: number }>
  > =>
  (dispatch) => {
    const found = getFromStorage<string[]>("found") ?? [];
    const level = getFromStorage<number>("level") ?? 0;
    const points = getFromStorage<number>("points") ?? 0;

    dispatch(updateProgress({ found, level, points }));
  };

export const { resetProgress, updateProgress } = progressSlice.actions;
export default progressSlice.reducer;
