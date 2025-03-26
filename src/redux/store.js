import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import modalReducer from "./slices/modalSlice";
import storageReducer from "./slices/storageSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    modal: modalReducer,
    storage: storageReducer
  },
});

export default store;