import { setSeed } from "@/features/game/slice";
import { resetProgress, updateProgress } from "@/features/progress/slice";
import { setLastFound } from "@/features/history/slice";
import { toggleTheme } from "@/features/theme/slice";
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "@/shared/types";
import { loginUser } from "@/features/auth/thunks/loginUser";
import { registerUser } from "@/features/auth/thunks/registerUser";
import { loadUser } from "@/features/auth/thunks/loadUser";
import { clearUser } from "@/features/auth/slice";

export const persistMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);

    const state = store.getState();
    if (setSeed.match(action)) {
      const seed = state.game.seed;
      localStorage.setItem("seed", JSON.stringify(seed));
    } else if (setLastFound.match(action)) {
      const lastFound = state.history.lastFound;
      localStorage.setItem("lastFound", JSON.stringify(lastFound));
    } else if (resetProgress.match(action) || updateProgress.match(action)) {
      const { found, level, points } = state.progress;
      localStorage.setItem("found", JSON.stringify(found));
      localStorage.setItem("level", JSON.stringify(level));
      localStorage.setItem("points", JSON.stringify(points));
    } else if (toggleTheme.match(action)) {
      const theme = state.theme.value;
      localStorage.setItem("theme", theme);
    } else if (
      loginUser.fulfilled.match(action) ||
      loadUser.fulfilled.match(action) ||
      registerUser.fulfilled.match(action)
    ) {
      const { user, refreshToken } = state.auth;
      localStorage.setItem("user", JSON.stringify(user));
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
    } else if (loadUser.rejected.match(action) || clearUser.match(action)) {
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
    }

    return result;
  };
