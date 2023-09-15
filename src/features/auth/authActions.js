import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN_USER, REGISTER_USER } from "../../services/auth";
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
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      return await REGISTER_USER(payload);
    } catch (err) {
      console.log("Error : " + err.response.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
