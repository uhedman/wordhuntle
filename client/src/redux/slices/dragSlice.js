import { createSlice } from '@reduxjs/toolkit';
import { addWord } from './progressSlice';
import { displayWord, displayFoundWord, displaySpecialMessage, clearDisplay } from './displaySlice';

const dragSlice = createSlice({
  name: 'drag',
  initialState: {
    word: '',
    isDragging: false,
    tiles: Array.from({ length: 16 }, () => false),
    order: []
  },
  reducers: {
    stop: (state) => {
      return {
        ...state,
        word: '',
        isDragging: false,
        tiles: Array.from({ length: 16 }, () => false),
        order: [],
      };
    },
    start: (state, action) => {
      const { letter, id } = action.payload;
      let x = Math.floor(id / 4);
      let y = id % 4;

      return {
        ...state,
        word: letter,
        isDragging: true,
        tiles: state.tiles.map((el, idx) => idx === id ? true : el),
        order: [[x, y]]
      }
    },
    back: (state, action) => {
      const id = action.payload;
      return {
        ...state,
        word: state.word.slice(0, -1),
        tiles: state.tiles.map((item, index) => index === id ? false : item),
        order: state.order.slice(0, -1)
      }
    },
    write: (state, action) => {
      const { id, letter, pos } = action.payload;
      return {
        ...state,
        word: state.word + letter,
        tiles: state.tiles.map((item, index) => index === id ? true : item),
        order: [...state.order, pos]
      };
    }
  }
});

export const startDrag = (action) => (dispatch) => {
  const { letter, id } = action;
  dispatch(start({ letter, id }));
  dispatch(displayWord(letter));
};

export const stopDrag = () => (dispatch, getState) => {
  const { isDragging, word } = getState().drag;
  const { words } = getState().gameData;
  const found = getState().progress.found;

  if (!isDragging) return;

  const length = word.length;

  if (length < 2) {
    dispatch(clearDisplay());
  } else if (length < 4) {
    dispatch(displaySpecialMessage('Muy corta'));
  } else if (words.includes(word)) {
    if (found.includes(word)) {
      dispatch(displaySpecialMessage('Ya encontrada'));
    } else {
      dispatch(addWord(word));
      dispatch(displayFoundWord(length));
    }
  } else {
    dispatch(displaySpecialMessage('No existe'));
  }
  dispatch(stop());
};

export const drag = (action) => (dispatch, getState) => {
  const { isDragging, tiles, order, word } = getState().drag;
  if (!isDragging) return;

  const { letter, id } = action;
  let x = Math.floor(id / 4);
  let y = id % 4;
  let l = order.length;
  let [a, b] = order[l - 1];

  if (l >= 2) {
    let [c, d] = order[l - 2];
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
