import { RegisterResponse } from "@/features/auth/types";
import { API_BASE_URL } from "@/shared/api/real";
import { CustomError, ErrorTypes } from "@/shared/errors";

export const registerUserAPI = async (credentials: {
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (res.ok) {
      const data = (await res.json()) as RegisterResponse;
      return data;
    }

    const errorText = await res.text();
    if (res.status === 401) {
      throw new CustomError(ErrorTypes.AUTHENTICATION_ERROR, errorText);
    } else if (res.status === 409) {
      throw new CustomError(ErrorTypes.CONFLICT_ERROR, errorText);
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
