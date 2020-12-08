/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const errorMessageSlice = createSlice({
  name: 'error',
  initialState: {
    errorMessage: null,
  },
  reducers: {
    setErrorMessage: (state, action) => {
      //  參數為單一值非物件
      state.errorMessage = action.payload;
    },
  },
});

// 設定 action
export const { setErrorMessage } = errorMessageSlice.actions;

// selector
export const selectErrorMessage = store => store.error.errorMessage;

export default errorMessageSlice.reducer;
