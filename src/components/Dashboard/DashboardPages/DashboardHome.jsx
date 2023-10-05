import React, { useEffect, useState } from "react";
import "../DashboardStyles/DashboardHome.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AreaChartComp from "../../Common/CommonUI/Charts/AreaChartComp";
import { TablePagination } from "../../Common/CommonUI/Tables/TableComp";
import Staticdata from "../../../assets/json/Static";
import { Table } from "../../Common/CommonUI/Tables/TableComp";
import { useSelector } from "react-redux";
import { ALL_PRODUCTS } from "../../../services/product_services";
import { GET_WALLET } from "../../../services/finance_services";
import { ShimmerButton } from "react-shimmer-effects-18";
import { toast, ToastContainer } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import { SHOW_ALL_PURCHASED_PRODUCT } from "../../../services/product_services";
import NodataComp from "../../Common/CommonUI/NodataComp";
import {
  GENERATE_USER_WALLET_ADDRESS,
  GENERATE_USER_WALLET_ADDRESS_MART_GPT,
  SET_USER_PIN,
} from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import WebPin from "../../Common/CommonUI/Modals/WebPin";
const DashboardHome = () => {
  const navigate = useNavigate();
  const [nairaBalance, setNairaBalance] = useState("");
  const [egcBalance, setEgcBalance] = useState(0);
  const { data, loading } = useSelector((state) => state.wallet);
  const [contentLoadingTable, setContentLoadingTable] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const [pin, setPinVal] = useState("");
  const [confirmPin, setConfirmPinVal] = useState("");
  const [confirmPinModal, setConfirmPinModal] = useState(false);
  const [pinModal, setPinModal] = useState(false);
  const [productLoading, setProductLoading] = useState(true);
  const [egorasProducts, setEgorasProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [pinProcessing, setPinProcessing] = useState(false);

  const generateWallet = async () => {
    const response = await GET_WALLET({
      symbol: "EGC",
    });

    if (response.success === undefined || !response.success) {
      return;
    }

    console.log(response.data.address, "generating wallet");
    const registerAddress = await GENERATE_USER_WALLET_ADDRESS({
      wallet: response.data.address,
      email: user.email,
    });
    await GENERATE_USER_WALLET_ADDRESS_MART_GPT({
      userAddress: response.data.address,
    });
    console.log(registerAddress, "responses");
  };

  const setPin = async () => {
    setPinModal(true);
  };
  useEffect(() => {
    console.log("i am running here");
    if (user?.wallet_address === "n/a" || user?.wallet_address === "") {
      generateWallet();
    }
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(data[0]?.value);
    console.log(data[1]?.value);
    setEgcBalance(data[0]?.value === null ? "0" : data[0]?.value);
    setNairaBalance(data[1]?.value === null ? "0" : data[1]?.value);
  }, []);

  useEffect(() => {
    //check if the pin is empty
    if (
      user?.user_pin === null ||
      user?.user_pin === "" ||
      user?.user_pin === undefined
    ) {
      setPin();
    }
  }, []);

  const proceedToConfirm = () => {
    setPinModal(false);
    setConfirmPinModal(true);
  };
  const processPinRequest = async () => {
    if (pin !== confirmPin) {
      toast.warn("Pin does not match");
      console.log("pin does not match");
      return;
    }

    setPinProcessing(true);
    const response = await SET_USER_PIN({
      code: pin,
      type: "set",
    });

    console.log(response);

    if (response.success) {
      toast.success("Pin is set Successfully");
      navigate(0);
      return;
    }

    toast.warn(response.errorMessage);
  };

  const handleOnComplete1 = (e) => {
    const value = e.join("");
    setPinVal(value);
  };
  const handleOnComplete2 = (e) => {
    const value = e.join("");
    setConfirmPinVal(value);
  };
  // const images = [
  //   "/img/egr_gen1_detail_img.png",
  //   "/img/egr_gen1_detail_img.png",
  //   "/img/egr_gen1_detail_img.png",
  //   "/img/egr_gen1_detail_img.png",
  //   "/img/egr_gen1_detail_img.png",
  // ];
  const fechAllProducts = async () => {
    setProductLoading(true);
    const response = await ALL_PRODUCTS();
    console.log(response);
    setProductLoading(false);

    const ano = response.data.getAllUploadedProduct.filter((data) => {
      console.log(data);
      return data.product_brand === "Egoras";
    });
    setEgorasProducts(ano);
  };
  useEffect(() => {
    fechAllProducts();
  }, []);
  const showPurchasedProduct = async () => {
    const response = await SHOW_ALL_PURCHASED_PRODUCT(user?.wallet_address);
    console.log(response);

    setOrders(response.data);
  };

  useEffect(() => {
    showPurchasedProduct();
  }, []);
  return (
    <div className="dashboardHome">
      <div className="dashboardHome_area1">
        <div className="dashboardHome_area1_card1">
          <MoreVertOutlinedIcon className="dashboardHome_area1_card1_more_icon" />
          <div className="dashboardHome_area1_card1_icon">
            <AccountBalanceWalletOutlinedIcon className="dashboardHome_area1_card1_icon_icon" />
          </div>
          <div className="dashboardHome_area1_card1_title_div">
            <div className="dashboardHome_area1_card1_title">
              Total EGC Balance
            </div>
            <div className="dashboardHome_area1_card1_content">
              <div className="dashboardHome_area1_card1_content_amnt">
                {loading ? (
                  <ShimmerButton size="md" className="custom_shimmer" />
                ) : (
                  <>
                    {" "}
                    <div className="dashboardHome_area1_card1_content_amnt_txt">
                      {parseFloat(egcBalance).toFixed(2)}
                    </div>
                    <div className="dashboardHome_area1_card1_content_symbol">
                      egc
                    </div>
                  </>
                )}
              </div>
              <div className="dashboardHome_area1_card1_content_btn_div">
                <a href="/dashboard/wallet">
                  <button className="dashboardHome_area1_card1_content_btn">
                    Fund
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboardHome_area1_card1">
          <MoreVertOutlinedIcon className="dashboardHome_area1_card1_more_icon" />
          <div className="dashboardHome_area1_card1_icon">
            <AccountBalanceWalletOutlinedIcon className="dashboardHome_area1_card1_icon_icon" />
          </div>
          <div className="dashboardHome_area1_card1_title_div">
            <div className="dashboardHome_area1_card1_title">
              Total Naira Balance
            </div>
            <div className="dashboardHome_area1_card1_content">
              <div className="dashboardHome_area1_card1_content_amnt">
                {loading ? (
                  <ShimmerButton size="md" className="custom_shimmer" />
                ) : (
                  <>
                    <div className="dashboardHome_area1_card1_content_symbol">
                      ₦
                    </div>
                    <div className="dashboardHome_area1_card1_content_amnt_txt">
                      {parseFloat(nairaBalance).toFixed(2)}
                    </div>
                  </>
                )}
              </div>
              <div className="dashboardHome_area1_card1_content_btn_div">
                <a href="/dashboard/wallet">
                  <button className="dashboardHome_area1_card1_content_btn">
                    Fund
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboardHome_area1_card1">
          <MoreVertOutlinedIcon className="dashboardHome_area1_card1_more_icon" />
          <div className="dashboardHome_area1_card1_icon">
            <ShoppingCartOutlinedIcon className="dashboardHome_area1_card1_icon_icon" />
          </div>
          <div className="dashboardHome_area1_card1_title_div">
            <div className="dashboardHome_area1_card1_title">
              Total Items Bought
            </div>
            <div className="dashboardHome_area1_card1_content">
              <div className="dashboardHome_area1_card1_content_amnt">
                {loading ? (
                  <ShimmerButton size="md" className="custom_shimmer" />
                ) : (
                  <>
                    {orders.length}
                    <div className="dashboardHome_area1_card1_content_symbol">
                      itms
                    </div>
                  </>
                )}
              </div>
              <div className="dashboardHome_area1_card1_content_btn_div">
                <a href="/dashboard/orders">
                  <button className="dashboardHome_area1_card1_content_btn">
                    View
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      <div className="dash_home_products">
        <div className="dash_home_products_title">
          Egoras Products{" "}
          <a
            href="/dashboard/products"
            className="dash_home_products_title_link"
          >
            <button className="dash_home_products_title_link_btn">
              View All
            </button>
          </a>
        </div>
        {productLoading ? (
          <div className="dash_home_products_cont1_loading_div">
            <div className="dash_home_products_swiper_slide_div_loading">
              <div className="dash_home_products_div">
                <div className="dash_home_products_div_1">
                  <ShimmerButton size="lg" className="custom_shimmer" />
                </div>
                <div className="dash_home_products_div_body">
                  <div className="dash_home_products_div_body_title">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_brand">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_amount">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_btn_div">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                </div>
              </div>
            </div>
            <div className="dash_home_products_swiper_slide_div_loading">
              <div className="dash_home_products_div">
                <div className="dash_home_products_div_1">
                  <ShimmerButton size="lg" className="custom_shimmer" />
                </div>
                <div className="dash_home_products_div_body">
                  <div className="dash_home_products_div_body_title">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_brand">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_amount">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_btn_div">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                </div>
              </div>
            </div>
            <div className="dash_home_products_swiper_slide_div_loading">
              <div className="dash_home_products_div">
                <div className="dash_home_products_div_1">
                  <ShimmerButton size="lg" className="custom_shimmer" />
                </div>
                <div className="dash_home_products_div_body">
                  <div className="dash_home_products_div_body_title">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_brand">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_amount">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_btn_div">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                </div>
              </div>
            </div>
            <div className="dash_home_products_swiper_slide_div_loading">
              <div className="dash_home_products_div">
                <div className="dash_home_products_div_1">
                  <ShimmerButton size="lg" className="custom_shimmer" />
                </div>
                <div className="dash_home_products_div_body">
                  <div className="dash_home_products_div_body_title">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_brand">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_amount">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_btn_div">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                </div>
              </div>
            </div>
            <div className="dash_home_products_swiper_slide_div_loading">
              <div className="dash_home_products_div">
                <div className="dash_home_products_div_1">
                  <ShimmerButton size="lg" className="custom_shimmer" />
                </div>
                <div className="dash_home_products_div_body">
                  <div className="dash_home_products_div_body_title">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_brand">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_amount">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_btn_div">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                </div>
              </div>
            </div>
            <div className="dash_home_products_swiper_slide_div_loading">
              <div className="dash_home_products_div">
                <div className="dash_home_products_div_1">
                  <ShimmerButton size="lg" className="custom_shimmer" />
                </div>
                <div className="dash_home_products_div_body">
                  <div className="dash_home_products_div_body_title">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_brand">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_amount">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                  <div className="dash_home_products_div_body_btn_div">
                    <ShimmerButton size="md" className="custom_shimmer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {" "}
            {egorasProducts <= 0 ? (
              <NodataComp />
            ) : (
              <>
                <div className="dash_home_products_cont1">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                      dynamicBullets: true,
                    }}
                    breakpoints={{
                      500: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      // 768: {
                      //   slidesPerView: 2,
                      //   spaceBetween: 40,
                      // },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                      1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                      1200: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                      },
                      1400: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                      },
                      1800: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                      },
                    }}
                    modules={[Pagination]}
                    className="dash_home_products_swiper"
                  >
                    {egorasProducts.slice(0, 5).map((data) => {
                      const image = JSON.parse(data.product_images);
                      return (
                        <SwiperSlide className="dash_home_products_swiper_slide">
                          <div className="dash_home_products_swiper_slide_div">
                            <div className="dash_home_products_div">
                              <div className="dash_home_products_div_1">
                                <img
                                  src={image[0]}
                                  className="dash_home_products_swiper_slide_img"
                                />
                              </div>
                              <div className="dash_home_products_div_body">
                                <div className="dash_home_products_div_body_title">
                                  {data.product_name}
                                </div>
                                <div className="dash_home_products_div_body_brand">
                                  Egoras
                                </div>
                                <div className="dash_home_products_div_body_amount">
                                  ₦{parseFloat(data.final_amount).toFixed(2)}
                                </div>
                                <div className="dash_home_products_div_body_btn_div">
                                  <a
                                    href={`/productdetailorder/${data.product_id}/${data.product_name}`}
                                  >
                                    <button className="dash_home_products_div_body_btn">
                                      Purchase
                                    </button>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                    {/* {images.map((data) => (
              <SwiperSlide className="dash_home_products_swiper_slide">
                <div className="dash_home_products_div">
                  <div className="dash_home_products_div_1">
                    <img
                      src={data}
                      className="dash_home_products_swiper_slide_img"
                    />
                  </div>
                  <div className="dash_home_products_div_body">
                    <div className="dash_home_products_div_body_title">
                      Egoras Dual Fuel Generator
                    </div>
                    <div className="dash_home_products_div_body_brand">
                      Egoras
                    </div>
                    <div className="dash_home_products_div_body_amount">
                      #120,000.00
                    </div>
                    <div className="dash_home_products_div_body_btn_div">
                      <button className="dash_home_products_div_body_btn">
                        Purchase
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))} */}
                  </Swiper>
                </div>
                <div className="dash_home_products_cont1_mobile">
                  {egorasProducts.map((data) => {
                    const image = JSON.parse(data.product_images);
                    return (
                      <div className="dash_home_products_swiper_slide_div">
                        <div className="dash_home_products_div">
                          <div className="dash_home_products_div_1">
                            <img
                              src={image[0]}
                              className="dash_home_products_swiper_slide_img"
                            />
                          </div>
                          <div className="dash_home_products_div_body">
                            <div className="dash_home_products_div_body_title">
                              {data.product_name}
                            </div>
                            <div className="dash_home_products_div_body_brand">
                              Egoras
                            </div>
                            <div className="dash_home_products_div_body_amount">
                              ₦{parseFloat(data.final_amount).toFixed(2)}
                            </div>
                            <div className="dash_home_products_div_body_btn_div">
                              <a
                                href={`/productdetailorder/${data.product_id}/${data.product_name}`}
                              >
                                <button className="dash_home_products_div_body_btn">
                                  Purchase
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      <div className="start_kyc_div">
        <div className="start_kyc_div_1">
          <div className="start_kyc_div_1_title">Upgrade your KYC level</div>{" "}
          <div className="start_kyc_div_1_para">
            Upgrade your kyc level to level2 to unlock transaction capabilities
            within the app
          </div>{" "}
        </div>{" "}
        <a href="/kyc/verify" className="start_kyc_div_2_link" target="_blank">
          {" "}
          <div className="start_kyc_div_2">Upgrade Level</div>
        </a>{" "}
      </div>
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* <div className="display_prod_div">
        <div className="DashboardWalletsDiv_area1_cont">
          <div
            id="egc"
            className={
              activeTab === "egc"
                ? "DashboardWalletsDiv_area1_cont_tab1_active"
                : "DashboardWalletsDiv_area1_cont_tab1"
            }
            onClick={ToggleActiveTab}
          >
            EGC Wallet
          </div>
          <div
            id="naira"
            className={
              activeTab === "naira"
                ? "DashboardWalletsDiv_area1_cont_tab1_active"
                : "DashboardWalletsDiv_area1_cont_tab1"
            }
            onClick={ToggleActiveTab}
          >
            Naira Wallet
          </div>
        </div>
      </div> */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      <div className="dashboardHome_area2">
        <AreaChartComp />
      </div>
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}

      {pinModal && (
        <WebPin
          btnFunc={proceedToConfirm}
          btnFuncTxt={"Next"}
          handleOnComplete={handleOnComplete1}
          pinTitle={"Please Set a Pin"}
          pinPara={
            "You'll need to create a pin to be able to make transactions"
          }
        />
      )}
      {confirmPinModal && (
        <WebPin
          btnFunc={processPinRequest}
          isLoading={pinProcessing}
          btnFuncTxt={"Confirm"}
          handleOnComplete={handleOnComplete2}
          pinTitle={"Please Confirm Your Pin"}
          pinPara={"Just to be sure, we'll want you to confirm your pin "}
        />
      )}
      <div className="dashboardHome_area3">
        <Table
          tableTitle={"Transactions"}
          TableData={Staticdata.productsTableData.slice(0, 8)}
          contentLoading={contentLoadingTable}
        />

        {/* <div className="dashboardHome_area3_btn_div">
          <a
            href="/dashboard/transaction"
            className="dashboardHome_area3_btn_link"
          >
            <button className="dashboardHome_area3_btn">View more</button>
          </a>
        </div> */}
      </div>

      <ToastContainer />
    </div>
  );
};

export default DashboardHome;
