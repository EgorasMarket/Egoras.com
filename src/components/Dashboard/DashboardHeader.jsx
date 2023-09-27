import React from "react";
import "./DashboardStyles/DashboardHeader.css";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import { Avatar } from "modern-react-avatar";
import "modern-react-avatar/dist/index.css";
import { useSelector } from "react-redux";
const DashboardHeader = ({ currentPathName }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="DashboardHeader">
      <div className="DashboardHeader_area">
        <div className="DashboardHeader_area_1">{currentPathName}</div>
        <div className="DashboardHeader_area_2">
          <div className="DashboardHeader_area_2_cont1">
            <NotificationsOutlinedIcon className="DashboardHeader_area_2_cont1_icon" />
          </div>
          <div className="DashboardHeader_area_2_cont2">
            <div className="DashboardHeader_area_2_cont2_cont1">
              <Avatar
                name={`${user?.firstName} ${user?.lastName}`}
                size="small"
                className="DashboardHeader_area_2_cont2_cont1_avatar"
              />
            </div>
            <div className="DashboardHeader_area_2_cont2_cont2">
              <div className="DashboardHeader_area_2_cont2_cont2_div1">
                {`${user?.firstName} ${user?.lastName}`}
              </div>
              <div className="DashboardHeader_area_2_cont2_cont2_div2">
                @{user?.username}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
