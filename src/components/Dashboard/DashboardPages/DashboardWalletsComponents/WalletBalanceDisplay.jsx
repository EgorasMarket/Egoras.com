import React from "react";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
const WalletBalanceDisplay = ({
  walletBal,
  walletsymbol,
  depositFunc,
  withdrawFunc,
}) => {
  return (
    <div className="DashboardWalletsDiv_area2">
      <div className="DashboardWalletsDiv_area2_cont1">Portfolio Balance</div>
      <div className="DashboardWalletsDiv_area2_cont2">
        <div className="DashboardWalletsDiv_area2_cont2_area1">
          <div className="DashboardWalletsDiv_area2_cont2_area1_bal">
            <div className="DashboardWalletsDiv_area2_cont2_area1_bal_txt">
              {walletBal}
            </div>
            <span className="DashboardWalletsDiv_area2_cont2_area1_bal_span">
              {walletsymbol}
            </span>
          </div>
          <div className="DashboardWalletsDiv_area2_cont2_area1_profit">
            +30.01 {walletsymbol}
          </div>
        </div>
        <div className="DashboardWalletsDiv_area2_cont2_area2">
          <div
            className="DashboardWalletsDiv_area2_cont2_area2_cont1"
            onClick={depositFunc}
          >
            Deposit
          </div>
          <div
            className="DashboardWalletsDiv_area2_cont2_area2_cont2"
            onClick={withdrawFunc}
          >
            Withdraw
          </div>
        </div>
      </div>

      <SwapHorizOutlinedIcon className="walletSwapIcon" />
    </div>
  );
};

export default WalletBalanceDisplay;