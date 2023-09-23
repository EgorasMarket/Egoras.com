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
} from "../../../../services/finance_services";
const SendEgcInternal = ({ ToggleEgcUserWithdrawtModal }) => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    symbol: "EGC",
    username_email: "",
    amount: "",
    type: "internal_send",
  });

  const sendFunds = async () => {
    setLoading(true);
    const pin = prompt("Please Enter Your Pin");

    const response = await SEND_CRYPTO_FUNDS_INTERNAL({
      ...payload,
      pin_code: pin,
    });
    console.log(response);
    setLoading(false);

    if (!response.data.success) {
      alert(response.data.errorMessage);
      return;
    }

    alert("Transaction Successful");
  };

  const handleOnChange = (e) => {
    const { id, value } = e.target;

    setPayload({ ...payload, [id]: value });
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
              <input
                type="text"
                id="username_email"
                value={payload.username_email}
                onChange={handleOnChange}
                placeholder="@John Doe"
                // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
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
                  // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                  value={payload.amount}
                  onChange={handleOnChange}
                  className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                />
                <button className="depositMoneyDiv_cont_body_wallet_addr_div_btn">
                  Maxs
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
            <button className="depositMoneyDiv_cont_2_btn" onClick={sendFunds}>
              Send funds
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendEgcInternal;
