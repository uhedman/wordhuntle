import { LoginResponse, RegisterResponse } from "@/features/auth/types";

export const loginUserAPI = async (credentials: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Login fallido");
  }

  return await res.json();
};

export const logoutUserAPI = async (): Promise<void> => {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Logout fallido");
  }
};

export const loadUserAPI = async (): Promise<LoginResponse> => {
  const res = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include",
  });

  if (res.ok) return await res.json();

  if (res.status === 401) {
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      const retry = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (retry.ok) return await retry.json();
    }
  }

  const errorText = await res.text();
  throw new Error(errorText || "Login automático fallido");
};

export const registerUserAPI = async (credentials: {
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Register fallido");
  }

  const response = (await res.json()) as RegisterResponse;
  return response.user;
};
