import React, { useState, useEffect } from "react";
import "../../stylesheet/Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Staticdata from "../../assets/json/Static";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [headerMenu, setHeaderMenu] = useState(false);
  const [modelList, setModelList] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [userData, setUserData] = useState(null);
  const toggleHeaderMenu = () => {
    setHeaderMenu(!headerMenu);
  };
  const toggleModelList = () => {
    setModelList(!modelList);
  };
  const toggleHovered = (e) => {
    setHovered(e.currentTarget.id);
  };
  const Models = [
    {
      id: "1",
      img: "/img/model_list_img1.png",
      model: "EGR-3000",
      productName: "Egoras dual fuel tricycle",
    },
    {
      id: "2",
      img: "/img/model_list_img1.png",
      model: "EGC-80",
      productName: "Egoras dual fuel tricycle",
    },
    {
      id: "3",
      img: "/img/model_list_img1.png",
      model: "EGC-80",
      productName: "Egoras dual fuel tricycle",
    },
    {
      id: "4",
      img: "/img/model_list_img1.png",
      model: "EGC-80",
      productName: "Egoras dual fuel tricycle",
    },
    {
      id: "5",
      img: "/img/model_list_img1.png",
      model: "EGR-3000",
      productName: "Egoras dual fuel tricycle",
    },
    {
      id: "6",
      img: "/img/model_list_img1.png",
      model: "EGC-80",
      productName: "Egoras dual fuel tricycle",
    },
    {
      id: "7",
      img: "/img/model_list_img1.png",
      model: "EGR-3000",
      productName: "Egoras dual fuel tricycle",
    },
    {
      id: "8",
      img: "/img/model_list_img1.png",
      model: "EGC-80",
      productName: "Egoras dual fuel tricycle",
    },
    {
      id: "9",
      img: "/img/model_list_img1.png",
      model: "EGR-3000",
      productName: "Egoras dual fuel tricycle",
    },
    {
      id: "10",
      img: "/img/model_list_img1.png",
      model: "EGC-80",
      productName: "Egoras dual fuel tricycle",
    },
  ];
  useEffect(() => {
    //console.logog(user);
    if (user === null) {
      setUserData(null);
    } else {
      setUserData(user);
    }

    if (user === undefined) {
      setUserData(null);
    } else {
      setUserData(user);
    }
  }, [user]);

  return (
    <div className="header_div">
      <section className="header_section">
        <div className="blur_div"></div>
        <div className="custom_container">
          <div className="header_section_area">
            <div className="header_section_1">
              {headerMenu ? (
                <div
                  className="header_section_1_menu_btn"
                  onClick={toggleHeaderMenu}
                >
                  <CloseIcon className="header_section_1_menu_btn_icon" />
                  Close
                </div>
              ) : (
                <>
                  <div
                    className="header_section_1_menu_btn"
                    onClick={toggleHeaderMenu}
                  >
                    <MenuIcon className="header_section_1_menu_btn_icon" />
                    Menu
                  </div>
                </>
              )}
              <a
                href="/dashboard/products"
                className="header_section_3_link_2_prd"
              >
                All Products
              </a>
            </div>
            <div className="header_section_2">
              <a href="/">
                <img
                  src="/img/egoras-logo.png"
                  alt=""
                  className="header_section_2_img"
                />
              </a>
            </div>

            <div className="header_section_3">
              {userData !== null ? (
                <a href="/dashboard" className="header_section_3_link">
                  <div className="header_section_3_link_txt">Dashboard</div>
                  <NorthEastIcon className="header_section_3_icon2" />
                </a>
              ) : (
                <a href="/login" className="header_section_3_link_2">
                  <PermIdentityOutlinedIcon className="header_section_3_icon" />
                  Login/Signup
                </a>
              )}
            </div>
            <div className="header_section_3_mobile">
              {userData !== null ? (
                <a href="/dashboard" className="header_section_3_link_2">
                  <DashboardIcon className="header_section_3_icon" />
                </a>
              ) : (
                <a href="/login" className="header_section_3_link_2">
                  <PermIdentityOutlinedIcon className="header_section_3_icon" />
                </a>
              )}
            </div>
          </div>
        </div>
        {headerMenu ? (
          <div className="headerMenuDiv">
            {modelList ? (
              <div className="headerMenuDiv_cont">
                <div
                  className="headerMenuDiv_cont_backButton"
                  onClick={toggleModelList}
                >
                  <ArrowBackIcon className="headerMenuDiv_cont_backButton_icon" />{" "}
                  Back
                </div>
                <div className="headerMenuDiv_cont_model_list_div">
                  {Staticdata.egr_models_carous2.map((data) => (
                    <div
                      id={data.id}
                      className="headerMenuDiv_cont_model_list_div_1"
                      onMouseEnter={toggleHovered}
                      onMouseLeave={() => {
                        setHovered(false);
                      }}
                    >
                      <img
                        src={data.img}
                        alt=""
                        className="headerMenuDiv_cont_model_list_div_1_img"
                      />

                      <>
                        {hovered === data.id ? (
                          <div className="headerMenuDiv_cont_model_list_div_1_hovered">
                            <div className="headerMenuDiv_cont_model_list_div_1_hovered_cont">
                              <div className="headerMenuDiv_cont_model_list_div_1_hovered_buttons">
                                <a
                                  className="headerMenuDiv_cont_model_list_div_1_hovered_buttons_link2"
                                  href={`/productdetailorder/${data.prodId}/${data.prodName}`}
                                >
                                  <button className="headerMenuDiv_cont_model_list_div_1_hovered_button2">
                                    Order Product
                                  </button>
                                </a>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="headerMenuDiv_cont">
                <div
                  className="headerMenuDiv_cont_cont1"
                  onClick={toggleModelList}
                >
                  <div className="headerMenuDiv_cont_cont1_title">Models</div>
                  <ArrowForwardIosIcon className="headerMenuDiv_cont_cont1_icon" />
                </div>
                <a
                  href="/dashboard/products"
                  className="headerMenuDiv_cont_cont1"
                >
                  <div className="headerMenuDiv_cont_cont1_title">
                    All products
                  </div>
                  <ArrowForwardIosIcon className="headerMenuDiv_cont_cont1_icon" />
                </a>
                <a href="/privacy" className="headerMenuDiv_cont_cont1">
                  <div className="headerMenuDiv_cont_cont1_title">Privacy</div>
                  <ArrowForwardIosIcon className="headerMenuDiv_cont_cont1_icon" />
                </a>
                <a
                  href="https://www.martgpt.org/"
                  target="_blank"
                  className="headerMenuDiv_cont_cont1"
                >
                  <div className="headerMenuDiv_cont_cont1_title">Martgpt</div>
                  <ArrowForwardIosIcon className="headerMenuDiv_cont_cont1_icon" />
                </a>
              </div>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default Header;
