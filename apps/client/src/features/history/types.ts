import { Game } from "@/features/game/types";

export type LastGame = Omit<Game, "maxPoints">;
