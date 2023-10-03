import React, { useEffect, useState } from "react";
import "../DashboardStyles/DashboardHome.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AreaChartComp from "../../Common/CommonUI/Charts/AreaChartComp";
import { TablePagination } from "../../Common/CommonUI/Tables/TableComp";
import Staticdata from "../../../assets/json/Static";
import { Table } from "../../Common/CommonUI/Tables/TableComp";
import { FETCH_WALLET_BALANCES } from "../../../services/finance_services";
const DashboardHome = () => {
  const getWalletBalances = async () => {
    const response = await FETCH_WALLET_BALANCES();
    console.log(response);
  };
  useEffect(() => {
    getWalletBalances();
  }, []);

  return (
    <div className="dashboardHome">
      <div className="dashboardHome_area1">
        <div className="dashboardHome_area1_card1">
          <MoreVertOutlinedIcon className="dashboardHome_area1_card1_more_icon" />
          <div className="dashboardHome_area1_card1_icon">
            <AccountBalanceWalletOutlinedIcon className="dashboardHome_area1_card1_icon_icon" />
          </div>
          <div className="dashboardHome_area1_card1_title_div">
            <div className="dashboardHome_area1_card1_title">
              Total EGC Balance
            </div>
            <div className="dashboardHome_area1_card1_content">
              <div className="dashboardHome_area1_card1_content_amnt">
                <div className="dashboardHome_area1_card1_content_amnt_txt">
                  256.49
                </div>
                <div className="dashboardHome_area1_card1_content_symbol">
                  egc
                </div>
              </div>
              <div className="dashboardHome_area1_card1_content_btn_div">
                <button className="dashboardHome_area1_card1_content_btn">
                  Fund
                </button>
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
              Total Naira Balance
            </div>
            <div className="dashboardHome_area1_card1_content">
              <div className="dashboardHome_area1_card1_content_amnt">
                <div className="dashboardHome_area1_card1_content_symbol">
                  ₦
                </div>
                <div className="dashboardHome_area1_card1_content_amnt_txt">
                  10,000,000
                </div>
              </div>
              <div className="dashboardHome_area1_card1_content_btn_div">
                <button className="dashboardHome_area1_card1_content_btn">
                  Fund
                </button>
              </div>
            </div>
          </div>
        </div>
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
              <div className="dashboardHome_area1_card1_content_amnt">
                20
                <div className="dashboardHome_area1_card1_content_symbol">
                  itms
                </div>
              </div>
              <div className="dashboardHome_area1_card1_content_btn_div">
                <button className="dashboardHome_area1_card1_content_btn">
                  View
                </button>
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
        <div className="start_kyc_div_1">
          <div className="start_kyc_div_1_title">Upgrade your KYC level</div>{" "}
          <div className="start_kyc_div_1_para">
            Upgrade your kyc level to level2 to unlock transaction capabilities
            within the app
          </div>{" "}
        </div>{" "}
        <a href="/kyc/verify" className="start_kyc_div_2_link" target="_blank">
          {" "}
          <div className="start_kyc_div_2">Upgrade Level</div>
        </a>{" "}
      </div>
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* <div className="display_prod_div">
        <div className="DashboardWalletsDiv_area1_cont">
          <div
            id="egc"
            className={
              activeTab === "egc"
                ? "DashboardWalletsDiv_area1_cont_tab1_active"
                : "DashboardWalletsDiv_area1_cont_tab1"
            }
            onClick={ToggleActiveTab}
          >
            EGC Wallet
          </div>
          <div
            id="naira"
            className={
              activeTab === "naira"
                ? "DashboardWalletsDiv_area1_cont_tab1_active"
                : "DashboardWalletsDiv_area1_cont_tab1"
            }
            onClick={ToggleActiveTab}
          >
            Naira Wallet
          </div>
        </div>
      </div> */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      <div className="dashboardHome_area2">
        <AreaChartComp />
      </div>
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      {/* ================== */}
      <div className="dashboardHome_area3">
        <Table
          tableTitle={"Transactions"}
          TableData={Staticdata.productsTableData.slice(0, 8)}
        />
        {/* <div className="dashboardHome_area3_btn_div">
          <a
            href="/dashboard/transaction"
            className="dashboardHome_area3_btn_link"
          >
            <button className="dashboardHome_area3_btn">View more</button>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardHome;
