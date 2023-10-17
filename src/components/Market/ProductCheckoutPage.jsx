import React, { useState, useEffect } from "react";
import "../../stylesheet/checkout.css";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import Select from "react-select";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { FreeMode, Pagination, Navigation, Thumbs } from "swiper/modules";
import { useNavigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import successLoader from "../../assets/icons/LottieSuccess.json";
import { Country, State, City } from "country-state-city";
import {
  MAKE_PAYMENT_FOR_PRODUCT,
  PRODUCT_DETAILS,
} from "../../services/product_services";
import { SUBMIT_USER_DELIEVRY } from "../../services/products";
import { numberWithCommas } from "../../assets/js/numberWithCommas";
import { useSelector } from "react-redux";
import WebPin from "../Common/CommonUI/Modals/WebPin";
import { ToastContainer, toast } from "react-toastify";
import { ShimmerButton } from "react-shimmer-effects-18";
import useProtect from "../../hooks/useProtect";
import useUserEligible from "../../hooks/useUserEligible";
import SuccessModal from "../Common/CommonUI/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../Common/CommonUI/Modals/ErrorModal/ErrorModal";

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
  const [success, setSuccess] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorTxt, setErrorTxt] = useState("");
  const [pinloading, setPinLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [deliveryVal, setDeliveryVal] = useState("");
  const [successTxt, setSuccessTxt] = useState("");
  const [deliverBtnDisable, setDeliverBtnDisable] = useState("");
  const [deliverBtnDisable2, setDeliverBtnDisable2] = useState("");
  const [isDeliverLoading, setIsDeliverLoading] = useState("");
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
  //console.logog(id);
  useEffect(() => {
    let states = State.getStatesOfCountry("NG");
    //console.logog(states);
    //intercept the state object
    let tempState = states;
    tempState.forEach((state) => {
      state.value = state.name;
      state.label = state.name;
    });
    setStates(tempState);
    //console.logog(tempState);
  }, []);

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
    //console.logog(response);
  };

  const createPin = async () => {
    setPinLoading(true);
    let temp = payload;
    setProcessing(true);
    temp = { ...payload, pin_code: pin };
    // setPinModal(false);
    const response = await MAKE_PAYMENT_FOR_PRODUCT(temp);
    //console.logog(response);

    if (response.success === true) {
      // toast.success("Product Purchase Successful");
      //console.logog(response);
      setSuccess(true);
      setPinLoading(false);
      setProcessing(false);
      return;
    }
    if (!response?.data?.success || !response?.data) {
      setErrorModal(true);
      setPinLoading(false);
      setProcessing(false);
      setErrorTxt(response.data.errorMessage);
      setPinModal(false);
      //console.logog(response);
      // toast.warn(response.data.errorMessage);
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
    //console.logog(data);
    //console.logog(data[0]?.value);
    //console.logog(data[1]?.value);
    setEgcBalance(data[0]?.value === null ? "0" : data[0]?.value);
    setNairaBalance(data[1]?.value === null ? "0" : data[1]?.value);
  }, []);
  useEffect(() => {
    if (selectedState == "" || deliveryVal == "") {
      setDeliverBtnDisable(true);
    } else {
      setDeliverBtnDisable(false);
    }
  }, [selectedState, deliveryVal]);
  useEffect(() => {
    if (deliveryVal === "") {
      setDeliverBtnDisable2(true);
    } else {
      setDeliverBtnDisable2(false);
    }
  }, [deliveryVal]);

  const handleStateOnChange = (e) => {
    //console.logog(e);
    setSelectedState(e.label);
    const city = City.getCitiesOfState("NG", e.isoCode.toString());
    let tempCity = city;
    tempCity.forEach((c) => {
      c.value = c.name;
      c.label = c.name;
    });
  };

  //console.logog(selectedState);
  //console.logog(deliveryVal);
  const checkedPickupStore = () => {
    setDeliveryVal("PICKUP");
  };
  const checkedPickupDelivery = () => {
    setDeliveryVal("DELIVERY");
  };

  const handleDelivery = async () => {
    setIsDeliverLoading(true);
    const values = {
      email: user.email,
      delivery_type: deliveryVal,
      state: selectedState,
      item: name,
    };
    //console.logog(values);
    const response = await SUBMIT_USER_DELIEVRY(id, values);
    //console.logog(response);
    if (response.success === true) {
      setIsDeliverLoading(false);
      setSuccessModal(true);
      setSuccessTxt(
        "You have selcted to pick up your product on delivery, our customer service will reach out to you soon."
      );
      //console.logog(response);
      return;
    }
    if (!response?.data?.success || !response?.data) {
      setIsDeliverLoading(false);
      setErrorModal(true);
      setErrorTxt(response.data.errorMessage);
      //console.logog(response);
      return;
    }
  };
  const handleDeliveryStore = async () => {
    setIsDeliverLoading(true);
    const values = {
      email: user.email,
      delivery_type: deliveryVal,
      item: name,
    };
    //console.logog(values);
    const response = await SUBMIT_USER_DELIEVRY(id, values);
    //console.logog(response);
    if (response.success === true) {
      setIsDeliverLoading(false);

      setSuccessModal(true);
      setSuccessTxt(
        <div className="pickupFromStoreDiv">
          <div className="pickupFromStoreDiv_1">
            You have selected the option to pick up your item from our store
          </div>
          <div className="pickupFromStoreDiv_1_cont">
            <div className="pickupFromStoreDiv_1_cont_1">
              Here are the list of our stores to pick up your product from
            </div>
            <div className="pickupFromStoreDiv_1_cont_2">
              282 PH/ABA expressway, Rumuokwrushi junction. Port Harcourt,
              Nigeria
            </div>
          </div>
        </div>
      );
      //console.logog(response);
      return;
    }
    if (!response?.data?.success || !response?.data) {
      setIsDeliverLoading(false);

      setErrorModal(true);
      setErrorTxt(response.data.errorMessage);
      //console.logog(response);
      return;
    }
  };

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
                    ₦
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
                              EGC Wallet
                            </div>
                            {loading ? (
                              <ShimmerButton
                                size="md"
                                className="custom_shimmer"
                              />
                            ) : (
                              <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1_cont1_div1_bal">
                                {parseFloat(egcBalance).toFixed(2)}
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
                    ₦
                    {numberWithCommas(
                      parseFloat(product.final_amount).toFixed(2)
                    )}
                  </div>
                </div>
                {/* <div className="ProductCheckoutPage_div_section_area_2_area3_cont">
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont_head">
                    Non-Merchant Fee
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont_para">
                    #20,000
                  </div>
                </div> */}
                <div className="ProductCheckoutPage_div_section_area_2_area3_cont">
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont_head">
                    Total
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_2_area3_cont_para">
                    ₦
                    {numberWithCommas(
                      parseFloat(product.final_amount * count).toFixed(2)
                    )}
                  </div>
                </div>

                {processing ? (
                  <button className="ProductCheckoutPage_div_section_area_2_area3_button">
                    <ScaleLoader color="#366e51" height={20} />
                  </button>
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
          pinPara="Enter your transaction pin to complete your product purchase"
          btnFuncTxt="Proceed"
          handleOnComplete={(e) => {
            const a = e.join("");
            setPin(a);
            // setPayload({ ...payload, pin_code: a });
            return;
          }}
        />
      ) : null}

      {success ? (
        <div className="successCheckoutDiv">
          <div className="successCheckoutDiv_cont">
            <div className="successModalDiv_cont_animation">
              <Lottie
                animationData={successLoader}
                loop={false}
                autoPlay={true}
                className="successModalDiv_cont_animation_icon2"
                preserveAspectRatio="xMidYMid meet"
              />
            </div>
            <div className="successCheckoutDiv_cont_body">
              <div className="successCheckoutDiv_cont_body_1">
                <div className="successCheckoutDiv_cont_body_1_title">
                  Successful Purchase
                </div>
                <div className="successCheckoutDiv_cont_body_1_para">
                  You have succesfully placed your order for {count} {name}
                </div>
              </div>
              <div className="successCheckoutDiv_cont_body_2">
                <div className="successCheckoutDiv_cont_body_2_title">
                  Delivery Options
                </div>
                <div className="successCheckoutDiv_cont_body_1_para">
                  Select the delivery option that best suites you.
                </div>
                <div className="successCheckoutDiv_cont_body_2_body">
                  <div className="successCheckoutDiv_cont_body_2_body_1_div">
                    <input
                      type="radio"
                      id="radio-2"
                      name="radio"
                      // checked={checkedMetamask}
                      onChange={checkedPickupStore}
                    />
                    <label
                      className={
                        deliveryVal === "PICKUP"
                          ? "successCheckoutDiv_cont_body_2_body_1 successCheckoutDiv_cont_body_2_body_1_active"
                          : "successCheckoutDiv_cont_body_2_body_1"
                      }
                      for="radio-2"
                    >
                      Pick up from store
                    </label>
                  </div>
                  <div className="successCheckoutDiv_cont_body_2_body_1_div">
                    <input
                      type="radio"
                      id="radio-1"
                      name="radio"
                      // checked={checkedMetamask}
                      onChange={checkedPickupDelivery}
                    />
                    <label
                      className={
                        deliveryVal === "DELIVERY"
                          ? "successCheckoutDiv_cont_body_2_body_1 successCheckoutDiv_cont_body_2_body_1_active"
                          : "successCheckoutDiv_cont_body_2_body_1"
                      }
                      for="radio-1"
                    >
                      Pick up on delivery
                    </label>
                  </div>

                  {deliveryVal === "DELIVERY" ? (
                    <Select
                      placeholder="Select State"
                      classNamePrefix="select"
                      className="kypageDiv_cont_body_input_div_slect"
                      // value={selectedState}
                      onChange={handleStateOnChange}
                      id="state"
                      isSearchable={true}
                      name="state"
                      options={states}
                    />
                  ) : null}
                  {deliveryVal === "PICKUP" ? (
                    <button
                      className="successCheckoutDiv_cont_body_2_body_submit"
                      onClick={handleDeliveryStore}
                      disabled={deliverBtnDisable2}
                    >
                      {isDeliverLoading ? (
                        <ScaleLoader color="#366e51" height={20} />
                      ) : (
                        " Submit"
                      )}
                    </button>
                  ) : deliveryVal === "DELIVERY" ? (
                    <button
                      className="successCheckoutDiv_cont_body_2_body_submit"
                      onClick={handleDelivery}
                      disabled={deliverBtnDisable}
                    >
                      {isDeliverLoading ? (
                        <ScaleLoader color="#366e51" height={20} />
                      ) : (
                        " Submit"
                      )}
                    </button>
                  ) : (
                    <button
                      className="successCheckoutDiv_cont_body_2_body_submit"
                      disabled={true}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {successModal ? (
        <SuccessModal
          SuccesTxt={successTxt}
          successFunc={() => {
            window.location.href = "/dashboard/orders";
          }}
        />
      ) : null}
      {errorModal ? (
        <ErrorModal
          ErrorTxt={errorTxt}
          errorFunc={() => {
            setErrorModal(false);
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
