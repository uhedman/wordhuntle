import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "./slices/displaySlice";
import dragReducer from "./slices/dragSlice";
import gameDataReducer from "./slices/gameDataSlice";
import historyReducer from "./slices/historySlice";
import modalReducer from "./slices/modalSlice";
import progressReducer from "./slices/progressSlice";
import themeReducer from "./slices/themeSlice";

const store = configureStore({
  reducer: {
    display: displayReducer,
    drag: dragReducer,
    gameData: gameDataReducer,
    history: historyReducer,
    modal: modalReducer,
    progress: progressReducer,
    theme: themeReducer
  },
});

export default store;