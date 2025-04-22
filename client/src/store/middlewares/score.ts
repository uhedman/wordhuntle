import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { updateProgress } from "@/store/slices/progressSlice";
import { registerUser } from "../slices/userSlice";

export const scoreMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);

    const state = store.getState();
    if (updateProgress.match(action) || registerUser.fulfilled.match(action)) {
      const { level, points } = state.progress;

      fetch("/api/score", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level, points }),
      }).catch((err) => {
        console.error("Error al sincronizar puntos en middleware:", err);
      });
    }

    return result;
  };
