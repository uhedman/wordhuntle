import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://ideal-capybara-rq6rwpj4x5f5w5q-5000.app.github.dev';

export const fetchLastGrid = createAsyncThunk(
  'history/fetchLastGrid',
  async () => {
    const res = await fetch(`${BASE_URL}/api/lastGrid`);
    const data = await res.json();
    return data.grid;
  }
);

export const fetchLastWords = createAsyncThunk(
  'history/fetchLastWords',
  async () => {
    const res = await fetch(`${BASE_URL}/api/lastWords`);
    const data = await res.json();
    return data.words.sort();
  }
);

const historySlice = createSlice({
  name: 'history',
  initialState: {
    lastGrid: [],
    lastWords: [],
    lastFound: [],
    loading: false,
    error: null
  },
  reducers: {
    setGrid: (state, action) => {
      return { ...state, lastGrid: action.payload };
    },
    setWords: (state, action) => {
      return { ...state, lastWords: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastGrid.pending, (state) => {
        return { ...state, loading: true, error: null }
      })
      .addCase(fetchLastGrid.fulfilled, (state, action) => {
        return { ...state, loading: false, lastGrid: action.payload }
      })
      .addCase(fetchLastGrid.rejected, (state, action) => {
        return { ...state, loading: false, error: action.error.message }
      })

      .addCase(fetchLastWords.pending, (state) => {
        return { ...state, loading: true, error: null }
      })
      .addCase(fetchLastWords.fulfilled, (state, action) => {
        return { ...state, loading: false, lastWords: action.payload }
      })
      .addCase(fetchLastWords.rejected, (state, action) => {
        return { ...state, loading: false, error: action.error.message }
      });
  },
});

export const { setHistory } = historySlice.actions;
export default historySlice.reducer;
