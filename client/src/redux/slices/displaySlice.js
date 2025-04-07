import { createSlice } from '@reduxjs/toolkit';
import { puntuation } from '../../utils/script';

const displaySlice = createSlice({
  name: 'display',
  initialState: {
    text: '',
    className: '',
    showBubble: false
  },
  reducers: {
    displayWord: (state, action) => {
      const word = action.payload;
      return { ...state, text: word, className: '', showBubble: false }
    },
    displayFoundWord: (state, action) => {
      const length = action.payload;
      const lengthMessages = {
        4: 'Bien +1',
        5: 'Genial +4',
        6: 'Increíble +6',
        7: 'Fantástico +8',
        8: 'Asombroso +10'
      };
      const message = lengthMessages[length] || '¡Exelente! +' + puntuation(length);
      
      return { ...state, text: message, className: 'bg-success text-white showup', showBubble: true };
    },
    displaySpecialMessage: (state, action) => {
      const message = action.payload;
      const messageClassName = {
        'Muy corta': 'bg-warning text-dark shake',
        'No existe': 'bg-danger text-white shake',
        'Ya encontrada': 'bg-info text-white shake'
      };

      return { ...state, text: message, className: messageClassName[message], showBubble: true };
    },
    clearDisplay: (state) => {
      return { ...state, text: '', className: '', showBubble: false };
    }
  },
});

export const { displayWord, displayFoundWord, displaySpecialMessage, clearDisplay } = displaySlice.actions;
export default displaySlice.reducer;
