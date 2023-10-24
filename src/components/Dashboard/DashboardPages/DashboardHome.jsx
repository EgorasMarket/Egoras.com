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
import { numberWithCommas } from "../../../assets/js/numberWithCommas";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import { SHOW_ALL_PURCHASED_PRODUCT } from "../../../services/product_services";
import { FETCH_WALLET_TRANSACTIONS } from "../../../services/finance_services";
import NodataComp from "../../Common/CommonUI/NodataComp";
import {
  GENERATE_USER_WALLET_ADDRESS,
  GENERATE_USER_WALLET_ADDRESS_MART_GPT,
  SET_USER_PIN,
} from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import WebPin from "../../Common/CommonUI/Modals/WebPin";
import useUserEligible from "../../../hooks/useUserEligible";
const DashboardHome = () => {
  const isEligible = useUserEligible();
  const navigate = useNavigate();
  const [nairaBalance, setNairaBalance] = useState("0");
  const [egcBalance, setEgcBalance] = useState("0");
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
  const [tableData, setTableData] = useState([]);
  const [newState, setNewState] = useState([]);
  const [ChartValue, setChartValue] = useState(0);
  const [ChartTime, setChartTime] = useState(0);
  const [LastArray, setLastArray] = useState(0);
  const [lastIndex, setlastIndex] = useState(0);
  const [chartLoading, setChartLoading] = useState(true);
  const [pinProcessing, setPinProcessing] = useState(false);
  const generateWallet = async () => {
    const response = await GET_WALLET({
      symbol: "EGC",
    });

    if (response.success === undefined || !response.success) {
      return;
    }

    //console.logog(response.data.address, "generating wallet");
    const registerAddress = await GENERATE_USER_WALLET_ADDRESS({
      wallet: response.data.address,
      email: user.email,
    });
    await GENERATE_USER_WALLET_ADDRESS_MART_GPT({
      userAddress: response.data.address,
    });
    //console.logog(registerAddress, "responses");
  };

  const setPin = async () => {
    setPinModal(true);
  };
  useEffect(() => {
    // //console.logog("i am running here");
    setTimeout(() => {
      if (user?.wallet_address === "n/a" || user?.wallet_address === "") {
        generateWallet();
      }
    }, 5000);
  }, []);

  const fetchWalletTransactions = async () => {
    setContentLoadingTable(true);
    const response = await FETCH_WALLET_TRANSACTIONS();
    console.log("====================================");
    console.log(response);
    console.log("====================================");
    if (response.success === true) {
      setChartLoading(false);
      setContentLoadingTable(false);
      setTableData(response.data);
      const transformedData = response.data.map((data) => ({
        value: parseFloat(data.amount),
        timestamp: new Date(data.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        month: new Date(data.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      }));
      //console.logog(transformedData, "transformedData");
      //console.logog(transformedData, "transformedData");
      setNewState(transformedData);
      if (transformedData.length > 0) {
        setlastIndex(transformedData.length - 1);
        setLastArray(transformedData[transformedData.length - 1]);
        setChartValue(() => transformedData[transformedData.length - 1].value);
        setChartTime(
          () => transformedData[transformedData.length - 1].timestamp
        );
        return;
      }
    } else {
      setChartLoading(true);
      setContentLoadingTable(true);
      // setNewState([]);

      // setTableData([]);
    }
    //console.logog(response.data);
    //console.logog(response);
  };
  useEffect(() => {
    fetchWalletTransactions();
  }, []);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      setChartValue(payload[0].payload.value);
      setChartTime(payload[0].payload.timestamp);
    } else {
      setChartValue(LastArray.value);
      setChartTime(LastArray.timestamp);
    }
    return null;
  };

  //console.logog("====================================");
  //console.logog(user, "yyyyyyyyy");
  //console.logog("====================================");
  useEffect(() => {
    //console.logog(data);
    //console.logog(data[0]?.value);
    //console.logog(data[1]?.value);

    if (data[0]?.name === "Naira") {
      setNairaBalance(data[0]?.value === null ? "0" : data[0]?.value);
      return;
    }
    if (data[1]?.name === "Naira") {
      setNairaBalance(data[1]?.value === null ? "0" : data[1]?.value);
      return;
    }
    if (data[0].name === "Egoras Credit") {
      setEgcBalance(data[0]?.value === null ? "0" : data[0]?.value);
      return;
    }
    if (data[1].name === "Egoras Credit") {
      setEgcBalance(data[1]?.value === null ? "0" : data[1]?.value);
      return;
    }
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
      //console.logog("pin does not match");
      return;
    }

    setPinProcessing(true);
    const response = await SET_USER_PIN({
      code: pin,
      type: "set",
    });

    //console.logog(response);

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

  const fechAllProducts = async () => {
    setProductLoading(true);
    const response = await ALL_PRODUCTS();
    //console.logog(response);
    setProductLoading(false);

    const ano = response.data.getAllUploadedProduct.filter((data) => {
      //console.logog(data);
      return data.product_brand === "EGORAS";
    });
    setEgorasProducts(ano);
  };
  useEffect(() => {
    fechAllProducts();
  }, []);
  const showPurchasedProduct = async () => {
    const response = await SHOW_ALL_PURCHASED_PRODUCT(user?.wallet_address);
    //console.logog(response);

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
                      {numberWithCommas(parseFloat(egcBalance).toFixed(2))}
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
                      {numberWithCommas(parseFloat(nairaBalance).toFixed(2))}
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
                                  Brand: Egoras
                                </div>
                                <div className="dash_home_products_div_body_amount">
                                  ₦
                                  {numberWithCommas(
                                    parseFloat(data.final_amount).toFixed(2)
                                  )}
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
                              Brand: Egoras
                            </div>
                            <div className="dash_home_products_div_body_amount">
                              ₦
                              {numberWithCommas(
                                parseFloat(data.final_amount).toFixed(2)
                              )}
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

      {!isEligible ? (
        <div className="start_kyc_div">
          <div className="start_kyc_div_1">
            <div className="start_kyc_div_1_title">Upgrade your KYC level</div>{" "}
            <div className="start_kyc_div_1_para">
              Upgrade your kyc level to level2 to unlock transaction
              capabilities within the app
            </div>{" "}
          </div>{" "}
          <a
            href="/kyc/verify"
            className="start_kyc_div_2_link"
            target="_blank"
          >
            {" "}
            <div className="start_kyc_div_2">Upgrade Level</div>
          </a>{" "}
        </div>
      ) : null}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      <div className="dashboardHome_area2">
        <AreaChartComp
          chartData={newState}
          CustomTooltip={CustomTooltip}
          chartLoading={chartLoading}
          ChartValue={ChartValue}
          ChartTime={ChartTime}
        />
      </div>
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}

      <div className="dashboardHome_area3">
        <Table
          tableTitle={"Transactions"}
          TableData={tableData.slice(0, 7)}
          dummyData={Staticdata.productsTableData.slice(0, 8)}
          contentLoading={contentLoadingTable}
          userName={user.username}
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
      <ToastContainer />
    </div>
  );
};

export default DashboardHome;
