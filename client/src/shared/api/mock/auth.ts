import { LoginResponse, RegisterResponse } from "@/features/auth/types";

export const loginUserAPI = async (credentials: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  console.log("[MOCK] loginUserAPI", credentials);

  return {
    message: "Login exitoso",
    user: { username: credentials.username },
    accessToken: "MOCK AccessToken",
    refreshToken: "MOCK RefreshToken",
    progress: {
      found: ["mockword", "test"],
      points: 11,
      level: 0,
    },
  };
};

export const loadUserAPI = async (): Promise<LoginResponse> => {
  console.log("[MOCK] loadUserAPI");

  return {
    message: "Usuario encontrado",
    user: { username: "mockUser" },
    accessToken: "MOCK AccessToken",
    refreshToken: "MOCK RefreshToken",
    progress: { found: ["mockword", "test"], points: 11, level: 0 },
  };
};

export const refreshTokenAPI = async (
  refreshToken: string
): Promise<LoginResponse> => {
  console.log("Renovando el token: ", refreshToken);

  return {
    message: "Usuario encontrado",
    user: { username: "mockUser" },
    accessToken: "MOCK AccessToken",
    refreshToken: "MOCK RefreshToken",
    progress: { found: ["mockword", "test"], points: 11, level: 0 },
  };
};

export const registerUserAPI = async (credentials: {
  username: string;
  password: string;
  confirmPassword: string;
}): Promise<RegisterResponse> => {
  if (credentials.password !== credentials.confirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }

  return {
    user: { username: "mockUser" },
    accessToken: "MOCK AccessToken",
    refreshToken: "MOCK RefreshToken",
    message: "Registrado correctamente",
  };
};
