import { registerUser } from "@/features/auth/thunks/registerUser";
import { postFoundWords } from "@/shared/api";
import { RootState } from "@/shared/types";
import { Middleware } from "redux";

export const syncProgressOnRegister: Middleware<object, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);

    if (registerUser.fulfilled.match(action)) {
      // TODO user !== null
      const found = store.getState().progress.found;

      postFoundWords(found).catch((err) =>
        console.error("Error al sincronizar progreso:", err)
      );
    }

    return result;
  };
