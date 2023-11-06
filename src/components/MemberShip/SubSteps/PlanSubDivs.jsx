import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { ShimmerButton } from "react-shimmer-effects-18";

const PlanSubDivs = ({
  activePlan,
  toggleActivePlan,
  toggleDiv,
  Plan,
  PlanTitle,
  discount,
  PlanAmountLocal,
  slashedAmount,
  planTxt,
  id,
}) => {
  console.log(id, activePlan);
  return (
    <div
      className={
        activePlan == id
          ? "Step2Div2_member_div2_body_1_active"
          : "Step2Div2_member_div2_body_1"
      }
      id={id}
      onMouseEnter={toggleActivePlan}
    >
      <div className="Step2Div2_member_div2_body_1_txts"></div>
      <div className="Step2Div2_member_div2_body_1_amount">
        <div className="Step2Div2_member_div2_body_1_amount_title">{Plan}</div>
        <div className="Step2Div2_member_div2_body_1_amount_title_naira">
          <div className="Step2Div2_member_div2_body_1_amount_title_naira_slashed">
            {slashedAmount}
          </div>
          <div className="Step2Div2_member_div2_body_1_amount_title_naira_amaount">
            ${PlanAmountLocal}{" "}
          </div>
        </div>
        {/* <div className="Step2Div2_member_div2_body_1_amount_title_slashed">
          <div className="Step2Div2_member_div2_body_1_amount_title_slashed_amount"></div>
        </div> */}
      </div>
      <div className="Step2Div2_member_div2_body_1_sub_button">
        {activePlan == id ? (
          <button
            id={id}
            className="Step2Div2_member_div2_body_1_sub_button_btn_active"
            onClick={toggleDiv}
          >
            Subcribe Now
          </button>
        ) : (
          <button className="Step2Div2_member_div2_body_1_sub_button_btn">
            Subcribe Now
          </button>
        )}
      </div>
      <div className="Step2Div2_member_div2_body_1_features_div">
        <div className="Step2Div2_member_div2_body_1_features_div_1">
          <div className="Step2Div2_member_div2_body_1_features_div_1_feature">
            {planTxt}
          </div>
          {/* <div className="Step2Div2_member_div2_body_1_features_div_1_rate">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
          </div> */}
        </div>
      </div>
    </div>
  );
};
const PlanSubDivsLoading = ({}) => {
  return (
    <div className="Step2Div2_member_div2_body_1">
      <div className="Step2Div2_member_div2_body_1_txts">
        <div className="Step2Div2_member_div2_body_1_title">
          {" "}
          <ShimmerButton size="md" className="custom_shimmer" />
        </div>
        <div className="Step2Div2_member_div2_body_1_para">
          <ShimmerButton size="sm" className="custom_shimmer" />
        </div>
      </div>
      <div className="Step2Div2_member_div2_body_1_amount">
        <div className="Step2Div2_member_div2_body_1_amount_title">
          {" "}
          <ShimmerButton size="md" className="custom_shimmer" />
        </div>
        <div className="Step2Div2_member_div2_body_1_amount_title_naira">
          <ShimmerButton size="lg" className="custom_shimmer" />
        </div>
        <div className="Step2Div2_member_div2_body_1_amount_title_slashed">
          <div className="Step2Div2_member_div2_body_1_amount_title_slashed_amount">
            <ShimmerButton size="sm" className="custom_shimmer" />
          </div>
        </div>
      </div>
      <div className="Step2Div2_member_div2_body_1_sub_button">
        <ShimmerButton size="lg" className="custom_shimmer" />
      </div>
      <div className="Step2Div2_member_div2_body_1_features_div">
        <div className="Step2Div2_member_div2_body_1_features_div_1">
          <div className="Step2Div2_member_div2_body_1_features_div_1_feature">
            <ShimmerButton size="sm" className="custom_shimmer" />
          </div>
          <div className="Step2Div2_member_div2_body_1_features_div_1_rate">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
          </div>
        </div>
        <div className="Step2Div2_member_div2_body_1_features_div_1">
          <div className="Step2Div2_member_div2_body_1_features_div_1_feature">
            <ShimmerButton size="sm" className="custom_shimmer" />
          </div>
          <div className="Step2Div2_member_div2_body_1_features_div_1_rate">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
          </div>
        </div>
        <div className="Step2Div2_member_div2_body_1_features_div_1">
          <div className="Step2Div2_member_div2_body_1_features_div_1_feature">
            <ShimmerButton size="sm" className="custom_shimmer" />
          </div>
          <div className="Step2Div2_member_div2_body_1_features_div_1_rate">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
          </div>
        </div>
        <div className="Step2Div2_member_div2_body_1_features_div_1">
          <div className="Step2Div2_member_div2_body_1_features_div_1_feature">
            <ShimmerButton size="sm" className="custom_shimmer" />
          </div>
          <div className="Step2Div2_member_div2_body_1_features_div_1_rate">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
          </div>
        </div>
        <div className="Step2Div2_member_div2_body_1_features_div_1">
          <div className="Step2Div2_member_div2_body_1_features_div_1_feature">
            <ShimmerButton size="sm" className="custom_shimmer" />
          </div>
          <div className="Step2Div2_member_div2_body_1_features_div_1_rate">
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
            <CheckIcon className="joinCooperativeModalDiv_area_body1_div1_icon2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PlanSubDivs, PlanSubDivsLoading };
