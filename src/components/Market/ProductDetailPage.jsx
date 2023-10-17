import React, { useState, useEffect, useRef } from "react";
// Import Swiper React components
import "../../stylesheet/PowerDetailPage.css";
import { numberWithCommas } from "../../assets/js/numberWithCommas";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/swiper-bundle.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Rating } from "react-simple-star-rating";
import { useParams } from "react-router-dom";
import { PRODUCT_DETAILS } from "../../services/product_services";
import { ShimmerButton } from "react-shimmer-effects-18";

// import required modules
const ProductDetailPage = () => {
  const { id, name } = useParams();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [product, setProduct] = useState({});
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
    //console.logog(e.target.value);
    if (e.target.value === "") {
      setCount(1);
      return;
    }
    if (parseFloat(e.target.value) >= product.quantity) {
      setCount(product.quantity);
      //console.logog("ive reached");
      return;
    }
    if (parseFloat(e.target.value) <= 1) {
      setCount(1);
      //console.logog("ive reached");
      return;
    }
  };
  const fetchProductDetail = async () => {
    const response = await PRODUCT_DETAILS(id);
    setLoading(false);
    if (!response.success) {
      setError("Failure to fetch product");
      return;
    }
    setProduct(response.data);
    //console.logog(response);
  };

  useEffect(() => {
    fetchProductDetail();

    //fetch the product
  }, [id]);
  useEffect(() => {
    if (count <= 1) {
      setSubDisable(true);
    } else {
      setSubDisable(false);
    }
    if (count === product.quantity) {
      setAddDisable(true);
    } else {
      setAddDisable(false);
    }

    if (product.quantity <= 0) {
      setAddDisable(true);
      setSubDisable(true);
    }
    //console.logog(count);
    //console.logog(ProdQuantity);
  }, [count, ProdQuantity, product]);

  if (loading) {
    return (
      <div className="ProductDetailPage_div">
        <section className="ProductDetailPage_section">
          <div className="custom_container">
            <div className="ProductDetailPage_section_area">
              <div className="ProductDetailPage_section_area_1">
                <ShimmerButton size="lg" className="custom_shimmer" />
              </div>
              {/* ========= */}
              {/* ========= */}
              {/* ========= */}
              {/* ========= */}
              {/* ========= */}
              <div className="ProductDetailPage_section_area_2">
                <div className="ProductDetailPage_section_area_2_title">
                  <ShimmerButton size="lg" className="custom_shimmer" />
                </div>
                {/* ===== */}
                {/* ===== */}
                {/* ===== */}
                {/* ===== */}
                <div className="ProductDetailPage_section_area_2_code">
                  Product code:{" "}
                  <span className="ProductDetailPage_section_area_2_code_span">
                    <ShimmerButton size="lg" className="custom_shimmer" />
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
                    <ShimmerButton size="lg" className="custom_shimmer" />
                  </div>
                  <div className="ProductDetailPage_section_area_2_count_quant_div">
                    Quantity:{" "}
                    <span className="ProductDetailPage_section_area_2_count_quant_div_span">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </span>
                  </div>
                </div>
                {/* ===== */}
                {/* ===== */}
                {/* ===== */}
                {/* ===== */}
                <div className="ProductDetailPage_section_area_2_amount">
                  <ShimmerButton size="lg" className="custom_shimmer" />
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
                        <ShimmerButton size="lg" className="custom_shimmer" />
                      </div>
                      <div className="ProductDetailPage_section_area_2_tec_div_body_1_para">
                        <ShimmerButton size="lg" className="custom_shimmer" />
                      </div>
                    </div>
                    <div className="ProductDetailPage_section_area_2_tec_div_body_1">
                      <div className="ProductDetailPage_section_area_2_tec_div_body_1_title">
                        <ShimmerButton size="lg" className="custom_shimmer" />
                      </div>
                      <div className="ProductDetailPage_section_area_2_tec_div_body_1_para">
                        <ShimmerButton size="lg" className="custom_shimmer" />
                      </div>
                    </div>
                    <div className="ProductDetailPage_section_area_2_tec_div_body_1">
                      <div className="ProductDetailPage_section_area_2_tec_div_body_1_title">
                        <ShimmerButton size="lg" className="custom_shimmer" />
                      </div>
                      <div className="ProductDetailPage_section_area_2_tec_div_body_1_para">
                        <ShimmerButton size="lg" className="custom_shimmer" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* ===== */}
                {/* ===== */}
                {/* ===== */}
                <div className="ProductDetailPage_section_area_2_warranty_div">
                  <ShimmerButton size="lg" className="custom_shimmer" />
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
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                  </div>
                  <div className="ProductDetailPage_section_area_2_total_div_1">
                    <div className="ProductDetailPage_section_area_2_total_div_1_title">
                      Unit Amount
                    </div>
                    <div className="ProductDetailPage_section_area_2_total_div_1_para">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                  </div>
                  <div className="ProductDetailPage_section_area_2_total_div_1">
                    <div className="ProductDetailPage_section_area_2_total_div_1_title">
                      Total
                    </div>
                    <div className="ProductDetailPage_section_area_2_total_div_1_para">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                  </div>
                  <ShimmerButton size="lg" className="custom_shimmer" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>An error occured</h1>
        <p>{error}</p>
      </div>
    );
  }

  const images = JSON.parse(product.product_images);

  const specifications = product.product_specifications.split(",");
  //console.logog(specifications);
  // const images = [
  //   "/img/egr_gen1_detail_img.png",
  //   "/img/egr_gen1_detail_img.png",
  //   "/img/egr_gen1_detail_img.png",
  //   "/img/egr_gen1_detail_img.png",
  //   "/img/egr_gen1_detail_img.png",
  // ];

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
                {product.product_name}
              </div>
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              <div className="ProductDetailPage_section_area_2_code">
                Product code:{" "}
                <span className="ProductDetailPage_section_area_2_code_span">
                  {product.index_id}
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
                    {product.quantity}
                  </span>
                </div>
              </div>
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              <div className="ProductDetailPage_section_area_2_amount">
                ₦
                {numberWithCommas(
                  parseFloat(count * product.final_amount).toFixed(2)
                )}
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

                  {/* <div className="ProductDetailPage_section_area_2_tec_div_body_1">
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
                  </div> */}
                </div>
              </div>
              {/* ===== */}
              {/* ===== */}
              {/* ===== */}
              <div className="ProductDetailPage_section_area_2_warranty_div">
                Max 6months Warranty
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
                    ₦
                    {numberWithCommas(
                      parseFloat(product.final_amount).toFixed(2)
                    )}
                  </div>
                </div>
                <div className="ProductDetailPage_section_area_2_total_div_1">
                  <div className="ProductDetailPage_section_area_2_total_div_1_title">
                    Total
                  </div>
                  <div className="ProductDetailPage_section_area_2_total_div_1_para">
                    ₦
                    {numberWithCommas(
                      parseFloat(count * product.final_amount).toFixed(2)
                    )}
                  </div>
                </div>
                {product.quantity < 0 ? (
                  <button
                    className="ProductDetailPage_section_area_2_total_div_btn"
                    disabled
                  >
                    Out Of Stock
                  </button>
                ) : (
                  <a
                    href={`/productCheckout/${id}/${count}/${product.product_name}`}
                    className="ProductDetailPage_section_area_2_total_div_btn_link"
                  >
                    <button className="ProductDetailPage_section_area_2_total_div_btn">
                      Proceed to checkout
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
