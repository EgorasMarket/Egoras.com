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

    // Clear the interval when the component unmounts    sss
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="footerDiv" id="footer">
      <div className="container">
        <div className="footerDivArea">
          <div className="footerDiv1">
            <div className="footerDiv1_area1">
              <div className="footerDiv1_area1_cont1">
                <img
                  src="/img/egoras-logo.png"
                  alt=""
                  className="footerDiv1_img2"
                />
              </div>
              <div className="footerDiv1_area1_cont2">
                <div className="footerDiv1_area1_cont2_links">
                  <a href="https://twitter.com/egorasHQ">
                    <TwitterIcon className="footerDiv1_area1_cont2_links_link1" />
                  </a>
                  <a href="https://ng.linkedin.com/company/egorashq">
                    <LinkedInIcon className="footerDiv1_area1_cont2_links_link1" />
                  </a>
                  <a href="https://www.facebook.com/egorasmarket/">
                    <FacebookIcon className="footerDiv1_area1_cont2_links_link1" />
                  </a>
                </div>
              </div>
            </div>
            <div className="footerDiv1_area2">
              <div className="footerDiv1_area2_cont1">
                <div className="footerDiv1_area2_title">Company</div>
                <div className="footerDiv1_area2_title_subLinks_div">
                  <a
                    href="/privacy"
                    className="footerDiv1_area2_title_subLinks_div_link1"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/terms-conditions"
                    className="footerDiv1_area2_title_subLinks_div_link1"
                  >
                    Terms & conditions
                  </a>
                  {/* <a
                    href="/about"
                    className="footerDiv1_area2_title_subLinks_div_link1"
                  >
                    About Us
                  </a> */}
                </div>
              </div>
              <div className="footerDiv1_area2_cont1">
                <div className="footerDiv1_area2_title">Need Help?</div>
                <div className="footerDiv1_area2_title_subLinks_div">
                  <a
                    href="#"
                    className="footerDiv1_area2_title_subLinks_div_link1"
                  >
                    support@egoras.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <hr className="footer_hr" />
          <div className="footer_lastDiv">
            © {currentYear} Egoras Technologies, ltd.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
