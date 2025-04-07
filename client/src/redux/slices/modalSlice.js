import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    content: ''
  },
  reducers: {
    openModal: (state, action) => {
      const content = action.payload;
      return { ...state, isOpen: true, content };
    },
    closeModal: (state) => {
      return { ...state, isOpen: false, content: '' };
    }
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
