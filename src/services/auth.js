import axios from "axios";
import { EGORAS_PAY_URL } from "../core/constants";
import { LOGIN, REGISTER_ROUTE, VERIFY_USER_ROUTE } from "../core/ApiRoutes";
import { CustomResponse } from "../utils/CustomResponse";
import setAuthToken from "../utils/setAuthToken";

export const LOGIN_USER = async (payload) => {
  /**
     * 
     *      Map<String, String> data = {
            "email": email,
            "password": password,
            "brand": map['brand'] ?? map['localizedModel'],
            "model": map['model'],
            "ipv4": ipv4,
          };
     */
  try {
    const response = await axios.post(`${LOGIN}`, payload);

    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.log(error.response || error.response.data.message);
    return error.response;
  }
};
export const REGISTER_USER = async (payload) => {
  /**
     * 
     *      Map<String, String> data = {
            "email": email,
            "password": password,
            "brand": map['brand'] ?? map['localizedModel'],
            "model": map['model'],
            "ipv4": ipv4,
          };
     */
  try {
    const response = await axios.post(`${REGISTER_ROUTE}`, payload);

    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.log(error.response || error.response.data.message);
    return error.response;
  }
};

export const VERIFY_USER = async () => {
  try {
    setAuthToken(localStorage.getItem("x-token"));
    const response = await axios.get(VERIFY_USER_ROUTE);
    return response.data;
  } catch (error) {
    return error.response || error.message;
  }
};
