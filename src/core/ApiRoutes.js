import { EGORAS_PAY_URL, MART_GPT_URL } from "./constants";

export const SUBSCRIBE_MEMBERSHIP_ROUTE = `${EGORAS_PAY_URL}/api/withdrawal/fortPayNewSub`;
export const VERIFY_USER_ROUTE = `${EGORAS_PAY_URL}/api/me`;
export const LOGIN = `${EGORAS_PAY_URL}/pub/login`;
export const REGISTER_ROUTE = `${EGORAS_PAY_URL}/pub/register`;
export const ALL_PRODUCTS = `${MART_GPT_URL}/product/uploaded`;
export const SPECIFIC_PRODUCTS = `${MART_GPT_URL}/product/uploaded/check`;
export const GET_WALLET_ROUTE = `${EGORAS_PAY_URL}/api/wallet/get`;
export const SEND_CRYPTO_EXTERNAL_ROUTE = `${EGORAS_PAY_URL}/api/withdrawal/external`;
export const SEND_CRYPTO_INTERNAL_ROUTE = `${EGORAS_PAY_URL}/api/withdrawal/internal`;
export const GET_VIRTUAL_ACCOUNT_ROUTE = `${EGORAS_PAY_URL}/api/account/bank/transfer`;
export const GET_BANKS = `${EGORAS_PAY_URL}/api/account/banks`;
export const VERIFY_ACCOUNT_NUMBER_ROUTE = `${EGORAS_PAY_URL}/api/verify/account/number`;
export const PAYOUT_TO_BANK_ROUTE = `${EGORAS_PAY_URL}/api/withdrawal/cashout`;
