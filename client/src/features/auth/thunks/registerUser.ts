import { registerUserAPI } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/features/auth/types";

export const registerUser = createAsyncThunk<
  User,
  { username: string; password: string; confirmPassword: string },
  { rejectValue: string }
>("user/register", async (credentials, thunkAPI) => {
  try {
    return await registerUserAPI(credentials);
  } catch (err) {
    console.error(err);
    return thunkAPI.rejectWithValue("Error de red");
  }
});
