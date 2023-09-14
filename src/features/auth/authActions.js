import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_USER, LOGIN_USER } from "../../services/auth";
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      return await LOGIN_USER(payload);
    } catch (err) {
      console.log("Error : " + err.response.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "cart/add",
  async (payload, thunkAPI) => {
    try {
      return await CREATE_USER(payload);
    } catch (err) {
      console.log("Error : " + err.response.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
