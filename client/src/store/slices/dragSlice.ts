import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tile } from "@/types";

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

export const { back, stop, start, write } = dragSlice.actions;
export default dragSlice.reducer;
