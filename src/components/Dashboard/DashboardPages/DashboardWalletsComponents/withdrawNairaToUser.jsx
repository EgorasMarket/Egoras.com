import React, { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { useSelector } from "react-redux";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AppShortcutOutlinedIcon from "@mui/icons-material/AppShortcutOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { SEND_CRYPTO_FUNDS_INTERNAL } from "../../../../services/finance_services";
const WithdrawNairaToUser = ({ ToggleNairaUserWithdrawtModal }) => {
  const [payload, setPayload] = useState({
    pin_code: "",
    symbol: "NGN",
    amount: "",
    username_email: "",
    type: "internal_send",
  });

  const handleOnChange = (e) => {
    const { value, id } = e.target;
    setPayload({ ...payload, [id]: value });
  };
  const initiatePayout = async () => {
    const pin = prompt("Please enter Your Pin");

    let data = payload;

    data = { ...data, pin_code: pin };

    const response = await SEND_CRYPTO_FUNDS_INTERNAL(data);
    console.log(response);

    if (response.data.success === false) {
      alert(response.data.errorMessage);
      return;
    }
    alert("success");
  };
  return (
    <div className="depositMoneyDiv">
      <div className="depositMoneyDiv_cont">
        <ArrowBackOutlinedIcon
          className="depositMoneyDiv_icon"
          onClick={ToggleNairaUserWithdrawtModal}
        />
        <div className="depositMoneyDiv_cont_1">
          <div className="depositMoneyDiv_cont_title_cont">
            <div className="depositMoneyDiv_cont_title_cont_title">
              Send Naira
            </div>
            <div className="depositMoneyDiv_cont_title_cont_para">
              Send funds directly to an egoras user
            </div>
          </div>
          <div className="depositMoneyDiv_cont_body">
            <div className="depositMoneyDiv_cont_body_input_div">
              <div className="depositMoneyDiv_cont_body_input_div_title">
                Currency:
              </div>
              <div className="depositMoneyDiv_cont_body_input_div_div">
                <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                  <img
                    src="/img/egc_icon2.svg"
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
                Recipient Email or Username:
              </div>
              <input
                type="text"
                value={payload.username_email}
                id="username_email"
                placeholder="@John Doe"
                onChange={handleOnChange}
                className="depositMoneyDiv_cont_body_wallet_addr_div_input"
              />
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
                  value={payload.amount}
                  onChange={handleOnChange}
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
          <button
            className="depositMoneyDiv_cont_2_btn"
            onClick={initiatePayout}
          >
            Send funds
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawNairaToUser;
