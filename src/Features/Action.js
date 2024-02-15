import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const BASE_URL = "http://127.0.0.1:8000/";

export const registerUser = createAsyncThunk(
    "user/register",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}api/users/register/`,
                data,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success("User Created Successfully");
            return data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue({
                    validation_errors: error.response.data.validation_errors,
                });
            } else {
                return rejectWithValue(error.response.data.validation_errors);
            }
        }
    }
);

export const userLogin = createAsyncThunk(
    "user/login",
    async (logindata, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}api/token/`, logindata, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            Cookies.set("userInfo", JSON.stringify(data), { expires: 2 });
            Cookies.set("authTokens", JSON.stringify(jwtDecode(data.access)), {
                expires: 2,
            });
            toast.success("User is Signin successfully")
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const fetchImageUrl = createAsyncThunk(
    'user/fetchImageUrl',
    async (prompts, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/users/img/`, prompts, {
                headers:{
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                }
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data); 
        }
    }
);
