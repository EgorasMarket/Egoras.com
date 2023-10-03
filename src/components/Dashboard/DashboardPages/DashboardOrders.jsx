import React, { useState, useEffect } from "react";
import Staticdata from "../../../assets/json/Static";
import "../DashboardStyles/dashboardOrder.css";
import DashboardOrderModal from "./DashboardOrderModal";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import { FETCH_USER_PRODUCT_ORDERS } from "../../../services/products";
import { SHOW_ALL_PURCHASED_PRODUCT } from "../../../services/product_services";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";

const DashboardOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const [saleDetails, setSaleDetails] = useState("");
  const [activeTab, setActiveTab] = useState("egc");

  const ToggleActiveTab = (e) => [setActiveTab(e.currentTarget.id)];

  const [orders, setOrders] = useState([]);
  const ToggleSaleDetails = (product_id) => {
    setSaleDetails(product_id);
    console.log(product_id);
  };

  const showPurchasedProduct = async () => {
    const response = await SHOW_ALL_PURCHASED_PRODUCT(user.wallet_address);
    console.log(response);
    if (!response.success) {
      return;
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
              <div className="DashboardWalletsDiv_area2_cont2_area1_bal">
                {orders.length}
                <span className="DashboardWalletsDiv_area2_cont2_area1_bal_span">
                  itms
                </span>
              </div>
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
          <div className="">
            <h1>No orders exist at the moment</h1>
          </div>
        )}
      </div>

      {saleDetails === ""
        ? null
        : orders.map((data) => (
            <>
              {data.id === saleDetails ? (
                <div>
                  <DashboardOrderModal closeModal={ToggleSaleDetails} />
                </div>
              ) : null}
            </>
          ))}
    </div>
  );
};

export default DashboardOrders;
