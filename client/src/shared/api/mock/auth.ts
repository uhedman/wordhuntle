import { LoginResponse } from "@/features/auth/types";

export const loginUserAPI = async (credentials: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  console.log("[MOCK] loginUserAPI", credentials);

  return {
    message: "Login exitoso",
    user: { username: credentials.username },
    progress: {
      found: ["mockword", "test"],
      points: 11,
      level: 0,
    },
  };
};

export const logoutUserAPI = async (): Promise<void> => {
  console.log("[MOCK] logoutUserAPI");
};

export const loadUserAPI = async (): Promise<LoginResponse> => {
  console.log("[MOCK] loadUserAPI");

  return {
    message: "Usuario encontrado",
    user: { username: "mockUser" },
    progress: { found: ["mockword", "test"], points: 11, level: 0 },
  };
};

export const registerUserAPI = async (credentials: {
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  if (credentials.password !== credentials.confirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }

  return {
    id: "mock-id",
    username: credentials.username,
    score: 0,
  };
};
