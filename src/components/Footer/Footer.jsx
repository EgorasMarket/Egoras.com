import React, { useState, useEffect } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";

import "../../stylesheet/footer.css";
const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the current year when the component mounts
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000); // Update the year every second (you can adjust the interval as needed)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="footerDiv">
      <div className="custom_container">
        <div className="footerDiv_area">
          <div className="footerDiv_area_1">
            <div className="footerDiv_area_1_img_div">
              <img
                src="/img/egoras-logo.svg"
                alt=""
                className="footerDiv_area_1_img"
              />
            </div>
            <div className="footerDiv_area_1_socials_div">
              <a
                href="https://www.facebook.com/egorasmarket/"
                className="footerDiv_area_1_socials_div_link1"
                target="_blank"
              >
                <FacebookIcon className="footerDiv_area_1_socials_div_link1_icon" />
              </a>
              <a
                href="https://twitter.com/egorasHQ"
                className="footerDiv_area_1_socials_div_link1"
                target="_blank"
              >
                <TwitterIcon className="footerDiv_area_1_socials_div_link1_icon" />
              </a>
              <a
                href="https://ng.linkedin.com/company/egorashq"
                className="footerDiv_area_1_socials_div_link1"
                target="_blank"
              >
                <LinkedInIcon className="footerDiv_area_1_socials_div_link1_icon" />
              </a>
              <a
                href="https://t.me/s/egorasmarket?before=480"
                className="footerDiv_area_1_socials_div_link1"
                target="_blank"
              >
                <TelegramIcon className="footerDiv_area_1_socials_div_link1_icon" />
              </a>
            </div>
          </div>
          <div className="footerDiv_area_2">
            &copy; {currentYear} Egoras Technologies LTD(RC - 1832671). All
            rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
