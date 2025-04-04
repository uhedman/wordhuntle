import { createSlice } from '@reduxjs/toolkit';
import { addWord } from './storageSlice';
import { getGrid } from '../../utils/grid';
import { getWords, puntuation } from '../../utils/script';

const todayCode = Math.floor(Date.now() / 86400000);
const grid = getGrid(todayCode);
const lastGrid = getGrid(todayCode - 1);
const secretWords = getWords(grid);
const lastSecretWords = getWords(lastGrid).sort();
const maxPoints = secretWords.reduce((acc, word) => acc + puntuation(word.length), 0);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
		displayText: '',
    displayShowBubble: false,
    displayClassName: '',
		drag: false,
		secretWords,
    lastSecretWords,
		total: secretWords.length,
		tiles: Array.from({ length: 16 }, () => false),
		order: [],
		grid,
    lastGrid,
    todayCode,
    maxPoints
	},
  reducers: {
    deselect: (state, action) => {
      if (action.payload === 'Encontrada') {
        const lengthMessages = {
          4: 'Bien +1',
          5: 'Genial +4',
          6: 'Increíble +6',
          7: 'Fantástico +8',
          8: 'Asombroso +10'
        };
    
        return {
          ...state,
          displayText: lengthMessages[state.displayText.length] || '¡Excelente!' + puntuation(state.displayText.length),
          displayClassName: 'bg-success text-white showup',
          displayShowBubble: true,
          drag: false,
          tiles: Array.from({ length: 16 }, () => false),
          order: [],
        };
      }

      const specialMessages = {
        'Muy corta': 'bg-warning text-dark shake',
        'No existe': 'bg-danger text-white shake',
        'Ya encontrada': 'bg-info text-white shake'
      };
      const message = action.payload;
      const className = specialMessages[message] || '';
      
      return { 
        ...state, 
        displayText: action.payload,
        displayClassName: className,
        displayShowBubble: className !== '',
        drag: false, 
        tiles: Array.from({ length: 16 }, () => false), 
        order: []
      };
    },
    start: (state, action) => {
      const { letter, id } = action.payload;
      let x = Math.floor(id / 4);
      let y = id % 4;

      return { 
        ...state, 
        displayText: letter, 
        displayShowBubble: false,
        displayClassName: '',
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
      const { tiles, order, displayText } = state;
      let l = order.length;
      let [a, b] = order[l - 1];
          
      if (l >= 2) {
        let [c, d] = order[l - 2];
        if (x === c && y === d) {
          return {
            ...state,
            displayText: displayText.slice(0, -1),
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
          displayText: displayText + letter,
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
  const { drag, displayText, secretWords } = getState().game;
  if (!drag) {
    return;
  }
  
  const found = getState().storage.found;
  if (displayText.length < 2) {
    dispatch(deselect(''));
    return;
  }
  if (displayText.length < 4) {
    dispatch(deselect('Muy corta'));
  } else if (secretWords.includes(displayText)) {
    if (!found.includes(displayText)) {
      dispatch(addWord(displayText));
      dispatch(deselect('Encontrada'));
    } else {
      dispatch(deselect('Ya encontrada'));
    }
  } else {
    dispatch(deselect('No existe'));
  }
};

export const { deselect, start, write } = gameSlice.actions;
export default gameSlice.reducer;
