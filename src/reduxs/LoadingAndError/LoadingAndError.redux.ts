import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoadingAndErrorState } from './LoadingAndError.type';

const initialState: LoadingAndErrorState = {
  importanceCount: 0,
  loadingMessages: [],
  errorMessages: [],
};

const LoadingAndErrorSlice = createSlice({
  name: 'LoadingAndError',
  initialState,
  reducers: {
    addLoadingMessage: (state, action: PayloadAction<string[]>) => {
      state.loadingMessages = [...new Set([...state.loadingMessages, ...action.payload])];
    },
    removeLoadingMessage: (state, action: PayloadAction<string[]>) => {
      state.loadingMessages = state.loadingMessages.filter(item => !action.payload.includes(item));
    },
    addErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessages = [...new Set([...state.errorMessages, action.payload])];
    },
    removeErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessages = state.errorMessages.filter(item => item !== action.payload);
    },
    addImportanceMessage: (state, action: PayloadAction<string[]>) => {
      const newMessagesList = [...new Set([...state.loadingMessages, ...action.payload])];
      state.importanceCount += newMessagesList.length - state.loadingMessages.length;
      state.loadingMessages = newMessagesList;
    },
    removeImportanceMessage: (state, action: PayloadAction<string[]>) => {
      const newMessagesList = state.loadingMessages.filter(item => !action.payload.includes(item));
      state.importanceCount += newMessagesList.length - state.loadingMessages.length;
      state.loadingMessages = newMessagesList;
    },
  },
});

export const LoadingAndErrorActions = LoadingAndErrorSlice.actions;
export const LoadingAndErrorReducer = LoadingAndErrorSlice.reducer;
