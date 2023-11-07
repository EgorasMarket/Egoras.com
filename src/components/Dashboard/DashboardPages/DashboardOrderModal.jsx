import React, { useState, useEffect } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Rating } from "react-simple-star-rating";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
const DashboardOrderModal = ({ closeModal, payload }) => {
  const count = 8;
  const ProdQuantity = 150;
  // const images = [
  //   "/img/egr_gen1_detail_img.png",
  //   "/img/egr_gen1_detail_img.png",
  //   "/img/egr_gen1_detail_img.png",
  //   "/img/egr_gen1_detail_img.png",
  //   "/img/egr_gen1_detail_img.png",
  // ];

  const images = JSON.parse(payload.product_images);
  const specifications = payload.product_specifications.split(",");
  //// console.logog(specifications);

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
              {payload.product_name}
            </div>
            {/* ===== */}
            {/* ===== */}
            {/* ===== */}
            {/* ===== */}
            <div className="dashboard_order_detail_body_2_code">
              Product code:{" "}
              <span className="Pdashboard_order_detail_body_2_code_span">
                {payload.product_id}
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
                  {payload.quantity}
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
                {specifications.map((data, index) => {
                  let val = data.split(":");
                  return (
                    <div className="ProductDetailPage_section_area_2_tec_div_body_1">
                      <div className="ProductDetailPage_section_area_2_tec_div_body_1_title">
                        {val[0]}
                      </div>
                      <div className="ProductDetailPage_section_area_2_tec_div_body_1_para">
                        {val[1]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* ===== */}
            {/* ===== */}
            {/* ===== */}
            <div className="ProductDetailPage_section_area_2_warranty_div">
              2 years Warranty
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
                  {payload.quantity}
                </div>
              </div>
              <div className="ProductDetailPage_section_area_2_total_div_1">
                <div className="ProductDetailPage_section_area_2_total_div_1_title">
                  Unit Amount
                </div>
                <div className="ProductDetailPage_section_area_2_total_div_1_para">
                  {numberWithCommas(parseFloat(payload.amount).toFixed(2))}
                </div>
              </div>
              <div className="ProductDetailPage_section_area_2_total_div_1">
                <div className="ProductDetailPage_section_area_2_total_div_1_title">
                  Total
                </div>
                <div className="ProductDetailPage_section_area_2_total_div_1_para">
                  {numberWithCommas(
                    parseFloat(
                      Number(payload.quantity) * payload.amount
                    ).toFixed(2)
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="depositMoneyDiv_cont_2">
          <button disabled className="depositMoneyDiv_cont_2_btn">
            Move to finance
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrderModal;
