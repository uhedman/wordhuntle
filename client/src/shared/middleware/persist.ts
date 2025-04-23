import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "@/shared/types";
import { setSeed } from "@/features/game/slices/gameDataSlice";
import {
  resetProgress,
  updateProgress,
} from "@/features/game/slices/progressSlice";
import { toggleTheme } from "@/features/theme/slices/themeSlice";
import { setLastFound } from "@/features/history/slices/historySlice";

export const persistMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action) => {
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
  };
