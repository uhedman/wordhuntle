import { syncProgress } from "@/features/progress/thunks/syncProgress";
import { api } from "@/shared/api";
import { CustomError, ErrorTypes } from "@/shared/errors";
import { RootState } from "@/shared/types";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { loginUser } from "./loginUser";

vi.mock("@/shared/api", () => ({
	api: {
		loginUserAPI: vi.fn(),
	},
}));

vi.mock("@/features/progress/thunks/syncProgress", () => ({
	syncProgress: vi.fn((payload) => ({
		type: "progress/sync",
		payload,
	})),
}));

describe("loginUser thunk", () => {
	const dispatch = vi.fn();
	const getState = vi.fn(() => ({}) as RootState);

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should dispatch syncProgress and return response on successful login", async () => {
		const mockResponse = {
			user: { username: "test_user" },
			accessToken: "mock_access_token",
			refreshToken: "mock_refresh_token",
			message: "Login exitoso",
			progress: {
				found: ["hola", "mundo"],
				level: 1,
				points: 10,
			},
		};

		vi.mocked(api.loginUserAPI).mockResolvedValueOnce(mockResponse);

		const thunk = loginUser({
			username: "test_user",
			password: "password123",
		});
		const result = await thunk(dispatch, getState, undefined);

		expect(api.loginUserAPI).toHaveBeenCalledWith({
			username: "test_user",
			password: "password123",
		});
		expect(syncProgress).toHaveBeenCalledWith({
			backendFoundWords: ["hola", "mundo"],
			accessToken: "mock_access_token",
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: "progress/sync",
			payload: {
				backendFoundWords: ["hola", "mundo"],
				accessToken: "mock_access_token",
			},
		});
		expect(result.type).toBe("user/login/fulfilled");
		expect(result.payload).toEqual(mockResponse);
	});

	it("should reject with error message on CustomError", async () => {
		vi.mocked(api.loginUserAPI).mockRejectedValueOnce(
			new CustomError(
				ErrorTypes.AUTHENTICATION_ERROR,
				"Credenciales inválidas",
			),
		);

		const thunk = loginUser({
			username: "test_user",
			password: "wrong_password",
		});
		const result = await thunk(dispatch, getState, undefined);

		expect(syncProgress).not.toHaveBeenCalled();
		expect(result.type).toBe("user/login/rejected");
		expect(result.payload).toBe("Credenciales inválidas");
	});

	it("should reject with generic error message on unexpected error", async () => {
		vi.mocked(api.loginUserAPI).mockRejectedValueOnce(
			new Error("Network failure"),
		);

		const thunk = loginUser({
			username: "test_user",
			password: "password123",
		});
		const result = await thunk(dispatch, getState, undefined);

		expect(syncProgress).not.toHaveBeenCalled();
		expect(result.type).toBe("user/login/rejected");
		expect(result.payload).toBe(
			"Algo salió mal. Intentalo de nuevo más tarde.",
		);
	});
});
