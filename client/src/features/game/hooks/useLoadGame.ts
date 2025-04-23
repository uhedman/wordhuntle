import { getSeedAPI } from "@/shared/api";
import { useAppDispatch } from "@/shared/hooks";
import { useEffect } from "react";
import { loadGame } from "@/features/game/thunks/loadGame";

export const useLoadGame = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getSeedAPI();
        const seed = data.seed;
        dispatch(loadGame(seed));
      } catch (error) {
        console.error("Error al obtener el código del día:", error);
      }
    };

    loadData();
  }, []);
};
