import React, { useState, useEffect } from "react";
import "../DashboardStyles/DashboardProducts.css";
import Staticdata from "../../../assets/json/Static";
import { ALL_PRODUCTS } from "../../../services/product_services";
import { toast } from "react-toastify";
const DashboardProducts = () => {
  const [activeTab, setActiveTab] = useState("egoras");
  const ToggleActiveTab = (e) => [setActiveTab(e.currentTarget.id)];

  const [products, setProducts] = useState([]);
  const [egorasProducts, setEgorasProducts] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);

  const fechAllProducts = async () => {
    const response = await ALL_PRODUCTS();

    if (!response.status) {
      toast.warn("Cannont retrieve all products");
    }

    setProducts(response.data.getAllUploadedProduct);
    //filter through all the products

    const ano = response.data.getAllUploadedProduct.filter((data) => {
      console.log(data);
      return data.product_brand === "Egoras";
    });
    setEgorasProducts(ano);
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
        <div className="DashboardProdDiv_body">
          {/* {Staticdata.egr_models_carous.map((data) => ( */}
          {egorasProducts.map((data) => {
            const image = JSON.parse(data.product_images);
            return (
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
                      ₦{parseFloat(data.final_amount).toFixed(2)}
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
            );
          })}
        </div>
      ) : (
        <div className="DashboardProdDiv_body">
          {Staticdata.egr_models_carous.map((data) => (
            <div className="DashboardProdDiv_body_cont1">
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
                  <a href={`/productdetailorder/${data.id}/${data.name}`}>
                    <button className="DashboardProdDiv_body_cont1_details_btn_div_btn">
                      Order Product
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardProducts;
