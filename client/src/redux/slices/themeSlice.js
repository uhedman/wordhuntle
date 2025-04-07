import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: JSON.parse(localStorage.getItem('theme')) || 'light',
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', JSON.stringify(newTheme));
      return newTheme;
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;