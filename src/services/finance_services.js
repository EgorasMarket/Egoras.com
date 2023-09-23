import axios from "axios";
import {
  GET_VIRTUAL_ACCOUNT_ROUTE,
  GET_WALLET_ROUTE,
  SEND_CRYPTO_EXTERNAL_ROUTE,
  SEND_CRYPTO_INTERNAL_ROUTE,
} from "../core/ApiRoutes";
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
export const SEND_CRYPTO_FUNDS_EXTERNAL = async (payload) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.post(`${SEND_CRYPTO_EXTERNAL_ROUTE}`, payload);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const SEND_CRYPTO_FUNDS_INTERNAL = async (payload) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.post(`${SEND_CRYPTO_INTERNAL_ROUTE}`, payload);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const FETCH_VIRTUAL_ACCOUNT = async (payload = { amount: "2000" }) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.post(`${GET_VIRTUAL_ACCOUNT_ROUTE}`, payload);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
