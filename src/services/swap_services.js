import axios from "axios";
import {
  FETCH_SWAP_PRICES,
  TOKEN_SWAP,
  TOKEN_LIQUIDITY,
} from "../core/ApiRoutes";
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

export const SWAP = async (payload) => {
  //console.logog(payload);
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.post(`${TOKEN_SWAP}`, payload);
    //console.logog(res.data.message);
    return res.data;
  } catch (error) {
    //console.logog(error.response || error.response.data.message);
    return error.response || error.message;
  }
};
export const LIQUIDITY = async (payload) => {
  //console.logog(payload);
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.post(`${TOKEN_LIQUIDITY}`, payload);
    //console.logog(res.data.message);
    return res.data;
  } catch (error) {
    //console.logog(error.response || error.response.data.message);
    return error.response || error.message;
  }
};
