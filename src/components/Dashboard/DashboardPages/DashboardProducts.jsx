import React, { useState, useEffect } from "react";
import "../DashboardStyles/DashboardProducts.css";
import Staticdata from "../../../assets/json/Static";
import { ALL_PRODUCTS } from "../../../services/product_services";
import { toast } from "react-toastify";
import SyncLoader from "react-spinners/SyncLoader";
import NodataComp from "../../Common/CommonUI/NodataComp";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";
const DashboardProducts = () => {
  const [activeTab, setActiveTab] = useState("egoras");
  const ToggleActiveTab = (e) => [setActiveTab(e.currentTarget.id)];

  const [productLoading, setProductLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [egorasProducts, setEgorasProducts] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);

  const fechAllProducts = async () => {
    setProductLoading(true);
    const response = await ALL_PRODUCTS();
    //// console.logog(response);
    setProductLoading(false);
    if (response?.status === false) {
      //// console.logog("cnnnnnnnn");
      toast.warn("Cannont retrieve all products");
      return;
    }
    //// console.logog("no near");
    setProducts(response.data.getAllUploadedProduct);
    const ano = response.data.getAllUploadedProduct.filter((data) => {
      //// console.logog(data);
      return data.product_brand === "EGORAS";
    });
    const ano2 = response.data.getAllUploadedProduct.filter((data) => {
      //// console.logog(data);
      return data.product_brand !== "EGORAS";
    });
    setEgorasProducts(ano);
    setOtherProducts(ano2);
  };

  useEffect(() => {
    fechAllProducts();
  }, []);
  return (
    <div className="DashboardProdDiv">
      <div className="DashboardProdDiv_div1">
        <div
          id="egoras"
          className={
            activeTab === "egoras"
              ? "DashboardProdDiv_div1_cont1_active"
              : "DashboardProdDiv_div1_cont1"
          }
          onClick={ToggleActiveTab}
        >
          Egoras Products
        </div>
        <div
          id="others"
          className={
            activeTab === "others"
              ? "DashboardProdDiv_div1_cont1_active"
              : "DashboardProdDiv_div1_cont1"
          }
          onClick={ToggleActiveTab}
        >
          Other Products
        </div>
        {/* <input type="search" name="" id="" /> */}
      </div>

      {activeTab === "egoras" ? (
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
            <>
              {egorasProducts.length <= 0 ? (
                <NodataComp />
              ) : (
                <div className="DashboardProdDiv_body">
                  {egorasProducts.map((data) => {
                    const image = JSON.parse(data.product_images);
                    return (
                      <>
                        {data.quantity < 1 ? null : (
                          <div className="DashboardProdDiv_body_cont1">
                            <div className="DashboardProdDiv_body_cont1_img">
                              <img
                                src={image[0]}
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
                                  {numberWithCommas(
                                    parseFloat(data.final_amount).toFixed(2)
                                  )}
                                </div>
                              </div>
                              <div className="DashboardProdDiv_body_cont1_details_btn_div">
                                <a
                                  href={`/productdetailorder/${data.product_id}/${data.product_name}`}
                                >
                                  <button className="DashboardProdDiv_body_cont1_details_btn_div_btn">
                                    Order Product
                                  </button>
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </>
      ) : (
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
            <>
              {otherProducts.length <= 0 ? (
                <NodataComp />
              ) : (
                <div className="DashboardProdDiv_body">
                  {otherProducts.map((data) => {
                    const image = JSON.parse(data.product_images);
                    return (
                      <>
                        {data.quantity < 1 ? null : (
                          <div className="DashboardProdDiv_body_cont1">
                            <div className="DashboardProdDiv_body_cont1_img">
                              <img
                                src={image[0]}
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
                                  {numberWithCommas(
                                    parseFloat(data.final_amount).toFixed(2)
                                  )}
                                </div>
                              </div>
                              <div className="DashboardProdDiv_body_cont1_details_btn_div">
                                <a
                                  href={`/productdetailorder/${data.product_id}/${data.product_name}`}
                                >
                                  <button className="DashboardProdDiv_body_cont1_details_btn_div_btn">
                                    Order Product
                                  </button>
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardProducts;
