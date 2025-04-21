import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tile } from "@/types";
import { Pos } from "~/shared/types";

interface DragState {
  word: string;
  isDragging: boolean;
  tiles: boolean[];
  path: Pos[];
}

const initialState: DragState = {
  word: "",
  isDragging: false,
  tiles: Array(16).fill(false),
  path: [],
};

const dragSlice = createSlice({
  name: "drag",
  initialState,
  reducers: {
    stop: (state) => {
      state.word = "";
      state.isDragging = false;
      state.tiles = Array(16).fill(false);
      state.path = [];
    },
    start: (state, action: PayloadAction<Tile>) => {
      const { id, letter, pos } = action.payload;

      state.word = letter;
      state.isDragging = true;
      state.tiles = state.tiles.map((el, idx) => (idx === id ? true : el));
      state.path = [pos];
    },
    back: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.word = state.word.slice(0, -1);
      state.tiles = state.tiles.map((item, index) =>
        index === id ? false : item
      );
      state.path = state.path.slice(0, -1);
    },
    write: (state, action: PayloadAction<Tile>) => {
      const { id, letter, pos } = action.payload;

      state.word = state.word + letter;
      state.tiles = state.tiles.map((item, index) =>
        index === id ? true : item
      );
      state.path = [...state.path, pos];
    },
  },
});

export const { back, stop, start, write } = dragSlice.actions;
export default dragSlice.reducer;
