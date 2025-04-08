import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    lastGrid: null,
    lastWords: null,
    lastFound: null,
    gridLoading: false, // TODO
    gridError: null,
    wordsLoading: false, // TODO
    wordsError: null
  },
  reducers: {
    loadHistoryStorage: (state) => {
      const lastGrid = JSON.parse(localStorage.getItem('lastGrid'));
      const lastWords = JSON.parse(localStorage.getItem('lastWords'));
      const lastFound = JSON.parse(localStorage.getItem('lastFound')) || [];

      return { ...state, lastGrid, lastWords, lastFound };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastGrid.pending, (state) => {
        return { ...state, gridLoading: true, gridError: null }
      })
      .addCase(fetchLastGrid.fulfilled, (state, action) => {
        localStorage.setItem('lastGrid', JSON.stringify(action.payload));

        return { ...state, gridLoading: false, lastGrid: action.payload }
      })
      .addCase(fetchLastGrid.rejected, (state, action) => {
        return { ...state, gridLoading: false, gridError: action.error.message }
      })

      .addCase(fetchLastWords.pending, (state) => {
        return { ...state, wordsLoading: true, wordsError: null }
      })
      .addCase(fetchLastWords.fulfilled, (state, action) => {
        localStorage.setItem('lastWords', JSON.stringify(action.payload));
        const lastFound = JSON.parse(localStorage.getItem('lastFound')) || []; // TODO

        return { ...state, wordsLoading: false, lastWords: action.payload, lastFound }
      })
      .addCase(fetchLastWords.rejected, (state, action) => {
        return { ...state, wordsLoading: false, wordsError: action.error.message }
      });
  },
});

export const fetchLastGrid = createAsyncThunk(
  'history/fetchLastGrid',
  async () => {
    const res = await fetch(`/api/lastGrid`);
    const data = await res.json();
    return data.grid;
  }
);

export const fetchLastWords = createAsyncThunk(
  'history/fetchLastWords',
  async () => {
    const res = await fetch(`/api/lastWords`);
    const data = await res.json();
    return data.words.sort();
  }
);

export const { loadHistoryStorage, loadLastFound } = historySlice.actions;
export default historySlice.reducer;
