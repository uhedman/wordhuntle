import { EncrypedGameData } from "@/features/game/types";
import { LastGameData } from "@/features/history/types";

export const getSeedAPI = async (): Promise<{ seed: number }> => {
  const res = await fetch("/api/game/seed");
  if (!res.ok) throw new Error("Failed to fetch seed");
  return res.json();
};

export const getTodayDataAPI = async (): Promise<EncrypedGameData> => {
  const res = await fetch("/api/game/todayData");
  if (!res.ok) throw new Error("Failed to fetch today data");
  return res.json();
};

export const getLastDataAPI = async (): Promise<LastGameData> => {
  const res = await fetch("/api/game/lastData");
  if (!res.ok) throw new Error("Failed to fetch last data");
  return res.json();
};
