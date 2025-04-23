import { useState, useEffect } from "react";
import { getLeaderboard } from "@/shared/api";
import { Ranking } from "@/features/ranking/types";

export const useScores = () => {
  const [scores, setScores] = useState<Ranking>({
    daily: [],
    weekly: [],
    alltime: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const data = await getLeaderboard();
        setScores(data);
      } catch (err) {
        console.error("Error al obtener scores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return { scores, loading };
};
