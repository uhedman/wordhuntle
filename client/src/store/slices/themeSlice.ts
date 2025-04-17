import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  value: "dark" | "light";
}

const initialState: ThemeState = {
  value: localStorage.getItem("theme") as "dark" | "light" ?? "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.value === "light" ? "dark" : "light";
      return { value: newTheme };
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
