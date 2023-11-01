import React, { useState } from "react";
import "./DashboardStyles/DashboardHeader.css";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Avatar } from "modern-react-avatar";
import "modern-react-avatar/dist/index.css";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const DashboardHeader = ({ currentPathName }) => {
  const { user } = useSelector((state) => state.auth);
  const [headerMenu, setHeaderMenu] = useState(false);
  const ToggleHeaderMenu = () => {
    setHeaderMenu(!headerMenu);
  };
  return (
    <div className="DashboardHeader">
      <div className="DashboardHeader_area">
        <div className="DashboardHeader_area_cont">
          <MenuIcon
            className="DashboardHeader_area_cont_icon"
            onClick={ToggleHeaderMenu}
          />
          <div className="DashboardHeader_area_1">{currentPathName}</div>
        </div>
        <div className="DashboardHeader_area_2">
          <div className="DashboardHeader_area_2_cont1">
            <NotificationsOutlinedIcon className="DashboardHeader_area_2_cont1_icon" />
          </div>
          <div className="DashboardHeader_area_2_cont2">
            <div className="DashboardHeader_area_2_cont2_cont1">
              <Avatar
                name={`${user?.firstName || "null"} ${
                  user?.lastName || "null"
                }`}
                size="small"
                className="DashboardHeader_area_2_cont2_cont1_avatar"
              />
            </div>
            <div className="DashboardHeader_area_2_cont2_cont2">
              <div className="DashboardHeader_area_2_cont2_cont2_div1">
                {`${user?.firstName || "null"} ${user?.lastName || "null"}`}
              </div>
              <div className="DashboardHeader_area_2_cont2_cont2_div2">
                @{user?.username || "null"}
              </div>
            </div>
          </div>
        </div>
      </div>
      {headerMenu ? (
        <div className="DashHeaderMenuDiv">
          <div className="DashHeaderMenuDiv_conts">
            {/* <div className="DashHeaderMenuDiv_conts_close"> */}
            <CloseIcon
              className="DashHeaderMenuDiv_conts_close_icon"
              onClick={ToggleHeaderMenu}
            />
            {/* </div> */}
            <div className="DashHeaderMenuDiv_conts_body">
              <Link
                to="/dashboard/orders"
                className="DashHeaderMenuDiv_1"
                onClick={() => setHeaderMenu(false)}
              >
                <div className="DashHeaderMenuDiv_1_txt">Orders</div>
                <KeyboardArrowRightIcon className="DashHeaderMenuDiv_1_icon" />
              </Link>
              <Link
                to="/dashboard/transaction"
                className="DashHeaderMenuDiv_1"
                onClick={() => setHeaderMenu(false)}
              >
                <div className="DashHeaderMenuDiv_1_txt">Transactions</div>
                <KeyboardArrowRightIcon className="DashHeaderMenuDiv_1_icon" />
              </Link>

              <div className="dash_head_logout_btn_div">
                <button
                  className="dash_head_logout_btn"
                  onClick={() => {
                    localStorage.removeItem("x-token");
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardHeader;
