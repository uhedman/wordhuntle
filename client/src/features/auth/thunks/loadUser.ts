import { loadUserAPI, refreshTokenAPI } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginResponse } from "@/features/auth/types";
import { RootState } from "@/shared/types";
import { CustomError } from "@/shared/errors";
import { syncProgress } from "@/features/progress/thunks/syncProgress";

export const loadUser = createAsyncThunk<
  LoginResponse,
  void,
  { rejectValue: string; state: RootState }
>("user/loadUser", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const refreshToken = state.auth.refreshToken;

  if (!refreshToken) {
    return thunkAPI.rejectWithValue("No se tiene un refresh token");
  }

  try {
    const { accessToken } = await refreshTokenAPI(refreshToken);
    const res = await loadUserAPI(accessToken);

    thunkAPI.dispatch(syncProgress(res.progress?.found));

    return res;
  } catch (err) {
    if (err instanceof CustomError) {
      return thunkAPI.rejectWithValue(err.message);
    }

    return thunkAPI.rejectWithValue(
      "Algo salió mal. Intentalo de nuevo más tarde."
    );
  }
});
