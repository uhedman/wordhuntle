import { setLastFound } from "@/features/history/slices/historySlice";
import { getLastData } from "@/features/history/thunks/getLastData";
import { RootState } from "@/shared/types";
import { getFromStorage } from "@/shared/utils/storage";
import { ThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { setSeed } from "@/features/game/slices/gameDataSlice";
import { resetProgress } from "@/features/progress/slices/progressSlice";
import { getTodayData } from "@/features/game/thunks/getTodayData";

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
    dispatch(getTodayData());
    dispatch(getLastData());
  };
