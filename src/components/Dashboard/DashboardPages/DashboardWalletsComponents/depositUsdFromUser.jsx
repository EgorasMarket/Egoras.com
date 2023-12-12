import React, { useEffect, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { QRCode } from "react-qrcode-logo";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { GET_WALLET } from "../../../../services/finance_services";
import { useSelector } from "react-redux";
const DepositUsdFromUser = ({ ToggleEgcUserDepositModal }) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="depositMoneyDiv">
        <div className="depositMoneyDiv_cont">
          <p>Loading ...</p>
        </div>
      </div>
    );
  }
  const copyText = () => {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied username ";
    tooltip.style.display = "block";
  };
  function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
    tooltip.style.display = "none";
  }
  return (
    <div className="depositMoneyDiv">
      <div className="depositMoneyDiv_cont">
        <ArrowBackOutlinedIcon
          className="depositMoneyDiv_icon"
          onClick={ToggleEgcUserDepositModal}
        />
        <div className="depositMoneyDiv_cont_1">
          <div className="depositMoneyDiv_cont_title_cont">
            <div className="depositMoneyDiv_cont_title_cont_title">
              Deposit Usd
            </div>
            <div className="depositMoneyDiv_cont_title_cont_para">
              Add funds directly from an egoras user
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
                    src="/img/tether_icon.png"
                    alt=""
                    className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                  />
                  Tetehr Usd
                </div>
                <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                  USDT
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_body_qr_div">
              <QRCode
                value={user.username}
                quietZone={5}
                eyeColor="#fff"
                bgColor="#161619"
                fgColor="#fff"
                logoImage="/img/tether_icon.png"
                eyeRadius={[
                  [5, 5, 0, 5],
                  [5, 5, 5, 0],
                  [5, 0, 5, 5],
                ]}
                removeQrCodeBehindLogo={true}
                // logoPadding={5}
                // logoWidth={15}
                logoPaddingStyle="circle"
                className="depositMoneyDiv_cont_body_qr_div_qr"
              />
              <div className="depositMoneyDiv_cont_body_qr_div_txt">
                Scan Qrcode or copy and send username to an egoras user to add
                funds
              </div>
            </div>
            <div className="depositMoneyDiv_cont_body_wallet_addr_div">
              <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                Username:
              </div>
              <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                <input
                  type="text"
                  value={user.username}
                  className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                  id="myInput"
                />
                <button
                  className="depositMoneyDiv_cont_body_wallet_addr_div_btn"
                  onClick={copyText}
                  onMouseOut={outFunc}
                >
                  Copy
                  <ContentCopyOutlinedIcon className="depositMoneyDiv_cont_body_wallet_addr_div_btn_icon" />
                  <span className="tooltiptext" id="myTooltip"></span>
                </button>
              </div>
            </div>

            <div className="depositMoneyDiv_cont_body_tips_div">
              <div className="depositMoneyDiv_cont_body_tips_div_1">
                <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                  Send only USD to this deposit address
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
            onClick={ToggleEgcUserDepositModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositUsdFromUser;
