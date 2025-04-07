import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://ideal-capybara-rq6rwpj4x5f5w5q-5000.app.github.dev';

export const fetchTodayCode = createAsyncThunk(
  'game/todayCode',
  async () => {
    const res = await fetch(`${BASE_URL}/api/todayCode`);
    const data = await res.json();
    return data.code;
  }
);

export const fetchTodayGrid = createAsyncThunk(
  'game/todayGrid',
  async () => {
    const res = await fetch(`${BASE_URL}/api/todayGrid`);
    const data = await res.json();
    return data.grid;
  }
);

export const fetchTodayWords = createAsyncThunk(
  'game/todayWords',
  async () => {
    const res = await fetch(`${BASE_URL}/api/todayWords`);
    const data = await res.json();
    return data;
  }
);

const gameDataSlice = createSlice({
  name: 'gameData',
  initialState: {
    todayCode: 0,
    grid: [],
    words: [],
    maxPoints: 0,
    total: 0
  },
  reducers: {
    // setGameData: (state, action) => {
    //   const todayCode = action.payload;
    //   const grid = getGrid(todayCode);
    //   const secretWords = getWords(grid);
    //   const maxPoints = secretWords.reduce((acc, word) => acc + puntuation(word.length), 0);
      
    //   return { ...state, todayCode, grid, secretWords, maxPoints, total: secretWords.length };
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayCode.pending, (state) => {
        return { ...state, loading: true, error: null }
      })
      .addCase(fetchTodayCode.fulfilled, (state, action) => {
        return { ...state, loading: false, todayCode: action.payload }
      })
      .addCase(fetchTodayCode.rejected, (state, action) => {
        return { ...state, loading: false, error: action.error.message }
      })

      .addCase(fetchTodayGrid.pending, (state) => {
        return { ...state, loading: true, error: null }
      })
      .addCase(fetchTodayGrid.fulfilled, (state, action) => {
        return { ...state, loading: false, grid: action.payload }
      })
      .addCase(fetchTodayGrid.rejected, (state, action) => {
        return { ...state, loading: false, error: action.error.message }
      })

      .addCase(fetchTodayWords.pending, (state) => {
        return { ...state, loading: true, error: null }
      })
      .addCase(fetchTodayWords.fulfilled, (state, action) => {
        const { words, maxPoints } = action.payload;
        return { ...state, loading: false, words, maxPoints }
      })
      .addCase(fetchTodayWords.rejected, (state, action) => {
        return { ...state, loading: false, error: action.error.message }
      });
  }
});

// export const setGame = (todayCode) => (dispatch, getState) => {
//   const { found } = getState().progress;
//   const storageCode = JSON.parse(localStorage.getItem('todayCode'));
//   dispatch(setGameData(todayCode));

//   if (storageCode !== todayCode) {
//     dispatch(resetProgress());
//     if (storageCode === todayCode - 1) {
//       localStorage.setItem('lastFound', JSON.stringify(found));
//       dispatch(setHistory({ todayCode, lastFound: found }));
//     } else {
//       localStorage.setItem('lastFound', JSON.stringify([]));
//       dispatch(setHistory({ todayCode, lastFound: [] }));
//     }
//     localStorage.setItem('todayCode', JSON.stringify(todayCode));
//   } else {
//     const lastFound = JSON.parse(localStorage.getItem('lastFound')) || [];
//     dispatch(setHistory({ todayCode, lastFound }));
//   }
// }

export default gameDataSlice.reducer;