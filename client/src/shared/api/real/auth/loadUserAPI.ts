import { LoginResponse } from "@/features/auth/types";
import { CustomError, ErrorTypes } from "@/shared/errors";
import { API_BASE_URL } from "@/shared/api/real";

export const loadUserAPI = async (): Promise<LoginResponse> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (res.ok) {
      return await res.json();
    }

    if (res.status === 401) {
      const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshRes.ok) {
        const retry = await fetch(`${API_BASE_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (retry.ok) return await retry.json();
      }
    }

    const errorText = await res.text();
    throw new Error(errorText || "Login automático fallido");
  } catch (error) {
    // TODO
    if (error instanceof TypeError) {
      throw new CustomError(ErrorTypes.NETWORK_ERROR, error.message);
    } else {
      throw error;
    }
  }
};
