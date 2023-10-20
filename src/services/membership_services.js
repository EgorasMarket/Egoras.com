import axios from "axios";
import {
  GET_ALL_SUBSCRIPTION,
  SUBSCRIBE_MEMBERSHIP_ROUTE,
} from "../core/ApiRoutes";
import setAuthToken from "../utils/setAuthToken";
export const SUBSCRIBE_MEMBERSHIP = async (payload) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    // SAMPLE PAYLOAD
    // Map<String, String> body = {
    // "email": "${email}",
    //   "type": "membership",
    //   "referral_code": "${referral_code}",
    //   "userWallet": "${wallet}",
    //   "quantity": "1",
    //   "pin_code": "${pin}",
    //   "amount": "${selectedValue}",
    //   "symbol": "EGC",
    //   "user": "${wallet}",
    // };

    const res = await axios.post(`${SUBSCRIBE_MEMBERSHIP_ROUTE}`, payload);
    //console.logog(res);

    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const FETCH_SUBSCRIPTION = async (payload) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(`${GET_ALL_SUBSCRIPTION}`, payload);
    //console.logog(res);

    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
