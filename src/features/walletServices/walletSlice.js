import { createSlice } from "@reduxjs/toolkit";
import { fetchWalletBalance } from "./walletActions";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const kycSlice = createSlice({
  name: "wallet",
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

  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.data = action.payload?.data;
        state.loading = false;
      })
      .addCase(fetchWalletBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWalletBalance.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
      });
  },
});

export const { setError, setPayload } = kycSlice.actions;
export default kycSlice.reducer;
