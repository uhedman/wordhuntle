import { displayWord } from "@/features/display/slice";
import { TileData } from "@/features/game/types";
import { RootState } from "@/shared/types";
import { PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { back, write } from "@/features/drag/slice";

export const drag =
  (action: {
    id: number;
    letter: string;
  }): ThunkAction<
    void,
    RootState,
    unknown,
    PayloadAction<number | string | TileData>
  > =>
  (dispatch, getState) => {
    const state = getState();
    const { isDragging, tiles, path, word } = state.drag;
    if (!isDragging) return;

    const { letter, id } = action;
    const x = Math.floor(id / 4);
    const y = id % 4;
    const l = path.length;
    const [a, b] = path[l - 1];

    if (l >= 2) {
      const [c, d] = path[l - 2];
      if (x === c && y === d) {
        dispatch(back(a * 4 + b));
        dispatch(displayWord(word.slice(0, -1)));
        return;
      }
    }

    if (!tiles[id] && Math.abs(x - a) <= 1 && Math.abs(y - b) <= 1) {
      dispatch(write({ letter, id, pos: [x, y] }));
      dispatch(displayWord(word + letter));
    }
  };
