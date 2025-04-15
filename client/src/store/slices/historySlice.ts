import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Grid } from "../../../../shared/types";
import { getLastData } from "../../api";

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
      const lastGrid = JSON.parse(localStorage.getItem("lastGrid") ?? "[]"); // TODO
      const lastWords = JSON.parse(localStorage.getItem("lastWords") ?? "[]");
      const lastFound =
        JSON.parse(localStorage.getItem("lastFound") ?? "[]") || [];

      return { ...state, lastGrid, lastWords, lastFound };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastData.pending, (state) => {
        return { ...state, gridLoading: true, gridError: undefined };
      })
      .addCase(fetchLastData.fulfilled, (state, action) => {
        const { words, grid } = action.payload;
        localStorage.setItem("words", JSON.stringify(words));
        localStorage.setItem("lastGrid", JSON.stringify(grid));

        return {
          ...state,
          gridLoading: false,
          lastWords: words,
          lastGrid: grid,
        };
      })
      .addCase(fetchLastData.rejected, (state, action) => {
        return {
          ...state,
          gridLoading: false,
          gridError: action.error.message,
        };
      });
  },
});

export const fetchLastData = createAsyncThunk("game/todayData", async () => {
  const data = await getLastData();
  return data as { grid: Grid; words: string[]; maxPoints: number };
});

export const { loadHistoryStorage } = historySlice.actions;
export default historySlice.reducer;
