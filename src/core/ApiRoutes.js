import { EGORAS_PAY_URL, MART_GPT_URL } from "./constants";

export const SUBSCRIBE_MEMBERSHIP_ROUTE = `${EGORAS_PAY_URL}/api/withdrawal/fortPayNewSub`;
export const PAY_FOR_PRODUCT = `${EGORAS_PAY_URL}/api/withdrawal/fortPayNew`;
export const VERIFY_USER_ROUTE = `${EGORAS_PAY_URL}/api/me`;
export const VIEW_PURCHASED_PRODUCTS = `${MART_GPT_URL}/order/buy`;
export const LOGIN = `${EGORAS_PAY_URL}/pub/login`;
export const REGISTER_ROUTE = `${EGORAS_PAY_URL}/pub/register`;
export const ALL_PRODUCTS = `${MART_GPT_URL}/product/uploaded`;
export const SPECIFIC_PRODUCTS = `${MART_GPT_URL}/product/uploaded/check`;
export const GET_WALLET_ROUTE = `${EGORAS_PAY_URL}/api/wallet/get`;
export const REGISTER_USER_WALLET_ADDRESS = `${EGORAS_PAY_URL}/pub/register/wallet`;
export const SET_USER_PIN_ROUTE = `${EGORAS_PAY_URL}/api/user/pin/set`;
export const REGISTER_WALLET_MARTGPT = `${MART_GPT_URL}/pub/register/user/address`;

export const SEND_CRYPTO_EXTERNAL_ROUTE = `${EGORAS_PAY_URL}/api/withdrawal/external`;
export const SEND_CRYPTO_INTERNAL_ROUTE = `${EGORAS_PAY_URL}/api/withdrawal/internal`;
export const GET_VIRTUAL_ACCOUNT_ROUTE = `${EGORAS_PAY_URL}/api/account/bank/transfer`;
export const GET_BANKS = `${EGORAS_PAY_URL}/api/account/banks`;
export const VERIFY_ACCOUNT_NUMBER_ROUTE = `${EGORAS_PAY_URL}/api/verify/account/number`;
export const PAYOUT_TO_BANK_ROUTE = `${EGORAS_PAY_URL}/api/withdrawal/cashout`;
export const VERIFY_OTP_ROUTE = `${EGORAS_PAY_URL}/pub/verify/sms`;
export const GET_KYC_STATUS_ROUTE = `${EGORAS_PAY_URL}/api/verify/get/my/kyc/status`;
export const ADD_BVN_ROUTE = `${EGORAS_PAY_URL}/api/verify/add/bvn`;
export const UPLOAD_IMAGE_ROUTE = `${MART_GPT_URL}/images/file-upload/add`;
export const GET_WALLET_BALANCES = `${EGORAS_PAY_URL}/api/portfolio`;
export const GET_USER_PRODUCT_ORDERS = `${EGORAS_PAY_URL}/order/buy`;
export const FETCH_ALL_PRODUCTS = `${MART_GPT_URL}/product/uploaded`;
export const FETCH_PRODUCT_DETAILS = `${MART_GPT_URL}/product/uploaded/check`;