import { syncProgress } from "@/features/progress/thunks/syncProgress";
import { api } from "@/shared/api";
import { CustomError, ErrorTypes } from "@/shared/errors";
import { RootState } from "@/shared/types";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { registerUser } from "./registerUser";

vi.mock("@/shared/api", () => ({
	api: {
		registerUserAPI: vi.fn(),
	},
}));

vi.mock("@/features/progress/thunks/syncProgress", () => ({
	syncProgress: vi.fn((payload) => ({
		type: "progress/sync",
		payload,
	})),
}));

describe("registerUser thunk", () => {
	const dispatch = vi.fn();
	const getState = vi.fn(() => ({}) as RootState);

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should dispatch syncProgress with empty words and return response on successful registration", async () => {
		const mockResponse = {
			user: { username: "new_user" },
			accessToken: "mock_register_access_token",
			refreshToken: "mock_register_refresh_token",
			message: "Usuario registrado con éxito",
		};

		vi.mocked(api.registerUserAPI).mockResolvedValueOnce(mockResponse);

		const thunk = registerUser({
			username: "new_user",
			password: "password123",
			confirmPassword: "password123",
		});
		const result = await thunk(dispatch, getState, undefined);

		expect(api.registerUserAPI).toHaveBeenCalledWith({
			username: "new_user",
			password: "password123",
			confirmPassword: "password123",
		});
		expect(syncProgress).toHaveBeenCalledWith({
			backendFoundWords: [],
			accessToken: "mock_register_access_token",
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: "progress/sync",
			payload: {
				backendFoundWords: [],
				accessToken: "mock_register_access_token",
			},
		});
		expect(result.type).toBe("user/register/fulfilled");
		expect(result.payload).toEqual(mockResponse);
	});

	it("should reject with error message on CustomError", async () => {
		vi.mocked(api.registerUserAPI).mockRejectedValueOnce(
			new CustomError(ErrorTypes.CONFLICT_ERROR, "El usuario ya existe"),
		);

		const thunk = registerUser({
			username: "existing_user",
			password: "password123",
			confirmPassword: "password123",
		});
		const result = await thunk(dispatch, getState, undefined);

		expect(syncProgress).not.toHaveBeenCalled();
		expect(result.type).toBe("user/register/rejected");
		expect(result.payload).toBe("El usuario ya existe");
	});

	it("should reject with generic error message on unexpected error", async () => {
		vi.mocked(api.registerUserAPI).mockRejectedValueOnce(
			new Error("Server crashed"),
		);

		const thunk = registerUser({
			username: "new_user",
			password: "password123",
			confirmPassword: "password123",
		});
		const result = await thunk(dispatch, getState, undefined);

		expect(syncProgress).not.toHaveBeenCalled();
		expect(result.type).toBe("user/register/rejected");
		expect(result.payload).toBe(
			"Algo salió mal. Intentalo de nuevo más tarde.",
		);
	});
});
