import React from "react";
import "../../stylesheet/Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
const Header = () => {
  return (
    <div className="header_div">
      <section className="header_section">
        <div className="custom_container">
          <div className="header_section_area">
            <div className="header_section_1">
              <div className="header_section_1_menu_btn">
                <MenuIcon className="header_section_1_menu_btn_icon" />
                Menu
              </div>
            </div>
            <div className="header_section_2">
              <a href="/">
                <img
                  src="/img/egoras-logo.svg"
                  alt=""
                  className="header_section_2_img"
                />
              </a>
            </div>
            <div className="header_section_3">
              <a href="/signup">
                <PermIdentityOutlinedIcon className="header_section_3_icon" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
