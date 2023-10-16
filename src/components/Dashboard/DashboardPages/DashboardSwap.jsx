import React, { useEffect, useState } from "react";
import UpdatedSwap from "./UpdatedSwap/UpdatedSwap";
import AddLiquidity from "./UpdatedSwap/AddLiquidity";
const DashboardSwap = () => {
  // const [shareSwap, setShareSwap] = useState(false);
  const [activeTab, setActiveTab] = useState("swap");
  const ToggleActiveTab = (e) => [setActiveTab(e.currentTarget.id)];
  return (
    <div className="swap_liquidity_divs">
      <div className="DashboardWalletsDiv_area1">
        <div className="DashboardWalletsDiv_area1_cont">
          <div
            id="swap"
            className={
              activeTab === "swap"
                ? "DashboardWalletsDiv_area1_cont_tab1_active"
                : "DashboardWalletsDiv_area1_cont_tab1"
            }
            onClick={ToggleActiveTab}
          >
            Swap
          </div>
          <div
            id="liquidity"
            className={
              activeTab === "liquidity"
                ? "DashboardWalletsDiv_area1_cont_tab1_active"
                : "DashboardWalletsDiv_area1_cont_tab1"
            }
            onClick={ToggleActiveTab}
          >
            Liquidity
          </div>
        </div>
      </div>
      {activeTab === "swap" ? <UpdatedSwap /> : null}
      {activeTab === "liquidity" ? <AddLiquidity /> : null}
    </div>
    // <div className="coming_soon">Coming Soon</div>
  );
};

export default DashboardSwap;
