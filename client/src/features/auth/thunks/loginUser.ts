import { updateProgress } from "@/features/progress/slice";
import { loginUserAPI, postFoundWords } from "@/shared/api";
import { CustomError, ErrorTypes } from "@/shared/errors";
import { RootState } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { puntuation } from "~/shared/utils/wordUtils";
import { LoginResponse } from "../types";

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

    const maxPoints = thunkAPI.getState().game.maxPoints!;
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
    if (err instanceof CustomError) {
      switch (err.type) {
        case ErrorTypes.NETWORK_ERROR:
          return thunkAPI.rejectWithValue(
            "No se pudo conectar con el servidor. Verificá tu conexión a internet e intentá nuevamente."
          );

        case ErrorTypes.AUTHENTICATION_ERROR:
          return thunkAPI.rejectWithValue(
            "Error al iniciar sesión. Verificá los datos ingresados."
          );

        case ErrorTypes.INTERNAL_SERVER_ERROR:
          return thunkAPI.rejectWithValue(
            "Error interno del servidor. Estamos trabajando para solucionarlo."
          );

        case ErrorTypes.UNKNOWN_ERROR:
        default:
          return thunkAPI.rejectWithValue(
            err.message ||
              "Error desconocido. Si el problema persiste, contactá al soporte."
          );
      }
    }

    return thunkAPI.rejectWithValue(
      "Algo salió mal. Intentalo de nuevo más tarde."
    );
  }
});
