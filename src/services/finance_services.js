import axios from "axios";
import { GET_WALLET_ROUTE } from "../core/ApiRoutes";
import setAuthToken from "../utils/setAuthToken";
export const GET_WALLET = async (payload) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.post(`${GET_WALLET_ROUTE}`, payload);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
