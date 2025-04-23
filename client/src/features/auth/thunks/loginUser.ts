import { updateProgress } from "@/features/progress/slices/progressSlice";
import { loginUserAPI, postFoundWords } from "@/shared/api";
import { RootState } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { puntuation } from "~/shared/utils/wordUtils";
import { LoginResponse } from "@/features/auth/types";

export const loginUser = createAsyncThunk<
  LoginResponse,
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

    const maxPoints = thunkAPI.getState().gameData.maxPoints!;
    const level = Math.floor(Math.sqrt(totalPoints / maxPoints) * 8);

    thunkAPI.dispatch(
      updateProgress({ found: allWords, points: totalPoints, level })
    );

    const newWords = localProgress.found.filter(
      (word) => !backendProgress?.found.includes(word)
    );

    if (newWords.length > 0) {
      await postFoundWords(newWords);
    }

    return response;
  } catch (err) {
    console.error(err);
    return thunkAPI.rejectWithValue("Error de red");
  }
});
