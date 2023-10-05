import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { useSelector } from "react-redux";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AppShortcutOutlinedIcon from "@mui/icons-material/AppShortcutOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  FETCH_BANK_LIST,
  PAYOUT_TO_BANK,
  VERIFY_BANK_ACCOUNT_NUMBER,
} from "../../../../services/finance_services";
import WebPin from "../../../Common/CommonUI/Modals/WebPin";
import { ToastContainer, toast } from "react-toastify";
const WithdrawNairaToBank = ({ ToggleWithdrawNairaBankModal }) => {
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [pinModal, setPinModal] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [beneficiary, setBaneficiary] = useState("--");
  const [bankInfo, setBankInfo] = useState({
    bank_code: "",
    account_number: "",
    bank_name: "",
    account_name: "--", //remove in production
  });
  const [isNameResolved, setIsNameResolved] = useState(false);

  const [payload, setPayload] = useState({
    pin_code: "",
    symbol: "NGN",
    amount: "",
    bank_info: {},
  });

  const process = () => {
    if (
      bankInfo.account_name === "" ||
      bankInfo.account_number === "" ||
      bankInfo.bank_name === "" ||
      payload.amount === ""
    ) {
      toast.warn("Some fields are empty");
      return;
    }
    setPinModal(true);
  };
  const fetchBankList = async () => {
    if (bankList.length >= 1) return;
    const response = await FETCH_BANK_LIST();
    console.log(response, "mma");

    setBankList(response.data?.rows);
  };

  const handleBankOnChange = (e) => {
    const { value } = e.target;

    console.log(JSON.parse(value));
    let temp = JSON.parse(value);

    if (Object.keys(value).length === 0) return;

    setBankInfo({
      ...bankInfo,
      bank_code: temp.bank_code,
      bank_name: temp.bank_name,
    });
  };

  const handleAccountNumberOnChange = async (e) => {
    const { value, id } = e.target;
    if (value.length > 10) return;
    if (value.length < 10) {
      setBankInfo({ ...bankInfo, account_number: value });
      setBaneficiary("--");
      return;
    }
    // setBankInfo({ ...bankInfo, account_number: value });
    setBankInfo({
      ...bankInfo,
      account_number: value,
    });
    verify_account_number(value);
    console.log(bankInfo);

    return;
  };
  useEffect(() => {
    fetchBankList();
  }, []);

  const handlePayout = async () => {
    setLoading(true);
    setBankInfo({ ...bankInfo, account_name: beneficiary });
    // const pin = prompt("Please enter your Pin");
    let data = payload;

    data = {
      ...data,
      bank_info: { ...bankInfo, account_name: beneficiary },
      pin_code: pin,
    };

    const response = await PAYOUT_TO_BANK(data);
    setLoading(false);

    if (response.data?.success === false) {
      setPinModal(false);
      toast.error(response?.data?.errorMessage);
      return;
    }

    setPinModal(false);
    toast.success("successful");
    window.location.href = "/dashboard/transaction";
  };

  const handleAccountNameOnChange = async (e) => {};
  const verify_account_number = async (number) => {
    const response = await VERIFY_BANK_ACCOUNT_NUMBER({
      number: number,
      bankCode: bankInfo.bank_code,
    });
    if (!response.success) {
      setIsNameResolved(false);
      return;
    }

    setBaneficiary(response.data.responseBody.accountName);
    setIsNameResolved(true);
  };

  return (
    <div className="depositMoneyDiv">
      <div className="depositMoneyDiv_cont">
        <ArrowBackOutlinedIcon
          className="depositMoneyDiv_icon"
          onClick={ToggleWithdrawNairaBankModal}
        />
        <div className="depositMoneyDiv_cont_1">
          <div className="depositMoneyDiv_cont_title_cont">
            <div className="depositMoneyDiv_cont_title_cont_title">
              Send Naira
            </div>
            <div className="depositMoneyDiv_cont_title_cont_para">
              Send Naira directly to a Bank account
            </div>
          </div>
          <div className="depositMoneyDiv_cont_body">
            <div className="depositMoneyDiv_cont_body_input_div2">
              <div className="depositMoneyDiv_cont_body_input_div_title">
                Currency:
              </div>
              <div className="depositMoneyDiv_cont_body_input_div_div">
                <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                  <img
                    src="/img/bsc_icon.png"
                    alt=""
                    className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                  />
                  Nigerian Naira
                </div>
                <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                  NGN
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
              <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                Bank:
              </div>
              <select
                name=""
                id=""
                placeholder="0xXXXXXXXXXXXXXXX"
                defaultValue={"0"}
                onClick={fetchBankList}
                onChange={handleBankOnChange}
                className="depositMoneyDiv_cont_body_wallet_addr_div_input"
              >
                {/* <option value="1">Zenith bank</option> */}

                {bankList?.length >= 1 ? (
                  bankList.map((bank, index) => (
                    <option key={index} value={JSON.stringify(bank)}>
                      {bank.bank_name}
                    </option>
                  ))
                ) : (
                  <option value="">Show banks</option>
                )}
              </select>
            </div>
            <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
              <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                Account Number:
              </div>
              <input
                type="number"
                placeholder="0xXXXXXXXXXXXXXXX"
                onChange={handleAccountNumberOnChange}
                value={bankInfo.account_number}
                className="depositMoneyDiv_cont_body_wallet_addr_div_input"
              />
            </div>

            {isNameResolved ? (
              <div className="depositMoneyDiv_cont_body_input_div2">
                <div className="depositMoneyDiv_cont_body_input_div_title">
                  Account Name:
                </div>
                <div className="depositMoneyDiv_cont_body_input_div_div">
                  {/* <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                  <img
                    src="/img/bsc_icon.png"
                    alt=""
                    className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                  />
                  Nigerian Naira
                </div> */}
                  <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                    <input
                      placeholder="johndoe"
                      onChange={handleAccountNameOnChange}
                      value={beneficiary}
                      className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="depositMoneyDiv_cont_body_input_div2">
                <div className="depositMoneyDiv_cont_body_input_div_div">
                  <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                    <p> Invalid Account</p>
                  </div>
                </div>
              </div>
            )}
            <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
              <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                Withdrawal Amount:
              </div>
              <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                <input
                  type="number"
                  placeholder="0.00"
                  value={payload.amount}
                  onChange={(e) =>
                    setPayload({ ...payload, amount: e.target.value })
                  }
                  // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                  className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                />
                <button className="depositMoneyDiv_cont_body_wallet_addr_div_btn">
                  Max
                </button>
              </div>
              <div className="availegc_bal_div">
                <div className="availegc_bal_div_title">Available</div>
                <div className="availegc_bal_div_amount">240.5 EGC</div>
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
                  Minimum single withdrawal amount: ₦2,000.00
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body_tips_div_1">
                <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                  Maximum single withdrawal amount: ₦100,000,000.00
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="depositMoneyDiv_cont_2">
          <button className="depositMoneyDiv_cont_2_btn" onClick={process}>
            Send Funds
          </button>
        </div>

        {pinModal ? (
          <WebPin
            isLoading={loading}
            btnFunc={handlePayout}
            pinTitle="Enter Pin to validate Transaction"
            pinPara="Create a transaction pin that will be used to validate your transactions within the platform"
            btnFuncTxt="Proceed"
            handleOnComplete={(e) => {
              const a = e.join("");
              setPin(a);
              return;
            }}
          />
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
};

// comment here

export default WithdrawNairaToBank;
