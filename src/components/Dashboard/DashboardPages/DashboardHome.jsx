import React from "react";
import "../DashboardStyles/DashboardHome.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
const DashboardHome = () => {
  return (
    <div className="dashboardHome">
      <div className="dashboardHome_area1">
        <div className="dashboardHome_area1_card1">
          <MoreVertOutlinedIcon className="dashboardHome_area1_card1_more_icon" />
          <div className="dashboardHome_area1_card1_icon">
            <ShoppingCartOutlinedIcon className="dashboardHome_area1_card1_icon_icon" />
          </div>
          <div className="dashboardHome_area1_card1_title_div">
            <div className="dashboardHome_area1_card1_title">
              Total Items Bought
            </div>
            <div className="dashboardHome_area1_card1_content">
              20
              <div className="dashboardHome_area1_card1_content_symbol">
                Itms
              </div>
            </div>
          </div>
        </div>
        <div className="dashboardHome_area1_card1">
          <MoreVertOutlinedIcon className="dashboardHome_area1_card1_more_icon" />
          <div className="dashboardHome_area1_card1_icon">
            <AccountBalanceWalletOutlinedIcon className="dashboardHome_area1_card1_icon_icon" />
          </div>
          <div className="dashboardHome_area1_card1_title_div">
            <div className="dashboardHome_area1_card1_title">
              Total Wallet Balance
            </div>
            <div className="dashboardHome_area1_card1_content">
              <div className="dashboardHome_area1_card1_content_symbol">₦</div>
              10,000,000
            </div>
          </div>
        </div>
        <div className="dashboardHome_area1_card1_last">
          <MoreVertOutlinedIcon className="dashboardHome_area1_card1_more_icon" />
          <div className="dashboardHome_area1_card1_icon">
            <ReceiptOutlinedIcon className="dashboardHome_area1_card1_icon_icon" />
          </div>
          <div className="dashboardHome_area1_card1_title_div">
            <div className="dashboardHome_area1_card1_title">
              Total Transactions
            </div>
            <div className="dashboardHome_area1_card1_content">
              100{" "}
              <div className="dashboardHome_area1_card1_content_symbol">
                Txns
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      <div className="start_kyc_div">
        <div className="start_kyc_div_1">Complete KYC</div>{" "}
        <div className="start_kyc_div_2">Verify</div>{" "}
      </div>
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      <div className="dashboardHome_area2">Chart Data</div>
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      <div className="dashboardHome_area3">Transaction Data</div>
    </div>
  );
};

export default DashboardHome;
