import { displayWord } from "@/features/game/slices/displaySlice";
import { TileData } from "@/features/game/types";
import { RootState } from "@/shared/types";
import { ThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { start } from "@/features/drag/slices/dragSlice";

export const startDrag =
  (action: {
    id: number;
    letter: string;
  }): ThunkAction<void, RootState, unknown, PayloadAction<TileData | string>> =>
  (dispatch, getState) => {
    const { isDragging } = getState().drag;
    if (isDragging) return;

    const { letter, id } = action;
    const x = Math.floor(id / 4);
    const y = id % 4;

    dispatch(start({ id, letter, pos: [x, y] }));
    dispatch(displayWord(letter));
  };
