import axios from "axios";
import { GET_KYC_STATUS_ROUTE } from "../core/ApiRoutes";
import setAuthToken from "../utils/setAuthToken";
export const GET_KYC_STATUS = async () => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(`${GET_KYC_STATUS_ROUTE}`);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
