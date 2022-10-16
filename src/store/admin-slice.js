import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("adminId");
      localStorage.removeItem("token");
    },
  },
});
export const adminActions = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
