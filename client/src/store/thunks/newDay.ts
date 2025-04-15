import { PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { fetchTodayData } from "@/store/slices/gameDataSlice";
import { resetProgress } from "@/store/slices/progressSlice";
import { fetchLastData } from "@/store/slices/historySlice";
import { getFromStorage } from "@/utils/storage";

export const newDay =
  (
    isNextDay: boolean,
  ): ThunkAction<void, RootState, unknown, PayloadAction<string[] | void>> =>
  (dispatch) => {
    dispatch(fetchTodayData());
    const lastFound = isNextDay ? getFromStorage<string[]>("found") ?? [] : [];
    dispatch(fetchLastData(lastFound));
    dispatch(resetProgress());
  };
