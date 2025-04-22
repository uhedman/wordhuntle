import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface RegisterResponse {
  user: User;
  message: string;
}

interface LoginResponse {
  user: User;
  message: string;
}

interface User {
  username: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || "Error desconocido";
        state.loading = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload || "Error desconocido";
        state.loading = false;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload || "Error desconocido";
        state.loading = false;
      })

      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
      });
  },
});

export const loginUser = createAsyncThunk<
  User,
  { username: string; password: string },
  { rejectValue: string }
>("user/login", async (credentials, thunkAPI) => {
  try {
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
      return thunkAPI.rejectWithValue(errorText || "Login fallido");
    }

    const response = (await res.json()) as LoginResponse;

    return response.user;
  } catch (err) {
    console.error(err);
    return thunkAPI.rejectWithValue("Error de red");
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        return thunkAPI.rejectWithValue(errorText || "Logout fallido");
      }

      return;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Error de red");
    }
  }
);

export const loadUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/loadUser",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = (await res.json()) as LoginResponse;
        return data.user;
      }

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

          if (retry.ok) {
            const data = (await retry.json()) as LoginResponse;
            return data.user;
          }
        }
      }

      const errorText = await res.text();
      return thunkAPI.rejectWithValue(errorText || "Login automático fallido");
    } catch {
      return thunkAPI.rejectWithValue("No logueado");
    }
  }
);

export const registerUser = createAsyncThunk<
  User,
  { username: string; password: string; confirmPassword: string },
  { rejectValue: string }
>("user/register", async (credentials, thunkAPI) => {
  try {
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
      return thunkAPI.rejectWithValue(errorText || "Register fallido");
    }

    const response = (await res.json()) as RegisterResponse;

    return response.user;
  } catch (err) {
    console.error(err);
    return thunkAPI.rejectWithValue("Error de red");
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
