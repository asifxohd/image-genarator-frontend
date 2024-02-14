import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const BASE_URL = 'http://127.0.0.1:8000/';

export const registerUser = createAsyncThunk(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}api/users/register/`, data, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            console.log('Successful response:', response.data);
            return data;
            
        } catch (error) {
            if (error.response) {
                return rejectWithValue({ validation_errors: error.response.data.validation_errors });
            } else {
                return rejectWithValue(error.response.data.validation_errors);
            }
        }
    }
);


