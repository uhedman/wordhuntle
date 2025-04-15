import { PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { loadGameStorage } from "@/store/slices/gameDataSlice";
import { loadHistoryStorage } from "@/store/slices/historySlice";
import { loadProgressStorage } from "@/store/slices/progressSlice";
import { RootState } from "@/store";

export const loadStorage =
  (): ThunkAction<void, RootState, unknown, PayloadAction<void>> =>
  (dispatch) => {
    dispatch(loadGameStorage());
    dispatch(loadHistoryStorage());
    dispatch(loadProgressStorage());
  };
