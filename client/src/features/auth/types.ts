import { Progress } from "~/shared/types";

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface LoginResponse {
  user: User;
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
