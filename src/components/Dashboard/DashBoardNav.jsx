import React, { useEffect, useState } from "react";
import "./DashboardStyles/DashboardNav.css";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { Link, useNavigate } from "react-router-dom";

const DashBoardNav = ({ routes, activeRoute }) => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Dashboard");
  const ToglleActiveLink = (e) => {
    let id = e.currentTarget.id;
    setActiveLink(id);
  };
  useEffect(() => {
    if (activeRoute) {
      setActiveLink(activeRoute);
    }
    console.log(activeLink, activeRoute);
  }, [activeRoute]);

  return (
    <div className="DashboardNav">
      <div className="DashboardNav_head">
        <img
          src="/img/egoras-logo.svg"
          alt=""
          className="DashboardNav_head_img"
        />
      </div>
      <div className="DashboardNav_body">
        {routes
          .filter((data) => data.layout === "/dashboard")
          .map((data) => (
            <Link to={`${data.layout}/${data.path}`}>
              <div
                id={data.name}
                className={
                  activeLink === data.name
                    ? "DashboardNav_body_1_active"
                    : "DashboardNav_body_1"
                }
                onClick={ToglleActiveLink}
              >
                {data.icon}
                <div className="DashboardNav_body_1_txt">{data.name}</div>
              </div>
            </Link>
          ))}
      </div>
      <div className="DashboardNav_body_mobile">
        {routes
          .filter((data) => data.layout === "/dashboard")
          .slice(0, 5)
          .map((data) => (
            <Link to={`${data.layout}/${data.path}`}>
              <div
                id={data.name}
                className={
                  activeLink === data.name
                    ? "DashboardNav_body_1_active"
                    : "DashboardNav_body_1"
                }
                onClick={ToglleActiveLink}
              >
                {data.icon}
                <div className="DashboardNav_body_1_txt">{data.name}</div>
              </div>
            </Link>
          ))}
      </div>
      <div
        className="dashNavLogout"
        onClick={() => {
          localStorage.removeItem("x-token");
          window.location.href = "/login";
        }}
      >
        <PowerSettingsNewRoundedIcon className="dashNavLogout_icon" />
        <div className="dashNavLogout_txt">Logout</div>
      </div>
    </div>
  );
};

export default DashBoardNav;
