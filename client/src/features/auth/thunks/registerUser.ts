import { registerUserAPI } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/features/auth/types";
import { CustomError, ErrorTypes } from "@/shared/errors";

export const registerUser = createAsyncThunk<
  User,
  { username: string; password: string; confirmPassword: string },
  { rejectValue: string }
>("user/register", async (credentials, thunkAPI) => {
  try {
    return await registerUserAPI(credentials);
  } catch (err) {
    if (err instanceof CustomError) {
      switch (err.type) {
        case ErrorTypes.NETWORK_ERROR:
          return thunkAPI.rejectWithValue(
            "No se pudo conectar con el servidor. Verificá tu conexión a internet e intentá nuevamente."
          );

        case ErrorTypes.VALIDATION_ERROR:
          return thunkAPI.rejectWithValue(err.message);

        case ErrorTypes.CONFLICT_ERROR:
          return thunkAPI.rejectWithValue(
            "Error al registrar la cuenta. El nombre de usuario ya está registrado."
          );

        case ErrorTypes.INTERNAL_SERVER_ERROR:
          return thunkAPI.rejectWithValue(
            "Error interno del servidor. Estamos trabajando para solucionarlo."
          );

        case ErrorTypes.UNKNOWN_ERROR:
        default:
          return thunkAPI.rejectWithValue(
            err.message ||
              "Error desconocido. Si el problema persiste, contactá al soporte."
          );
      }
    }

    return thunkAPI.rejectWithValue(
      "Algo salió mal. Intentalo de nuevo más tarde."
    );
  }
});
