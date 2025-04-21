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
      state.isOpen = true;
      state.content = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
