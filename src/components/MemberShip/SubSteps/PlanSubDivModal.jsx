import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { SUBSCRIBE_MEMBERSHIP } from "../../../services/membership_services";
import WebPin from "../../Common/CommonUI/Modals/WebPin";
import { ToastContainer, toast } from "react-toastify";
import SuccessModal from "../../Common/CommonUI/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../Common/CommonUI/Modals/ErrorModal/ErrorModal";
import { useSelector } from "react-redux";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { ShimmerButton } from "react-shimmer-effects-18";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";
import SwapModal from "../../Dashboard/DashboardPages/UpdatedSwap/SwapModal";
const PlanSubDivModal = ({
  toggleDiv,
  Plan,
  planId,
  PlanAmount,
  checkAgree,
  toggleCheckAgree,
  subMembership,
  visibility,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { data, loading } = useSelector((state) => state.wallet);
  const [pin, setPin] = useState("");
  const [pinModal, setPinModal] = useState(false);
  const [isloading, setisLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usdtBalance, setUsdtBalance] = useState("0");
  const [swapModal, setSwapModal] = useState(false);

  useEffect(() => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      switch (data[i].name) {
        case "Dollar":
          setUsdtBalance(data[i]?.value === null ? "0" : data[i]?.value);
          break;
      }
    }
  }, []);

  const process = () => {
    setPinModal(true);
  };

  const subscribe_membership = async () => {
    setisLoading(true);
    console.log(planId);
    const res = await SUBSCRIBE_MEMBERSHIP({
      planID: planId,
      symbol: "USD",
      pin_code: pin,
    });
    console.log(res);
    setisLoading(false);
    setPinModal(false);
    if (res.success || res.data.success) {
      setSuccess(true);
      console.log(res);
      return;
    }
    if (!res.success || !res.data.success) {
      if (res.data.errorMessage == "insufficient funds.") {
        setMessage(
          "You have insufficient USD to carry out this transaction please convert/swap your NAIRA or EGC to USD on this page or fund your USD wallet from your dashboard."
        );
      } else {
        setMessage(res.data.errorMessage);
      }
      setError(true);
      console.log(res.data.errorMessage);
      console.log(res);
      return;
    }

    // toast.success("Subscription is successful");
  };

  useEffect(() => {
    console.log(user);
    if (user === undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [user]);

  const UserLogin = () => {
    console.log(window.location.href);
    localStorage.setItem("RedirectRoute", window.location.href);
    window.location.href = "/login"; // Redirect to the login page
  };

  const toggleSwapModal = () => {
    setSwapModal(!swapModal);
  };

  return (
    <div className=" planSubDiv" hidden={visibility}>
      <div className="planSubDiv_area">
        <div className="planSubDiv_area_1" onClick={toggleDiv}>
          <CloseIcon className="planSubDiv_area_1_icon" />
        </div>
        <div className="planSubDiv_area_body">
          <div className="planSubDiv_area_body_head">
            <div className="planSubDiv_area_body_head_1">Plan</div>
            <div className="planSubDiv_area_body_head_1_plan">{Plan}</div>
          </div>
          <div className="planSubDiv_area_body_area">
            <div className="planSubDiv_area_body_area_amount">
              <div className="Step2Div2_member_div2_body_1_amount_title2">
                <span className="Step2Div2_member_div2_body_1_amount_title_span">
                  $
                </span>{" "}
                {parseFloat(PlanAmount).toFixed(2)}
              </div>
            </div>

            <div className="plan_sub_modal_eligible_div">
              <div className="plan_sub_modal_eligible_div_title">
                Eligibility for earning
              </div>
              <div className="plan_sub_modal_eligible_div_para_div">
                <div className="membership_landing_div_1_txt_para2">
                  <img
                    src="/img/checked_icon.png"
                    alt=""
                    class="membership_landing_div_1_txt_para_img"
                  />{" "}
                  <div className="membership_landing_div_1_txt_para2_txt">
                    Earnings from sales and subscription cashbacks will only be
                    credited to your sales earnings wallet if their subscription
                    is active at the time of purchase by a referral.
                  </div>
                </div>
                <div className="membership_landing_div_1_txt_para2">
                  <img
                    src="/img/checked_icon.png"
                    alt=""
                    class="membership_landing_div_1_txt_para_img"
                  />{" "}
                  <div className="membership_landing_div_1_txt_para2_txt">
                    Inactive subscriptions will result in and be displayed as
                    "missed earnings" on the sales pro dashboard.
                  </div>
                </div>
                <div className="membership_landing_div_1_txt_para2">
                  <img
                    src="/img/checked_icon.png"
                    alt=""
                    class="membership_landing_div_1_txt_para_img"
                  />{" "}
                  <div className="membership_landing_div_1_txt_para2_txt">
                    This means inactive subscriptions will result in and be
                    displayed as "missed earnings" on the sales pro dashboard.
                  </div>
                </div>
              </div>
            </div>

            <div className="planSubDiv_area_body_wallet">
              <div className="dashboardHome_area1_card1b">
                <MoreVertOutlinedIcon className="dashboardHome_area1_card1_more_icon" />
                <div className="dashboardHome_area1_card1_icon">
                  <img
                    src="/img/usd_icon.webp"
                    alt=""
                    className="dashboardHome_area1_card1_icon_img"
                  />
                </div>
                <div className="dashboardHome_area1_card1_title_div">
                  <div className="dashboardHome_area1_card1_title">
                    Total Usd Balance
                  </div>
                  <div className="dashboardHome_area1_card1_content">
                    <div className="dashboardHome_area1_card1_content_amnt">
                      {isloading ? (
                        <ShimmerButton size="md" className="custom_shimmer" />
                      ) : (
                        <>
                          <div className="dashboardHome_area1_card1_content_symbol">
                            $
                          </div>
                          <div className="dashboardHome_area1_card1_content_amnt_txt">
                            {numberWithCommas(
                              parseFloat(usdtBalance).toFixed(2)
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    {isLoggedIn === false ? (
                      <div className="dashboardHome_area1_card1_content_btn_div">
                        <button
                          className="dashboardHome_area1_card1_content_btnb"
                          onClick={UserLogin}
                        >
                          Swap
                        </button>

                        <button
                          className="dashboardHome_area1_card1_content_btnba"
                          onClick={UserLogin}
                        >
                          Fund
                        </button>
                      </div>
                    ) : (
                      <div className="dashboardHome_area1_card1_content_btn_div">
                        <button
                          className="dashboardHome_area1_card1_content_btnb"
                          onClick={toggleSwapModal}
                        >
                          Swap
                        </button>

                        <a href="/dashboard/wallet">
                          <button className="dashboardHome_area1_card1_content_btnba">
                            Fund
                          </button>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <img
                  src="/img/cards_bg_line.svg"
                  alt=""
                  class="ProductCheckoutPage_div_section_area_1_area3_body_card1_bg"
                  style={{
                    filter: "contrast(0.5)",
                  }}
                />
              </div>
            </div>

            <div className="checkBox_agree_div">
              <div className="checkBox_agree_div_txt">
                By checking the checkbox below, you agree to our{" "}
                <a href="/terms-conditions">Terms of Use, Privacy Statement.</a>
              </div>
              <div className="checkBox_agree_div_body">
                <input
                  type="checkbox"
                  id="checkbox-1"
                  name="checkbox"
                  checked={checkAgree}
                  onChange={toggleCheckAgree}
                />
                <label
                  for="checkbox-1"
                  className="checkBox_agree_div_body_label"
                >
                  <div className="checkBox_agree_div_body_txt">I agree</div>
                </label>
              </div>
            </div>
            {isLoggedIn === false ? (
              <div className="subscribe_btn">
                <button className="subscribe_btn_btn" onClick={UserLogin}>
                  Pay Membership
                </button>
              </div>
            ) : (
              <>
                {" "}
                {checkAgree ? (
                  <div className="subscribe_btn">
                    <button className="subscribe_btn_btn" onClick={process}>
                      Pay Membership
                    </button>
                  </div>
                ) : (
                  <div className="subscribe_btn">
                    <button className="subscribe_btn_btn" disabled>
                      Agree to Terms
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {pinModal ? (
          <WebPin
            isLoading={isloading}
            btnFunc={subscribe_membership}
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
        {error && (
          <ErrorModal
            ErrorTxt={message}
            errorFunc={() => {
              setError(false);
            }}
          />
        )}
        {success && (
          <SuccessModal
            SuccesTxt={"You have suseccfully joined the EGORAS SALES-PRO"}
            successFunc={() => {
              window.location.href = "/dashboard/egocoop";
            }}
          />
        )}

        {swapModal ? (
          <div className="plan_swap_modal_div">
            <div
              className="plan_swap_modal_div_outDiv"
              onClick={toggleSwapModal}
            ></div>
            <CloseIcon
              className="plan_swap_modal_div_icon"
              onClick={toggleSwapModal}
            />
            <div className="plan_swap_modal_div_cont">
              <SwapModal />
            </div>
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PlanSubDivModal;
