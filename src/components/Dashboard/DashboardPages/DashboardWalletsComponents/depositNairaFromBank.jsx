import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { useSelector } from "react-redux";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AppShortcutOutlinedIcon from "@mui/icons-material/AppShortcutOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { FETCH_VIRTUAL_ACCOUNT } from "../../../../services/finance_services";
const DepositNairaFromBank = ({ ToggleDepositMoneyNairaBankModal }) => {
  const [loading, setLoading] = useState(true);
  const [bankInfo, setBankInfo] = useState({});
  const fetchVirtualAccount = async () => {
    const response = await FETCH_VIRTUAL_ACCOUNT();
    console.log(response);

    setLoading(false);
    if (response.success === false) {
      alert(response.data.errorMessage || "An error occurred");
      return;
    }

    if (!response.data) {
      return;
    }

    setBankInfo(response.data?.vA?.data);
  };

  useEffect(() => {
    fetchVirtualAccount();
  }, []);

  if (loading) {
    return (
      <div className="depositMoneyDiv">
        <div className="depositMoneyDiv_cont">
          <p>loading ...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="depositMoneyDiv">
      <div className="depositMoneyDiv_cont">
        <ArrowBackOutlinedIcon className="depositMoneyDiv_icon" />

        {Object.keys(bankInfo).length === 0 ? (
          <div className="">
            <p>Couldn't resolve bank information, </p>
            <p>Please contact support</p>
          </div>
        ) : (
          <>
            <div className="depositMoneyDiv_cont_1">
              <div className="depositMoneyDiv_cont_title_cont">
                <div className="depositMoneyDiv_cont_title_cont_title">
                  Deposit Naira
                </div>
                <div className="depositMoneyDiv_cont_title_cont_para">
                  Add funds directly from a bank account
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body">
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Account Number:
                  </div>
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                    <input
                      type="text"
                      value={bankInfo?.account_number}
                      className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                    />
                    <button className="depositMoneyDiv_cont_body_wallet_addr_div_btn">
                      Copy
                      <ContentCopyOutlinedIcon className="depositMoneyDiv_cont_body_wallet_addr_div_btn_icon" />
                    </button>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Account Name:
                  </div>
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                    <input
                      type="text"
                      value={bankInfo?.account_name}
                      className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                    />
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_input_div2">
                  <div className="depositMoneyDiv_cont_body_input_div_title">
                    Bank Name:
                  </div>
                  <div className="depositMoneyDiv_cont_body_input_div_div">
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                      <img
                        src="/img/egc_icon2.svg"
                        alt=""
                        className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                      />
                      {bankInfo?.bank_name}
                    </div>
                  </div>
                </div>

                <div className="depositMoneyDiv_cont_body_tips_divb">
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Send Naira to this bank account
                    </div>
                  </div>
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Only Internal Deposit/Receive
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_2">
              <button
                className="depositMoneyDiv_cont_2_btn"
                onClick={ToggleDepositMoneyNairaBankModal}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DepositNairaFromBank;
