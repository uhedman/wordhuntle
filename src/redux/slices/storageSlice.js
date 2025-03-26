import { createSlice } from '@reduxjs/toolkit';

const insert = (arr, newString) => {
  let low = 0;
  let high = arr.length - 1;
  const newArray = [...arr];

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (newString === arr[mid]) {
      return newArray;
    } else if (newString < arr[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  newArray.splice(low, 0, newString);
  return newArray;
}

const puntuation = (length) => {
  if (length === 4) return 1;
  else return (length - 3) * 2;
}

const storageSlice = createSlice({
  name: 'storage',
  initialState: {
    theme: JSON.parse(localStorage.getItem('theme')) || 'light',
    points: JSON.parse(localStorage.getItem('points')) || 0,
    found: JSON.parse(localStorage.getItem('found')) || [],
    lastFound: JSON.parse(localStorage.getItem('lastFound')) || [],
    todayCode: JSON.parse(localStorage.getItem('todayCode')) || 0
  },
  reducers: {
    addWord: (state, action) => {
      const word = action.payload;

      if (!state.found.includes(word)) {
        const found = insert(state.found, word);
        const points = state.points + puntuation(word.length);
        localStorage.setItem('found', JSON.stringify(found));
        localStorage.setItem('points', JSON.stringify(points));
        return { ...state, found, points };
      }
      else {
        return state;
      }
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', JSON.stringify(newTheme));
      return { ...state, theme: newTheme };
    },
    nextStorage: (state, action) => {
      const todayCode = action.payload;
      
      if (todayCode === state.todayCode - 1) {
        localStorage.setItem('lastFound', JSON.stringify(state.found));
      } else {
        localStorage.setItem('lastFound', JSON.stringify([]));
      }
      localStorage.setItem('todayCode', JSON.stringify(todayCode));
      localStorage.setItem('found', JSON.stringify([]));
      localStorage.setItem('points', JSON.stringify(0));
      return { ...state, points: 0, found: [], todayCode };
    }
  },
});

export const { addWord, toggleTheme, nextStorage } = storageSlice.actions;
export default storageSlice.reducer;
