import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./admin-slice";
import { userReducer } from "./user-slice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
  },
});
