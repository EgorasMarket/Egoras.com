import React, { useEffect, useState } from "react";
import LottieRefIcon from "../../../assets/icons/LottieRefIcon.json";
import Lottie from "lottie-react";
export const HowItWorksArea1 = () => {
  return (
    <div className="how_it_works_update_new_area_2">
      <div className="how_it_works_update_new_area_2_cont1_border">
        <div className="how_it_works_update_new_area_2_cont1_border_div">
          <div className="how_it_works_update_new_area_2_cont1_icon">
            <img
              src="/img/member_home_icon.svg"
              alt=""
              className="how_it_works_update_new_area_2_cont1_icon_img"
            />
          </div>
          <div className="how_it_works_update_new_area_2_cont1_title">
            Become a member
          </div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Subscribe to a membership plan and gain access to our inventory of
            products and services.
          </div>
        </div>
      </div>
      <div className="how_it_works_update_new_area_2_cont1_border">
        <div className="how_it_works_update_new_area_2_cont1_border_div">
          <div className="how_it_works_update_new_area_2_cont1_icon">
            {" "}
            <img
              src="/img/refer_icon.svg"
              alt=""
              className="how_it_works_update_new_area_2_cont1_icon_img"
            />
          </div>
          <div className="how_it_works_update_new_area_2_cont1_title">
            Refer
          </div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Exchange your funds for USDm, a stablecoin that is pegged to the US
            dollar.
          </div>
        </div>
      </div>
      <div className="how_it_works_update_new_area_2_cont1_border">
        <div className="how_it_works_update_new_area_2_cont1_border_div">
          <div className="how_it_works_update_new_area_2_cont1_icon">
            {" "}
            <img
              src="/img/reward_icon.svg"
              alt=""
              className="how_it_works_update_new_area_2_cont1_icon_img"
            />
          </div>
          <div className="how_it_works_update_new_area_2_cont1_title">
            Earn Rewards
          </div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Purchase manufactured products at a discounted price using USDm and
            generate up to a 65% profit margin.
          </div>
        </div>
      </div>
    </div>
  );
};
export const HowItWorksArea2 = () => {
  return (
    <div className="how_it_works_update_new_area_2">
      <div className="how_it_works_update_new_area_2_cont1_border">
        <div className="how_it_works_update_new_area_2_cont1_border_div">
          <div className="how_it_works_update_new_area_2_cont1_icon">
            <img
              src="/img/stake_home_icon.svg"
              alt=""
              className="how_it_works_update_new_area_2_cont1_icon_img"
            />
          </div>
          <div className="how_it_works_update_new_area_2_cont1_title">
            Stake
          </div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Become a member and provide liquidity to the protocol by locking
            your MARTGPT tokens for a specified period of time.
          </div>
        </div>
      </div>
      <div className="how_it_works_update_new_area_2_cont1_border">
        <div className="how_it_works_update_new_area_2_cont1_border_div">
          <div className="how_it_works_update_new_area_2_cont1_icon">
            {" "}
            <img
              src="/img/reward_icon.svg"
              alt=""
              className="how_it_works_update_new_area_2_cont1_icon_img"
            />
          </div>
          <div className="how_it_works_update_new_area_2_cont1_title">
            Claim your Reward
          </div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Earn up to 12% annual percentage yield (APY) on your staked MARTGPT
            tokens.
          </div>
        </div>
      </div>
      <div className="how_it_works_update_new_area_2_cont1_border">
        <div className="how_it_works_update_new_area_2_cont1_border_div">
          <div className="how_it_works_update_new_area_2_cont1_icon">
            {" "}
            <img
              src="/img/swap_icon.svg"
              alt=""
              className="how_it_works_update_new_area_2_cont1_icon_img"
            />
          </div>
          <div className="how_it_works_update_new_area_2_cont1_title">Swap</div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Convert your rewards to Binance Coin (BNB) or other cryptocurrencies
            with ease.
          </div>
        </div>
      </div>
    </div>
  );
};

export const Step1Div = ({ toggleSteps }) => {
  const [activeTab, setActiveTab] = useState("distribute");
  const ToggleActiveTab = (e) => {
    setActiveTab(e.currentTarget.id);
  };
  return (
    <div className="membership_landing_div">
      <section className="membership_landing_div_section">
        <div className="custom_container">
          <div className="membership_landing_div_area">
            <div className="membership_landing_div_1">
              <div className="membership_landing_div_1_txt">
                <div className="membership_landing_div_1_txt_title">
                  Digital Cooperative Re-imagined to get you more.
                  {/* <br /> on all our products. */}
                </div>
                <div className="membership_landing_div_1_txt_para">
                  Get up to 50% discount on all our products,
                  <br /> once you become a member and enjoy referral bonuses.
                </div>
              </div>
              <button className="SubContinueButton" onClick={toggleSteps}>
                Join Egoras Coop
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
        <img
          src="/img/scrolling_images.webp"
          alt=""
          className="HomeDivSection3_bgb"
        />
      </section>
      <section className="membership_landing_div_section2">
        <div className="custom_container">
          <div className="how_it_works_update_new_area">
            <div className="how_it_works_update_new_area_1">
              <div className="how_it_works_update_new_area_1_title">
                How it <span className="real_life">works</span>
              </div>
            </div>
            {/* {activeTab === "distribute" ? <HowItWorksArea1 /> : null} */}
            <HowItWorksArea1 />
            {/* {activeTab === "defi" ? <HowItWorksArea2 /> : null} */}
            <button
              className="how_it_works_update_new_area_btn"
              onClick={toggleSteps}
            >
              Get started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
