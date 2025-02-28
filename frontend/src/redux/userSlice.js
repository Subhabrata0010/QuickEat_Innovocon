import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Backend URL
const API_URL = "http://localhost:8000/auth";

// Async action to check if the user is logged in
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return null;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle" },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;