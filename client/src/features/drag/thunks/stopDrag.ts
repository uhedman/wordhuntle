import {
  clearDisplay,
  displayFoundWord,
  displaySpecialMessage,
} from "@/features/display/slices/displaySlice";
import { addWord } from "@/features/progress/thunks/addWord";
import { RootState } from "@/shared/types";
import { stop } from "@/features/drag/slices/dragSlice";
import { ThunkAction, PayloadAction } from "@reduxjs/toolkit";

export const stopDrag =
  (): ThunkAction<
    void,
    RootState,
    unknown,
    PayloadAction<void | string | number>
  > =>
  (dispatch, getState) => {
    const state = getState();
    const { isDragging, word } = state.drag;
    const { words } = state.gameData;
    const found = state.progress.found;

    if (!isDragging || words === null || found === null) return;

    const length = word.length;

    if (length < 2) {
      dispatch(clearDisplay());
    } else if (length < 4) {
      dispatch(displaySpecialMessage("Muy corta"));
    } else if (words.includes(word)) {
      if (found.includes(word)) {
        dispatch(displaySpecialMessage("Ya encontrada"));
      } else {
        dispatch(addWord(word));
        dispatch(displayFoundWord(length));
      }
    } else {
      dispatch(displaySpecialMessage("No existe"));
    }
    dispatch(stop());
  };
