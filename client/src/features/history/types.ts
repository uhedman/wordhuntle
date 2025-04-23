import { GameData } from "@/features/game/types";

export type LastGameData = Omit<GameData, "maxPoints">;
