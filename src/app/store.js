import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import userRegistration from "../features/user-registration/userRegistration";
import kycSlice from "../features/kyc/kycSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    registration: userRegistration,
    kyc: kycSlice,
  },
});
