import axios from "axios";
import {
  SPECIFIC_PRODUCTS,
  SUBSCRIBE_MEMBERSHIP_ROUTE,
  GET_USER_PRODUCT_ORDERS,
} from "../core/ApiRoutes";

import setAuthToken from "../utils/setAuthToken";

export const SHOW = async (id) => {
  try {
    const res = await axios.post(`${SPECIFIC_PRODUCTS}/${id}`);

    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const FETCH_USER_PRODUCT_ORDERS = async (walletAddress) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(`${GET_USER_PRODUCT_ORDERS}/${walletAddress}`);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
