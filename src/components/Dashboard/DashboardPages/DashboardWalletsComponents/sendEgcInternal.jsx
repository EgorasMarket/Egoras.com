import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AppShortcutOutlinedIcon from "@mui/icons-material/AppShortcutOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  SEND_CRYPTO_FUNDS_EXTERNAL,
  SEND_CRYPTO_FUNDS_INTERNAL,
  USERNAME_EMAIL_IS_VALID,
} from "../../../../services/finance_services";
import WebPin from "../../../Common/CommonUI/Modals/WebPin";
import ScaleLoader from "react-spinners/ScaleLoader";

import { ToastContainer, toast } from "react-toastify";
import SuccessModal from "../../../Common/CommonUI/Modals/SuccessModal/SuccessModal";
const SendEgcInternal = ({ ToggleEgcUserWithdrawtModal, balance }) => {
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [pinModal, setPinModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [fetchingUser, setFetchingUser] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [hasUserSuccess, setHasUserSuccess] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const [beneficiaryData, setBeneficiaryData] = useState({});

  const [payload, setPayload] = useState({
    symbol: "EGC",
    username_email: "",
    amount: "",
    type: "internal_send",
  });

  const sendFunds = async () => {
    setLoading(true);

    const response = await SEND_CRYPTO_FUNDS_INTERNAL({
      ...payload,
      pin_code: pin,
    });
    //console.logog(response);
    setLoading(false);

    if (response.success) {
      setSuccessMsg("Transaction succesful");
      setPinModal(false);
      setSuccessModal(true);
      return;
    }
    if (!response.data.success) {
      setPinModal(false);
      toast.error(response.data.errorMessage);
      return;
    }
  };

  const processSend = () => {
    const { username_email, amount } = payload;
    ///do basic validation
    if (username_email === "" || amount === "") {
      toast.warn("Some fields are empty");
      return;
    }
    setPinModal(true);
  };
  const handleOnChange = async (e) => {
    const { id, value } = e.target;

    setPayload({ ...payload, [id]: value });
    if (id === "amount") {
      return;
    }
    setBeneficiaryData("");
    setHasUser(false);
    if (e.target.value === "") {
      setFetchingUser(false);
      setHasUserError(false);
      setHasUserSuccess(false);
    } else {
      setFetchingUser(true);
      setHasUserError(false);
      setHasUserSuccess(false);

      const data = {
        username_email: value,
        type: "username_email",
      };

      const resp = await USERNAME_EMAIL_IS_VALID(data);
      setFetchingUser(false);
      console.log(resp);
      if (resp.data.success === false) {
        setHasUser(false);
        setBeneficiaryData("");
        setHasUserError(true);
        setHasUserSuccess(false);
        return;
      }
      setHasUserError(false);
      setHasUserSuccess(true);
      setHasUser(true);
      setBeneficiaryData(resp.data);
    }
  };
  const AddMax = () => {
    setPayload({ amount: balance });
  };
  return (
    <div className="depositMoneyDiv">
      <div className="depositMoneyDiv_cont">
        <ArrowBackOutlinedIcon
          className="depositMoneyDiv_icon"
          onClick={ToggleEgcUserWithdrawtModal}
        />
        <div className="depositMoneyDiv_cont_1">
          <div className="depositMoneyDiv_cont_title_cont">
            <div className="depositMoneyDiv_cont_title_cont_title">
              Send Egc
            </div>
            <div className="depositMoneyDiv_cont_title_cont_para">
              Send funds directly to an egoras user
            </div>
          </div>
          <div className="depositMoneyDiv_cont_body">
            <div className="depositMoneyDiv_cont_body_input_div">
              <div className="depositMoneyDiv_cont_body_input_div_title">
                Coin:
              </div>
              <div className="depositMoneyDiv_cont_body_input_div_div">
                <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                  <img
                    src="/img/egc_icon2.svg"
                    alt=""
                    className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                  />
                  Egoras Credit
                </div>
                <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                  {payload.symbol}
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
              <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                Recipient Email or Username:
              </div>
              <div className="depositMoneyDiv_cont_body_wallet_addr_divb_input_div">
                <input
                  type="text"
                  id="username_email"
                  value={payload.username_email}
                  onChange={handleOnChange}
                  placeholder="@John Doe"
                  // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                  className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                />
                {fetchingUser && (
                  <div className="userNameLoader">
                    <ScaleLoader color="#366e51" height={20} />
                  </div>
                )}
                {hasUserSuccess && (
                  <div className="userNameLoader2">
                    <img
                      src="/img/checked_icon.png"
                      alt=""
                      className="userNameLoader_img"
                    />
                  </div>
                )}
                {hasUserError && (
                  <div className="userNameLoader2">
                    <img
                      src="/img/error_icon.png"
                      alt=""
                      className="userNameLoader_img"
                    />
                  </div>
                )}
              </div>

              {hasUser === true ? (
                <div className="userNameLoaded_div">
                  <p className="userNameLoaded_div_para">
                    fullname: {beneficiaryData?.firstName}
                  </p>
                  <p className="userNameLoaded_div_para">
                    Email: {beneficiaryData?.email}
                  </p>
                  <p className="userNameLoaded_div_para">
                    Phone Number: {beneficiaryData?.phone}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
              <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                Withdrawal Amount:
              </div>
              <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                <input
                  type="number"
                  placeholder="0.00"
                  id="amount"
                  // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                  value={payload.amount}
                  onChange={handleOnChange}
                  className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                />
                <button
                  className="depositMoneyDiv_cont_body_wallet_addr_div_btn"
                  onClick={AddMax}
                >
                  Max
                </button>
              </div>
              <div className="availegc_bal_div">
                <div className="availegc_bal_div_title">Available</div>
                <div className="availegc_bal_div_amount">{balance} EGC</div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
              <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                Withdrawal Remarks (optional):
              </div>
              <input
                type="text"
                // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                className="depositMoneyDiv_cont_body_wallet_addr_div_input"
              />
            </div>

            <div className="depositMoneyDiv_cont_body_tips_divb">
              <div className="depositMoneyDiv_cont_body_tips_div_1">
                <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                  Minimum single withdrawal amount: 0.5egc
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body_tips_div_1">
                <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                  Maximum single withdrawal amount: 2,000egc
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="depositMoneyDiv_cont_2">
          {loading ? (
            <p>Loading ...</p>
          ) : (
            <button
              className="depositMoneyDiv_cont_2_btn"
              onClick={processSend}
            >
              Send funds
            </button>
          )}
        </div>

        {pinModal ? (
          <WebPin
            isLoading={loading}
            btnFunc={sendFunds}
            pinTitle="Enter Pin to validate Transaction"
            pinPara="Input your transaction pin to complete this transaction"
            btnFuncTxt="Proceed"
            handleOnComplete={(e) => {
              const a = e.join("");
              setPin(a);
              return;
            }}
            toggleWebpin={() => {
              setPinModal(false);
            }}
          />
        ) : null}

        {successModal ? (
          <SuccessModal
            SuccesTxt={successMsg}
            successFunc={() => {
              window.location.href = "/dashboard/transaction";
            }}
          />
        ) : null}
      </div>

      <ToastContainer />
    </div>
  );
};

export default SendEgcInternal;
