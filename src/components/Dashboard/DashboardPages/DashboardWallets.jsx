import React, { useEffect, useState } from "react";
import "../DashboardStyles/DashboardWallet.css";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AppShortcutOutlinedIcon from "@mui/icons-material/AppShortcutOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { QRCode } from "react-qrcode-logo";
const DashboardWallets = () => {
  const [activeTab, setActiveTab] = useState("egc");
  const [depositMoney, setDepositMoney] = useState(false);
  const [withdrawMoney, setWithdrawMoney] = useState(false);
  const [egcBlockchainDeposit, setEgcBlockchainDeposit] = useState(false);
  const [egcBlockchainWithdrawal, setEgcBlockchainWithdrawal] = useState(false);
  const [egcUserWithdrawal, setEgcUserWithdrawal] = useState(false);
  const [egcUserDeposit, setEgcUserDeposit] = useState(false);
  const [depositMoneyNaira, setDepositMoneyNaira] = useState(false);
  const [depositMoneyNairaBank, setDepositMoneyNairaBank] = useState(false);
  const [depositMoneyNairaUser, setDepositMoneyNairaUser] = useState(false);
  const [withdrawMoneyNaira, setWithdrawMoneyNaira] = useState(false);
  const [nairaBankWithdrawal, setNairaBankWithdrawal] = useState(false);
  const [nairaUserWithdrawal, setNairaUserWithdrawal] = useState(false);

  const ToggleActiveTab = (e) => [setActiveTab(e.currentTarget.id)];

  const ToggleDepositMoneyModal = () => {
    setDepositMoney(!depositMoney);
  };

  const ToggleWithdrawMoneyModal = () => {
    setWithdrawMoney(!withdrawMoney);
  };

  const ToggleEgcBlockchainDepositModal = () => {
    setEgcBlockchainDeposit(!egcBlockchainDeposit);
    setDepositMoney(!depositMoney);
  };

  const ToggleEgcBlockchainWithdrawModal = () => {
    setEgcBlockchainWithdrawal(!egcBlockchainWithdrawal);
    setWithdrawMoney(!withdrawMoney);
  };

  const ToggleEgcUserDepositModal = () => {
    setEgcUserDeposit(!egcUserDeposit);
    setDepositMoney(!depositMoney);
  };

  const ToggleEgcUserWithdrawtModal = () => {
    setEgcUserWithdrawal(!egcUserWithdrawal);
    setWithdrawMoney(!withdrawMoney);
  };

  const ToggleDepositMoneyNairaModal = () => {
    setDepositMoneyNaira(!depositMoneyNaira);
  };

  const ToggleWithdrawMoneyNairaModal = () => {
    setWithdrawMoneyNaira(!withdrawMoneyNaira);
  };

  const ToggleDepositMoneyNairaBankModal = () => {
    setDepositMoneyNairaBank(!depositMoneyNairaBank);
    setDepositMoneyNaira(!depositMoneyNaira);
  };

  const ToggleDepositMoneyNairaUserModal = () => {
    setDepositMoneyNairaUser(!depositMoneyNairaUser);
    setDepositMoneyNaira(!depositMoneyNaira);
  };

  const ToggleWithdrawNairaBankModal = () => {
    setNairaBankWithdrawal(!nairaBankWithdrawal);
    setWithdrawMoneyNaira(!withdrawMoneyNaira);
  };

  const ToggleNairaUserWithdrawtModal = () => {
    setNairaUserWithdrawal(!nairaUserWithdrawal);
    setWithdrawMoneyNaira(!withdrawMoneyNaira);
  };
  return (
    <div className="DashboardWalletsDiv">
      <div className="DashboardWalletsDiv_area1">
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
      </div>
      <div className="DashboardWalletsDiv_body">
        {activeTab === "egc" ? (
          <div className="DashboardWalletsDiv_area2">
            <div className="DashboardWalletsDiv_area2_cont1">
              Portfolio Balance
            </div>
            <div className="DashboardWalletsDiv_area2_cont2">
              <div className="DashboardWalletsDiv_area2_cont2_area1">
                <div className="DashboardWalletsDiv_area2_cont2_area1_bal">
                  240.45{" "}
                  <span className="DashboardWalletsDiv_area2_cont2_area1_bal_span">
                    egc
                  </span>
                </div>
                <div className="DashboardWalletsDiv_area2_cont2_area1_profit">
                  +30.01 egc
                </div>
              </div>
              <div className="DashboardWalletsDiv_area2_cont2_area2">
                <div
                  className="DashboardWalletsDiv_area2_cont2_area2_cont1"
                  onClick={ToggleDepositMoneyModal}
                >
                  Deposit
                </div>
                <div
                  className="DashboardWalletsDiv_area2_cont2_area2_cont2"
                  onClick={ToggleWithdrawMoneyModal}
                >
                  Withdraw
                </div>
              </div>
            </div>

            <SwapHorizOutlinedIcon className="walletSwapIcon" />
          </div>
        ) : null}
        {activeTab === "naira" ? (
          <div className="DashboardWalletsDiv_area2">
            <div className="DashboardWalletsDiv_area2_cont1">
              Portfolio Balance
            </div>
            <div className="DashboardWalletsDiv_area2_cont2">
              <div className="DashboardWalletsDiv_area2_cont2_area1">
                <div className="DashboardWalletsDiv_area2_cont2_area1_bal">
                  <span className="DashboardWalletsDiv_area2_cont2_area1_bal_span">
                    ₦
                  </span>
                  24,000,000
                </div>
                <div className="DashboardWalletsDiv_area2_cont2_area1_profit">
                  +
                  <span className="DashboardWalletsDiv_area2_cont2_area1_profit_span">
                    ₦
                  </span>
                  30,000.01
                </div>
              </div>
              <div className="DashboardWalletsDiv_area2_cont2_area2">
                <div
                  className="DashboardWalletsDiv_area2_cont2_area2_cont1"
                  onClick={ToggleDepositMoneyNairaModal}
                >
                  Deposit
                </div>
                <div
                  className="DashboardWalletsDiv_area2_cont2_area2_cont2"
                  onClick={ToggleWithdrawMoneyNairaModal}
                >
                  Withdraw
                </div>
              </div>
            </div>
            <SwapHorizOutlinedIcon className="walletSwapIcon" />
          </div>
        ) : null}
        <div className="DashboardWalletsDiv_area3">
          <div className="DashboardWalletsDiv_area3_cont1">
            Transaction Chart
          </div>
        </div>
        <div className="DashboardWalletsDiv_area3">
          <div className="DashboardWalletsDiv_area3_cont1">
            Transaction Table
          </div>
        </div>
      </div>

      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      {/* ============= */}
      {depositMoney ? (
        <div className="depositMoneyDiv">
          <div className="depositMoneyDiv_cont">
            <CloseOutlinedIcon
              className="depositMoneyDiv_icon"
              onClick={ToggleDepositMoneyModal}
            />
            <div className="depositMoneyDiv_cont_1">
              <div className="depositMoneyDiv_cont_title_cont">
                <div className="depositMoneyDiv_cont_title_cont_title">
                  Egc Wallet Deposit
                </div>
                <div className="depositMoneyDiv_cont_title_cont_para">
                  Supercharge your Egc wallet with an array of swift and
                  efficient funding options!
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body">
                <div
                  className="depositMoneyDiv_cont_body_cont1"
                  onClick={ToggleEgcBlockchainDepositModal}
                >
                  <WalletOutlinedIcon className="depositMoneyDiv_cont_body_cont1_icon" />
                  <div className="depositMoneyDiv_cont_body_cont1_title_body">
                    <div className="depositMoneyDiv_cont_body_cont1_title">
                      Deposit Via Blockchain
                    </div>
                    <div className="depositMoneyDiv_cont_body_cont1_para">
                      Add funds directly from a blockchain account
                    </div>
                  </div>
                </div>
                <div
                  className="depositMoneyDiv_cont_body_cont1"
                  onClick={ToggleEgcUserDepositModal}
                >
                  <AppShortcutOutlinedIcon className="depositMoneyDiv_cont_body_cont1_icon" />
                  <div className="depositMoneyDiv_cont_body_cont1_title_body">
                    <div className="depositMoneyDiv_cont_body_cont1_title">
                      Deposit Via Username
                    </div>
                    <div className="depositMoneyDiv_cont_body_cont1_para">
                      Add funds directly from an egoras user
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_2">
              <button
                className="depositMoneyDiv_cont_2_btn"
                onClick={ToggleDepositMoneyModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {depositMoneyNaira ? (
        <div className="depositMoneyDiv">
          <div className="depositMoneyDiv_cont">
            <CloseOutlinedIcon
              className="depositMoneyDiv_icon"
              onClick={ToggleDepositMoneyNairaModal}
            />
            <div className="depositMoneyDiv_cont_1">
              <div className="depositMoneyDiv_cont_title_cont">
                <div className="depositMoneyDiv_cont_title_cont_title">
                  Naira Wallet Deposit
                </div>
                <div className="depositMoneyDiv_cont_title_cont_para">
                  Supercharge your Naira wallet with an array of swift and
                  efficient funding options!
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body">
                <div
                  className="depositMoneyDiv_cont_body_cont1"
                  onClick={ToggleDepositMoneyNairaBankModal}
                >
                  <AccountBalanceOutlinedIcon className="depositMoneyDiv_cont_body_cont1_icon" />
                  <div className="depositMoneyDiv_cont_body_cont1_title_body">
                    <div className="depositMoneyDiv_cont_body_cont1_title">
                      Deposit Via Bank Account
                    </div>
                    <div className="depositMoneyDiv_cont_body_cont1_para">
                      Add funds directly from a bank account
                    </div>
                  </div>
                </div>
                <div
                  className="depositMoneyDiv_cont_body_cont1"
                  onClick={ToggleDepositMoneyNairaUserModal}
                >
                  <AppShortcutOutlinedIcon className="depositMoneyDiv_cont_body_cont1_icon" />
                  <div className="depositMoneyDiv_cont_body_cont1_title_body">
                    <div className="depositMoneyDiv_cont_body_cont1_title">
                      Deposit Via Username
                    </div>
                    <div className="depositMoneyDiv_cont_body_cont1_para">
                      Add funds directly from an egoras user
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_2">
              <button
                className="depositMoneyDiv_cont_2_btn"
                onClick={ToggleDepositMoneyNairaModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {withdrawMoney ? (
        <div className="depositMoneyDiv">
          <div className="depositMoneyDiv_cont">
            <CloseOutlinedIcon
              className="depositMoneyDiv_icon"
              onClick={ToggleWithdrawMoneyModal}
            />
            <div className="depositMoneyDiv_cont_1">
              <div className="depositMoneyDiv_cont_title_cont">
                <div className="depositMoneyDiv_cont_title_cont_title">
                  Egc Wallet Withdrawal
                </div>
                <div className="depositMoneyDiv_cont_title_cont_para">
                  Transfer your Egc funds with an array of swift and efficient
                  transfer options!
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body">
                <div
                  className="depositMoneyDiv_cont_body_cont1"
                  onClick={ToggleEgcBlockchainWithdrawModal}
                >
                  <WalletOutlinedIcon className="depositMoneyDiv_cont_body_cont1_icon" />
                  <div className="depositMoneyDiv_cont_body_cont1_title_body">
                    <div className="depositMoneyDiv_cont_body_cont1_title">
                      Send To Blockchain
                    </div>
                    <div className="depositMoneyDiv_cont_body_cont1_para">
                      Send funds directly to a blockchain account
                    </div>
                  </div>
                </div>
                <div
                  className="depositMoneyDiv_cont_body_cont1"
                  onClick={ToggleEgcUserWithdrawtModal}
                >
                  <AppShortcutOutlinedIcon className="depositMoneyDiv_cont_body_cont1_icon" />
                  <div className="depositMoneyDiv_cont_body_cont1_title_body">
                    <div className="depositMoneyDiv_cont_body_cont1_title">
                      Send To An Egoras User
                    </div>
                    <div className="depositMoneyDiv_cont_body_cont1_para">
                      Send funds directly to an egoras user
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_2">
              <button
                className="depositMoneyDiv_cont_2_btn"
                onClick={ToggleWithdrawMoneyModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {withdrawMoneyNaira ? (
        <div className="depositMoneyDiv">
          <div className="depositMoneyDiv_cont">
            <CloseOutlinedIcon
              className="depositMoneyDiv_icon"
              onClick={ToggleWithdrawMoneyNairaModal}
            />
            <div className="depositMoneyDiv_cont_1">
              <div className="depositMoneyDiv_cont_title_cont">
                <div className="depositMoneyDiv_cont_title_cont_title">
                  Naira Wallet Withdrawal
                </div>
                <div className="depositMoneyDiv_cont_title_cont_para">
                  Withraw your Naira funds with an array of swift and efficient
                  withdrawal options!
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body">
                <div
                  className="depositMoneyDiv_cont_body_cont1"
                  onClick={ToggleWithdrawNairaBankModal}
                >
                  <AccountBalanceOutlinedIcon className="depositMoneyDiv_cont_body_cont1_icon" />
                  <div className="depositMoneyDiv_cont_body_cont1_title_body">
                    <div className="depositMoneyDiv_cont_body_cont1_title">
                      Send to Bank Account
                    </div>
                    <div className="depositMoneyDiv_cont_body_cont1_para">
                      Send funds directly to a bank account
                    </div>
                  </div>
                </div>
                <div
                  className="depositMoneyDiv_cont_body_cont1"
                  onClick={ToggleNairaUserWithdrawtModal}
                >
                  <AppShortcutOutlinedIcon className="depositMoneyDiv_cont_body_cont1_icon" />
                  <div className="depositMoneyDiv_cont_body_cont1_title_body">
                    <div className="depositMoneyDiv_cont_body_cont1_title">
                      Send to Egoras user
                    </div>
                    <div className="depositMoneyDiv_cont_body_cont1_para">
                      Send funds directly to an egoras user
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_2">
              <button
                className="depositMoneyDiv_cont_2_btn"
                onClick={ToggleWithdrawMoneyNairaModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {egcBlockchainDeposit ? (
        <div className="depositMoneyDiv">
          <div className="depositMoneyDiv_cont">
            <ArrowBackOutlinedIcon
              className="depositMoneyDiv_icon"
              onClick={ToggleEgcBlockchainDepositModal}
            />
            <div className="depositMoneyDiv_cont_1">
              <div className="depositMoneyDiv_cont_title_cont">
                <div className="depositMoneyDiv_cont_title_cont_title">
                  Deposit Egc
                </div>
                <div className="depositMoneyDiv_cont_title_cont_para">
                  Add funds directly from a blockchain account
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body">
                <div className="depositMoneyDiv_cont_body_input_div">
                  <div className="depositMoneyDiv_cont_body_input_div_title">
                    Coin:
                  </div>
                  <div className="depositMoneyDiv_cont_body_input_div_div">
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                      <img
                        src="/img/egc_icon2.svg"
                        alt=""
                        className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                      />
                      Egoras Credit
                    </div>
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                      EGC
                    </div>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_input_div2">
                  <div className="depositMoneyDiv_cont_body_input_div_title">
                    Network:
                  </div>
                  <div className="depositMoneyDiv_cont_body_input_div_div">
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                      <img
                        src="/img/bsc_icon.png"
                        alt=""
                        className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                      />
                      Binance Smart Chain
                    </div>
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                      BEP20
                    </div>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_qr_div">
                  <QRCode
                    value="0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"
                    quietZone={5}
                    eyeColor="#fff"
                    bgColor="#161619"
                    fgColor="#fff"
                    logoImage="/img/egc_icon2.svg"
                    eyeRadius={[
                      [5, 5, 0, 5],
                      [5, 5, 5, 0],
                      [5, 0, 5, 5],
                    ]}
                    removeQrCodeBehindLogo={true}
                    // logoPadding={5}
                    // logoWidth={15}
                    logoPaddingStyle="circle"
                    className="depositMoneyDiv_cont_body_qr_div_qr"
                  />
                  <div className="depositMoneyDiv_cont_body_qr_div_txt">
                    Scan Qrcode or copy wallet address to make payment
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_div">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    WalletAddress:
                  </div>

                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                    <input
                      type="text"
                      value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                      className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                    />
                    <button className="depositMoneyDiv_cont_body_wallet_addr_div_btn">
                      Copy
                      <ContentCopyOutlinedIcon className="depositMoneyDiv_cont_body_wallet_addr_div_btn_icon" />
                    </button>
                  </div>
                </div>

                <div className="depositMoneyDiv_cont_body_tips_div">
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Send only EGC to this deposit address
                    </div>
                  </div>
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Ensure the network is BNB Smart-Chain (BEP20)
                    </div>
                  </div>
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Do not send Nfts to this address
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_2">
              <button
                className="depositMoneyDiv_cont_2_btn"
                onClick={ToggleEgcBlockchainDepositModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {egcBlockchainWithdrawal ? (
        <div className="depositMoneyDiv">
          <div className="depositMoneyDiv_cont">
            <ArrowBackOutlinedIcon
              className="depositMoneyDiv_icon"
              onClick={ToggleEgcBlockchainWithdrawModal}
            />
            <div className="depositMoneyDiv_cont_1">
              <div className="depositMoneyDiv_cont_title_cont">
                <div className="depositMoneyDiv_cont_title_cont_title">
                  Send Egc
                </div>
                <div className="depositMoneyDiv_cont_title_cont_para">
                  Send funds directly to a blockchain account
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body">
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    WalletAddress:
                  </div>
                  <input
                    type="text"
                    placeholder="0xXXXXXXXXXXXXXXX"
                    // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                    className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                  />
                </div>
                <div className="depositMoneyDiv_cont_body_input_div2">
                  <div className="depositMoneyDiv_cont_body_input_div_title">
                    Network:
                  </div>
                  <div className="depositMoneyDiv_cont_body_input_div_div">
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                      <img
                        src="/img/bsc_icon.png"
                        alt=""
                        className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                      />
                      Binance Smart Chain
                    </div>
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                      BEP20
                    </div>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Withdrawal Amount:
                  </div>
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                    <input
                      type="number"
                      placeholder="0.00"
                      // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                      className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                    />
                    <button className="depositMoneyDiv_cont_body_wallet_addr_div_btn">
                      Max
                    </button>
                  </div>
                  <div className="availegc_bal_div">
                    <div className="availegc_bal_div_title">Available</div>
                    <div className="availegc_bal_div_amount">240.5 EGC</div>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Withdrawal Remarks (optional):
                  </div>
                  <input
                    type="text"
                    // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                    className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                  />
                </div>

                <div className="depositMoneyDiv_cont_body_tips_divb">
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Minimum single withdrawal amount: 0.5egc
                    </div>
                  </div>
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Maximum single withdrawal amount: 2,000egc
                    </div>
                  </div>
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Make sure the the receiver's wallet is a bep20 wallet
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_2">
              <button
                className="depositMoneyDiv_cont_2_btn"
                // onClick={ToggleEgcBlockchainDepositModal}
              >
                Send Funds
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {egcUserDeposit ? (
        <div className="depositMoneyDiv">
          <div className="depositMoneyDiv_cont">
            <ArrowBackOutlinedIcon
              className="depositMoneyDiv_icon"
              onClick={ToggleEgcUserDepositModal}
            />
            <div className="depositMoneyDiv_cont_1">
              <div className="depositMoneyDiv_cont_title_cont">
                <div className="depositMoneyDiv_cont_title_cont_title">
                  Deposit Egc
                </div>
                <div className="depositMoneyDiv_cont_title_cont_para">
                  Add funds directly from an egoras user
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body">
                <div className="depositMoneyDiv_cont_body_input_div">
                  <div className="depositMoneyDiv_cont_body_input_div_title">
                    Coin:
                  </div>
                  <div className="depositMoneyDiv_cont_body_input_div_div">
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                      <img
                        src="/img/egc_icon2.svg"
                        alt=""
                        className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                      />
                      Egoras Credit
                    </div>
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                      EGC
                    </div>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_qr_div">
                  <QRCode
                    value="Cyntax"
                    quietZone={5}
                    eyeColor="#fff"
                    bgColor="#161619"
                    fgColor="#fff"
                    logoImage="/img/egc_icon2.svg"
                    eyeRadius={[
                      [5, 5, 0, 5],
                      [5, 5, 5, 0],
                      [5, 0, 5, 5],
                    ]}
                    removeQrCodeBehindLogo={true}
                    // logoPadding={5}
                    // logoWidth={15}
                    logoPaddingStyle="circle"
                    className="depositMoneyDiv_cont_body_qr_div_qr"
                  />
                  <div className="depositMoneyDiv_cont_body_qr_div_txt">
                    Scan Qrcode or copy and send username to an egoras user to
                    add funds
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_div">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Username:
                  </div>
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                    <input
                      type="text"
                      value={"Cyntax"}
                      className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                    />
                    <button className="depositMoneyDiv_cont_body_wallet_addr_div_btn">
                      Copy
                      <ContentCopyOutlinedIcon className="depositMoneyDiv_cont_body_wallet_addr_div_btn_icon" />
                    </button>
                  </div>
                </div>

                <div className="depositMoneyDiv_cont_body_tips_div">
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Send only EGC to this deposit address
                    </div>
                  </div>
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Only Internal Deposit/Receive
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_2">
              <button
                className="depositMoneyDiv_cont_2_btn"
                onClick={ToggleEgcUserDepositModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {egcUserWithdrawal ? (
        <div className="depositMoneyDiv">
          <div className="depositMoneyDiv_cont">
            <ArrowBackOutlinedIcon
              className="depositMoneyDiv_icon"
              onClick={ToggleEgcUserWithdrawtModal}
            />
            <div className="depositMoneyDiv_cont_1">
              <div className="depositMoneyDiv_cont_title_cont">
                <div className="depositMoneyDiv_cont_title_cont_title">
                  Send Egc
                </div>
                <div className="depositMoneyDiv_cont_title_cont_para">
                  Send funds directly to an egoras user
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body">
                <div className="depositMoneyDiv_cont_body_input_div">
                  <div className="depositMoneyDiv_cont_body_input_div_title">
                    Coin:
                  </div>
                  <div className="depositMoneyDiv_cont_body_input_div_div">
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                      <img
                        src="/img/egc_icon2.svg"
                        alt=""
                        className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                      />
                      Egoras Credit
                    </div>
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                      EGC
                    </div>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Recipient Email or Username:
                  </div>
                  <input
                    type="text"
                    placeholder="@John Doe"
                    // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                    className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                  />
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Withdrawal Amount:
                  </div>
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                    <input
                      type="number"
                      placeholder="0.00"
                      // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                      className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                    />
                    <button className="depositMoneyDiv_cont_body_wallet_addr_div_btn">
                      Max
                    </button>
                  </div>
                  <div className="availegc_bal_div">
                    <div className="availegc_bal_div_title">Available</div>
                    <div className="availegc_bal_div_amount">240.5 EGC</div>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Withdrawal Remarks (optional):
                  </div>
                  <input
                    type="text"
                    // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                    className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                  />
                </div>

                <div className="depositMoneyDiv_cont_body_tips_divb">
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Minimum single withdrawal amount: 0.5egc
                    </div>
                  </div>
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Maximum single withdrawal amount: 2,000egc
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_2">
              <button
                className="depositMoneyDiv_cont_2_btn"
                // onClick={ToggleEgcUserDepositModal}
              >
                Send funds
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {depositMoneyNairaBank ? (
        <div className="depositMoneyDiv">
          <div className="depositMoneyDiv_cont">
            <ArrowBackOutlinedIcon
              className="depositMoneyDiv_icon"
              onClick={ToggleDepositMoneyNairaBankModal}
            />
            <div className="depositMoneyDiv_cont_1">
              <div className="depositMoneyDiv_cont_title_cont">
                <div className="depositMoneyDiv_cont_title_cont_title">
                  Deposit Naira
                </div>
                <div className="depositMoneyDiv_cont_title_cont_para">
                  Add funds directly from a bank account
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body">
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Account Number:
                  </div>
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                    <input
                      type="text"
                      value={"2327729191"}
                      className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                    />
                    <button className="depositMoneyDiv_cont_body_wallet_addr_div_btn">
                      Copy
                      <ContentCopyOutlinedIcon className="depositMoneyDiv_cont_body_wallet_addr_div_btn_icon" />
                    </button>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Account Name:
                  </div>
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                    <input
                      type="text"
                      value={"Okwara Ifeanyi Samuel"}
                      className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                    />
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_input_div2">
                  <div className="depositMoneyDiv_cont_body_input_div_title">
                    Bank Name:
                  </div>
                  <div className="depositMoneyDiv_cont_body_input_div_div">
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                      <img
                        src="/img/egc_icon2.svg"
                        alt=""
                        className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                      />
                      Providus Bank
                    </div>
                  </div>
                </div>

                <div className="depositMoneyDiv_cont_body_tips_divb">
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Send Naira to this bank account
                    </div>
                  </div>
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Only Internal Deposit/Receive
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_2">
              <button
                className="depositMoneyDiv_cont_2_btn"
                onClick={ToggleDepositMoneyNairaBankModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {depositMoneyNairaUser ? (
        <div className="depositMoneyDiv">
          <div className="depositMoneyDiv_cont">
            <ArrowBackOutlinedIcon
              className="depositMoneyDiv_icon"
              onClick={ToggleDepositMoneyNairaUserModal}
            />
            <div className="depositMoneyDiv_cont_1">
              <div className="depositMoneyDiv_cont_title_cont">
                <div className="depositMoneyDiv_cont_title_cont_title">
                  Deposit Naira
                </div>
                <div className="depositMoneyDiv_cont_title_cont_para">
                  Add funds directly from an egoras user
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body">
                <div className="depositMoneyDiv_cont_body_input_div">
                  <div className="depositMoneyDiv_cont_body_input_div_title">
                    Currency:
                  </div>
                  <div className="depositMoneyDiv_cont_body_input_div_div">
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                      <img
                        src="/img/egc_icon2.svg"
                        alt=""
                        className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                      />
                      Nigerian Naira
                    </div>
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                      NGN
                    </div>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_qr_div">
                  <QRCode
                    value="Cyntax"
                    quietZone={5}
                    eyeColor="#fff"
                    bgColor="#161619"
                    fgColor="#fff"
                    logoImage="/img/egc_icon2.svg"
                    eyeRadius={[
                      [5, 5, 0, 5],
                      [5, 5, 5, 0],
                      [5, 0, 5, 5],
                    ]}
                    removeQrCodeBehindLogo={true}
                    // logoPadding={5}
                    // logoWidth={15}
                    logoPaddingStyle="circle"
                    className="depositMoneyDiv_cont_body_qr_div_qr"
                  />
                  <div className="depositMoneyDiv_cont_body_qr_div_txt">
                    Scan Qrcode or copy and send username to an egoras user to
                    add funds
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_div">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Username:
                  </div>
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                    <input
                      type="text"
                      value={"Cyntax"}
                      className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                    />
                    <button className="depositMoneyDiv_cont_body_wallet_addr_div_btn">
                      Copy
                      <ContentCopyOutlinedIcon className="depositMoneyDiv_cont_body_wallet_addr_div_btn_icon" />
                    </button>
                  </div>
                </div>

                <div className="depositMoneyDiv_cont_body_tips_div">
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Send only NGN to this username
                    </div>
                  </div>
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Only Internal Deposit/Receive
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_2">
              <button
                className="depositMoneyDiv_cont_2_btn"
                onClick={ToggleDepositMoneyNairaUserModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {nairaBankWithdrawal ? (
        <div className="depositMoneyDiv">
          <div className="depositMoneyDiv_cont">
            <ArrowBackOutlinedIcon
              className="depositMoneyDiv_icon"
              onClick={ToggleWithdrawNairaBankModal}
            />
            <div className="depositMoneyDiv_cont_1">
              <div className="depositMoneyDiv_cont_title_cont">
                <div className="depositMoneyDiv_cont_title_cont_title">
                  Send Naira
                </div>
                <div className="depositMoneyDiv_cont_title_cont_para">
                  Send funds directly to a Bank account
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body">
                <div className="depositMoneyDiv_cont_body_input_div2">
                  <div className="depositMoneyDiv_cont_body_input_div_title">
                    Currency:
                  </div>
                  <div className="depositMoneyDiv_cont_body_input_div_div">
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                      <img
                        src="/img/bsc_icon.png"
                        alt=""
                        className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                      />
                      Nigerian Naira
                    </div>
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                      NGN
                    </div>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Bank:
                  </div>
                  <select
                    name=""
                    id=""
                    placeholder="0xXXXXXXXXXXXXXXX"
                    defaultValue={"0"}
                    className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                  >
                    <option value="1">Zenith bank</option>
                  </select>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Account Number:
                  </div>
                  <input
                    type="text"
                    placeholder="0xXXXXXXXXXXXXXXX"
                    // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                    className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                  />
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Withdrawal Amount:
                  </div>
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                    <input
                      type="number"
                      placeholder="0.00"
                      // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                      className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                    />
                    <button className="depositMoneyDiv_cont_body_wallet_addr_div_btn">
                      Max
                    </button>
                  </div>
                  <div className="availegc_bal_div">
                    <div className="availegc_bal_div_title">Available</div>
                    <div className="availegc_bal_div_amount">240.5 EGC</div>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Withdrawal Remarks (optional):
                  </div>
                  <input
                    type="text"
                    // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                    className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                  />
                </div>

                <div className="depositMoneyDiv_cont_body_tips_divb">
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Minimum single withdrawal amount: ₦2,000.00
                    </div>
                  </div>
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Maximum single withdrawal amount: ₦100,000,000.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_2">
              <button
                className="depositMoneyDiv_cont_2_btn"
                // onClick={ToggleEgcBlockchainDepositModal}
              >
                Send Funds
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {nairaUserWithdrawal ? (
        <div className="depositMoneyDiv">
          <div className="depositMoneyDiv_cont">
            <ArrowBackOutlinedIcon
              className="depositMoneyDiv_icon"
              onClick={ToggleNairaUserWithdrawtModal}
            />
            <div className="depositMoneyDiv_cont_1">
              <div className="depositMoneyDiv_cont_title_cont">
                <div className="depositMoneyDiv_cont_title_cont_title">
                  Send Naira
                </div>
                <div className="depositMoneyDiv_cont_title_cont_para">
                  Send funds directly to an egoras user
                </div>
              </div>
              <div className="depositMoneyDiv_cont_body">
                <div className="depositMoneyDiv_cont_body_input_div">
                  <div className="depositMoneyDiv_cont_body_input_div_title">
                    Currency:
                  </div>
                  <div className="depositMoneyDiv_cont_body_input_div_div">
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont1">
                      <img
                        src="/img/egc_icon2.svg"
                        alt=""
                        className="depositMoneyDiv_cont_body_input_div_div_cont1_img"
                      />
                      Nigerian Naira
                    </div>
                    <div className="depositMoneyDiv_cont_body_input_div_div_cont2">
                      NGN
                    </div>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Recipient Email or Username:
                  </div>
                  <input
                    type="text"
                    placeholder="@John Doe"
                    // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                    className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                  />
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Withdrawal Amount:
                  </div>
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_input_div">
                    <input
                      type="number"
                      placeholder="0.00"
                      // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                      className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                    />
                    <button className="depositMoneyDiv_cont_body_wallet_addr_div_btn">
                      Max
                    </button>
                  </div>
                  <div className="availegc_bal_div">
                    <div className="availegc_bal_div_title">Available</div>
                    <div className="availegc_bal_div_amount">240.5 EGC</div>
                  </div>
                </div>
                <div className="depositMoneyDiv_cont_body_wallet_addr_divb">
                  <div className="depositMoneyDiv_cont_body_wallet_addr_div_title">
                    Withdrawal Remarks (optional):
                  </div>
                  <input
                    type="text"
                    // value={"0x3dE79168402278C0DA2Bf9A209C3A91d755790FC"}
                    className="depositMoneyDiv_cont_body_wallet_addr_div_input"
                  />
                </div>

                <div className="depositMoneyDiv_cont_body_tips_divb">
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Minimum single withdrawal amount: ₦2,000.00
                    </div>
                  </div>
                  <div className="depositMoneyDiv_cont_body_tips_div_1">
                    <InfoOutlinedIcon className="depositMoneyDiv_cont_body_tips_div_1_icon" />
                    <div className="depositMoneyDiv_cont_body_tips_div_1_txt">
                      Maximum single withdrawal amount: ₦100,000,000.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="depositMoneyDiv_cont_2">
              <button
                className="depositMoneyDiv_cont_2_btn"
                // onClick={ToggleEgcUserDepositModal}
              >
                Send funds
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardWallets;
