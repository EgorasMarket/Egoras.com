import React, { useEffect, useState } from "react";
import LottieRefIcon from "../../../assets/icons/LottieRefIcon.json";
import SalesTiers from "../../../assets/icons/SalesTiers.json";
import CustomerDash from "../../../assets/icons/CustomerDash.json";
import Lottie from "lottie-react";
import ScrollAnimation from "react-animate-on-scroll";
import { useDispatch, useSelector } from "react-redux";
import { GET_MY_SUBSCRIPTION } from "../../../services/referral_services";

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
            Subscription Fee
          </div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            To access a world of opportunities and benefits, members are
            required to pay a monthly subscription fee. The fee varies based on
            the selected subscription duration.
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
          <div className="how_it_works_update_new_area_2_cont1_title">
            Currency Swap
          </div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Convert your Naira to USDT at a fixed subscription price, aligning
            with the current market rate of NGN/USD. This prepares you for the
            transformation.
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
            Sales Code
          </div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Upon successful payment, you will receive your unique sales code.
            This code is your gateway to unlocking a world of opportunities.
            It's crucial when onboarding prospective customers or referrals;
            ensure you enter it in the designated "sales code" field during
            signup.
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
            Sales & Cashbacks Earnings
          </div>
          <div className="how_it_works_update_new_area_2_cont1_paragraph">
            Referring customers using your sales code leads to substantial
            earnings, including up to 10% in sales commission on products
            purchased and a 25% cashback on subscriptions from referred
            customers. The more customers you refer who make purchases, the
            higher your earnings.
          </div>
        </div>
      </div>
    </div>
  );
};

export const Step1Div = ({ toggleSteps }) => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("distribute");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberStatus, setMemberStatus] = useState(false);
  const getMySubscriptions = async () => {
    const response = await GET_MY_SUBSCRIPTION();
    // console.log(response);
    // console.log(response.data.subcribers);
    if (response.success === true) {
      if (response.data.subcribers === null) {
        setMemberStatus(false);
      } else {
        setMemberStatus(true);
      }
      return;
    }
  };
  useEffect(() => {
    getMySubscriptions();
  }, []);
  useEffect(() => {
    if (user === null || (user === undefined && loading === false)) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [user]);
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
                  Welcome to the Egoras Sales{" "}
                  <span className="real_life">Pro.</span>
                </div>
                <div className="membership_landing_div_1_txt_para">
                  <img
                    src="/img/checked_icon.png"
                    alt=""
                    class="membership_landing_div_1_txt_para_img"
                  />{" "}
                  Access to a world of sustainable energy,
                </div>
                <div className="membership_landing_div_1_txt_para">
                  <img
                    src="/img/checked_icon.png"
                    alt=""
                    class="membership_landing_div_1_txt_para_img"
                  />{" "}
                  Environmental stewardship, through promoting our gas and
                  electric vehicles.
                </div>
                <div className="membership_landing_div_1_txt_para">
                  <img
                    src="/img/checked_icon.png"
                    alt=""
                    class="membership_landing_div_1_txt_para_img"
                  />{" "}
                  Seamless online shopping and delivery,
                </div>
                <div className="membership_landing_div_1_txt_para">
                  <img
                    src="/img/checked_icon.png"
                    alt=""
                    class="membership_landing_div_1_txt_para_img"
                  />{" "}
                  Instant remote earnings through referral purchases and
                  subscription cashbacks as high as 25%.
                </div>
              </div>

              {isLoggedIn === false ? (
                <button className="SubContinueButton" onClick={toggleSteps}>
                  Join Sales-Pro
                </button>
              ) : (
                <>
                  {memberStatus === false ? (
                    <button className="SubContinueButton" onClick={toggleSteps}>
                      Join Sales-Pro
                    </button>
                  ) : (
                    <a
                      href="/dashboard/egocoop"
                      className="HomeDivSection1_div_txts_2_link1"
                    >
                      <button className="SubContinueButton">
                        Ego Sales-Pro
                      </button>
                    </a>
                  )}
                </>
              )}
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
              <div className="how_it_works_update_new_area_1_para">
                Embark on a journey towards financial empowerment and
                sustainability with our sales program.
              </div>
            </div>
            {/* {activeTab === "distribute" ? <HowItWorksArea1 /> : null} */}
            <ScrollAnimation
              animateIn="bounceInUp"
              delay={300}
              // duration={2}
              animatePreScroll={false}
            >
              <HowItWorksArea1 />
            </ScrollAnimation>

            {/* {activeTab === "defi" ? <HowItWorksArea2 /> : null} */}
            {/* <button
              className="how_it_works_update_new_area_btn"
              onClick={toggleSteps}
            >
              Get started
            </button> */}
          </div>
        </div>
      </section>
      <section className="membership_landing_div_section3">
        <div className="custom_container">
          <div className="membership_landing_div_section3_area">
            <div className="membership_landing_div_section3_area1">
              <ScrollAnimation
                animateIn="fadeInLeft"
                delay={100}
                animatePreScroll={false}
                className="membership_landing_div_section3_area1_txt"
              >
                <div
                  className="membership_landing_div_section3_area1_txt"
                  style={{ marginTop: "0" }}
                >
                  <div className="membership_landing_div_section3_area1_txt_title">
                    Sales Earnings Tiers
                  </div>
                  <div className="membership_landing_div_section3_area1_txt_para">
                    <div className="membership_landing_div_section3_area1_txt_para_sub">
                      Referral purchases of products fall into the following
                      categories:
                    </div>{" "}
                    <div className="membership_landing_div_section3_area1_txt_para_sub_para">
                      Products under 500,000 Naira yield a 10% sales commission.
                    </div>{" "}
                    <div className="membership_landing_div_section3_area1_txt_para_sub_para">
                      Products priced between 500,000 and 1,000,000 Naira earn a
                      5% sales commission.
                    </div>{" "}
                    <div className="membership_landing_div_section3_area1_txt_para_sub_para">
                      Products above 1,000,000 Naira also result in a 5% sales
                      commission.
                    </div>{" "}
                  </div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation
                animateIn="zoomIn"
                delay={300}
                animatePreScroll={false}
                className="membership_landing_div_section3_area1_img"
              >
                <div className="membership_landing_div_section3_area1_img">
                  <Lottie
                    animationData={SalesTiers}
                    loop={true}
                    autoPlay={true}
                    className="membership_landing_div_2_iocn"
                    preserveAspectRatio="xMidYMid meet"
                  />
                </div>
              </ScrollAnimation>
            </div>
            <div className="membership_landing_div_section3_area1b">
              <ScrollAnimation
                animateIn="zoomIn"
                delay={300}
                animatePreScroll={false}
                className="membership_landing_div_section3_area1_img"
              >
                <div className="membership_landing_div_section3_area1_img">
                  <Lottie
                    animationData={CustomerDash}
                    loop={true}
                    autoPlay={true}
                    className="membership_landing_div_2_iocn"
                    preserveAspectRatio="xMidYMid meet"
                  />
                </div>
              </ScrollAnimation>
              <ScrollAnimation
                animateIn="fadeInRight"
                delay={100}
                animatePreScroll={false}
                className="membership_landing_div_section3_area1_txt2"
              >
                <div className="membership_landing_div_section3_area1_txt2">
                  <div className="membership_landing_div_section3_area1_txt_title">
                    Customer Leaderboard
                  </div>
                  <div className="membership_landing_div_section3_area1_txt_para">
                    <div className="membership_landing_div_section3_area1_txt_para_sub_para">
                      The application provides customers with a dynamic
                      leaderboard and a detailed dashboard.
                    </div>{" "}
                    <div className="membership_landing_div_section3_area1_txt_para_sub_para">
                      This essential tool showcases crucial metrics including
                      referrals, purchases made by referrals, sales earnings,
                      subscription earnings, and earnings missed due to inactive
                      subscriptions.
                    </div>{" "}
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      <section className="membership_landing_div_section4">
        <div className="custom_container">
          <ScrollAnimation
            animateIn="fadeInUp"
            delay={300}
            animatePreScroll={false}
          >
            <div className="how_it_works_update_new_area_2_cont1_border2">
              <div className="membership_landing_div_section4_area">
                <div className="membership_landing_div_section4_area_txt">
                  <div className="membership_landing_div_section4_area_txt_head">
                    Embrace this opportunity!
                  </div>
                  <div className="membership_landing_div_section4_area_txt_para">
                    Become part of a community dedicated to financial success
                    and sustainability.
                  </div>
                </div>
                <button
                  className="membership_landing_div_section4_area_btn"
                  onClick={toggleSteps}
                >
                  Join Sales-Pro
                </button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};
