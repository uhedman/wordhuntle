import { registerUserAPI } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterResponse } from "@/features/auth/types";
import { CustomError } from "@/shared/errors";
import { syncProgress } from "@/features/progress/thunks/syncProgress";
import { RootState } from "@/shared/types";

export const registerUser = createAsyncThunk<
  RegisterResponse,
  { username: string; password: string; confirmPassword: string },
  { rejectValue: string; state: RootState }
>("user/register", async (credentials, thunkAPI) => {
  try {
    const res = await registerUserAPI(credentials);

    thunkAPI.dispatch(
      syncProgress({
        backendFoundWords: [],
        accessToken: res.accessToken,
      })
    );

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
