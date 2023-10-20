import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { SUBSCRIBE_MEMBERSHIP } from "../../../services/membership_services";
import WebPin from "../../Common/CommonUI/Modals/WebPin";
import { ToastContainer, toast } from "react-toastify";
const PlanSubDivModal = ({
  toggleDiv,
  Plan,
  planId,
  PlanAmount,
  PlanAmountLocal,
  discount,
  checkAgree,
  toggleCheckAgree,
  subMembership,
  visibility,
}) => {
  const [pin, setPin] = useState("");
  const [pinModal, setPinModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const process = () => {
    setPinModal(true);
  };

  const subscribe_membership = async () => {
    setLoading(true);

    const res = await SUBSCRIBE_MEMBERSHIP({
      planID: planId,
      symbol: "EGC",
    });
    setLoading(false);
    setPinModal(false);

    if (!res.data.success) {
      toast.error(res.data.errorMessage);
      return;
    }

    toast.success("Subscription is successful");
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
                {parseFloat(PlanAmount).toFixed(2)}
                <span className="Step2Div2_member_div2_body_1_amount_title_span">
                  USD / yr
                </span>
              </div>
              <div className="Step2Div2_member_div2_body_1_amount_title2_naira">
                ${parseFloat(PlanAmountLocal).toFixed(2)}
              </div>
              <div className="Step2Div2_member_div2_body_1_amount_title_slashed2">
                <div className="Step2Div2_member_div2_body_1_amount_title_slashed_amount_save">
                  {discount}% discount
                </div>
                <div className="Step2Div2_member_div2_body_1_amount_title_slashed_amount">
                  on all purchased products
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default PlanSubDivModal;
