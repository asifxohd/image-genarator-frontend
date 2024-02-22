import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

// Constant for base URL
export const BASE_URL = "http://127.0.0.1:8000/";
export const PROFILE_IMAGE_URL = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"

// Async thunk function to register a user
export const registerUser = createAsyncThunk(
    "user/register",
    async (data, { rejectWithValue }) => {
        try {
            // Sending POST request to register user
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
            // Notifying user about successful registration
            toast.success("User Created Successfully");
            return data;
        } catch (error) {
            // Handling error responses
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

// Async thunk function to login a user
export const userLogin = createAsyncThunk(
    "user/login",
    async (logindata, { rejectWithValue }) => {
        try {
            // Sending POST request to obtain access token
            const { data } = await axios.post(`${BASE_URL}api/token/`, logindata, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            // Storing user info and access token in cookies
            Cookies.set("userInfo", JSON.stringify(data), { expires: 2 });
            Cookies.set("authTokens", JSON.stringify(jwtDecode(data.access)), {
                expires: 2,
            });
            // Notifying user about successful login
            toast.success("User is Signin successfully");
            return data;
        } catch (error) {
            // Handling error responses
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Async thunk function to fetch image URL
export const fetchImageUrl = createAsyncThunk(
    'user/fetchImageUrl',
    async (prompts, { rejectWithValue }) => {
        try {
            // Sending POST request to fetch image URL
            const response = await axios.post(`${BASE_URL}api/users/img/`, prompts, {
                headers:{
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            // Handling error responses
            console.log(er);
            return rejectWithValue(error.response.data); 
        }
    }
);

// Function for refreshing the access token 
const refreshAccessToken = async () => {
    try {
        const refreshToken = JSON.parse(Cookies.get('userInfo')).refresh;
        const response = await axios.post(`${BASE_URL}api/token/refresh/`, { refresh: refreshToken });
        const newAccessToken = response.data.access;
        Cookies.set('userInfo', JSON.stringify({ access: newAccessToken, refresh: refreshToken }), { expires: 2 });
        return newAccessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        throw error; // Ensure error is propagated for proper handling
    }
};

axios.interceptors.request.use(async (config) => {
    try {
        const accessTokenObject = JSON.parse(Cookies.get('userInfo'));
        const accessToken = accessTokenObject.access;

        const { exp } = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (exp && exp - currentTime < 60) {
            const newAccessToken = await refreshAccessToken();
            config.headers.Authorization = `Bearer ${newAccessToken}`;
        } else {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    } catch (error) {
        console.error("Error in request interceptor:", error);
        // Handle the error, for example, by returning the config without modifying it
    }
    return config;
});
