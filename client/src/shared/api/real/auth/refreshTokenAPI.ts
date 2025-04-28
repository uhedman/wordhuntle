import { LoginResponse } from "@/features/auth/types";
import { API_BASE_URL } from "@/shared/api/real";
import { CustomError, ErrorTypes } from "@/shared/errors";

export const refreshTokenAPI = async (
  refreshToken: string
): Promise<LoginResponse> => {
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
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
};
