import { Ranking } from "@/features/ranking/types";

export const getLeaderboard = async (): Promise<Ranking> => {
  return {
    daily: [],
    weekly: [],
    alltime: [],
  };
};
