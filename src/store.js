import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Features/userSlices';
import userLoginReducer from './Features/userLoginSlice.js';

export const store = configureStore({
    reducer:{
        user:userReducer,
        userLogin:userLoginReducer
    },
});