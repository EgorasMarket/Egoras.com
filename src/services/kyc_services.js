import axios from "axios";
import {
  ADD_BVN_ROUTE,
  GET_KYC_STATUS_ROUTE,
  UPLOAD_IMAGE_ROUTE,
} from "../core/ApiRoutes";
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
export const UPLOAD_LEVEL_2_KYC = async (payload) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.post(`${ADD_BVN_ROUTE}`, payload);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const UPLOAD_IMAGE = async (payload) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.post(`${UPLOAD_IMAGE_ROUTE}`, payload);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
