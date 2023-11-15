import axios from "axios";
import { POPULATE_NOTIFICATION } from "../core/ApiRoutes";
import setAuthToken from "../utils/setAuthToken";
export const GET_ALL_NOTIFICATIONS = async () => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(`${POPULATE_NOTIFICATION}`);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};