import { createSlice } from '@reduxjs/toolkit';
import { insert, puntuation } from '../../utils/script';

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    level: JSON.parse(localStorage.getItem('level')) || 0,
    found: JSON.parse(localStorage.getItem('found')) || [],
    points: JSON.parse(localStorage.getItem('points')) || 0
  },
  reducers: {
    resetProgress: (state) => {
      localStorage.setItem('level', JSON.stringify(0));
      localStorage.setItem('found', JSON.stringify([]));
      localStorage.setItem('points', JSON.stringify(0));
      return { ...state, level: 0, found: [], points: 0 }
    },
    updateProgress: (state, action) => {
      const { level, found, points } = action.payload;
      localStorage.setItem('level', JSON.stringify(level));
      localStorage.setItem('found', JSON.stringify(found));
      localStorage.setItem('points', JSON.stringify(points));
      return { ...state, level, found, points }
    }
  }
});

export const addWord = (word) => (dispatch, getState) => {
  const state = getState();
  const { found, points } = state.progress;
  const { maxPoints } = state.gameData;

  if (!found.includes(word)) {
    const newFound = insert(found, word);
    const newPoints = points + puntuation(word.length);
    const level = Math.floor(Math.sqrt(newPoints / maxPoints) * 8);

    dispatch(updateProgress({ level, found: newFound, points: newPoints }));
  }
}

export const { resetProgress, updateProgress } = progressSlice.actions;
export default progressSlice.reducer;