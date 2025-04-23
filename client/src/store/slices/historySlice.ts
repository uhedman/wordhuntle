import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchLastData } from "@/api";
import { getFromStorage } from "@/utils/storage";
import { HistoryState, LastGameData } from "@/types";

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
      .addCase(fetchLastDataThunk.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchLastDataThunk.fulfilled, (state, action) => {
        state.lastGrid = action.payload.grid;
        state.lastWords = action.payload.words;
        state.loading = false;
      })
      .addCase(fetchLastDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const fetchLastDataThunk = createAsyncThunk<LastGameData>(
  "game/lastData",
  async () => {
    const data = await fetchLastData();
    return data;
  }
);

export const { setLastFound } = historySlice.actions;
export default historySlice.reducer;
