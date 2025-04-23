import { loadGame } from "@/features/game/thunks/loadGame";
import { fetchSeed } from "@/shared/api";
import { useAppDispatch } from "@/shared/hooks";
import { useEffect } from "react";

export const useLoadGame = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSeed();
        const seed = data.seed;
        dispatch(loadGame(seed));
      } catch (error) {
        console.error("Error al obtener el código del día:", error);
      }
    };

    fetchData();
  }, []);
};
