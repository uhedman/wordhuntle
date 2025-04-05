import { createSlice } from '@reduxjs/toolkit';
import { getGrid } from '../../utils/grid';
import { getWords, puntuation } from '../../utils/script';
import { setHistory } from './historySlice';
import { resetProgress } from './progressSlice';

const gameDataSlice = createSlice({
  name: 'gameData',
  initialState: {
    todayCode: 0,
    grid: [],
    secretWords: [],
    maxPoints: 0,
    total: 0
  },
  reducers: {
    setGameData: (state, action) => {
      const todayCode = action.payload;
      const grid = getGrid(todayCode);
      const secretWords = getWords(grid);
      const maxPoints = secretWords.reduce((acc, word) => acc + puntuation(word.length), 0);
      
      return { ...state, todayCode, grid, secretWords, maxPoints, total: secretWords.length };
    }
  }
});

export const setGame = (todayCode) => (dispatch, getState) => {
  const { found } = getState().progress;
  const storageCode = JSON.parse(localStorage.getItem('todayCode'));
  dispatch(setGameData(todayCode));

  if (storageCode !== todayCode) {
    dispatch(resetProgress());
    if (storageCode === todayCode - 1) {
      localStorage.setItem('lastFound', JSON.stringify(found));
      dispatch(setHistory({ todayCode, lastFound: found }));
    } else {
      localStorage.setItem('lastFound', JSON.stringify([]));
      dispatch(setHistory({ todayCode, lastFound: [] }));
    }
    localStorage.setItem('todayCode', JSON.stringify(todayCode));
  } else {
    const lastFound = JSON.parse(localStorage.getItem('lastFound')) || [];
    dispatch(setHistory({ todayCode, lastFound }));
  }
}

export const { setGameData } = gameDataSlice.actions;
export default gameDataSlice.reducer;