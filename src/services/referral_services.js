import axios from "axios";
import {
  FETCH_MY_SUBSCRIPTION,
  FETCH_MY_REWARD_BALANCE,
  FETCH_MY_REFERRAL,
  FETCH_REFERRAL_LEADERBOARD,
  WITHDRAW_REF_EARNINGS,
} from "../core/ApiRoutes";
import setAuthToken from "../utils/setAuthToken";
export const GET_MY_SUBSCRIPTION = async () => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(`${FETCH_MY_SUBSCRIPTION}`);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const GET_MY_REWARD_BALANCE = async () => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(`${FETCH_MY_REWARD_BALANCE}`);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const GET_MY_REFERRAL = async () => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(`${FETCH_MY_REFERRAL}`);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const GET_REFERRAL_LEADERBOARD = async () => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.get(`${FETCH_REFERRAL_LEADERBOARD}`);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
export const WITHDRAW_REFERRAL_EARNINGS = async (payload) => {
  setAuthToken(localStorage.getItem("x-token"));
  try {
    const res = await axios.post(`${WITHDRAW_REF_EARNINGS}`, payload);
    return res.data;
  } catch (error) {
    return error.response || error.message;
  }
};
