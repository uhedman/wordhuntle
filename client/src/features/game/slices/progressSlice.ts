import { createSlice, ThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { insert, puntuation } from "~/shared/utils/wordUtils";
import { RootState } from "@/shared/types";
import { getFromStorage } from "@/shared/utils/storage";
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

export const addWord =
  (
    word: string
  ): ThunkAction<void, RootState, unknown, PayloadAction<Progress>> =>
  (dispatch, getState) => {
    const state = getState();
    const { found, points } = state.progress;
    const { maxPoints } = state.gameData;

    if (!found.includes(word)) {
      const newFound = insert(found, word);
      const newPoints = points + puntuation(word.length);
      const level = Math.floor(Math.sqrt(newPoints / maxPoints!) * 8);

      dispatch(updateProgress({ level, found: newFound, points: newPoints }));

      fetch("/api/word", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ words: [word] }),
      }).catch((err) =>
        console.error("Error al guardar la palabra en la API:", err)
      );
    }
  };

export const { resetProgress, updateProgress } = progressSlice.actions;
export default progressSlice.reducer;
