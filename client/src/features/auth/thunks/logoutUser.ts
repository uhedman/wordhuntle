import { clearUser } from "@/features/auth/slice";
import { resetProgress } from "@/features/progress/slice";
import { RootState } from "@/shared/types";
import { PayloadAction, ThunkAction } from "@reduxjs/toolkit";

export const logoutUser =
  (): ThunkAction<void, RootState, unknown, PayloadAction<void>> =>
  (dispatch) => {
    dispatch(clearUser());
    dispatch(resetProgress());
  };
