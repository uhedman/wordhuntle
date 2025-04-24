import { Ranking } from "@/features/ranking/types";

import { API_BASE_URL } from "@/shared/api/real";

export const getLeaderboard = async (): Promise<Ranking> => {
  const res = await fetch(`${API_BASE_URL}/score/leaderboard`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch leaderboard");
  }
  return res.json();
};
