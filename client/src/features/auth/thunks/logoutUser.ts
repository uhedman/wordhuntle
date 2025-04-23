import { logoutUserAPI } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      await logoutUserAPI();
      return;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Error de red");
    }
  }
);
