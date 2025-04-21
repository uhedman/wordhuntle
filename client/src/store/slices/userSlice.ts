import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
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
    const res = await fetch("/auth/login", {
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

    return await res.json();
  } catch (err) {
    console.error(err);
    return thunkAPI.rejectWithValue("Error de red");
  }
});

export const loadUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/loadUser",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/auth/me", {
        credentials: "include",
      });

      if (!res.ok) throw new Error();
      return await res.json();
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
    const res = await fetch("/auth/register", {
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

    return await res.json();
  } catch (err) {
    console.error(err);
    return thunkAPI.rejectWithValue("Error de red");
  }
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
