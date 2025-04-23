import { loadUserAPI } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/features/auth/types";

export const loadUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/loadUser",
  async (_, thunkAPI) => {
    try {
      const data = await loadUserAPI();
      return data.user;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("No logueado");
    }
  }
);
