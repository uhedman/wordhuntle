import { createSlice } from '@reduxjs/toolkit';
import { getGrid } from '../../utils/grid';
import { getWords } from '../../utils/script';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    lastGrid: [],
    lastSecretWords: [],
    lastFound: []
  },
  reducers: {
    setHistory: (state, action) => {
      const { todayCode, lastFound } = action.payload;
      const lastGrid = getGrid(todayCode - 1);
      const lastSecretWords = getWords(lastGrid).sort();

      return { ...state, lastGrid, lastSecretWords, lastFound };
    }
  }
});

export const { setHistory } = historySlice.actions;
export default historySlice.reducer;
