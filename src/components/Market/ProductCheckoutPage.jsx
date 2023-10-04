import React, { useState, useEffect } from "react";
import "../../stylesheet/checkout.css";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { FreeMode, Pagination, Navigation, Thumbs } from "swiper/modules";
import { useNavigate, useParams } from "react-router-dom";
import {
  MAKE_PAYMENT_FOR_PRODUCT,
  PRODUCT_DETAILS,
} from "../../services/product_services";
import { numberWithCommas } from "../../assets/js/numberWithCommas";
import { useSelector } from "react-redux";
import WebPin from "../Common/CommonUI/Modals/WebPin";
import { ToastContainer, toast } from "react-toastify";
import { ShimmerButton } from "react-shimmer-effects-18";
import useProtect from "../../hooks/useProtect";
import useUserEligible from "../../hooks/useUserEligible";

const ProductCheckoutPage = () => {
  useProtect(); // call this hooks on a component you want to protect
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data, loading } = useSelector((state) => state.wallet);
  const { id, count, name } = useParams();
  const [nairaBalance, setNairaBalance] = useState(0);
  const [egcBalance, setEgcBalance] = useState(0);
  const [pinModal, setPinModal] = useState(false);
  const [prodloading, setProdLoading] = useState(true);
  const [error, setError] = useState("");
  const [product, setProduct] = useState({});
  const [pin, setPin] = useState("");
  const [processing, setProcessing] = useState(false);

  const [pinloading, setPinLoading] = useState(false);

  const [payload, setPayload] = useState({
    type: "product",
    product_id: id,
    index_id: "",
    quantity: count,
    pin_code: "",
    amount: "",
    symbol: "NGN",
    user: user?.wallet_address,
  });

  const fetchProductDetail = async () => {
    const response = await PRODUCT_DETAILS(id);
    setProdLoading(false);
    if (!response.success) {
      setError("Failure to fetch product");
      return;
    }
    setProduct(response.data);
    setPayload({
      ...payload,
      index_id: response.data.index_id,
      amount: response.data.final_amount,
    });
    console.log(response);
  };

  const createPin = async () => {
    let temp = payload;
    temp = { ...payload, pin_code: pin };
    setPinModal(false);
    setProcessing(true);

    const response = await MAKE_PAYMENT_FOR_PRODUCT(temp);
    console.log(response);

    setProcessing(false);
    if (response.success === true) {
      toast.success("Product Purchase Successful");
      navigate("/dashboard/orders");
      return;
    }
    if (!response?.data?.success || !response?.data) {
      toast.warn(response.data.errorMessage);
      return;
    }
  };
  const handleProductPurchase = async () => {
    setPinModal(true);
  };
  const eligible = useUserEligible();

  useEffect(() => {
    fetchProductDetail();

    //fetch the product
  }, [id]);

  useEffect(() => {
    console.log(data);
    console.log(data[0]?.value);
    console.log(data[1]?.value);
    setEgcBalance(data[0]?.value === null ? "0" : data[0]?.value);
    setNairaBalance(data[1]?.value === null ? "0" : data[1]?.value);
  }, []);

  if (prodloading) {
    return (
      <div className="ProductCheckoutPage_div">
        <section className="ProductCheckoutPage_div_section">
          <div className="custom_container">
            <div className="ProductCheckoutPage_div_section_area">
              <div className="ProductCheckoutPage_div_section_area_1">
                <div className="ProductCheckoutPage_div_section_area_1_area1">
                  <div className="ProductCheckoutPage_div_section_area_1_area1_head">
                    Your Order
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_1_area1_body">
                    <div className="ProductCheckoutPage_div_section_area_1_area1_body_1">
                      <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_img_div">
                        <ShimmerButton size="lg" className="custom_shimmer" />
                      </div>
                      <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1">
                        <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1_title">
                          <ShimmerButton size="sm" className="custom_shimmer" />
                        </div>
                        <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1_amount">
                          <ShimmerButton size="sm" className="custom_shimmer" />
                        </div>
                      </div>
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_1_area1_body_1">
                      <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_img_div">
                        <ShimmerButton size="lg" className="custom_shimmer" />
                      </div>
                      <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1">
                        <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1_title">
                          <ShimmerButton size="sm" className="custom_shimmer" />
                        </div>
                        <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1_amount">
                          <ShimmerButton size="sm" className="custom_shimmer" />
                        </div>
                      </div>
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_1_area1_body_1">
                      <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_img_div">
                        <ShimmerButton size="lg" className="custom_shimmer" />
                      </div>
                      <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1">
                        <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1_title">
                          <ShimmerButton size="sm" className="custom_shimmer" />
                        </div>
                        <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1_amount">
                          <ShimmerButton size="sm" className="custom_shimmer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ProductCheckoutPage_div_section_area_1_area2">
                  <div className="ProductCheckoutPage_div_section_area_1_area2_cont1">
                    <div className="ProductCheckoutPage_div_section_area_1_area2_cont1_title">
                      Quantity
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_1_area2_cont1_para">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_1_area2_cont1">
                    <div className="ProductCheckoutPage_div_section_area_1_area2_cont1_title">
                      Sub Total
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_1_area2_cont1_para">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                  </div>
                </div>
              </div>
              {/* ================ */}
              {/* ================ */}
              {/* ================ */}
              {/* ================ */}
              {/* ================ */}
              <div className="ProductCheckoutPage_div_section_area_2">
                <div className="ProductCheckoutPage_div_section_area_2_area1">
                  <div className="ProductCheckoutPage_div_section_area_2_area1_title">
                    Personal Info
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area1_body">
                    <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                  </div>
                </div>
                <div className="ProductCheckoutPage_div_section_area_2_area2">
                  <div className="ProductCheckoutPage_div_section_area_2_area1_title">
                    Billing Info
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area1_body">
                    <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                  </div>
                </div>
                <div className="ProductCheckoutPage_div_section_area_1_area3">
                  <div className="ProductCheckoutPage_div_section_area_1_area3_title">
                    Payment Info
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_1_area3_body">
                    <ShimmerButton size="lg" className="custom_shimmer" />
                    {/* <ShimmerButton size="lg" className="custom_shimmer" /> */}
                  </div>
                </div>
                <div className="ProductCheckoutPage_div_section_area_2_area3">
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont">
                    <div className="ProductCheckoutPage_div_section_area_2_area3_cont_head">
                      Quantity
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_2_area3_cont_para">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont">
                    <div className="ProductCheckoutPage_div_section_area_2_area3_cont_head">
                      Unit Amount
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_2_area3_cont_para">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont">
                    <div className="ProductCheckoutPage_div_section_area_2_area3_cont_head">
                      Non-Merchant Fee
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_2_area3_cont_para">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont">
                    <div className="ProductCheckoutPage_div_section_area_2_area3_cont_head">
                      Total
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_2_area3_cont_para">
                      <ShimmerButton size="lg" className="custom_shimmer" />
                    </div>
                  </div>

                  <ShimmerButton size="lg" className="custom_shimmer" />
                </div>
              </div>
            </div>
          </div>

          <ToastContainer />
        </section>

        {pinModal ? (
          <WebPin
            isLoading={pinloading}
            btnFunc={createPin}
            pinTitle="Enter Pin to validate Transaction"
            pinPara="Create a transaction pin that will be used to validate your transactions within the platform"
            btnFuncTxt="Proceed"
            handleOnComplete={(e) => {
              const a = e.join("");
              setPin(a);
              // setPayload({ ...payload, pin_code: a });
              return;
            }}
          />
        ) : null}
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

  // if (!eligible) {
  //   return (
  //     <div className="kyc_review_message_div">
  //       <div className="kyc_review_message_div_cont">
  //         <div className="kyc_review_message_div_cont_1">
  //           <img
  //             src="/img/verification_svg1.svg"
  //             alt=""
  //             className="kypageDiv_cont_img"
  //           />
  //         </div>
  //         <div className="kyc_review_message_div_cont_2">
  //           <div className="kyc_review_message_div_cont_2_title">
  //             Criteria not satisfied
  //           </div>
  //           <div className="kyc_review_message_div_cont_2_para">
  //             You will need to complete at least KYC level 2 to be able to make
  //             purchase
  //           </div>
  //           <a
  //             href="/dashboard"
  //             className="kyc_review_message_div_cont_2_btn_link"
  //           >
  //             <button className="kyc_review_message_div_cont_2_btn">
  //               Go to Verification
  //             </button>
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  let items = [];
  for (let i = 1; i <= count; i++) {
    items.push(product);
  }

  return (
    <div className="ProductCheckoutPage_div">
      <section className="ProductCheckoutPage_div_section">
        <div className="custom_container">
          <div className="ProductCheckoutPage_div_section_area">
            <div className="ProductCheckoutPage_div_section_area_1">
              <div className="ProductCheckoutPage_div_section_area_1_area1">
                <div className="ProductCheckoutPage_div_section_area_1_area1_head">
                  Your Order
                </div>
                <div className="ProductCheckoutPage_div_section_area_1_area1_body">
                  {items.map((item, index) => {
                    const images = JSON.parse(item.product_images);
                    return (
                      <div className="ProductCheckoutPage_div_section_area_1_area1_body_1">
                        <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_img_div">
                          <img
                            src={images[0]}
                            alt=""
                            className="ProductCheckoutPage_div_section_area_1_area1_body_1_img"
                          />
                        </div>
                        <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1">
                          <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1_title">
                            {item.product_name}
                          </div>
                          <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1_amount">
                            {numberWithCommas(
                              parseFloat(product.final_amount).toFixed(2)
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="ProductCheckoutPage_div_section_area_1_area2">
                <div className="ProductCheckoutPage_div_section_area_1_area2_cont1">
                  <div className="ProductCheckoutPage_div_section_area_1_area2_cont1_title">
                    Quantity
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_1_area2_cont1_para">
                    {count}
                  </div>
                </div>
                <div className="ProductCheckoutPage_div_section_area_1_area2_cont1">
                  <div className="ProductCheckoutPage_div_section_area_1_area2_cont1_title">
                    Sub Total
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_1_area2_cont1_para">
                    {numberWithCommas(
                      parseFloat(product.final_amount * count).toFixed(2)
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* ================ */}
            {/* ================ */}
            {/* ================ */}
            {/* ================ */}
            {/* ================ */}
            <div className="ProductCheckoutPage_div_section_area_2">
              <div className="ProductCheckoutPage_div_section_area_2_area1">
                <div className="ProductCheckoutPage_div_section_area_2_area1_title">
                  Personal Info
                </div>
                <div className="ProductCheckoutPage_div_section_area_2_area1_body">
                  <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                    <input
                      type="text"
                      value={`${user.firstName} ${user.lastName}`}
                      className="ProductCheckoutPage_div_section_area_2_area1_body_cont_input"
                    />
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                    <input
                      type="email"
                      value={user.email}
                      className="ProductCheckoutPage_div_section_area_2_area1_body_cont_input"
                    />
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                    <input
                      type="number"
                      value={user.phone}
                      className="ProductCheckoutPage_div_section_area_2_area1_body_cont_input"
                    />
                  </div>
                </div>
              </div>
              <div className="ProductCheckoutPage_div_section_area_2_area2">
                <div className="ProductCheckoutPage_div_section_area_2_area1_title">
                  Billing Info
                </div>
                <div className="ProductCheckoutPage_div_section_area_2_area1_body">
                  <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                    <input
                      type="text"
                      value={"Address"}
                      className="ProductCheckoutPage_div_section_area_2_area1_body_cont_input"
                    />
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                    <input
                      type="text"
                      value={"City"}
                      className="ProductCheckoutPage_div_section_area_2_area1_body_cont_input"
                    />
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                    <input
                      type="text"
                      value={"State"}
                      className="ProductCheckoutPage_div_section_area_2_area1_body_cont_input"
                    />
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                    <input
                      type="text"
                      value={"Zip Code"}
                      className="ProductCheckoutPage_div_section_area_2_area1_body_cont_input"
                    />
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area1_body_cont">
                    <input
                      type="text"
                      value={"Country"}
                      className="ProductCheckoutPage_div_section_area_2_area1_body_cont_input"
                    />
                  </div>
                </div>
              </div>
              <div className="ProductCheckoutPage_div_section_area_1_area3">
                <div className="ProductCheckoutPage_div_section_area_1_area3_title">
                  Payment Info
                </div>
                <div className="ProductCheckoutPage_div_section_area_1_area3_body">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="ProductCheckoutPage_div_section_area_1_area3_bodySwiper"
                  >
                    <SwiperSlide className="ProductCheckoutPage_div_section_area_1_area3_bodySwiper_slide">
                      {" "}
                      <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1">
                        <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1">
                          <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1_div1">
                            <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1_div1_title">
                              Naira Wallet
                            </div>
                            {loading ? (
                              <ShimmerButton
                                size="md"
                                className="custom_shimmer"
                              />
                            ) : (
                              <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1_div1_bal">
                                <span className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1_div1_bal_span">
                                  ₦
                                </span>
                                {parseFloat(nairaBalance).toFixed(2)}
                              </div>
                            )}
                          </div>
                          <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1_div2">
                            Swap Funds{" "}
                            <SwapHorizIcon className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1_div2_icon" />
                          </div>
                        </div>
                        <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont2">
                          <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont2_add">
                            +
                          </div>
                        </div>
                        <img
                          src="/img/cards_bg_line.svg"
                          alt=""
                          className="ProductCheckoutPage_div_section_area_1_area3_body_card1_bg"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="ProductCheckoutPage_div_section_area_1_area3_bodySwiper_slide ">
                      {" "}
                      <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1 egc_card">
                        <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1">
                          <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1_div1">
                            <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1_div1_title egc_card">
                              Egoras Credit Wallet
                            </div>
                            {loading ? (
                              <ShimmerButton
                                size="md"
                                className="custom_shimmer"
                              />
                            ) : (
                              <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1_div1_bal">
                                {parseFloat(egcBalance).toFixed(4)}
                                <span className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1_div1_bal_span">
                                  egc
                                </span>{" "}
                              </div>
                            )}
                          </div>
                          <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1_div2 egc_card">
                            Swap Funds{" "}
                            <SwapHorizIcon className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1_div2_icon" />
                          </div>
                        </div>
                        <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont2">
                          <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont2_add egc_card">
                            +
                          </div>
                        </div>
                        <img
                          src="/img/cards_bg_line.svg"
                          alt=""
                          className="ProductCheckoutPage_div_section_area_1_area3_body_card1_bg"
                        />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="ProductCheckoutPage_div_section_area_2_area3">
                <div className="ProductCheckoutPage_div_section_area_2_area3_cont">
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont_head">
                    Quantity
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont_para">
                    {count}
                  </div>
                </div>
                <div className="ProductCheckoutPage_div_section_area_2_area3_cont">
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont_head">
                    Unit Amount
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont_para">
                    {numberWithCommas(
                      parseFloat(product.final_amount).toFixed(2)
                    )}
                  </div>
                </div>
                <div className="ProductCheckoutPage_div_section_area_2_area3_cont">
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont_head">
                    Non-Merchant Fee
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont_para">
                    #20,000
                  </div>
                </div>
                <div className="ProductCheckoutPage_div_section_area_2_area3_cont">
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont_head">
                    Total
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont_para">
                    {numberWithCommas(
                      parseFloat(product.final_amount * count).toFixed(2)
                    )}
                  </div>
                </div>

                {processing ? (
                  <p>Loading...</p>
                ) : (
                  <button
                    className="ProductCheckoutPage_div_section_area_2_area3_button"
                    onClick={handleProductPurchase}
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
      </section>

      {pinModal ? (
        <WebPin
          isLoading={pinloading}
          btnFunc={createPin}
          pinTitle="Enter Pin to validate Transaction"
          pinPara="Create a transaction pin that will be used to validate your transactions within the platform"
          btnFuncTxt="Proceed"
          handleOnComplete={(e) => {
            const a = e.join("");
            setPin(a);
            // setPayload({ ...payload, pin_code: a });
            return;
          }}
        />
      ) : null}

      {!eligible ? (
        <div className="not_eligible_div">
          <div className="kyc_review_message_div_cont">
            <div className="kyc_review_message_div_cont_1">
              <img
                src="/img/verification_svg1.svg"
                alt=""
                className="kypageDiv_cont_img"
              />
            </div>
            <div className="kyc_review_message_div_cont_2">
              <div className="kyc_review_message_div_cont_2_title">
                Criteria not satisfied
              </div>
              <div className="kyc_review_message_div_cont_2_para">
                You will need to complete at least KYC level 2 to be able to
                make purchase
              </div>
              <a
                href="/kyc/verify"
                className="kyc_review_message_div_cont_2_btn_link"
              >
                <button className="kyc_review_message_div_cont_2_btn">
                  Go to Verification
                </button>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductCheckoutPage;
