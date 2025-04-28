import { postFoundWords } from "@/shared/api";
import { RootState } from "@/shared/types";
import { ThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { Progress } from "~/shared/types";
import { insert, puntuation } from "~/shared/utils/wordUtils";
import { updateProgress } from "@/features/progress/slice";

export const addWord =
  (
    word: string
  ): ThunkAction<void, RootState, unknown, PayloadAction<Progress>> =>
  (dispatch, getState) => {
    const state = getState();
    const { found, points } = state.progress;
    const { maxPoints } = state.game;
    const { accessToken, user } = state.auth;

    if (!found.includes(word)) {
      const newFound = insert(found, word);
      const newPoints = points + puntuation(word.length);
      const level = Math.floor(Math.sqrt(newPoints / maxPoints!) * 8);

      dispatch(updateProgress({ level, found: newFound, points: newPoints }));

      if (user !== null && accessToken) {
        postFoundWords([word], accessToken).catch((err) =>
          console.error("Error al guardar la palabra en la API:", err)
        );
      }
    }
  };
