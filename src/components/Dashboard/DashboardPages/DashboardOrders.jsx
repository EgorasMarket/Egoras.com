import React, { useState } from "react";
import Staticdata from "../../../assets/json/Static";
import "../DashboardStyles/dashboardOrder.css";
import DashboardOrderModal from "./DashboardOrderModal";
const DashboardOrders = () => {
  const [saleDetails, setSaleDetails] = useState("");
  const ToggleSaleDetails = (product_id, index_id) => {
    setSaleDetails(product_id);
    // setIndexId(index_id);
    console.log(product_id);
  };
  return (
    <div className="dashboardOrder_div">
      <div className="dashboardOrder_div_title">My Ordered Produts</div>
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
