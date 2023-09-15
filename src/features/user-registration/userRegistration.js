import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { registerUser } from "../auth/authActions";

// "email": smallEmail,
// "password": password,
// "firstName": nameparts[0],
// "lastName": nameparts[1],
// "code": "n/a",
// "username": username.trim(),
// "phone": phone,
// "referral": referral_code,
// "countrycode": _selectedcoode,
// "reg_type": isDriver ? "DRIVER" : "OWNER"
const initialState = {
  payload: {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    fullName: "",
    code: "n/a",
    username: "",
    phone: "",
    referral: "",
    countrycode: "",
  },
  loading: false,
  error: "",
};

const userRegistrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setError: (state, data) => {
      state.error = data.payload;
    },
    setPayload: (state, action) => {
      //   console.log(action.payload);

      const { fullName } = action.payload;
      if (fullName) {
        //split data
        fullName.toString().split("");

        state.payload.firstName = fullName[0];
        state.payload.lastName = fullName[1];
        state.payload = action.payload;
        return;
      }

      state.payload = action.payload;
    },
  },
});

export const { setError, setPayload } = userRegistrationSlice.actions;
export default userRegistrationSlice.reducer;
