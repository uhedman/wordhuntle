import { updateProgress } from "@/features/progress/slice";
import { loginUserAPI, postFoundWords } from "@/shared/api";
import { CustomError } from "@/shared/errors";
import { RootState } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { puntuation } from "~/shared/utils/wordUtils";
import { User } from "../types";

export const loginUser = createAsyncThunk<
  { user: User; accessToken: string; refreshToken: string },
  { username: string; password: string },
  { rejectValue: string; state: RootState }
>("user/login", async (credentials, thunkAPI) => {
  try {
    const response = await loginUserAPI(credentials);

    const localProgress = thunkAPI.getState().progress;
    const backendProgress = response.progress;

    const allWordsSet = new Set([
      ...localProgress.found,
      ...(backendProgress?.found ?? []),
    ]);
    const allWords = Array.from(allWordsSet);

    const totalPoints = allWords.reduce(
      (acc, word) => acc + puntuation(word.length),
      0
    );

    const maxPoints = thunkAPI.getState().game.maxPoints!;
    const level = Math.floor(Math.sqrt(totalPoints / maxPoints) * 8);

    thunkAPI.dispatch(
      updateProgress({ found: allWords, points: totalPoints, level })
    );

    const newWords = localProgress.found.filter(
      (word) => !backendProgress?.found.includes(word)
    );

    if (newWords.length > 0) {
      await postFoundWords(newWords, response.accessToken);
    }

    return {
      user: response.user,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };
  } catch (err) {
    if (err instanceof CustomError) {
      return thunkAPI.rejectWithValue(err.message);
    }

    return thunkAPI.rejectWithValue(
      "Algo salió mal. Intentalo de nuevo más tarde."
    );
  }
});
