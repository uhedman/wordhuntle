import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { registerUser } from "../slices/userSlice";

export const progressMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);

    const state = store.getState();
    if (registerUser.fulfilled.match(action)) {
      const { found } = state.progress;

      fetch("/api/word", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ words: found }),
      });
    }

    return result;
  };
