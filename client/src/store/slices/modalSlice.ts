import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalState {
  isOpen: boolean;
  content: string;
}

const initialState: modalState = {
  isOpen: false,
  content: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      return { ...state, isOpen: true, content: action.payload };
    },
    closeModal: (state) => {
      return { ...state, isOpen: false, content: "" };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
