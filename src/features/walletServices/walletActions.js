import { createAsyncThunk } from "@reduxjs/toolkit";
import { FETCH_WALLET_BALANCES } from "../../services/finance_services";

export const fetchWalletBalance = createAsyncThunk(
  "wallet/balance",

  async (_, thunkAPI) => {
    try {
      return await FETCH_WALLET_BALANCES();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
