import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./Action";
import Cookies from "js-cookie";

const initialState = {
  loading: false,
  success: false,
  error: null,
  is_authenticated: false,
  userData: {},
  is_superuser: false,
};

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.is_authenticated = false;
      Cookies.remove("userInfo");
      Cookies.remove("authTokens");
    },
    authenticateUser: (state) => {
      state.is_authenticated = true;


    },
    fetchUserData:(state) => {
      state.userData  = Cookies.get("authTokens") ? JSON.parse(Cookies.get("authTokens")) : null;
      console.log(state.userData)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.is_superuser = JSON.parse(Cookies.get("authTokens")).is_superuser
      })
      .addCase(userLogin.rejected, (state, action) => {
        if (action.payload && action.payload.status === 401) {
          console.log("Authentication failed: Invalid credentials");
        } else {
          state.error = action.payload || "Login failed";
        }
      });
  },
});

export default userLoginSlice.reducer;
export const { logoutUser, authenticateUser, fetchUserData } = userLoginSlice.actions;
