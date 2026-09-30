import { clearUser } from "@/features/auth/slice";
import { loadUser } from "@/features/auth/thunks/loadUser";
import { loginUser } from "@/features/auth/thunks/loginUser";
import { registerUser } from "@/features/auth/thunks/registerUser";
import { setSeed } from "@/features/game/slice";
import { setLastFound } from "@/features/history/slice";
import { resetProgress, updateProgress } from "@/features/progress/slice";
import { toggleTheme } from "@/features/theme/slice";
import { rootReducer } from "@/shared/store";
import { configureStore } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { persistMiddleware } from "./persist";

describe("persistMiddleware", () => {
	const createTestStore = () =>
		configureStore({
			reducer: rootReducer,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware().concat(persistMiddleware),
		});

	beforeEach(() => {
		localStorage.clear();
		vi.restoreAllMocks();
	});

	it("should pass through unhandled actions without modifying localStorage", () => {
		const store = createTestStore();
		const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
		const removeItemSpy = vi.spyOn(Storage.prototype, "removeItem");

		store.dispatch({ type: "UNKNOWN_ACTION" });

		expect(setItemSpy).not.toHaveBeenCalled();
		expect(removeItemSpy).not.toHaveBeenCalled();
	});

	it("should persist seed when setSeed is dispatched", () => {
		const store = createTestStore();
		store.dispatch(setSeed(12345));

		expect(localStorage.getItem("seed")).toBe("12345");
	});

	it("should persist lastFound when setLastFound is dispatched", () => {
		const store = createTestStore();
		const found = ["palabra1", "palabra2"];
		store.dispatch(setLastFound(found));

		expect(localStorage.getItem("lastFound")).toBe(JSON.stringify(found));
	});

	it("should persist progress on updateProgress", () => {
		const store = createTestStore();
		store.dispatch(
			updateProgress({
				found: ["sol", "luna"],
				level: 3,
				points: 150,
			}),
		);

		expect(localStorage.getItem("found")).toBe(
			JSON.stringify(["sol", "luna"]),
		);
		expect(localStorage.getItem("level")).toBe("3");
		expect(localStorage.getItem("points")).toBe("150");
	});

	it("should persist progress on resetProgress", () => {
		const store = createTestStore();
		store.dispatch(
			updateProgress({
				found: ["sol"],
				level: 1,
				points: 10,
			}),
		);
		store.dispatch(resetProgress());

		expect(localStorage.getItem("found")).toBe(JSON.stringify([]));
		expect(localStorage.getItem("level")).toBe("0");
		expect(localStorage.getItem("points")).toBe("0");
	});

	it("should persist theme on toggleTheme", () => {
		const store = createTestStore();
		store.dispatch(toggleTheme());

		const currentTheme = store.getState().theme.value;
		expect(localStorage.getItem("theme")).toBe(currentTheme);
	});

	it("should persist user and refreshToken on loginUser.fulfilled", () => {
		const store = createTestStore();
		const payload = {
			user: { username: "login_user" },
			accessToken: "access_token_1",
			refreshToken: "refresh_token_1",
			message: "ok",
		};

		store.dispatch(
			loginUser.fulfilled(payload, "req-1", {
				username: "login_user",
				password: "pwd",
			}),
		);

		expect(localStorage.getItem("user")).toBe(
			JSON.stringify({ username: "login_user" }),
		);
		expect(localStorage.getItem("refreshToken")).toBe("refresh_token_1");
	});

	it("should persist user and refreshToken on registerUser.fulfilled", () => {
		const store = createTestStore();
		const payload = {
			user: { username: "register_user" },
			accessToken: "access_token_2",
			refreshToken: "refresh_token_2",
			message: "ok",
		};

		store.dispatch(
			registerUser.fulfilled(payload, "req-2", {
				username: "register_user",
				password: "pwd",
				confirmPassword: "pwd",
			}),
		);

		expect(localStorage.getItem("user")).toBe(
			JSON.stringify({ username: "register_user" }),
		);
		expect(localStorage.getItem("refreshToken")).toBe("refresh_token_2");
	});

	it("should persist user and refreshToken on loadUser.fulfilled", () => {
		const store = createTestStore();
		const payload = {
			user: { username: "loaded_user" },
			accessToken: "access_token_3",
			refreshToken: "refresh_token_3",
			message: "ok",
		};

		store.dispatch(loadUser.fulfilled(payload, "req-3", undefined));

		expect(localStorage.getItem("user")).toBe(
			JSON.stringify({ username: "loaded_user" }),
		);
		expect(localStorage.getItem("refreshToken")).toBe("refresh_token_3");
	});

	it("should not persist refreshToken if refreshToken is empty in state", () => {
		const store = createTestStore();
		const payload = {
			user: { username: "no_refresh_user" },
			accessToken: "access_token_4",
			refreshToken: "" as string,
			message: "ok",
		};

		store.dispatch(
			loginUser.fulfilled(payload, "req-4", {
				username: "no_refresh_user",
				password: "pwd",
			}),
		);

		expect(localStorage.getItem("user")).toBe(
			JSON.stringify({ username: "no_refresh_user" }),
		);
		expect(localStorage.getItem("refreshToken")).toBeNull();
	});

	it("should remove user and refreshToken on clearUser", () => {
		const store = createTestStore();
		localStorage.setItem(
			"user",
			JSON.stringify({ username: "user_to_clear" }),
		);
		localStorage.setItem("refreshToken", "rt_to_clear");

		store.dispatch(clearUser());

		expect(localStorage.getItem("user")).toBeNull();
		expect(localStorage.getItem("refreshToken")).toBeNull();
	});

	it("should remove user and refreshToken on loadUser.rejected", () => {
		const store = createTestStore();
		localStorage.setItem(
			"user",
			JSON.stringify({ username: "user_to_clear" }),
		);
		localStorage.setItem("refreshToken", "rt_to_clear");

		store.dispatch(
			loadUser.rejected(new Error("Token expired"), "req-5", undefined),
		);

		expect(localStorage.getItem("user")).toBeNull();
		expect(localStorage.getItem("refreshToken")).toBeNull();
	});
});
