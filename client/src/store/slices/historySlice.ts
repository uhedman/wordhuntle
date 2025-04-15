import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Grid } from "~/shared/types";
import { getLastData } from "@/api";
import { getFromStorage } from "@/utils/storage";

interface historyState {
  lastGrid: Grid | null;
  lastWords: string[] | null;
  lastFound: string[] | null;
  loading: boolean; // TODO
  error: string | undefined;
}

const initialState: historyState = {
  lastGrid: null,
  lastWords: null,
  lastFound: null,
  loading: false, // TODO
  error: undefined,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    loadHistoryStorage: (state) => {
      const lastFound = getFromStorage<string[]>("lastFound");
      const lastGrid = getFromStorage<Grid>("lastGrid");
      const lastWords = getFromStorage<string[]>("lastWords");

      return { ...state, lastFound, lastGrid, lastWords, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastData.pending, (state) => {
        return { ...state, loading: true, error: undefined };
      })
      .addCase(fetchLastData.fulfilled, (state, action) => {
        const { found, grid, words } = action.payload;
        localStorage.setItem("lastFound", JSON.stringify(found));
        localStorage.setItem("lastGrid", JSON.stringify(grid));
        localStorage.setItem("lastWords", JSON.stringify(words));

        return {
          ...state,
          loading: false,
          lastFound: found,
          lastGrid: grid,
          lastWords: words,
        };
      })
      .addCase(fetchLastData.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

export const fetchLastData = createAsyncThunk(
  "game/lastData",
  async (found: string[]) => {
    const data = await getLastData();
    return { ...data, found };
  },
);

export const { loadHistoryStorage } = historySlice.actions;
export default historySlice.reducer;
