import React, { useState, useRef } from "react";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
// import "swiper/swiper.min.css";
// import "swiper/swiper-bundle.min.css";
import {
  BgButtonNoBorder,
  NoBgButtonWithBorder,
} from "../Common/CommonUI/Button";
import "../../stylesheet/Home.css";
const Home = () => {
  const [genVideo, setGenVideo] = useState(false);
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(500);
  const prependNumber = useRef(1);
  // Create array with 500 slides
  const [slides, setSlides] = useState(
    Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
  );

  const prepend = () => {
    setSlides([
      `Slide ${prependNumber.current - 2}`,
      `Slide ${prependNumber.current - 1}`,
      ...slides,
    ]);
    prependNumber.current = prependNumber.current - 2;
    swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
  };

  const append = () => {
    setSlides([...slides, "Slide " + ++appendNumber.current]);
  };

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };
  const TogglegenVideoDiv = () => {
    setGenVideo(!genVideo);
  };

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
              <div className="HomeDivSection1_div_txts">
                <div className="HomeDivSection1_div_txts_1">
                  <div className="HomeDivSection1_div_txts_1_head">
                    Model EGC-80
                  </div>
                  <div className="HomeDivSection1_div_txts_1_para">
                    The Egoras Dual-Fuel Tricycle(EGC-80) is a reliable and
                    powerful vehicle with impressive technical specifications,
                    including a 10 horsepower engine and a top speed of 60 kmph.
                  </div>
                </div>
                <div className="HomeDivSection1_div_txts_2">
                  <BgButtonNoBorder
                    btnTxt={
                      <div
                        className="HomeDivSection1_div_txts_2_div
                      "
                      >
                        Order Now{" "}
                        <ArrowOutwardOutlinedIcon className="HomeDivSection1_div_txts_2_icon" />
                      </div>
                    }
                  />
                  <NoBgButtonWithBorder btnTxt="Become A merchant" />
                </div>
              </div>
            </div>
          </div>

          <div className="tricycle_overview_div">
            <div className="custom_container">
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
                Egoras Dual-Fuel
                <br />
                Generators
              </div>
            </div>
            <div className="HomeDivSection2_area2">
              <img
                src="/img/egoras-dual_fuel_vid_thumb.png"
                alt=""
                className="HomeDivSection2_area2_img"
              />
              <div
                className="HomeDivSection2_area2_icon"
                onClick={TogglegenVideoDiv}
              >
                <PlayArrowIcon className="HomeDivSection2_area2_icon_icon" />
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
      <section className="HomeDivSection3">
        <img
          src="/img/scrolling_images.webp"
          alt=""
          className="HomeDivSection3_bg"
        />
        <div className="HomeDivSection3_area">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            // modules={[Pagination]}
            modules={[Pagination, Navigation]}
            navigation={true}
            className="HomeDivSection3_area_swiper"
          >
            <SwiperSlide className="HomeDivSection3_area_swiper_slide">
              <div className="HomeDivSection3_area_swiper_slide_div">
                <img
                  src="/img/dummyimage_porsche.webp"
                  alt=""
                  className="HomeDivSection3_area_swiper_slide_div_img"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="HomeDivSection3_area_swiper_slide">
              <div className="HomeDivSection3_area_swiper_slide_div">
                <img
                  src="/img/dummyimage_porsche.webp"
                  alt=""
                  className="HomeDivSection3_area_swiper_slide_div_img"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="HomeDivSection3_area_swiper_slide">
              <div className="HomeDivSection3_area_swiper_slide_div">
                <img
                  src="/img/dummyimage_porsche.webp"
                  alt=""
                  className="HomeDivSection3_area_swiper_slide_div_img"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="HomeDivSection3_area_swiper_slide">
              <div className="HomeDivSection3_area_swiper_slide_div">
                <img
                  src="/img/dummyimage_porsche.webp"
                  alt=""
                  className="HomeDivSection3_area_swiper_slide_div_img"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="HomeDivSection3_area_swiper_slide">
              <div className="HomeDivSection3_area_swiper_slide_div">
                <img
                  src="/img/dummyimage_porsche.webp"
                  alt=""
                  className="HomeDivSection3_area_swiper_slide_div_img"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

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
