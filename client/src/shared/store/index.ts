import authReducer from "@/features/auth/slice";
import dragReducer from "@/features/drag/slice";
import displayReducer from "@/features/display/slice";
import gameReducer from "@/features/game/slice";
import progressReducer from "@/features/progress/slice";
import historyReducer from "@/features/history/slice";
import modalReducer from "@/features/modal/slice";
import themeReducer from "@/features/theme/slice";
import { syncProgressOnRegister } from "@/features/progress/middlewares/syncProgressOnRegister";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistMiddleware } from "@/shared/middleware/persist";

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
    getDefaultMiddleware()
      .concat(persistMiddleware)
      .concat(syncProgressOnRegister),
});
