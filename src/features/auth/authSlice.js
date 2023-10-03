import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, verifyUser } from "./authActions";
import setAuthToken from "../../utils/setAuthToken";

// // initialize userToken from local storage
// const token = localStorage.getItem("auth")
//   ? localStorage.getItem("auth")
//   : null;

const initialState = {
  user: null,
  meta: "",
  loading: false,
  error: "",
  token: null,
  payload: {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    fullName: "",
    gender: "",
    dateOfBirth: "",
    code: "n/a",
    username: "",
    phone: "",
    referral: "",
    countrycode: "",
  },
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, data) => {
      state.error = data.payload;
    },
    setPayload: (state, action) => {
      //   console.log(action.payload);

      const { fullName, phone } = action.payload;
      state.payload = action.payload;

      if (fullName) {
        //split data
        let temp = fullName.split(" ");
        state.payload.firstName = temp[0];
        state.payload.lastName = temp[1];
        state.payload.fullName = fullName;
      }
    },
    logout: (state, action) => {
      state.user = {};
      localStorage.removeItem("auth");
      window.location.reload();
    },
    resetAuth: (state) => {
      state.error = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data?.user;
        state.meta = action.payload.data?.meta;
      })
      .addCase(verifyUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data.errorMessage;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        localStorage.setItem("x-token", action.payload.data.token);
        setAuthToken(action.payload.data.token);
        state.token = action.payload.data.token;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.data.errorMessage;
        state.loading = false;
      });
  },
});

export const { setError, setPayload } = AuthSlice.actions;
export default AuthSlice.reducer;
