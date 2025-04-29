import { loadUser } from "@/features/auth/thunks/loadUser";
import { loadGame } from "@/features/game/thunks/loadGame";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from ".";
import { getSeedAPI } from "../api";

export const useInitializeApp = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const initialize = async () => {
      try {
        const data = await getSeedAPI();
        const seed = data.seed;
        await dispatch(loadGame(seed));
        if (user) {
          await dispatch(loadUser());
        }
      } catch (err) {
        console.error("Error al inicializar la app:", err);
      }
    };

    initialize();
  }, []);
};
