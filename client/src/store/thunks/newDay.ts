import { PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { fetchTodayDataThunk } from "@/store/slices/gameDataSlice";
import { fetchLastDataThunk } from "@/store/slices/historySlice";
import { resetProgress } from "@/store/slices/progressSlice";
import { getFromStorage } from "@/utils/storage";

export const newDay =
  (
    isNextDay: boolean,
  ): ThunkAction<void, RootState, unknown, PayloadAction<string[] | void>> =>
  (dispatch) => {
    dispatch(fetchTodayDataThunk());
    const lastFound = isNextDay
      ? (getFromStorage<string[]>("found") ?? [])
      : [];
    dispatch(fetchLastDataThunk(lastFound));
    dispatch(resetProgress());
  };
