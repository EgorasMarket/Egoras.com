import React from "react";
import "../../stylesheet/checkout.css";
const ProductCheckoutPage = () => {
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
                      <img
                        src="/img/egr_gen1_detail_img.png"
                        alt=""
                        className="ProductCheckoutPage_div_section_area_1_area1_body_1_img"
                      />
                    </div>
                    <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1">
                      <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1_title">
                        Egoras Dual Fuel Tricycle
                      </div>
                      <div className="ProductCheckoutPage_div_section_area_1_area1_body_1_area1_amount">
                        #1,400,000.00
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
                    20
                  </div>
                </div>
                <div className="ProductCheckoutPage_div_section_area_1_area2_cont1">
                  <div className="ProductCheckoutPage_div_section_area_1_area2_cont1_title">
                    Sub Total
                  </div>
                  <div className="ProductCheckoutPage_div_section_area_1_area2_cont1_para">
                    #1,400,000.00
                  </div>
                </div>
              </div>
              <div className="ProductCheckoutPage_div_section_area_1_area3">
                <div className="ProductCheckoutPage_div_section_area_1_area3_title">
                  Wallet Ballance
                </div>
                <div className="ProductCheckoutPage_div_section_area_1_area3_body">
                  <div className="ProductCheckoutPage_div_section_area_1_area3_body_card1"></div>
                </div>
              </div>
            </div>
            <div className="ProductCheckoutPage_div_section_area_2">
              <div className="ProductCheckoutPage_div_section_area_2_area1"></div>
              <div className="ProductCheckoutPage_div_section_area_2_area2"></div>
              <div className="ProductCheckoutPage_div_section_area_2_area3"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCheckoutPage;
