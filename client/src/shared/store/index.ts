import authReducer from "@/features/auth/slices/authSlice";
import dragReducer from "@/features/drag/slices/dragSlice";
import displayReducer from "@/features/game/slices/displaySlice";
import gameDataReducer from "@/features/game/slices/gameDataSlice";
import progressReducer from "@/features/progress/slices/progressSlice";
import historyReducer from "@/features/history/slices/historySlice";
import modalReducer from "@/features/modal/slices/modalSlice";
import themeReducer from "@/features/theme/slices/themeSlice";
import { syncProgressOnRegister } from "@/features/progress/middlewares/syncProgressOnRegister";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistMiddleware } from "@/shared/middleware/persist";

export const rootReducer = combineReducers({
  auth: authReducer,
  display: displayReducer,
  drag: dragReducer,
  gameData: gameDataReducer,
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
