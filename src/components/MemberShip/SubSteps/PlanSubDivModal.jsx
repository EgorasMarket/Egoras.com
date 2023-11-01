import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { SUBSCRIBE_MEMBERSHIP } from "../../../services/membership_services";
import WebPin from "../../Common/CommonUI/Modals/WebPin";
import { ToastContainer, toast } from "react-toastify";
import SuccessModal from "../../Common/CommonUI/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../Common/CommonUI/Modals/ErrorModal/ErrorModal";
import { useSelector } from "react-redux";

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
  const [pin, setPin] = useState("");
  const [pinModal, setPinModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const process = () => {
    setPinModal(true);
  };

  const subscribe_membership = async () => {
    setLoading(true);
    console.log(planId);
    const res = await SUBSCRIBE_MEMBERSHIP({
      planID: planId,
      symbol: "USDT",
      pin_code: pin,
    });
    console.log(res);
    setLoading(false);
    setPinModal(false);
    if (res.success || res.data.success) {
      setSuccess(true);
      console.log(res);
      return;
    }
    if (!res.success || !res.data.success) {
      setMessage(res.data.errorMessage);
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

            <div className="checkBox_agree_div">
              <div className="checkBox_agree_div_txt">
                By checking the checkbox below, you agree to our{" "}
                <a href="#">Terms of Use, Privacy Statement.</a>
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
            isLoading={loading}
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
            SuccesTxt={"You have suseccfully joined the EGORAS COOPERATIVE"}
            successFunc={() => {
              window.location.href = "/dashboard/egocoop";
            }}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PlanSubDivModal;
