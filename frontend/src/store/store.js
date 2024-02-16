import { configureStore } from '@reduxjs/toolkit';
import cvDataReducer from '../slices/cvDataSlice';
import userReducer from '../slices/userSlice';

const store = configureStore({
  reducer: {
    cvData: cvDataReducer,
    user: userReducer,
  },
});

export default store;
