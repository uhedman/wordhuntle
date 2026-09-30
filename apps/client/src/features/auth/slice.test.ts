import { describe, expect, it } from "vitest";

import reducer, { clearUser, setUser } from "./slice";
import { loadUser } from "./thunks/loadUser";
import { loginUser } from "./thunks/loginUser";
import { registerUser } from "./thunks/registerUser";

describe("auth slice", () => {
	const initialState = {
		user: null,
		accessToken: null,
		refreshToken: null,
		loginLoading: false,
		loginError: null,
		logoutLoading: false,
		logoutError: null,
		registerLoading: false,
		registerError: null,
	};

	describe("reducers", () => {
		it("should handle setUser", () => {
			const user = { username: "test_user" };
			const state = reducer(initialState, setUser(user));
			expect(state.user).toEqual(user);
		});

		it("should handle clearUser", () => {
			const loggedInState = {
				...initialState,
				user: { username: "test_user" },
				accessToken: "access_token_123",
				refreshToken: "refresh_token_123",
			};
			const state = reducer(loggedInState, clearUser());
			expect(state.user).toBeNull();
			expect(state.accessToken).toBeNull();
			expect(state.refreshToken).toBeNull();
		});
	});

	describe("extraReducers - loginUser", () => {
		it("should handle loginUser.pending", () => {
			const state = reducer(
				{ ...initialState, loginError: "Old error" },
				loginUser.pending("req-1", {
					username: "user",
					password: "pwd",
				}),
			);
			expect(state.loginLoading).toBe(true);
			expect(state.loginError).toBeNull();
		});

		it("should handle loginUser.fulfilled", () => {
			const payload = {
				user: { username: "user1" },
				accessToken: "token_abc",
				refreshToken: "refresh_abc",
				message: "Success",
			};
			const state = reducer(
				{ ...initialState, loginLoading: true },
				loginUser.fulfilled(payload, "req-1", {
					username: "user1",
					password: "pwd",
				}),
			);
			expect(state.loginLoading).toBe(false);
			expect(state.user).toEqual({ username: "user1" });
			expect(state.accessToken).toBe("token_abc");
			expect(state.refreshToken).toBe("refresh_abc");
		});

		it("should handle loginUser.rejected with custom payload", () => {
			const state = reducer(
				{ ...initialState, loginLoading: true },
				loginUser.rejected(
					null,
					"req-1",
					{ username: "user1", password: "pwd" },
					"Credenciales inválidas",
				),
			);
			expect(state.loginLoading).toBe(false);
			expect(state.loginError).toBe("Credenciales inválidas");
		});

		it("should handle loginUser.rejected fallback error message", () => {
			const state = reducer(
				{ ...initialState, loginLoading: true },
				loginUser.rejected(new Error("Error de red"), "req-1", {
					username: "user1",
					password: "pwd",
				}),
			);
			expect(state.loginLoading).toBe(false);
			expect(state.loginError).toBe("Error desconocido");
		});
	});

	describe("extraReducers - registerUser", () => {
		it("should handle registerUser.pending", () => {
			const state = reducer(
				{ ...initialState, registerError: "Old error" },
				registerUser.pending("req-2", {
					username: "user",
					password: "pwd",
					confirmPassword: "pwd",
				}),
			);
			expect(state.registerLoading).toBe(true);
			expect(state.registerError).toBeNull();
		});

		it("should handle registerUser.fulfilled", () => {
			const payload = {
				user: { username: "new_user" },
				accessToken: "token_xyz",
				refreshToken: "refresh_xyz",
				message: "Created",
			};
			const state = reducer(
				{ ...initialState, registerLoading: true },
				registerUser.fulfilled(payload, "req-2", {
					username: "new_user",
					password: "pwd",
					confirmPassword: "pwd",
				}),
			);
			expect(state.registerLoading).toBe(false);
			expect(state.user).toEqual({ username: "new_user" });
			expect(state.accessToken).toBe("token_xyz");
			expect(state.refreshToken).toBe("refresh_xyz");
		});

		it("should handle registerUser.rejected with custom payload", () => {
			const state = reducer(
				{ ...initialState, registerLoading: true },
				registerUser.rejected(
					null,
					"req-2",
					{
						username: "user",
						password: "pwd",
						confirmPassword: "pwd",
					},
					"El usuario ya existe",
				),
			);
			expect(state.registerLoading).toBe(false);
			expect(state.registerError).toBe("El usuario ya existe");
		});

		it("should handle registerUser.rejected fallback error message", () => {
			const state = reducer(
				{ ...initialState, registerLoading: true },
				registerUser.rejected(new Error("Fallo de red"), "req-2", {
					username: "user",
					password: "pwd",
					confirmPassword: "pwd",
				}),
			);
			expect(state.registerLoading).toBe(false);
			expect(state.registerError).toBe("Error desconocido");
		});
	});

	describe("extraReducers - loadUser", () => {
		it("should handle loadUser.fulfilled", () => {
			const payload = {
				user: { username: "loaded_user" },
				accessToken: "new_access",
				refreshToken: "existing_refresh",
				message: "Loaded",
			};
			const state = reducer(
				initialState,
				loadUser.fulfilled(payload, "req-3", undefined),
			);
			expect(state.user).toEqual({ username: "loaded_user" });
			expect(state.accessToken).toBe("new_access");
			expect(state.refreshToken).toBe("existing_refresh");
		});

		it("should handle loadUser.rejected", () => {
			const loggedInState = {
				...initialState,
				user: { username: "loaded_user" },
			};
			const state = reducer(
				loggedInState,
				loadUser.rejected(new Error("Expired"), "req-3", undefined),
			);
			expect(state.user).toBeNull();
		});
	});
});
