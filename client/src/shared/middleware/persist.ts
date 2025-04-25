import { setSeed } from "@/features/game/slice";
import { resetProgress, updateProgress } from "@/features/progress/slice";
import { setLastFound } from "@/features/history/slice";
import { toggleTheme } from "@/features/theme/slice";
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "@/shared/types";
import { loginUser } from "@/features/auth/thunks/loginUser";
import { logoutUser } from "@/features/auth/thunks/logoutUser";
import { registerUser } from "@/features/auth/thunks/registerUser";

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
    if (
      loginUser.fulfilled.match(action) ||
      logoutUser.fulfilled.match(action) ||
      registerUser.fulfilled.match(action)
    ) {
      const user = state.auth.user;
      localStorage.setItem("user", JSON.stringify(user));
    }

    return result;
  };
