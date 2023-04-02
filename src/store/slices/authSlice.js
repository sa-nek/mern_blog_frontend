import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (loginData) => {
    const { data } = await axios.post("/auth/login", loginData);
    return data;
  }
);

export const fetchMe = createAsyncThunk("auth/fetchMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (regData) => {
    const { data } = await axios.post("/auth/reg", regData);
    return data;
  }
);

const initialState = {
  userData: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
        state.userData = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userData = action.payload;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = "error";
        state.userData = null;
      })
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
        state.userData = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userData = action.payload;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.status = "error";
        state.userData = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.userData = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userData = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
        state.userData = null;
      });
  },
});

export const isAuthSelector = (state) => Boolean(state.auth.userData);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
