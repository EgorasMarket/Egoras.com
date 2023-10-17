import React, { useState, useEffect, useContext } from "react";
import "./dashBoardReferral.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TollIcon from "@mui/icons-material/Toll";
import GroupsIcon from "@mui/icons-material/Groups";
import NodataComp from "../../../Common/CommonUI/NodataComp";
import axios from "axios";
import { numberWithCommas } from "../../../../assets/js/numberWithCommas";
const DashboardReferral = () => {
  const [refEarnings, setRefEarnings] = useState(0.0);
  const [refCount, setRefCount] = useState(0);
  const [leaderBoard1, setLeaderBoard] = useState([]);
  const [myReferrals, setMyReferrals] = useState([]);
  const [refLink, setRefLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Disable, setDisable] = useState(false);
  const copyText = () => {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied Link ";
    tooltip.style.display = "block";
  };
  function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
    tooltip.style.display = "none";
  }

  return (
    <div className="pool_deatail_area">
      <div className="referral_banner_bg_div">
        <img
          src="/img/referralBanner.png"
          alt=""
          className="referral_banner_bg_img"
        />
      </div>
      <div className="dashBoard_ref_area1">
        <div className="dashBoard_ref_area1_cont1">
          <div className="dashBoard_ref_area1_cont1_icon_div">
            <TollIcon className="stackedCoin_icon" />
          </div>
          <div className="dashBoard_ref_area1_cont1_div1">
            <div className="dashBoard_ref_area1_cont1_div1_cont1">
              Referral Earnings
            </div>
            <div className="dashBoard_ref_area1_cont1_div1_cont2">
              {numberWithCommas(parseFloat(refEarnings).toFixed(2))}{" "}
              <span className="engn_symbol_sign">egc</span>
            </div>
          </div>
          <button
            className="dashBoard_ref_area1_cont1_div1_cont1_withdraw_btn"
            // onClick={withdrawRefBonus}
            disabled={Disable}
          >
            {isLoading ? (
              <ScaleLoader color="#353250" size={10} height={20} />
            ) : (
              <> Withdraw</>
            )}
          </button>
        </div>
        <div className="dashBoard_ref_area1_cont2">
          <div className="dashBoard_ref_area1_cont1_icon_div">
            <GroupAddIcon className="stackedCoin_icon" />
          </div>
          <div className="dashBoard_ref_area1_cont1_div1">
            <div className="dashBoard_ref_area1_cont1_div1_cont1">
              Total Referrals
            </div>
            <div className="dashBoard_ref_area1_cont1_div1_cont2">
              {refCount}
            </div>
          </div>
        </div>
      </div>
      <div className="dashBoard_ref_area2">
        <div className="dashBoard_ref_area2_cont1">
          <div className="dashBoard_ref_area2_cont1_head">
            <span className="leaderBoard_icon_div">
              <MilitaryTechIcon className="leaderBoard_icon" />
            </span>
            Leader board
          </div>
          <span className="table_hr"></span>
          <div className="dashBoard_ref_area2_cont1_body">
            <div className="dashBoard_ref_area2_cont1_body_div_head">
              <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 dashBoard_ref_area2_cont1_body_div_head_cont1_first">
                Address
              </div>
              <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 dashBoard_ref_area2_cont1_body_div_head_cont1_last">
                Total Referrals
              </div>
            </div>
            {leaderBoard1.length <= 0 ? (
              <div className="no_loans_div">
                <div className="no_loans_div_cont">
                  <NodataComp />
                </div>{" "}
              </div>
            ) : (
              leaderBoard1.slice(0, 8).map((data) => (
                <div className="dashBoard_ref_area2_cont1_body_div1">
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_first">
                    {data.referalId.substring(0, 5) +
                      "..." +
                      data.referalId.substring(20, 24)}
                  </div>
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_last">
                    {data.refCount}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="dashBoard_ref_area2_cont2">
          <div className="dashBoard_ref_area2_cont2_div1">
            <div className="dashBoard_ref_area2_cont1_head">
              <span className="leaderBoard_icon_div">
                <GroupsIcon className="leaderBoard_icon" />
              </span>
              My Referrals
            </div>
            <span className="table_hr"></span>
            <div className="dashBoard_ref_area2_cont1_body">
              <div className="dashBoard_ref_area2_cont1_body_div_head">
                <div className="dashBoard_ref_area2_cont1_body_div_head_cont1_first">
                  Address
                </div>
                <div className="dashBoard_ref_area2_cont1_body_div_head_cont1_last">
                  Status
                </div>
              </div>
              {myReferrals.length <= 0 ? (
                <div className="no_loans_div">
                  <div className="no_loans_div_cont">
                    <NodataComp />
                  </div>{" "}
                </div>
              ) : (
                myReferrals.slice(0, 5).map((data) => (
                  <div className="dashBoard_ref_area2_cont1_body_div1">
                    <div className="dashBoard_ref_area2_cont1_body_div1_cont1_first">
                      {data.userId.substring(0, 5) +
                        "..." +
                        data.userId.substring(20, 24)}
                    </div>
                    <div className="dashBoard_ref_area2_cont1_body_div1_cont1_last">
                      Active
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="dashBoard_ref_area2_cont2_div2">
            <div className="dashBoard_ref_area2_cont2_div2_head">
              Copy your referral link and invite friends to earn more.
            </div>
            <input
              type="text"
              value={refLink}
              className="referral_default_value"
              id="myInput"
            />
            <div className="refferal_copy_btns">
              <button
                className="ref_btn"
                onClick={copyText}
                onMouseOut={outFunc}
              >
                Copy referral code
                <span className="tooltiptext" id="myTooltip"></span>
              </button>
              {/* <button onClick={handleEncrypt}>
                            Encrypt address
                          </button>
                          <button onClick={handleDecrypt}>
                            Decrypt address
                          </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardReferral;
