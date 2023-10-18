import React, { useState, useEffect, useContext, useRef } from "react";
import "./dashBoardReferral.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import TollIcon from "@mui/icons-material/Toll";
import GroupsIcon from "@mui/icons-material/Groups";
import NodataComp from "../../../Common/CommonUI/NodataComp";
import axios from "axios";
import { numberWithCommas } from "../../../../assets/js/numberWithCommas";
import Staticdata from "../../../../assets/json/Static";
// import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
// import ScaleLoader from "react-spinners/ScaleLoader";

const DashboardReferral = () => {
  const [refEarnings, setRefEarnings] = useState(0.0);
  const [refCount, setRefCount] = useState(0);
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [myReferrals, setMyReferrals] = useState([]);
  const [refLink, setRefLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Disable, setDisable] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [isLoading2, setIsLoading2] = useState(false);
  const containerRef = useRef(null);
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
  useEffect(() => {
    setLeaderBoard(Staticdata.referralLeaderBoard);
  }, []);
  const scrollToBottom = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.style.scrollBehavior = "smooth"; // Enable smooth scrolling
      container.scrollTop = container.scrollHeight;
      // Disable smooth scrolling after the animation is complete
      container.addEventListener("scroll", () => {
        container.style.scrollBehavior = "auto";
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [itemsToShow]);

  const displayNextItems = () => {
    setIsLoading2(true);
    setTimeout(() => {
      setItemsToShow(itemsToShow + 8);
      setIsLoading2(false);
    }, 2000); // Adjust the delay duration as needed (e.g., 1000 milliseconds or 1 second)
  };
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
                Rank
              </div>
              <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 ">
                User
              </div>
              <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 ">
                Total Referrals
              </div>
              <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 dashBoard_ref_area2_cont1_body_div_head_cont1_last">
                Amounts Earned
              </div>
            </div>
            <div
              className="dashBoard_ref_area2_cont1_body_cont"
              ref={containerRef}
            >
              {leaderBoard.length <= 0 ? (
                <div className="no_loans_div">
                  <div className="no_loans_div_cont">
                    <NodataComp />
                  </div>{" "}
                </div>
              ) : (
                leaderBoard
                  .slice(0, itemsToShow)
                  .sort((a, b) => b.refEarning - a.refEarning)
                  .map((data, index) => (
                    <div
                      className="dashBoard_ref_area2_cont1_body_div1"
                      id={data.id}
                    >
                      <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_first">
                        {index == 0 ? (
                          <MilitaryTechIcon
                            style={{ color: "#e0ac01" }}
                            className="rewardTable_body_row_data_first_icon"
                          />
                        ) : index == 1 ? (
                          <MilitaryTechIcon
                            style={{ color: "#C0C0C0" }}
                            className="rewardTable_body_row_data_first_icon"
                          />
                        ) : index == 2 ? (
                          <MilitaryTechIcon
                            style={{ color: "#CD7F32" }}
                            className="rewardTable_body_row_data_first_icon"
                          />
                        ) : (
                          <MilitaryTechIcon
                            style={{ color: "#61607d" }}
                            className="rewardTable_body_row_data_first_icon"
                          />
                        )}
                        {index + 1}
                      </div>
                      <div className="dashBoard_ref_area2_cont1_body_div1_cont1 ">
                        {data.userName}
                      </div>
                      <div className="dashBoard_ref_area2_cont1_body_div1_cont1 ">
                        {data.refCount}
                      </div>
                      <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_last">
                        <img
                          src="https://i.imgur.com/JXm7zwC.png"
                          alt=""
                          className="dashBoard_ref_area2_cont1_body_div1_cont1_last_img"
                        />
                        {numberWithCommas(
                          parseFloat(data.refEarning).toFixed(2)
                        )}
                      </div>
                    </div>
                  ))
              )}
            </div>
            {itemsToShow < leaderBoard.length && (
              <button
                onClick={displayNextItems}
                className="dashBoard_ref_area2_cont1_body_cont_btn"
                disabled={isLoading2}
              >
                {isLoading2 ? (
                  <ScaleLoader color="#366e51" height={15} />
                ) : (
                  "  Load More"
                )}
              </button>
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
