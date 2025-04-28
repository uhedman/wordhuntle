import { Progress } from "~/shared/types";

export interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  message: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  progress?: Progress;
  message: string;
}

export interface User {
  username: string;
}

export type AuthView = "login" | "register" | "authenticated";

export interface AuthViewProps {
  setAuthView: React.Dispatch<React.SetStateAction<AuthView>>;
}
