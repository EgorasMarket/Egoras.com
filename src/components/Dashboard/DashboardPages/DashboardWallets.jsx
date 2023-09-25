import React, { useEffect, useState } from "react";
import "../DashboardStyles/DashboardWallet.css";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AppShortcutOutlinedIcon from "@mui/icons-material/AppShortcutOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WalletBalanceDisplay from "./DashboardWalletsComponents/WalletBalanceDisplay";
import DepositModalComp from "./DashboardWalletsComponents/DepositModalComp";
import WithdrawModalComp from "./DashboardWalletsComponents/WithdrawModalComp";
import { QRCode } from "react-qrcode-logo";
import DepositEgc from "./DashboardWalletsComponents/depositEgc";
import DepositEgcFromUser from "./DashboardWalletsComponents/depositEgcFromUser";
import SendEgc from "./DashboardWalletsComponents/sendEgcInternal";
import SendEgcInternal from "./DashboardWalletsComponents/sendEgcInternal";
import SendEgcExternal from "./DashboardWalletsComponents/sendEgcExternal";
import DepositNairaUser from "./DashboardWalletsComponents/depositNairaUser";
import DepositNairaFromBank from "./DashboardWalletsComponents/depositNairaFromBank";
import WithdrawNairaToBank from "./DashboardWalletsComponents/withdrawNairaToBank";

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
          <WalletBalanceDisplay
            walletBal={parseFloat(254.45).toFixed(2)}
            walletsymbol={"egc"}
            depositFunc={ToggleDepositMoneyModal}
            withdrawFunc={ToggleWithdrawMoneyModal}
          />
        ) : null}
        {activeTab === "naira" ? (
          <WalletBalanceDisplay
            walletBal={parseFloat(20000000).toFixed(2)}
            walletsymbol={"ngn"}
            depositFunc={ToggleDepositMoneyNairaModal}
            withdrawFunc={ToggleWithdrawMoneyNairaModal}
          />
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
        <DepositModalComp
          symbol={"EGC"}
          DynamicFunc1={ToggleEgcBlockchainDepositModal}
          DynamicFunc2={ToggleEgcUserDepositModal}
          DynamicPara1={"Add funds directly from a blockchain account "}
          DynamicTitle1={"Deposit via blockchain "}
          closeModal={ToggleDepositMoneyModal}
          DepositModaldiv={"Egc"}
        />
      ) : null}
      {depositMoneyNaira ? (
        <DepositModalComp
          symbol={"Naira"}
          DynamicFunc1={ToggleDepositMoneyNairaBankModal}
          DynamicFunc2={ToggleDepositMoneyNairaUserModal}
          DynamicPara1={"Add funds directly from a Bank account "}
          DynamicTitle1={"Deposit via Bank account "}
          closeModal={ToggleDepositMoneyNairaModal}
          DepositModaldiv={"Naira"}
        />
      ) : null}
      {withdrawMoney ? (
        <WithdrawModalComp
          symbol={"EGC"}
          DynamicFunc1={ToggleEgcBlockchainWithdrawModal}
          DynamicFunc2={ToggleEgcUserWithdrawtModal}
          DynamicPara1={
            "Transfer your Egc funds with an array of swift and efficient transfer options!"
          }
          DynamicTitle1={" Egc Wallet Withdrawal "}
          closeModal={ToggleWithdrawMoneyModal}
          WithdrawModaldiv={"Egc"}
        />
      ) : null}
      {withdrawMoneyNaira ? (
        <WithdrawModalComp
          symbol={"Naira"}
          DynamicFunc1={ToggleWithdrawNairaBankModal}
          DynamicFunc2={ToggleNairaUserWithdrawtModal}
          DynamicPara1={"Send funds directly to a bank account"}
          DynamicTitle1={"Send to Bank Account"}
          closeModal={ToggleWithdrawMoneyNairaModal}
          WithdrawModaldiv={"Naira"}
        />
      ) : null}
      {egcBlockchainDeposit ? (
        <DepositEgc
          ToggleEgcBlockchainDepositModal={ToggleEgcBlockchainDepositModal}
        />
      ) : null}
      {egcBlockchainWithdrawal ? (
        <SendEgcExternal
          ToggleEgcBlockchainWithdrawModal={ToggleEgcBlockchainWithdrawModal}
        />
      ) : null}
      {egcUserDeposit ? (
        <DepositEgcFromUser
          ToggleEgcUserDepositModal={ToggleEgcUserDepositModal}
        />
      ) : null}
      {egcUserWithdrawal ? (
        <SendEgcInternal
          ToggleEgcUserWithdrawtModal={ToggleEgcUserWithdrawtModal}
        />
      ) : null}
      {depositMoneyNairaBank ? (
        <DepositNairaFromBank
          ToggleDepositMoneyNairaBankModal={ToggleDepositMoneyNairaBankModal}
        />
      ) : null}
      {depositMoneyNairaUser ? (
        <DepositNairaUser
          ToggleDepositMoneyNairaUserModal={ToggleDepositMoneyNairaUserModal}
        />
      ) : null}
      {nairaBankWithdrawal ? (
        <WithdrawNairaToBank
          ToggleWithdrawNairaBankModal={ToggleWithdrawNairaBankModal}
        />
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
