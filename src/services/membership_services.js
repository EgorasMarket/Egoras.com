import axios from "axios";
import { SUBSCRIBE_MEMBERSHIP_ROUTE } from "../core/ApiRoutes";
export const SUBSCRIBE_MEMBERSHIP = async (payload) => {
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

    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
