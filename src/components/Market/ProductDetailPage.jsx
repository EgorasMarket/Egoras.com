import React, { useState, useEffect, useRef } from "react";
// Import Swiper React components
import "../../stylesheet/PowerDetailPage.css";
import { numberWithCommas } from "../../assets/js/numberWithCommas";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Rating } from "react-simple-star-rating";
import "swiper/swiper-bundle.css";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
const ProductDetailPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [count, setCount] = useState(1);
  const [subDisable, setSubDisable] = useState(true);
  const [addDisable, setAddDisable] = useState(false);
  const ProdQuantity = 150;
  const addCount = () => {
    setCount(parseInt(count) + 1);
  };
  const subtractCount = () => {
    setCount(parseInt(count) - 1);
  };
  const countChange = (e) => {
    setCount(parseFloat(e.target.value));
    console.log(e.target.value);
    if (e.target.value === "") {
      setCount(1);
      return;
    }
    if (parseFloat(e.target.value) >= ProdQuantity) {
      setCount(ProdQuantity);
      console.log("ive reached");
      return;
    }
    if (parseFloat(e.target.value) <= 1) {
      setCount(1);
      console.log("ive reached");
      return;
    }
  };
  useEffect(() => {
    if (count <= 1) {
      setSubDisable(true);
    } else {
      setSubDisable(false);
    }
    if (count === ProdQuantity) {
      setAddDisable(true);
    } else {
      setAddDisable(false);
    }
    console.log(count);
    console.log(ProdQuantity);
  }, [count, ProdQuantity]);

  const images = [
    "/img/egr_gen1_detail_img.png",
    "/img/egr_gen1_detail_img.png",
    "/img/egr_gen1_detail_img.png",
    "/img/egr_gen1_detail_img.png",
    "/img/egr_gen1_detail_img.png",
  ];
  return (
    <div className="ProductDetailPage_div">
      <section className="ProductDetailPage_section">
        <div className="custom_container">
          <div className="ProductDetailPage_section_area">
            <div className="ProductDetailPage_section_area_1">
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="ProductDetailPage_section_area_1Swiper"
              >
                {images.map((data) => (
                  <SwiperSlide className="ProductDetailPage_section_area_1Swiper_slide">
                    <img
                      src={data}
                      className="ProductDetailPage_section_area_1Swiper_slide_img"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="ProductDetailPage_section_area_1Swiper_thumb"
              >
                {images.map((data) => (
                  <SwiperSlide className="ProductDetailPage_section_area_1Swiper_thumb_thumb">
                    <img
                      src={data}
                      className="ProductDetailPage_section_area_1Swiper_thumb_img"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* ========= */}
            {/* ========= */}
            {/* ========= */}
            {/* ========= */}
            {/* ========= */}
            <div className="ProductDetailPage_section_area_2">
              <div className="ProductDetailPage_section_area_2_title">
                Egoras Dual Fuel Tricycle (EGC-80)
              </div>
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              <div className="ProductDetailPage_section_area_2_code">
                Product code:{" "}
                <span className="ProductDetailPage_section_area_2_code_span">
                  48029
                </span>{" "}
              </div>
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              <div className="ProductDetailPage_section_area_2_rating_div">
                <Rating initialValue={"4"} readonly={true} />{" "}
                <span className="ProductDetailPage_section_area_2_rating_div_span">
                  4.0
                </span>
              </div>
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              <div className="ProductDetailPage_section_area_2_count">
                <div className="ProductDetailPage_section_area_2_count_div">
                  <button
                    className="ProductDetailPage_section_area_2_count_div_subtract"
                    onClick={subtractCount}
                    disabled={subDisable}
                  >
                    _
                  </button>
                  <input
                    type="number"
                    value={count}
                    onChange={countChange}
                    className="ProductDetailPage_section_area_2_count_div_input"
                  />
                  <button
                    className="ProductDetailPage_section_area_2_count_div_add"
                    onClick={addCount}
                    disabled={addDisable}
                  >
                    +
                  </button>
                </div>
                <div className="ProductDetailPage_section_area_2_count_quant_div">
                  Quantity:{" "}
                  <span className="ProductDetailPage_section_area_2_count_quant_div_span">
                    {ProdQuantity}
                  </span>
                </div>
              </div>
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              <div className="ProductDetailPage_section_area_2_amount">
                #{numberWithCommas(parseFloat(count * 1400000).toFixed(2))}
              </div>
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              <div className="ProductDetailPage_section_area_2_tec_div">
                <div className="ProductDetailPage_section_area_2_tec_div_title">
                  Specifications
                </div>
                <div className="ProductDetailPage_section_area_2_tec_div_body">
                  <div className="ProductDetailPage_section_area_2_tec_div_body_1">
                    <div className="ProductDetailPage_section_area_2_tec_div_body_1_title">
                      Weight
                    </div>
                    <div className="ProductDetailPage_section_area_2_tec_div_body_1_para">
                      200gm
                    </div>
                  </div>
                  <div className="ProductDetailPage_section_area_2_tec_div_body_1">
                    <div className="ProductDetailPage_section_area_2_tec_div_body_1_title">
                      Weight
                    </div>
                    <div className="ProductDetailPage_section_area_2_tec_div_body_1_para">
                      200gm
                    </div>
                  </div>
                  <div className="ProductDetailPage_section_area_2_tec_div_body_1">
                    <div className="ProductDetailPage_section_area_2_tec_div_body_1_title">
                      Weight
                    </div>
                    <div className="ProductDetailPage_section_area_2_tec_div_body_1_para">
                      200gm
                    </div>
                  </div>
                  <div className="ProductDetailPage_section_area_2_tec_div_body_1">
                    <div className="ProductDetailPage_section_area_2_tec_div_body_1_title">
                      Weight
                    </div>
                    <div className="ProductDetailPage_section_area_2_tec_div_body_1_para">
                      200gm
                    </div>
                  </div>
                  <div className="ProductDetailPage_section_area_2_tec_div_body_1">
                    <div className="ProductDetailPage_section_area_2_tec_div_body_1_title">
                      Weight
                    </div>
                    <div className="ProductDetailPage_section_area_2_tec_div_body_1_para">
                      200gm
                    </div>
                  </div>
                </div>
              </div>
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              <div className="ProductDetailPage_section_area_2_warranty_div">
                2years Warranty
              </div>
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              <div className="ProductDetailPage_section_area_2_total_div">
                <div className="ProductDetailPage_section_area_2_total_div_1">
                  <div className="ProductDetailPage_section_area_2_total_div_1_title">
                    Quantity
                  </div>
                  <div className="ProductDetailPage_section_area_2_total_div_1_para">
                    {count}
                  </div>
                </div>
                <div className="ProductDetailPage_section_area_2_total_div_1">
                  <div className="ProductDetailPage_section_area_2_total_div_1_title">
                    Unit Amount
                  </div>
                  <div className="ProductDetailPage_section_area_2_total_div_1_para">
                    #{numberWithCommas(parseFloat(1400000).toFixed(2))}
                  </div>
                </div>
                <div className="ProductDetailPage_section_area_2_total_div_1">
                  <div className="ProductDetailPage_section_area_2_total_div_1_title">
                    Total
                  </div>
                  <div className="ProductDetailPage_section_area_2_total_div_1_para">
                    #{numberWithCommas(parseFloat(count * 1400000).toFixed(2))}
                  </div>
                </div>
                <a
                  href={`/productdetailorder/${1}/${count}/${"Egora dual fuel tricycle"}`}
                  className="ProductDetailPage_section_area_2_total_div_btn_link"
                >
                  <button className="ProductDetailPage_section_area_2_total_div_btn">
                    Proceed to checkout
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
