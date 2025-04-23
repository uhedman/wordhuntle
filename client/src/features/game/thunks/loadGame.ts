import { PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "@/shared/types";
import {
  fetchTodayDataThunk,
  setSeed,
} from "@/features/game/slices/gameDataSlice";
import {
  fetchLastDataThunk,
  setLastFound,
} from "@/features/history/slices/historySlice";
import { resetProgress } from "@/features/game/slices/progressSlice";
import { getFromStorage } from "@/shared/utils/storage";

export const loadGame =
  (
    seed: number
  ): ThunkAction<
    void,
    RootState,
    unknown,
    PayloadAction<string[] | number | void>
  > =>
  (dispatch) => {
    const storageSeed = getFromStorage<number>("seed");
    if (seed !== storageSeed) {
      if (seed - 1 === storageSeed) {
        const found = getFromStorage<string[]>("found") ?? [];
        dispatch(setLastFound(found));
      }
      dispatch(resetProgress());
    }

    dispatch(setSeed(seed));
    dispatch(fetchTodayDataThunk());
    dispatch(fetchLastDataThunk());
  };
