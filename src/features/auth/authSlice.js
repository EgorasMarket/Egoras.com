import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  error: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, data) => {
      state.error = data.payload;
    },
  },
});

export const { setError } = AuthSlice.actions;
export default AuthSlice.reducer;
