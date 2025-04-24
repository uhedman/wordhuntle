import { EncrypedGameData } from "@/features/game/types";
import { LastGameData } from "@/features/history/types";

import { API_BASE_URL } from "@/shared/api/real";

export const getSeedAPI = async (): Promise<{ seed: number }> => {
  const res = await fetch(`${API_BASE_URL}/game/seed`);
  if (!res.ok) throw new Error("Failed to fetch seed");
  return res.json();
};

export const getTodayDataAPI = async (): Promise<EncrypedGameData> => {
  const res = await fetch(`${API_BASE_URL}/game/todayData`);
  if (!res.ok) throw new Error("Failed to fetch today data");
  return res.json();
};

export const getLastDataAPI = async (): Promise<LastGameData> => {
  const res = await fetch(`${API_BASE_URL}/game/lastData`);
  if (!res.ok) throw new Error("Failed to fetch last data");
  return res.json();
};
