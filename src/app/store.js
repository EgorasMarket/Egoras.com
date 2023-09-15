import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import userRegistration from "../features/user-registration/userRegistration";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    registration: userRegistration,
  },
});
