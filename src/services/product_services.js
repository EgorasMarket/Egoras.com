import axios from "axios";
import {
  FETCH_ALL_PRODUCTS,
  FETCH_PRODUCT_DETAILS,
  PAY_FOR_PRODUCT,
  VIEW_PURCHASED_PRODUCTS,
} from "../core/ApiRoutes";
import setAuthToken from "../utils/setAuthToken";
export const ALL_PRODUCTS = async () => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(`${FETCH_ALL_PRODUCTS}`);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const PRODUCT_DETAILS = async (id) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(`${FETCH_PRODUCT_DETAILS}/${id}`);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const MAKE_PAYMENT_FOR_PRODUCT = async (payload) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.post(PAY_FOR_PRODUCT, payload);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const SHOW_ALL_PURCHASED_PRODUCT = async (wallet) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(`${VIEW_PURCHASED_PRODUCTS}/${wallet}`);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
