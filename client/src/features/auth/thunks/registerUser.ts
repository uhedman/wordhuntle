import { registerUserAPI } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterResponse } from "@/features/auth/types";
import { CustomError } from "@/shared/errors";

export const registerUser = createAsyncThunk<
  RegisterResponse,
  { username: string; password: string; confirmPassword: string },
  { rejectValue: string }
>("user/register", async (credentials, thunkAPI) => {
  try {
    return await registerUserAPI(credentials);
  } catch (err) {
    if (err instanceof CustomError) {
      return thunkAPI.rejectWithValue(err.message);
    }

    return thunkAPI.rejectWithValue(
      "Algo salió mal. Intentalo de nuevo más tarde."
    );
  }
});
