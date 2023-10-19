import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payload: {
    bvnNumber: "",
    address: "",
    image: "",
  },
  loading: false,
  error: "",
};

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    setError: (state, data) => {
      state.error = data.payload;
    },
    setPayload: (state, action) => {
      //   //console.logog(action.payload);
      state.payload = action.payload;
    },
  },
});

export const { setError, setPayload } = kycSlice.actions;
export default kycSlice.reducer;
