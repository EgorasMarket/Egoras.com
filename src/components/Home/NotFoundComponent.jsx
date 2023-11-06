import React from "react";
import "../../stylesheet/notFound.css";
import Lottie from "lottie-react";
import NotFound from "../../assets/icons/NotFound.json";

const NotFoundComponent = () => {
  return (
    <div className="notFound404Div">
      <div className="notFound404Div_area">
        <div className="notFound404Div_area_img_div">
          <Lottie
            animationData={NotFound}
            loop={true}
            autoPlay={true}
            className="notFound404Div_area_img"
            preserveAspectRatio="xMidYMid meet"
          />
        </div>
        <div className="notFound404Div_area_txt_area">
          <div className="notFound404Div_area_txt_area_head">
            Page Not Found
          </div>
          <div className="notFound404Div_area_txt_area_para">
            It seems you're lost, please return to the home page to get back on
            track.{" "}
          </div>
        </div>
        <div
          className="notFound404Div_area_btn_div
        "
        >
          <a href="/" className="notFound404Div_area_btn_link">
            <button className="notFound404Div_area_btn">Back Home</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundComponent;
