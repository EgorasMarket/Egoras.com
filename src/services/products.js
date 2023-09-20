import axios from "axios";
import {
  SPECIFIC_PRODUCTS,
  SUBSCRIBE_MEMBERSHIP_ROUTE,
} from "../core/ApiRoutes";
export const SHOW = async (id) => {
  try {
    const res = await axios.post(`${SPECIFIC_PRODUCTS}/${id}`);

    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
