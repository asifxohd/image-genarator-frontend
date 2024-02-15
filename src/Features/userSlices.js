import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./Action";


let initialState = {
    loading: false,
    success: false,
    validation_errors: {},
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearValidationErrors: (state) => {
            state.validation_errors = {};
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.validation_errors = {};
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.success = false;
                if (payload) {
                    state.validation_errors = payload;
                } else {
                    state.validation_errors = {};
                }
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.success = true;
                state.loading = false;
                state.validation_errors = {};
            });
    },
})

export default userSlice.reducer;
export const { clearValidationErrors } = userSlice.actions;
