export * from "./auth";
export * from "./grid";
export * from "./score";
export * from "./word";

export const API_BASE_URL = import.meta.env.DEV
  ? "/api"
  : "https://wordhuntle.vercel.app/api";
