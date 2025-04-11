import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  value: string;
}

const initialState: ThemeState = {
  value: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.value === "light" ? "dark" : "light";
      localStorage.setItem("theme", JSON.stringify(newTheme));
      return { value: newTheme };
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
