import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Features/userSlices'

export const store = configureStore({
    reducer:{
        user:userReducer
    },
});