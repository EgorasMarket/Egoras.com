import axios from "axios";
import { FETCH_SWAP_PRICES } from "../core/ApiRoutes";
import setAuthToken from "../utils/setAuthToken";
export const GET_SWAP_PRICE = async ({ tokenA = "", tokenB = "" }) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(`${FETCH_SWAP_PRICES}/${tokenA}/${tokenB}`);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
