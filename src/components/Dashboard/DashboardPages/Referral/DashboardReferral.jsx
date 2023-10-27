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
import { ShimmerButton } from "react-shimmer-effects-18";
import WebPin from "../../../Common/CommonUI/Modals/WebPin";
import ErrorModal from "../../../Common/CommonUI/Modals/ErrorModal/ErrorModal";
import SuccessModal from "../../../Common/CommonUI/Modals/SuccessModal/SuccessModal";
import { Table } from "../../../Common/CommonUI/Tables/TableComp";
import { FETCH_WALLET_TRANSACTIONS } from "../../../../services/finance_services";
import { useSelector } from "react-redux";
import {
  GET_MY_SUBSCRIPTION,
  GET_MY_REWARD_BALANCE,
  GET_MY_REFERRAL,
  GET_REFERRAL_LEADERBOARD,
  WITHDRAW_REFERRAL_EARNINGS,
} from "../../../../services/referral_services";
import DasboardMember from "../DasboardMember";

const DashboardReferral = () => {
  const auth = useSelector((state) => state.auth);
  const [componentLoading, setComponentLoading] = useState(true);
  const [refEarnings, setRefEarnings] = useState(0.0);
  const [refEarnings2, setRefEarnings2] = useState(0.0);
  const [refCount, setRefCount] = useState(0);
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [myReferrals, setMyReferrals] = useState([]);
  const [refLink, setRefLink] = useState("");
  const [Disable, setDisable] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [isLoading2, setIsLoading2] = useState(false);
  const [noPlan, setNoPlan] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorTxt, setErrorTxt] = useState("");
  const [successTxt, setSuccessTxt] = useState("");
  const [pinModalref, setPinModalref] = useState(false);
  const [pinModalsales, setPinModalsales] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [contentLoadingTable, setContentLoadingTable] = useState(true);

  const containerRef = useRef(null);
  const copyText = () => {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied code ";
    tooltip.style.display = "block";
  };
  function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
    tooltip.style.display = "none";
  }

  const fetchWalletTransactions = async () => {
    setContentLoadingTable(true);
    const response = await FETCH_WALLET_TRANSACTIONS();
    console.log("====================================");
    console.log(response);
    console.log("====================================");
    if (response.success === true) {
      setContentLoadingTable(false);
      setTableData(response.data);
    } else {
      setContentLoadingTable(true);
    }
  };

  useEffect(() => {
    fetchWalletTransactions();
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

  const getMyRewardBalance = async () => {
    const response = await GET_MY_REWARD_BALANCE();
    console.log(response);
    console.log(response.data);
    setRefEarnings2(response.data.referral);
    setRefEarnings(response.data.purchase);
    if (response.success === true) {
      setComponentLoading(false);
    } else {
      setComponentLoading(true);
    }
  };
  const getMySubscriptions = async () => {
    const response = await GET_MY_SUBSCRIPTION();
    console.log(response);
    console.log(response.data.subcribers);
    if (response.success === true) {
      setComponentLoading(false);
      if (response.data.referralCode == null) {
        setRefLink("");
      } else {
        setRefLink(response.data.referralCode.referral);
        console.log(response.data.referralCode.referral);
      }
      if (response.data.subcribers == null) {
        setDisable(true);
        setNoPlan(true);
      } else {
        if (new Date() >= new Date(response.data.subcribers.expiring_date)) {
          setNoPlan(true);
          return;
        }
      }
      return;
    }
  };
  const getMyReferrals = async () => {
    const response = await GET_MY_REFERRAL();
    console.log(response);
    console.log(response.data.listOfReferrals);
    setMyReferrals(response.data.listOfReferrals);
    setRefCount(response.data.listOfReferrals.length);
  };
  const getReferralLeaderBoard = async () => {
    const response = await GET_REFERRAL_LEADERBOARD();
    console.log(response);
    console.log(response.data.referralLeaderBoard);
    setLeaderBoard(response.data.referralLeaderBoard);
  };
  useEffect(() => {
    getMySubscriptions();
    getMyRewardBalance();
    getMyReferrals();
    getReferralLeaderBoard();
  }, []);

  useEffect(() => {
    const parseRefEarn1 = parseInt(refEarnings);
    const parseRefEarn2 = parseInt(refEarnings2);
    console.log(refEarnings, refEarnings2);
    if (parseRefEarn2 < 10) {
      console.log("you cant withdraw less tha 10 dollars");
      return;
    }
    if (parseRefEarn1 < 100000) {
      console.log("you cant withdraw less tha 100,000 naira");
      return;
    }
  }, [refEarnings, refEarnings2]);

  const displayNextItems = () => {
    setIsLoading2(true);
    setTimeout(() => {
      setItemsToShow(itemsToShow + 8);
      setIsLoading2(false);
    }, 2000); // Adjust the delay duration as needed (e.g., 1000 milliseconds or 1 second)
  };

  const process = () => {
    setPinModalref(true);
  };
  const process2 = () => {
    setPinModalsales(true);
  };

  const WithdrawReferralEarn = async (type) => {
    setLoading(true);
    const payload = {
      type: type,
      pin_code: pin,
    };
    console.log(payload);
    const response = await WITHDRAW_REFERRAL_EARNINGS(payload);
    console.log(response);

    if (type == "PURCHASE") {
      if (response.success === true) {
        setLoading(false);
        setSuccessModal(true);
        setPinModalsales(false);
        setPinModalref(false);
        setSuccessTxt(` You have successfuly withdrawn your earnings.`);
        return;
      }
      if (!response?.data?.success || !response?.data) {
        setLoading(false);
        setPinModalsales(false);
        setPinModalref(false);
        setErrorModal(true);
        if (response.data.errorMessage == "insufficient funds.") {
          setErrorTxt(
            "Sorry the minimum amount you can withdraw is ₦100,000.00"
          );
        } else {
          setErrorTxt(response.data.errorMessage);
        }
        return;
      }
      return;
    }

    if (type == "REFERRAL") {
      if (response.success === true) {
        setLoading(false);
        setSuccessModal(true);
        setPinModalsales(false);
        setPinModalref(false);
        setSuccessTxt(` You have successfuly withdrawn your earnings.`);
        return;
      }
      if (!response?.data?.success || !response?.data) {
        setLoading(false);
        setPinModalsales(false);
        setPinModalref(false);
        setErrorModal(true);
        if (response.data.errorMessage == "insufficient funds.") {
          setErrorTxt("Sorry the minimum amount you can withdraw is $10.00");
        } else {
          setErrorTxt(response.data.errorMessage);
        }
        return;
      }
      return;
    }
  };

  return (
    <div className="pool_deatail_area">
      <div className="referral_banner_bg_div">
        <img
          src="/img/banner 3.jpg"
          alt=""
          className="referral_banner_bg_img"
        />
      </div>
      <div className="pool_deatail_area_member_div">
        <DasboardMember refCode={refLink} />
      </div>
      <div className="dashBoard_ref_area1">
        <div className="dashBoard_ref_area1_cont1">
          <div className="dashBoard_ref_area1_cont1__cont1_div1">
            <div className="dashBoard_ref_area1_cont1_cont1">
              {" "}
              <div className="dashBoard_ref_area1_cont1_icon_div">
                <TollIcon className="stackedCoin_icon" />
              </div>
              <div className="dashBoard_ref_area1_cont1_div1 dashBoard_ref_area1_cont1_div1_b">
                <div className="dashBoard_ref_area1_cont1_div1_1">
                  <div className="dashBoard_ref_area1_cont1_div1_cont1">
                    Sales Ref Earnings
                  </div>
                  <div className="dashBoard_ref_area1_cont1_div1_cont2">
                    <span className="dashBoard_ref_area1_cont1_div1_cont2_span">
                      ₦
                    </span>
                    {componentLoading ? (
                      <ShimmerButton size="sm" className="custom_shimmer" />
                    ) : (
                      <>
                        {" "}
                        {numberWithCommas(
                          parseFloat(refEarnings).toFixed(2)
                        )}{" "}
                      </>
                    )}
                  </div>
                </div>
                <button
                  className="dashBoard_ref_area1_cont1_div1_cont1_withdraw_btn"
                  disabled={Disable}
                  onClick={() => process2()}
                >
                  Withdraw
                </button>
              </div>
            </div>
            <div className="dashBoard_ref_area1_cont1_cont1">
              <div className="dashBoard_ref_area1_cont1_icon_div">
                <TollIcon className="stackedCoin_icon" />
              </div>
              <div className="dashBoard_ref_area1_cont1_div1">
                <div className="dashBoard_ref_area1_cont1_div1_1">
                  <div className="dashBoard_ref_area1_cont1_div1_cont1">
                    Cashback Ref Earnings
                  </div>
                  <div className="dashBoard_ref_area1_cont1_div1_cont2">
                    <span className="dashBoard_ref_area1_cont1_div1_cont2_span">
                      $
                    </span>
                    {componentLoading ? (
                      <ShimmerButton size="sm" className="custom_shimmer" />
                    ) : (
                      <>
                        {numberWithCommas(parseFloat(refEarnings2).toFixed(2))}{" "}
                      </>
                    )}
                  </div>
                </div>
                <button
                  className="dashBoard_ref_area1_cont1_div1_cont1_withdraw_btn"
                  disabled={Disable}
                  onClick={() => process()}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="dashBoard_ref_area1_cont2">
          <div className="dashBoard_ref_area1_cont1_icon_div">
            <GroupAddIcon className="stackedCoin_icon" />
          </div>
          <div className="dashBoard_ref_area1_cont1_div1">
            <div className="dashBoard_ref_area1_cont1_div1_1">
              <div className="dashBoard_ref_area1_cont1_div1_cont1">
                Total Referrals
              </div>
              <div className="dashBoard_ref_area1_cont1_div1_cont2">
                {componentLoading ? (
                  <ShimmerButton size="sm" className="custom_shimmer" />
                ) : (
                  <>
                    {refCount}{" "}
                    <span className="dashBoard_ref_area1_cont1_div1_cont2_span">
                      {" "}
                      refs{" "}
                    </span>
                  </>
                )}
              </div>
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
          {componentLoading ? (
            <div className="dashBoard_ref_area2_cont1_body">
              <div className="dashBoard_ref_area2_cont1_body_div_head">
                <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 dashBoard_ref_area2_cont1_body_div_head_cont1_first">
                  Rank
                </div>
                <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 ">
                  Username
                </div>

                <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 dashBoard_ref_area2_cont1_body_div_head_cont1_last">
                  Total Referrals
                </div>
              </div>
              <div
                className="dashBoard_ref_area2_cont1_body_cont"
                ref={containerRef}
              >
                <div className="dashBoard_ref_area2_cont1_body_div1">
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_first">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 ">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>

                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_last">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                </div>
                <div className="dashBoard_ref_area2_cont1_body_div1">
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_first">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 ">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>

                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_last">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                </div>
                <div className="dashBoard_ref_area2_cont1_body_div1">
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_first">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 ">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>

                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_last">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                </div>
                <div className="dashBoard_ref_area2_cont1_body_div1">
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_first">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 ">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>

                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_last">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="dashBoard_ref_area2_cont1_body">
              <div className="dashBoard_ref_area2_cont1_body_div_head">
                <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 dashBoard_ref_area2_cont1_body_div_head_cont1_first">
                  Rank
                </div>
                <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 ">
                  Username
                </div>

                <div className="dashBoard_ref_area2_cont1_body_div_head_cont1 dashBoard_ref_area2_cont1_body_div_head_cont1_last">
                  Total Referrals
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
                    .sort((a, b) => b.count - a.count)
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
                          @{data.username.slice(0, 4) + "..."}
                        </div>

                        <div className="dashBoard_ref_area2_cont1_body_div1_cont1 dashBoard_ref_area2_cont1_body_div1_cont1_last">
                          {data.count} refs
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
          )}
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
            {componentLoading ? (
              <div className="dashBoard_ref_area2_cont1_body">
                <div className="dashBoard_ref_area2_cont1_body_div_head">
                  <div className="dashBoard_ref_area2_cont1_body_div_head_cont1_first">
                    Username
                  </div>
                  <div className="dashBoard_ref_area2_cont1_body_div_head_cont1_last">
                    Referrals
                  </div>
                </div>
                <div className="dashBoard_ref_area2_cont1_body_div1">
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1_first">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1_last">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                </div>
                <div className="dashBoard_ref_area2_cont1_body_div1">
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1_first">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1_last">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                </div>
                <div className="dashBoard_ref_area2_cont1_body_div1">
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1_first">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1_last">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                </div>
                <div className="dashBoard_ref_area2_cont1_body_div1">
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1_first">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                  <div className="dashBoard_ref_area2_cont1_body_div1_cont1_last">
                    <ShimmerButton size="sm" className="custom_shimmer" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="dashBoard_ref_area2_cont1_body">
                <div className="dashBoard_ref_area2_cont1_body_div_head">
                  <div className="dashBoard_ref_area2_cont1_body_div_head_cont1_first">
                    Username
                  </div>
                  <div className="dashBoard_ref_area2_cont1_body_div_head_cont1_last">
                    Referrals
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
                        @{data.refereeUsername}
                      </div>
                      <div className="dashBoard_ref_area2_cont1_body_div1_cont1_last">
                        {data.count} refs
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <div className="dashBoard_ref_area2_cont2_div2">
            <div className="dashBoard_ref_area2_cont2_div2_head">
              Copy your referral code and invite friends to earn more.
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
                disabled={Disable}
              >
                Copy referral code
                <span className="tooltiptext" id="myTooltip"></span>
              </button>
            </div>
            {noPlan && (
              <div className="noPlanDiv">
                <div className="noPlanDiv_cont">
                  <div className="noPlanDiv_title">
                    You don't have an active plan
                  </div>
                  <div className="noPlanDiv_para">
                    please subscribe to a plan to access this feature .
                  </div>
                  <button
                    className="noPlanDiv_btn"
                    onClick={() => {
                      window.location.href = "/membership/sub";
                    }}
                  >
                    Join EgoCorp
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="dashboardHome_area3">
        <Table
          tableTitle={"Transactions"}
          TableData={tableData.slice(0, 7)}
          dummyData={Staticdata.productsTableData.slice(0, 8)}
          contentLoading={contentLoadingTable}
          userName={auth.user.username}
        />
      </div>
      {pinModalref ? (
        <WebPin
          isLoading={loading}
          btnFunc={() => WithdrawReferralEarn("REFERRAL")}
          pinTitle="Enter Pin to validate Transaction"
          pinPara="Input your pin to complete this transaction."
          btnFuncTxt="Proceed"
          handleOnComplete={(e) => {
            const a = e.join("");
            setPin(a);
            return;
          }}
        />
      ) : null}
      {pinModalsales ? (
        <WebPin
          isLoading={loading}
          btnFunc={() => WithdrawReferralEarn("PURCHASE")}
          pinTitle="Enter Pin to validate Transaction"
          pinPara="Input your pin to complete this transaction."
          btnFuncTxt="Proceed"
          handleOnComplete={(e) => {
            const a = e.join("");
            setPin(a);
            return;
          }}
        />
      ) : null}
      {successModal ? (
        <SuccessModal
          SuccesTxt={successTxt}
          successFunc={() => {
            window.location.href = "/dashboard/wallet";
          }}
        />
      ) : null}
      {errorModal ? (
        <ErrorModal
          ErrorTxt={errorTxt}
          errorFunc={() => {
            setErrorModal(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default DashboardReferral;
