import React, { useState, useEffect } from "react";
import Staticdata from "../../../assets/json/Static";
import "../DashboardStyles/dashboardOrder.css";
import DashboardOrderModal from "./DashboardOrderModal";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import { FETCH_USER_PRODUCT_ORDERS } from "../../../services/products";
const DashboardOrders = () => {
  const [saleDetails, setSaleDetails] = useState("");
  const [activeTab, setActiveTab] = useState("egc");

  const ToggleActiveTab = (e) => [setActiveTab(e.currentTarget.id)];

  const ToggleSaleDetails = (product_id) => {
    setSaleDetails(product_id);
    console.log(product_id);
  };

  const getUserOrders = async () => {
    const response = await FETCH_USER_PRODUCT_ORDERS("0x999999999999");
    console.log(response);
  };

  useEffect(() => {
    getUserOrders();
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
                20
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
        {Staticdata.egr_models_carous.map((data) => (
          <div className="DashboardProdDiv_body_cont1_order">
            <div className="DashboardProdDiv_body_cont1_img">
              <img
                src={data.img}
                alt=""
                className="DashboardProdDiv_body_cont1_img_image"
              />
            </div>
            <div className="DashboardProdDiv_body_cont1_details">
              <div className="DashboardProdDiv_body_cont1_details_txt">
                <div className="DashboardProdDiv_body_cont1_details_txt_title">
                  {data.name}
                </div>
                <div className="DashboardProdDiv_body_cont1_details_txt_amount">
                  ₦{data.start_price}
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
        ))}
      </div>
      {saleDetails === ""
        ? null
        : Staticdata.egr_models_carous.map((data) => (
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
