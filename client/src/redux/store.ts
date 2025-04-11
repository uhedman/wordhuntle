import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "./slices/displaySlice";
import dragReducer from "./slices/dragSlice";
import gameDataReducer from "./slices/gameDataSlice";
import historyReducer from "./slices/historySlice";
import modalReducer from "./slices/modalSlice";
import progressReducer from "./slices/progressSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    display: displayReducer,
    drag: dragReducer,
    gameData: gameDataReducer,
    history: historyReducer,
    modal: modalReducer,
    progress: progressReducer,
    theme: themeReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
