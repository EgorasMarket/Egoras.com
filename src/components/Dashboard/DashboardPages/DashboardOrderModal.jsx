import React, { useState, useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Rating } from "react-simple-star-rating";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
const DashboardOrderModal = ({ closeModal }) => {
  const count = 8;
  const ProdQuantity = 150;
  const images = [
    "/img/egr_gen1_detail_img.png",
    "/img/egr_gen1_detail_img.png",
    "/img/egr_gen1_detail_img.png",
    "/img/egr_gen1_detail_img.png",
    "/img/egr_gen1_detail_img.png",
  ];
  return (
    <div className="depositMoneyDiv">
      <div className="depositMoneyDiv_cont">
        <CloseOutlinedIcon
          className="depositMoneyDiv_icon"
          onClick={closeModal}
        />
        <div className="dashboard_order_detail_body">
          <div className="dashboard_order_detail_body_1">
            <Swiper
              loop={true}
              spaceBetween={10}
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              className="dashboard_order_detail_body_1Swiper"
            >
              {images.map((data) => (
                <SwiperSlide className="dashboard_order_detail_body_1Swiper_slide">
                  <img
                    src={data}
                    className="dashboard_order_detail_body_1Swiper_slide_img"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="dashboard_order_detail_body_2">
            <div className="dashboard_order_detail_body_2_title">
              Egoras Dual Fuel Tricycle (EGC-80)
            </div>
            {/* ===== */}
            {/* ===== */}
            {/* ===== */}
            {/* ===== */}
            <div className="dashboard_order_detail_body_2_code">
              Product code:{" "}
              <span className="Pdashboard_order_detail_body_2_code_span">
                48029
              </span>{" "}
            </div>
            {/* ===== */}
            {/* ===== */}
            {/* ===== */}
            {/* ===== */}
            <div className="dashboard_order_detail_body_2_rating_div">
              <Rating initialValue={"4"} readonly={true} />{" "}
              <span className="dashboard_order_detail_body_2_rating_div_span">
                4.0
              </span>
            </div>
            {/* ===== */}
            {/* ===== */}
            {/* ===== */}
            {/* ===== */}
            <div className="dashboard_order_detail_body_2_count">
              <div className="dashboard_order_detail_body_2_count_quant_div">
                Quantity:{" "}
                <span className="dashboard_order_detail_body_2_count_quant_div_span">
                  {ProdQuantity}
                </span>
              </div>
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
            </div>
          </div>
        </div>
        <div className="depositMoneyDiv_cont_2">
          <button className="depositMoneyDiv_cont_2_btn">
            Move to finance
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrderModal;
