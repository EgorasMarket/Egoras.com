import axios from "axios";
import { EGORAS_PAY_URL } from "../core/constants";
import {
  LOGIN,
  REGISTER_ROUTE,
  REGISTER_USER_WALLET_ADDRESS,
  REGISTER_WALLET_MARTGPT,
  RESEND_EMAIL_VERIFICATION,
  RESEND_PHONE_OTP,
  SET_USER_PIN_ROUTE,
  VERIFY_OTP_ROUTE,
  VERIFY_USER_ROUTE,
} from "../core/ApiRoutes";
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

    //console.logog(response.data.message);
    return response.data;
  } catch (error) {
    //console.logog(error.response || error.response.data.message);
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

    //console.logog(response.data.message);
    return response.data;
  } catch (error) {
    //console.logog(error.response || error.response.data.message);
    return error.response;
  }
};
export const GENERATE_USER_WALLET_ADDRESS = async (payload) => {
  /**
     *      
     * Map<String, String> data = {
            "email": email,
            "wallet": wallet,
          };
     */
  try {
    const response = await axios.post(
      `${REGISTER_USER_WALLET_ADDRESS}`,
      payload
    );

    //console.logog(response.data.message);
    return response.data;
  } catch (error) {
    //console.logog(error.response || error.response.data.message);
    return error.response;
  }
};
export const GENERATE_USER_WALLET_ADDRESS_MART_GPT = async (payload) => {
  /**
     *      
     * Map<String, String> data = {
            "userAddress": wallet,
          };
     */
  try {
    const response = await axios.post(`${REGISTER_WALLET_MARTGPT}`, payload);

    //console.logog(response.data.message);
    return response.data;
  } catch (error) {
    //console.logog(error.response || error.response.data.message);
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
export const VERIFY_OTP = async (payload) => {
  try {
    setAuthToken(localStorage.getItem("x-token"));
    const response = await axios.post(VERIFY_OTP_ROUTE, payload);
    return response.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const RESEND_SMS_OTP = async (payload) => {
  try {
    setAuthToken(localStorage.getItem("x-token"));
    const response = await axios.post(RESEND_PHONE_OTP, payload);
    return response.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const RESEND_EMAIL_VERIFICATION_LINK = async (payload) => {
  try {
    setAuthToken(localStorage.getItem("x-token"));
    const response = await axios.post(RESEND_EMAIL_VERIFICATION, payload);
    return response.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const SET_USER_PIN = async (payload) => {
  // Map<String, String> data = {"code": pin, "type": "set"};
  try {
    setAuthToken(localStorage.getItem("x-token"));
    const response = await axios.post(SET_USER_PIN_ROUTE, payload);
    return response.data;
  } catch (error) {
    return error.response || error.message;
  }
};
