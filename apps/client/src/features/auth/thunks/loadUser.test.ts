import { syncProgress } from "@/features/progress/thunks/syncProgress";
import { api } from "@/shared/api";
import { CustomError, ErrorTypes } from "@/shared/errors";
import { RootState } from "@/shared/types";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { loadUser } from "./loadUser";

vi.mock("@/shared/api", () => ({
	api: {
		refreshTokenAPI: vi.fn(),
		loadUserAPI: vi.fn(),
	},
}));

vi.mock("@/features/progress/thunks/syncProgress", () => ({
	syncProgress: vi.fn((payload) => ({
		type: "progress/sync",
		payload,
	})),
}));

describe("loadUser thunk", () => {
	const dispatch = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should reject early if no refreshToken is available in state", async () => {
		const getState = vi.fn(
			() =>
				({
					auth: { refreshToken: null },
				}) as unknown as RootState,
		);

		const thunk = loadUser();
		const result = await thunk(dispatch, getState, undefined);

		expect(api.refreshTokenAPI).not.toHaveBeenCalled();
		expect(api.loadUserAPI).not.toHaveBeenCalled();
		expect(syncProgress).not.toHaveBeenCalled();
		expect(result.type).toBe("user/loadUser/rejected");
		expect(result.payload).toBe("No se tiene un refresh token");
	});

	it("should refresh token, load user, dispatch syncProgress and return combined response", async () => {
		const getState = vi.fn(
			() =>
				({
					auth: { refreshToken: "existing_refresh_token" },
				}) as unknown as RootState,
		);

		vi.mocked(api.refreshTokenAPI).mockResolvedValueOnce({
			user: { username: "loaded_user" },
			accessToken: "new_refreshed_access_token",
			refreshToken: "new_refresh_token",
			message: "Access token renovado",
		});

		const mockUserData = {
			user: { username: "loaded_user" },
			message: "Usuario encontrado",
			progress: {
				found: ["cielo", "mar"],
				level: 2,
				points: 25,
			},
		};
		vi.mocked(api.loadUserAPI).mockResolvedValueOnce(mockUserData as never);

		const thunk = loadUser();
		const result = await thunk(dispatch, getState, undefined);

		expect(api.refreshTokenAPI).toHaveBeenCalledWith(
			"existing_refresh_token",
		);
		expect(api.loadUserAPI).toHaveBeenCalledWith(
			"new_refreshed_access_token",
		);
		expect(syncProgress).toHaveBeenCalledWith({
			backendFoundWords: ["cielo", "mar"],
			accessToken: "new_refreshed_access_token",
		});
		expect(dispatch).toHaveBeenCalledWith({
			type: "progress/sync",
			payload: {
				backendFoundWords: ["cielo", "mar"],
				accessToken: "new_refreshed_access_token",
			},
		});
		expect(result.type).toBe("user/loadUser/fulfilled");
		expect(result.payload).toEqual({
			...mockUserData,
			accessToken: "new_refreshed_access_token",
		});
	});

	it("should reject with error message on CustomError", async () => {
		const getState = vi.fn(
			() =>
				({
					auth: { refreshToken: "expired_refresh_token" },
				}) as unknown as RootState,
		);

		vi.mocked(api.refreshTokenAPI).mockRejectedValueOnce(
			new CustomError(
				ErrorTypes.AUTHENTICATION_ERROR,
				"Refresh token inválido",
			),
		);

		const thunk = loadUser();
		const result = await thunk(dispatch, getState, undefined);

		expect(api.loadUserAPI).not.toHaveBeenCalled();
		expect(syncProgress).not.toHaveBeenCalled();
		expect(result.type).toBe("user/loadUser/rejected");
		expect(result.payload).toBe("Refresh token inválido");
	});

	it("should reject with generic error message on unexpected error", async () => {
		const getState = vi.fn(
			() =>
				({
					auth: { refreshToken: "valid_refresh_token" },
				}) as unknown as RootState,
		);

		vi.mocked(api.refreshTokenAPI).mockResolvedValueOnce({
			user: { username: "loaded_user" },
			accessToken: "temp_access_token",
			refreshToken: "temp_refresh_token",
			message: "Access token renovado",
		});
		vi.mocked(api.loadUserAPI).mockRejectedValueOnce(
			new Error("Failed to load user info"),
		);

		const thunk = loadUser();
		const result = await thunk(dispatch, getState, undefined);

		expect(syncProgress).not.toHaveBeenCalled();
		expect(result.type).toBe("user/loadUser/rejected");
		expect(result.payload).toBe(
			"Algo salió mal. Intentalo de nuevo más tarde.",
		);
	});
});
