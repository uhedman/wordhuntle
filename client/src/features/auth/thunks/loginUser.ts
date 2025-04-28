import { loginUserAPI } from "@/shared/api";
import { CustomError } from "@/shared/errors";
import { RootState } from "@/shared/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginResponse } from "../types";
import { syncProgress } from "@/features/progress/thunks/syncProgress";

export const loginUser = createAsyncThunk<
  LoginResponse,
  { username: string; password: string },
  { rejectValue: string; state: RootState }
>("user/login", async (credentials, thunkAPI) => {
  try {
    const res = await loginUserAPI(credentials);

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
