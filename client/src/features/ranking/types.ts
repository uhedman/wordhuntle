export type Period = "daily" | "weekly" | "allTime";

export interface UserScore {
  username: string;
  points: number;
}

export interface Ranking {
  daily: UserScore[];
  weekly: UserScore[];
  alltime: UserScore[];
}
