import { configureStore } from '@reduxjs/toolkit';
import cvDataReducer from '../slices/cvDataSlice';

const store = configureStore({
  reducer: {
    cvData: cvDataReducer,
  },
});

export default store;
