import { Ranking } from "@/features/ranking/types";

export const getLeaderboard = async (): Promise<Ranking> => {
  const res = await fetch("/api/score/leaderboard", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch leaderboard");
  }
  return res.json();
};
