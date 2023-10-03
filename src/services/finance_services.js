import axios from "axios";
import {
  GET_BANKS,
  GET_VIRTUAL_ACCOUNT_ROUTE,
  GET_WALLET_ROUTE,
  PAYOUT_TO_BANK_ROUTE,
  SEND_CRYPTO_EXTERNAL_ROUTE,
  SEND_CRYPTO_INTERNAL_ROUTE,
  VERIFY_ACCOUNT_NUMBER_ROUTE,
  GET_WALLET_BALANCES,
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
export const FETCH_BANK_LIST = async (
  payload = { limit: "200", page: "1" }
) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(
      `${GET_BANKS}/${payload.limit}/${payload.page}`
    );
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const VERIFY_BANK_ACCOUNT_NUMBER = async (payload) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.post(VERIFY_ACCOUNT_NUMBER_ROUTE, payload);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const PAYOUT_TO_BANK = async (payload) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.post(PAYOUT_TO_BANK_ROUTE, payload);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const FETCH_WALLET_BALANCES = async (payload) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(GET_WALLET_BALANCES, payload);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
