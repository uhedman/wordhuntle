import { postFoundWords } from "@/shared/api";
import { RootState } from "@/shared/types";
import { updateProgress } from "../slice";
import { puntuation } from "~/shared/utils/wordUtils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const syncProgress = createAsyncThunk<
  void,
  { backendFoundWords: string[] | undefined; accessToken: string },
  { state: RootState }
>("progress/sync", async ({ backendFoundWords, accessToken }, thunkAPI) => {
  if (backendFoundWords === undefined) {
    console.error("Error al sincronizar progreso con el servidor");
    return;
  }

  const { progress, game } = thunkAPI.getState();
  const { found: localFoundWords } = progress;
  const { maxPoints } = game;

  const allFoundWords = Array.from(
    new Set([...localFoundWords, ...backendFoundWords])
  ).sort();

  const totalPoints = allFoundWords.reduce(
    (acc, word) => acc + puntuation(word.length),
    0
  );

  const level = Math.floor(Math.sqrt(totalPoints / maxPoints!) * 8);

  if (localFoundWords.length !== allFoundWords.length) {
    thunkAPI.dispatch(
      updateProgress({ found: allFoundWords, points: totalPoints, level })
    );
  }

  if (backendFoundWords.length !== allFoundWords.length) {
    const newWordsToSync = localFoundWords.filter(
      (word) => !backendFoundWords.includes(word)
    );

    if (newWordsToSync.length && accessToken) {
      try {
        await postFoundWords(newWordsToSync, accessToken);
      } catch (err) {
        console.error("Error al sincronizar progreso con el servidor:", err);
      }
    }
  }
});
