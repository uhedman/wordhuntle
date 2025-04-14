import { addWord } from "./progressSlice";
import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import {
  displayWord,
  displayFoundWord,
  displaySpecialMessage,
  clearDisplay,
} from "./displaySlice";
import { Tile } from "../../types";
import { RootState } from "../store";

interface DragState {
  word: string;
  isDragging: boolean;
  tiles: boolean[];
  path: [number, number][];
}

const initialState: DragState = {
  word: "",
  isDragging: false,
  tiles: new Array(16).fill(false),
  path: [],
};

const dragSlice = createSlice({
  name: "drag",
  initialState,
  reducers: {
    stop: (state) => {
      return {
        ...state,
        word: "",
        isDragging: false,
        tiles: new Array(16).fill(false),
        path: [],
      };
    },
    start: (state, action: PayloadAction<Tile>) => {
      const { id, letter, pos } = action.payload;

      return {
        ...state,
        word: letter,
        isDragging: true,
        tiles: state.tiles.map((el, idx) => (idx === id ? true : el)),
        path: [pos],
      };
    },
    back: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      return {
        ...state,
        word: state.word.slice(0, -1),
        tiles: state.tiles.map((item, index) => (index === id ? false : item)),
        path: state.path.slice(0, -1),
      };
    },
    write: (state, action: PayloadAction<Tile>) => {
      const { id, letter, pos } = action.payload;

      return {
        ...state,
        word: state.word + letter,
        tiles: state.tiles.map((item, index) => (index === id ? true : item)),
        path: [...state.path, pos],
      };
    },
  },
});

export const startDrag =
  (action: {
    id: number;
    letter: string;
  }): ThunkAction<void, RootState, unknown, PayloadAction<Tile | string>> =>
  (dispatch, getState) => {
    const { isDragging } = getState().drag;
    if (isDragging) return;

    const { letter, id } = action;
    const x = Math.floor(id / 4);
    const y = id % 4;

    dispatch(start({ id, letter, pos: [x, y] }));
    dispatch(displayWord(letter));
  };

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

export const drag =
  (action: {
    id: number;
    letter: string;
  }): ThunkAction<
    void,
    RootState,
    unknown,
    PayloadAction<number | string | Tile>
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

export const { back, stop, start, write } = dragSlice.actions;
export default dragSlice.reducer;
