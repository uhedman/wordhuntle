import { GameData } from "@/features/game/types";
import { LastGameData } from "@/features/history/types";

export const fetchSeed = async (): Promise<{ seed: number }> => {
  const res = await fetch("/api/game/seed");
  if (!res.ok) throw new Error("Failed to fetch seed");
  return res.json();
};

export const fetchTodayData = async (): Promise<GameData> => {
  const res = await fetch("/api/game/todayData");
  if (!res.ok) throw new Error("Failed to fetch today data");
  return res.json();
};

export const fetchLastData = async (): Promise<LastGameData> => {
  const res = await fetch("/api/game/lastData");
  if (!res.ok) throw new Error("Failed to fetch last data");
  return res.json();
};
