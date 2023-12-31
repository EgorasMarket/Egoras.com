import React, { useState, useEffect } from "react";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Staticdata from "../../assets/json/Static";
import { useDispatch, useSelector } from "react-redux";
import { GET_MY_SUBSCRIPTION } from "../../services/referral_services";
import { numberWithCommas } from "../../assets/js/numberWithCommas";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import {
  BgButtonNoBorder,
  NoBgButtonWithBorder,
} from "../Common/CommonUI/Button";
import "../../stylesheet/Home.css";
import ScrollAnimation from "react-animate-on-scroll";
import { ScrollerMotion } from "scroller-motion";

const Home = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const [genVideo, setGenVideo] = useState(false);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberStatus, setMemberStatus] = useState(false);
  const TogglegenVideoDiv = () => {
    setGenVideo(!genVideo);
  };
  const handleSlideChange = (swiper) => {
    setSwiperIndex(swiper.realIndex);
  };

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
  // console.log("====================================");
  // console.log(isLoggedIn);
  // console.log("====================================");
  return (
    <div className="HomeDiv">
      <section className="HomeDivSection1">
        <div className="HomeDivSection1_div">
          <div className="HomeDivSection1_div_opacityBg"></div>
          <video className="HomeDivSection1_div_video" autoPlay muted loop>
            <source
              src="/videos/EgorasTricycleWebVideo2.mp4"
              type="video/mp4"
              controls
            />
            Your browser does not support the video tag.
          </video>

          <div className="HomeDivSection1_div_txts_div">
            <div className="custom_container">
              <div className="HomeDivSection1_div_txts_div_cont">
                <div className="HomeDivSection1_div_txts">
                  <div className="HomeDivSection1_div_txts_1">
                    <div className="HomeDivSection1_div_txts_1_head">
                      Model EGC-80
                    </div>
                    <div className="HomeDivSection1_div_txts_1_para">
                      The Egoras Dual-Fuel Tricycle(EGC-80) is a reliable and
                      powerful vehicle with impressive technical specifications,
                      including a 10 horsepower engine and a top speed of 60
                      kmph.
                    </div>
                  </div>

                  <div className="HomeDivSection1_div_txts_2">
                    {isLoggedIn === false ? (
                      <a
                        href="/membership/sub"
                        className="HomeDivSection1_div_txts_2_link1"
                      >
                        <BgButtonNoBorder
                          btnTxt={
                            <div
                              className="HomeDivSection1_div_txts_2_div
                      "
                            >
                              Join Sales-Pro
                            </div>
                          }
                        />
                      </a>
                    ) : (
                      <>
                        {memberStatus === false ? (
                          <a
                            href="/membership/sub"
                            className="HomeDivSection1_div_txts_2_link1"
                          >
                            <BgButtonNoBorder
                              btnTxt={
                                <div
                                  className="HomeDivSection1_div_txts_2_div
                      "
                                >
                                  Join Sales-Pro
                                </div>
                              }
                            />
                          </a>
                        ) : (
                          <a
                            href="/dashboard/egocoop"
                            className="HomeDivSection1_div_txts_2_link1"
                          >
                            <BgButtonNoBorder
                              btnTxt={
                                <div
                                  className="HomeDivSection1_div_txts_2_div
                      "
                                >
                                  Ego Sales-Pro
                                </div>
                              }
                            />
                          </a>
                        )}
                      </>
                    )}

                    <a
                      href="/dashboard/products"
                      className="HomeDivSection1_div_txts_2_member_link"
                    >
                      <NoBgButtonWithBorder btnTxt="View all products" />
                    </a>
                  </div>
                </div>
                <div className="tricycle_overview_div  ">
                  <div className="tricycle_overview_div1">
                    <div className="tricycle_overview_div1_cont1">
                      <div className="tricycle_overview_div1_cont2_head">
                        {" "}
                        Egoras Dual Fuel
                      </div>
                      <div className="tricycle_overview_div1_cont2_para">
                        Tricycle
                      </div>
                    </div>
                    <div className="tricycle_overview_div1_cont2">
                      <div className="tricycle_overview_div1_cont2_head">
                        60 kmph
                      </div>
                      <div className="tricycle_overview_div1_cont2_para">
                        Top speed
                      </div>
                    </div>
                    <div className="tricycle_overview_div1_cont2">
                      <div className="tricycle_overview_div1_cont2_head">
                        Wet-Multiplate
                      </div>
                      <div className="tricycle_overview_div1_cont2_para">
                        Clutch Type
                      </div>
                    </div>
                    <div className="tricycle_overview_div1_cont2">
                      <div className="tricycle_overview_div1_cont2_head">
                        15.5 Nm
                      </div>
                      <div className="tricycle_overview_div1_cont2_para">
                        Torque
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      <section className="HomeDivSection2">
        <div className="custom_container">
          <div className="HomeDivSection2_area">
            <div className="HomeDivSection2_area1">
              <div className="HomeDivSection2_area1_cont1">
                <div className="HomeDivSection2_area1_cont1">
                  Egoras Dual-Fuel
                  <br />
                  Generators
                </div>
              </div>
            </div>

            <ScrollAnimation
              animateIn="bounceInUp"
              delay={300}
              // duration={2}
              animatePreScroll={false}
            >
              <div className="HomeDivSection2_area2">
                <img
                  src="/img/egoras-dual_fuel_vid_thumb.png"
                  alt=""
                  className="HomeDivSection2_area2_img"
                />
                <div className="HomeDivSection2_area2_icon">
                  <PlayArrowIcon
                    className="HomeDivSection2_area2_icon_icon"
                    onClick={TogglegenVideoDiv}
                  />
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      <section className="HomeDivSection3">
        <img
          src="/img/scrolling_images.webp"
          alt=""
          className="HomeDivSection3_bg"
        />

        <div className="HomeDivSection3_area">
          <Swiper
            // ref={swiperRef}
            slidesPerView={3}
            spaceBetween={10}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            // modules={[Pagination]}
            modules={[Autoplay, Pagination, Navigation]}
            navigation={true}
            className="HomeDivSection3_area_swiper"
            onSlideChange={handleSlideChange}
          >
            {Staticdata.egr_models_carous.map((data) => (
              <SwiperSlide
                className="HomeDivSection3_area_swiper_slide"
                id={data.id}
              >
                <div className="HomeDivSection3_area_swiper_slide_div">
                  {swiperIndex !== data.id ? null : (
                    <div className="HomeDivSection3_area_swiper_slide_div_txt">
                      <div className="HomeDivSection3_area_swiper_slide_div_txt_title">
                        {data.name} <br /> ({data.model})
                      </div>
                      <div className="HomeDivSection3_area_swiper_slide_div_txt_amount">
                        From ₦
                        {numberWithCommas(
                          parseFloat(data.start_price).toFixed(2)
                        )}
                      </div>
                      <a
                        href={`/productdetailorder/${data.prodId}/${data.prodName}`}
                        style={{ marginTop: "10px" }}
                      >
                        <button className="HomeDivSection3_area_swiper_slide_div_txt_btn">
                          Order Product
                        </button>
                      </a>
                    </div>
                  )}

                  <img
                    src={data.img}
                    alt=""
                    className="HomeDivSection3_area_swiper_slide_div_img"
                  />
                  {swiperIndex !== data.id ? null : (
                    <div className="HomeDivSection3_area_swiper_slide_div_specs_div">
                      <div className="HomeDivSection3_area_swiper_slide_div_specs_div_1">
                        <div className="HomeDivSection3_area_swiper_slide_div_specs_div_1_title">
                          {data.specTitle1}
                        </div>
                        <div className="HomeDivSection3_area_swiper_slide_div_specs_div_1_para">
                          {data.specPara1}
                        </div>
                      </div>
                      <div className="HomeDivSection3_area_swiper_slide_div_specs_div_1">
                        <div className="HomeDivSection3_area_swiper_slide_div_specs_div_1_title">
                          {data.specTitle2}
                        </div>
                        <div className="HomeDivSection3_area_swiper_slide_div_specs_div_1_para">
                          {data.specPara2}
                        </div>
                      </div>
                      <div className="HomeDivSection3_area_swiper_slide_div_specs_div_1">
                        <div className="HomeDivSection3_area_swiper_slide_div_specs_div_1_title">
                          {data.specTitle3}
                        </div>
                        <div className="HomeDivSection3_area_swiper_slide_div_specs_div_1_para">
                          {data.specPara3}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      {/* ================= */}
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}{" "}
      <section className="landingPageSectionlast">
        <div className="container">
          <div className="landingPageSectionlast_area">
            <div className="landingPageSectionlast_area_1">
              <div className="landingPageSectionlast_area_1_title">
                Get the Egopay <br /> App!
              </div>
              <div className="landingPageSectionlast_area_1_btn_div">
                <a
                  href="https://play.google.com/store/apps/details?id=ng.fort.pay"
                  className="landingPageSection1_area1_div3_btn1_link"
                >
                  <button className="landingPageSection1_area1_div3_btn1">
                    <div className="landingPageSection1_area1_div3_btn1_cont1">
                      <img
                        src="/img/playstore_black_icon.svg"
                        alt=""
                        className="landingPageSection1_area1_div3_btn1_cont1_img"
                      />
                    </div>
                    <div className="landingPageSection1_area1_div3_btn1_cont2">
                      <div className="landingPageSection1_area1_div3_btn1_cont2_area1">
                        Available on
                      </div>
                      <div className="landingPageSection1_area1_div3_btn1_cont2_area2">
                        Play Store
                      </div>
                    </div>
                  </button>
                </a>
                <a
                  href="/membership/sub"
                  rel="noopener noreferrer"
                  className="landingPageSection1_area1_div3_btn1_link"
                >
                  <button className="landingPageSection1_area1_div3_btn1_join">
                    Join Sales-Pro
                  </button>
                </a>
              </div>
            </div>
            <ScrollAnimation
              animateIn="bounceInUp"
              delay={300}
              // duration={2}
              animatePreScroll={false}
            >
              <div className="landingPageSectionlast_area_2">
                <img
                  src="/img/download_now_screen.png"
                  alt=""
                  className="landingPageSectionlast_area_2_img"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
        <img
          src="/img/hero_bg_lines.svg"
          alt=""
          className="landingPageSection1_img_lines"
        />
      </section>
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {/* ====================== */}
      {genVideo === true ? (
        <div className="genVideo">
          <CloseIcon className="genVideo_close" onClick={TogglegenVideoDiv} />
          <video
            className="HomeDivSection1_div_video"
            controls
            autoPlay
            muted
            loop
          >
            <source
              src="/videos/egr_dual_fuel_gen_video.mp4"
              type="video/mp4"
              controls
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
