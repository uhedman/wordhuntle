import { getFromStorage } from "@/shared/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Grid } from "~/shared/types";
import { getLastData } from "@/features/history/thunks/getLastData";

interface HistoryState {
  lastGrid: Grid | null;
  lastWords: string[] | null;
  lastFound: string[];
  loading: boolean;
  error: string | undefined;
}

const initialState: HistoryState = {
  lastGrid: null,
  lastWords: null,
  lastFound: getFromStorage<string[]>("lastFound") ?? [],
  loading: false, // TODO
  error: undefined,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setLastFound: (state, action: PayloadAction<string[]>) => {
      state.lastFound = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLastData.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getLastData.fulfilled, (state, action) => {
        state.lastGrid = action.payload.grid;
        state.lastWords = action.payload.words;
        state.loading = false;
      })
      .addCase(getLastData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLastFound } = historySlice.actions;
export default historySlice.reducer;
