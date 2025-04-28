import { loadUserAPI } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginResponse } from "@/features/auth/types";
import { RootState } from "@/shared/types";
import { CustomError, ErrorTypes } from "@/shared/errors";
import { refreshTokenAPI } from "@/shared/api/";

export const loadUser = createAsyncThunk<
  LoginResponse,
  void,
  { rejectValue: string; state: RootState }
>("user/loadUser", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const refreshToken = state.auth.refreshToken;
  console.log(refreshToken);

  if (!refreshToken) {
    return thunkAPI.rejectWithValue("No se tiene un refresh token");
  }

  try {
    return await loadUserAPI(refreshToken);
  } catch (err) {
    if (err instanceof CustomError) {
      if (err.type !== ErrorTypes.AUTHENTICATION_ERROR) {
        return thunkAPI.rejectWithValue(err.message);
      }

      try {
        const res = await refreshTokenAPI(refreshToken);
        return await loadUserAPI(res.refreshToken);
      } catch (refreshErr) {
        if (refreshErr instanceof CustomError) {
          return thunkAPI.rejectWithValue(refreshErr.message);
        }
      }
    }

    return thunkAPI.rejectWithValue(
      "Algo salió mal. Intentalo de nuevo más tarde."
    );
  }
});
