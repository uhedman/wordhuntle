import { LoginResponse } from "@/features/auth/types";
import { CustomError, ErrorTypes } from "@/shared/errors";
import { API_BASE_URL } from "@/shared/api/real";

export const loadUserAPI = async (
  accessToken: string
): Promise<LoginResponse> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();

      if (res.status === 401) {
        throw new CustomError(ErrorTypes.AUTHENTICATION_ERROR, errorText);
      } else if (res.status === 500) {
        throw new CustomError(ErrorTypes.INTERNAL_SERVER_ERROR, errorText);
      } else {
        throw new CustomError(ErrorTypes.UNKNOWN_ERROR, errorText);
      }
    } else {
      return await res.json();
    }
  } catch (error) {
    // TODO
    if (error instanceof TypeError) {
      throw new CustomError(ErrorTypes.NETWORK_ERROR, error.message);
    } else {
      throw error;
    }
  }
};
