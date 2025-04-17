import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { setSeed } from "@/store/slices/gameDataSlice";
import { resetProgress, updateProgress } from "@/store/slices/progressSlice";
import { toggleTheme } from "@/store/slices/themeSlice";
import { setLastFound } from "@/store/slices/historySlice";

export const persistMiddleware: Middleware<object, RootState> = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();
  if (setSeed.match(action)) {
    const seed = state.gameData.seed;
    localStorage.setItem("seed", JSON.stringify(seed));
  } else if (setLastFound.match(action)) {
    const { lastFound } = state.history;
    localStorage.setItem("lastFound", JSON.stringify(lastFound));
  } else if (resetProgress.match(action) || updateProgress.match(action)) {
    const { found, level, points } = state.progress;
    localStorage.setItem("found", JSON.stringify(found));
    localStorage.setItem("level", JSON.stringify(level));
    localStorage.setItem("points", JSON.stringify(points));
  } else if (toggleTheme.match(action)) {
    const theme = state.theme.value;
    localStorage.setItem("theme", theme);
  }

  return result;
}