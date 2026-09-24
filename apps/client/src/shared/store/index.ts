import authReducer from "@/features/auth/slice";
import displayReducer from "@/features/display/slice";
import dragReducer from "@/features/drag/slice";
import gameReducer from "@/features/game/slice";
import historyReducer from "@/features/history/slice";
import modalReducer from "@/features/modal/slice";
import progressReducer from "@/features/progress/slice";
import themeReducer from "@/features/theme/slice";
import { persistMiddleware } from "@/shared/middleware/persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
	auth: authReducer,
	display: displayReducer,
	drag: dragReducer,
	game: gameReducer,
	history: historyReducer,
	modal: modalReducer,
	progress: progressReducer,
	theme: themeReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(persistMiddleware),
});
