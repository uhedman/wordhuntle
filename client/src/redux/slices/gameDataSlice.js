import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const gameDataSlice = createSlice({
  name: 'gameData',
  initialState: {
    todayCode: null,
    grid: null,
    words: null,
    maxPoints: null,
    total: null,
    gridLoading: false, // TODO
    gridError: null,
    wordsLoading: false, // TODO
    wordsError: null
  },
  reducers: {
    setTodayCode: (state, action) => {
      return { ...state, todayCode: action.payload };
    },
    loadGameStorage: (state) => {
      const grid = JSON.parse(localStorage.getItem('grid'));
      const words = JSON.parse(localStorage.getItem('words'));
      const maxPoints = JSON.parse(localStorage.getItem('maxPoints'));
      const total = words.length;

      return { ...state, grid, words, maxPoints, total };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayGrid.pending, (state) => {
        return { ...state, gridLoading: true, gridError: null }
      })
      .addCase(fetchTodayGrid.fulfilled, (state, action) => {
        localStorage.setItem('grid', JSON.stringify(action.payload));
        
        return { ...state, gridLoading: false, grid: action.payload }
      })
      .addCase(fetchTodayGrid.rejected, (state, action) => {
        return { ...state, gridLoading: false, gridError: action.error.message }
      })

      .addCase(fetchTodayWords.pending, (state) => {
        return { ...state, wordsLoading: true, wordsError: null }
      })
      .addCase(fetchTodayWords.fulfilled, (state, action) => {
        const { words, maxPoints } = action.payload;
        localStorage.setItem('words', JSON.stringify(words));
        localStorage.setItem('maxPoints', JSON.stringify(maxPoints));

        return { ...state, wordsLoading: false, words, maxPoints }
      })
      .addCase(fetchTodayWords.rejected, (state, action) => {
        return { ...state, wordsLoading: false, wordsError: action.error.message }
      });
  }
});

export const fetchTodayGrid = createAsyncThunk(
  'game/todayGrid',
  async () => {
    const res = await fetch('/api/todayGrid');
    const data = await res.json();
    return data.grid;
  }
);

export const fetchTodayWords = createAsyncThunk(
  'game/todayWords',
  async () => {
    const res = await fetch('/api/todayWords');
    const data = await res.json();
    return data;
  }
);

export const { setTodayCode, loadGameStorage } = gameDataSlice.actions;
export default gameDataSlice.reducer;