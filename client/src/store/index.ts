import { combineReducers, configureStore } from "@reduxjs/toolkit";
import displayReducer from "@/store/slices/displaySlice";
import dragReducer from "@/store/slices/dragSlice";
import gameDataReducer from "@/store/slices/gameDataSlice";
import historyReducer from "@/store/slices/historySlice";
import modalReducer from "@/store/slices/modalSlice";
import progressReducer from "@/store/slices/progressSlice";
import themeReducer from "@/store/slices/themeSlice";
import userReducer from "@/store/slices/userSlice";
import { progressMiddleware } from "@/store/middlewares/progress";
import { persistMiddleware } from "@/store/middlewares/persist";

const rootReducer = combineReducers({
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

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
