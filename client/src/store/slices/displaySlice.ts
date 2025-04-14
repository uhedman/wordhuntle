import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { puntuation } from "../../utils/script";

interface DisplayState {
  text: string;
  className: string;
  showBubble: boolean;
}

const initialState: DisplayState = {
  text: "",
  className: "",
  showBubble: false,
};

const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    displayWord: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        text: action.payload,
        className: "",
        showBubble: false,
      };
    },
    displayFoundWord: (state, action: PayloadAction<number>) => {
      const length = action.payload;
      const lengthMessages: Record<number, string> = {
        4: "Bien +1",
        5: "Genial +4",
        6: "Increíble +6",
        7: "Fantástico +8",
        8: "Asombroso +10",
      };
      const message =
        lengthMessages[length] ?? "¡Exelente! +" + puntuation(length);

      return {
        ...state,
        text: message,
        className: "bg-success text-white showup",
        showBubble: true,
      };
    },
    displaySpecialMessage: (state, action: PayloadAction<string>) => {
      const message = action.payload;
      const messageClassName: Record<string, string> = {
        "Muy corta": "bg-warning text-dark shake",
        "No existe": "bg-danger text-white shake",
        "Ya encontrada": "bg-info text-white shake",
      };

      return {
        ...state,
        text: message,
        className: messageClassName[message],
        showBubble: true,
      };
    },
    clearDisplay: (state) => {
      return { ...state, text: "", className: "", showBubble: false };
    },
  },
});

export const {
  displayWord,
  displayFoundWord,
  displaySpecialMessage,
  clearDisplay,
} = displaySlice.actions;
export default displaySlice.reducer;
