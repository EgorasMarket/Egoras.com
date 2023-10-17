import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN_USER, REGISTER_USER, VERIFY_USER } from "../../services/auth";
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      return await LOGIN_USER(payload);
    } catch (err) {
      //console.logog("Error : " + err.response.message);
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
      //console.logog("Error : " + err.response.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "auth/verify",
  async (payload, thunkAPI) => {
    try {
      return await VERIFY_USER();
    } catch (error) {
      //console.logog("Error : " + error.response.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
