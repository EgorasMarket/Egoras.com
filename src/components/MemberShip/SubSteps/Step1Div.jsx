import React from "react";
import LottieRefIcon from "../../../assets/icons/LottieRefIcon.json";
import Lottie from "lottie-react";
export const Step1Div = ({ toggleSteps }) => {
  return (
    <div className="membership_landing_div">
      <div className="custom_container">
        <div className="membership_landing_div_area">
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
          <div className="membership_landing_div_2">
            <Lottie
              animationData={LottieRefIcon}
              loop={true}
              autoPlay={true}
              className="membership_landing_div_2_iocn"
              preserveAspectRatio="xMidYMid meet"
            />
          </div>
        </div>
      </div>
      {/* 
      <img
        src="/img/member_gen_bg.png"
        alt=""
        className="membership_landing_div_2_img"
      /> */}
    </div>
  );
};
