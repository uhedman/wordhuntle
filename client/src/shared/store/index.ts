import { combineReducers, configureStore } from "@reduxjs/toolkit";
import displayReducer from "@/features/game/slices/displaySlice";
import dragReducer from "@/features/game/slices/dragSlice";
import gameDataReducer from "@/features/game/slices/gameDataSlice";
import historyReducer from "@/features/history/slices/historySlice";
import modalReducer from "@/features/modal/slices/modalSlice";
import progressReducer from "@/features/game/slices/progressSlice";
import themeReducer from "@/features/theme/slices/themeSlice";
import userReducer from "@/features/auth/slices/userSlice";
import { progressMiddleware } from "@/features/game/middlewares/progress";
import { persistMiddleware } from "@/shared/middleware/persist";

export const rootReducer = combineReducers({
  display: displayReducer,
  drag: dragReducer,
  gameData: gameDataReducer,
  history: historyReducer,
  modal: modalReducer,
  progress: progressReducer,
  theme: themeReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware).concat(progressMiddleware),
});
