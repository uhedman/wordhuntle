import { PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { fetchTodayDataThunk, setSeed } from "@/store/slices/gameDataSlice";
import { fetchLastDataThunk, setLastFound } from "@/store/slices/historySlice";
import { resetProgress } from "@/store/slices/progressSlice";
import { getFromStorage } from "@/utils/storage";

export const loadGame =
  (
    seed: number,
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
