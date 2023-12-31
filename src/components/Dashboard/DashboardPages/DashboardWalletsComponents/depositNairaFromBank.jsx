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
import SmallCompLoader from "../../../Common/CommonUI/Modals/SmallCompLoader";
const DepositNairaFromBank = ({ ToggleDepositMoneyNairaBankModal }) => {
  const [loading, setLoading] = useState(true);
  const [bankInfo, setBankInfo] = useState({});
  const [error, setError] = useState("");
  const fetchVirtualAccount = async () => {
    setLoading(true);
    const response = await FETCH_VIRTUAL_ACCOUNT();
    //console.logog(response, "");

    setLoading(false);
    if (response.data.success === false) {
      //console.logog("help!!!!");
      setError(response.data.errorMessage);

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
          <SmallCompLoader loadingTxt={"Loading please wait"} />
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="">
  //       <p>Couldn't resolve bank information, </p>
  //       <p>Please contact support</p>
  //     </div>
  //   );
  // }
  const copyText = () => {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied account number ";
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
          onClick={ToggleDepositMoneyNairaBankModal}
        />

        {error ? (
          <div className="not_eligible_div">
            <div className="kyc_review_message_div_cont">
              <div className="kyc_review_message_div_cont_1">
                <img
                  src="/img/verification_svg1.svg"
                  alt=""
                  className="kypageDiv_cont_img"
                />
              </div>
              <div className="kyc_review_message_div_cont_2">
                <div className="kyc_review_message_div_cont_2_title">
                  Criteria not satisfied
                </div>
                <div className="kyc_review_message_div_cont_2_para">
                  You will need to complete at least KYC level 2 to be able to
                  recieve funds
                </div>
                <a
                  href="/kyc/verify"
                  className="kyc_review_message_div_cont_2_btn_link"
                >
                  <button className="kyc_review_message_div_cont_2_btn">
                    Go to Verification
                  </button>
                </a>
              </div>
            </div>
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
                        src="/img/providus_icon.jpeg"
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
