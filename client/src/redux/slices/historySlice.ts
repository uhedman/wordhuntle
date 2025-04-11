import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Grid } from "@/types";

interface historyState {
  lastGrid: Grid | null;
  lastWords: string[] | null;
  lastFound: string[] | null;
  gridLoading: boolean; // TODO
  gridError: string | undefined;
  wordsLoading: boolean; // TODO
  wordsError: string | undefined;
}

const initialState: historyState = {
  lastGrid: null,
  lastWords: null,
  lastFound: null,
  gridLoading: false, // TODO
  gridError: undefined,
  wordsLoading: false, // TODO
  wordsError: undefined,
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
      .addCase(fetchLastGrid.pending, (state) => {
        return { ...state, gridLoading: true, gridError: undefined };
      })
      .addCase(fetchLastGrid.fulfilled, (state, action) => {
        localStorage.setItem("lastGrid", JSON.stringify(action.payload));

        return { ...state, gridLoading: false, lastGrid: action.payload };
      })
      .addCase(fetchLastGrid.rejected, (state, action) => {
        return {
          ...state,
          gridLoading: false,
          gridError: action.error.message,
        };
      })

      .addCase(fetchLastWords.pending, (state) => {
        return { ...state, wordsLoading: true, wordsError: undefined };
      })
      .addCase(fetchLastWords.fulfilled, (state, action) => {
        localStorage.setItem("lastWords", JSON.stringify(action.payload));
        const lastFound = JSON.parse(localStorage.getItem("lastFound") ?? "[]");

        return {
          ...state,
          wordsLoading: false,
          lastWords: action.payload,
          lastFound,
        };
      })
      .addCase(fetchLastWords.rejected, (state, action) => {
        return {
          ...state,
          wordsLoading: false,
          wordsError: action.error.message,
        };
      });
  },
});

export const fetchLastGrid = createAsyncThunk(
  "history/fetchLastGrid",
  async () => {
    const res = await fetch(`/api/lastGrid`);
    const data = await res.json();
    return data.grid as Grid;
  },
);

export const fetchLastWords = createAsyncThunk(
  "history/fetchLastWords",
  async () => {
    const res = await fetch(`/api/lastWords`);
    const data = await res.json();
    return data.words.sort() as string[];
  },
);

export const { loadHistoryStorage } = historySlice.actions;
export default historySlice.reducer;
