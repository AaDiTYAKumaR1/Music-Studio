import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./reducer/authSlices.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
