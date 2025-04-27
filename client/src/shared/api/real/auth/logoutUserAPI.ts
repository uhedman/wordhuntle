import { CustomError, ErrorTypes } from "@/shared/errors";
import { API_BASE_URL } from "@/shared/api/real";

export const logoutUserAPI = async (): Promise<void> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      return await res.json();
    }

    const errorText = await res.text();
    if (res.status === 401) {
      throw new CustomError(ErrorTypes.AUTHENTICATION_ERROR, errorText);
    } else if (res.status === 500) {
      throw new CustomError(ErrorTypes.INTERNAL_SERVER_ERROR, errorText);
    } else {
      throw new CustomError(ErrorTypes.UNKNOWN_ERROR, errorText);
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
