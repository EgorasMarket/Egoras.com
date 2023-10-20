import React from "react";
import CheckIcon from "@mui/icons-material/Check";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useSelector } from "react-redux";

export const Step1Div = ({ toggleSteps }) => {
  const { error, loading } = useSelector((state) => state.auth);
  return (
    <div className="membership_landing_div">
      <div className="custom_container">
        <div className="membership_landing_div_1">
          <div className="membership_landing_div_1_txt">
            <div className="membership_landing_div_1_txt_title">
              Get up to 50% discount
              <br /> on all our products.
            </div>
            <div className="membership_landing_div_1_txt_para">
              Get up to 50% discount on all our products,
              <br /> once you become a member and enjoy referral bonuses.
            </div>
          </div>
          <button className="SubContinueButton" onClick={toggleSteps}>
            Join Egoras Corp
          </button>
        </div>
      </div>

      <img
        src="/img/member_gen_bg.png"
        alt=""
        className="membership_landing_div_2_img"
      />
    </div>
  );
};
