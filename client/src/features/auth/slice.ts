import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadUser } from "@/features/auth/thunks/loadUser";
import { loginUser } from "@/features/auth/thunks/loginUser";
import { registerUser } from "@/features/auth/thunks/registerUser";
import { User } from "@/features/auth/types";
import { getFromStorage } from "@/shared/utils/storage";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loginLoading: boolean;
  loginError: string | null;
  logoutLoading: boolean;
  logoutError: string | null;
  registerLoading: boolean;
  registerError: string | null;
}

const initialState: AuthState = {
  user: getFromStorage<User>("user"),
  accessToken: null,
  refreshToken: localStorage.getItem("refreshToken"),
  loginLoading: false,
  loginError: null,
  logoutLoading: false,
  logoutError: null,
  registerLoading: false,
  registerError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;

        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.loginLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.payload || "Error desconocido";
        state.loginLoading = false;
      })

      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;

        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.registerLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError = action.payload || "Error desconocido";
        state.registerLoading = false;
      })

      .addCase(loadUser.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;

        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
