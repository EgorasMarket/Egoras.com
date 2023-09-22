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
const SendEgcExternal = ({ ToggleEgcBlockchainWithdrawModal }) => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    symbol: "EGC",
    username_email: "",
    amount: "",
    type: "external_send",
    network: "BEP20",
    wallet_address: "",
  });

  const sendFunds = async () => {
    setLoading(true);
    const pin = prompt("Please Enter Your Pin");

    const response = await SEND_CRYPTO_FUNDS_EXTERNAL({
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
          onClick={ToggleEgcBlockchainWithdrawModal}
        />
        <div className="depositMoneyDiv_cont_1">
          <div className="depositMoneyDiv_cont_title_cont">
            <div className="depositMoneyDiv_cont_title_cont_title">
              Send Egc
            </div>
            <div className="depositMoneyDiv_cont_title_cont_para">
              Send funds directly to a blockchain account
            </div>
          </div>
          <div className="depositMoneyDiv_cont_body">
            <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
              <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                WalletAddress:
              </div>
              <input
                type="text"
                placeholder="0xXXXXXXXXXXXXXXX"
                id="wallet_address"
                // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                value={payload.wallet_address}
                onChange={handleOnChange}
                className="depositMoneyDiv_cont_body_wallet_addr_div_input"
              />
            </div>
            <div className="depositMoneyDiv_cont_body_input_div2">
              <div className="depositMoneyDiv_cont_body_input_div_title">
                Network:
              </div>
              <div className="depositMoneyDiv_cont_body_input_div_div">
                <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                  <img
                    src="/img/bsc_icon.png"
                    alt=""
                    className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                  />
                  Binance Smart Chain
                </div>
                <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                  {payload.network}
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
              <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                Withdrawal Amount:
              </div>
              <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                <input
                  type="number"
                  id="amount"
                  placeholder="0.00"
                  value={payload.amount}
                  onChange={handleOnChange}
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
                  Minimum single withdrawal amount: 0.5egc
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body_tips_div_1">
                <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                  Maximum single withdrawal amount: 2,000egc
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body_tips_div_1">
                <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                  Make sure the the receiver's wallet is a bep20 wallet
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="depositMoneyDiv_cont_2">
          {loading ? (
            <p>Loading ..</p>
          ) : (
            <button
              className="depositMoneyDiv_cont_2_btn"
              onClick={sendFunds}
              // onClick={ToggleEgcBlockchainDepositModal}
            >
              Send Funds
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendEgcExternal;
