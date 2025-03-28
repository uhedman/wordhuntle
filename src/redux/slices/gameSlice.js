import { createSlice } from "@reduxjs/toolkit";
import { addWord } from "./storageSlice";
import { getGrid } from "../../palabras/grid";
import { getWords } from "../../palabras/script";

const todayCode = Math.floor(Date.now() / 86400000);
const grid = getGrid(todayCode);
const secretWords = getWords(grid);

const gameSlice = createSlice({
  name: "game",
  initialState: {
		word: '',
		drag: false,
		secretWords,
		total: 0,
		tiles: Array.from({ length: 16 }, () => false),
		order: [],
		grid,
    todayCode
	},
  reducers: {
    deselect: (state, action) => {
      return { ...state, word: action.payload, drag: false, tiles: Array.from({ length: 16 }, () => false), order: [] };
    },
    setGrid: (state, action) => {
      return { ...state, grid: action.payload }
    },
    setWords: (state, action) => {
      return { ...state, secretWords: action.payload, total: action.payload.length };
    },
    start: (state, action) => {
      const { letter, id } = action.payload;
      let x = Math.floor(id / 4);
      let y = id % 4;

      return { 
        ...state, 
        word: letter, 
        drag: true, 
        tiles: state.tiles.map((el, idx) => idx === id ? true : el), 
        order: [[x, y]] 
      }
    },
    write: (state, action) => {
      const { letter, id } = action.payload;

      if (!state.drag) {
        return state;
      }

      let x = Math.floor(id / 4);
      let y = id % 4;
      const { tiles, order, word } = state;
      let l = order.length;
      let [a, b] = order[l - 1];
          
      if (l >= 2) {
        let [c, d] = order[l - 2];
        if (x === c && y === d) {
          return {
            ...state,
            word: word.slice(0, -1),
            tiles: tiles.map((item, index) => index === a * 4 + b ? false : item),
            order: order.slice(0, -1)
          }
        }
      }
          
      if (!state.tiles[id] &&
        Math.abs(x - a) <= 1 &&
        Math.abs(y - b) <= 1) {
        return {
          ...state,
          word: word + letter,
          tiles: tiles.map((item, index) => index === id ? true : item),
          order: [...order, [x, y]]
        };
      }
      else {
        return state;		
      }
    }
  }
});

export const deselectAndStoreWord = () => (dispatch, getState) => {
  const { drag, word, secretWords } = getState().game;
  if (!drag) {
    return;
  }
  
  const found = getState().storage.found;
  if (word.length < 3) {
    dispatch(deselect('too short'));
  } else if (secretWords.includes(word)) {
    if (!found.includes(word)) {
      dispatch(addWord(word));
      dispatch(deselect('found'));
    } else {
      dispatch(deselect('already found'));
    }
  } else {
    dispatch(deselect('not found'));
  }
};

export const { deselect, setGrid, setWords, start, write } = gameSlice.actions;
export default gameSlice.reducer;
