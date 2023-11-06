import React, { useState, useEffect } from "react";
import Staticdata from "../../../assets/json/Static";
import "../DashboardStyles/dashboardOrder.css";
import DashboardOrderModal from "./DashboardOrderModal";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import { FETCH_USER_PRODUCT_ORDERS } from "../../../services/products";
import { SHOW_ALL_PURCHASED_PRODUCT } from "../../../services/product_services";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";
import SyncLoader from "react-spinners/SyncLoader";
import NodataComp from "../../Common/CommonUI/NodataComp";
import { ShimmerButton } from "react-shimmer-effects-18";

const DashboardOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const [saleDetails, setSaleDetails] = useState("");
  const [activeTab, setActiveTab] = useState("egc");
  const [productLoading, setProductLoading] = useState(true);

  const ToggleActiveTab = (e) => [setActiveTab(e.currentTarget.id)];

  const [orders, setOrders] = useState([]);
  const ToggleSaleDetails = (product_id) => {
    setSaleDetails(product_id);
    //console.logog(product_id);
  };
  //
  const showPurchasedProduct = async () => {
    setProductLoading(true);

    const response = await SHOW_ALL_PURCHASED_PRODUCT(user?.wallet_address);
    console.log(response);
    if (response.success === true) {
      setProductLoading(false);
    } else {
      setProductLoading(true);
    }
    setOrders(response.data);
  };

  useEffect(() => {
    showPurchasedProduct();
  }, []);
  return (
    <div className="dashboardOrder_div">
      <div className="dashboardOrder_div_1">
        <div className="DashboardWalletsDiv_area2b">
          <div className="DashboardWalletsDiv_area2_cont1">
            Total Ordered Products
          </div>
          <div className="DashboardWalletsDiv_area2_cont2">
            <div className="DashboardWalletsDiv_area2_cont2_area1">
              {productLoading ? (
                <ShimmerButton size="lg" className="custom_shimmer" />
              ) : (
                <div className="DashboardWalletsDiv_area2_cont2_area1_bal">
                  {orders.length}
                  <span className="DashboardWalletsDiv_area2_cont2_area1_bal_span">
                    itms
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="dashboardOrder_div_tabs">
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
            Orders
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
            Finance
          </div>
        </div>
      </div>
      <>
        {productLoading ? (
          <div className="ProductLoadingDiv">
            <div className="prod_loading_cont">
              <SyncLoader
                color="#22ad62"
                aria-label="Loading Spinner"
                data-testid="loader"
                className="loading_div_area_cont_icon"
                // size={80}
                speedMultiplier={1}
              />
              <div className="prod_loading_cont_txt">
                Fetching Products Please wait...
              </div>
            </div>
          </div>
        ) : (
          <div className="dashboardOrder_div_body">
            {orders.length >= 1 ? (
              orders.map((data, index) => {
                const images = JSON.parse(data.product_images);
                return (
                  <div className="DashboardProdDiv_body_cont1_order">
                    <div className="DashboardProdDiv_body_cont1_img">
                      <img
                        src={images[0]}
                        alt=""
                        className="DashboardProdDiv_body_cont1_img_image"
                      />
                    </div>

                    <div className="DashboardProdDiv_body_cont1_details">
                      <div className="DashboardProdDiv_body_cont1_details_txt">
                        <div className="DashboardProdDiv_body_cont1_details_txt_title">
                          {data.product_name}
                        </div>
                        <div className="DashboardProdDiv_body_cont1_details_txt_amount">
                          ₦
                          {numberWithCommas(parseFloat(data.amount).toFixed(2))}
                        </div>
                      </div>
                      <div className="DashboardProdDiv_body_cont1_details_btn_div">
                        <button
                          className="DashboardProdDiv_body_cont1_details_btn_div_btn"
                          id={data.id}
                          onClick={() => {
                            ToggleSaleDetails(data.id);
                          }}
                        >
                          View Order
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <NodataComp />
            )}
          </div>
        )}
      </>

      {saleDetails === ""
        ? null
        : orders.map((data) => (
            <>
              {data.id === saleDetails ? (
                <div>
                  <DashboardOrderModal
                    closeModal={ToggleSaleDetails}
                    payload={data}
                  />
                </div>
              ) : null}
            </>
          ))}
    </div>
  );
};

export default DashboardOrders;
