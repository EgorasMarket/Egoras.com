import React, { useEffect, useState } from "react";
import "../DashboardStyles/DashboardWallet.css";
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
import WithdrawNairaToUser from "./DashboardWalletsComponents/withdrawNairaToUser";
import { TablePagination } from "../../Common/CommonUI/Tables/TableComp";
import Staticdata from "../../../assets/json/Static";
import { useSelector } from "react-redux";

const DashboardWallets = () => {
  const { data } = useSelector((state) => state.wallet);
  const [nairaBalance, setNairaBalance] = useState("");
  const [egcBalance, setEgcBalance] = useState("");
  const [activeTab, setActiveTab] = useState("naira");
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
  useEffect(() => {
    console.log(data);
    console.log(data[0].value);
    console.log(data[1].value);
    setEgcBalance(data[0].value);
    setNairaBalance(data[1].value);
  }, []);
  return (
    <div className="DashboardWalletsDiv">
      <div className="DashboardWalletsDiv_area1">
        <div className="DashboardWalletsDiv_area1_cont">
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
        </div>
      </div>
      <div className="DashboardWalletsDiv_body">
        {activeTab === "egc" ? (
          <WalletBalanceDisplay
            walletBal={parseFloat(egcBalance).toFixed(4)}
            walletsymbol={"egc"}
            depositFunc={ToggleDepositMoneyModal}
            withdrawFunc={ToggleWithdrawMoneyModal}
          />
        ) : null}
        {activeTab === "naira" ? (
          <WalletBalanceDisplay
            walletBal={parseFloat(nairaBalance).toFixed(2)}
            walletsymbol={"ngn"}
            depositFunc={ToggleDepositMoneyNairaModal}
            withdrawFunc={ToggleWithdrawMoneyNairaModal}
          />
        ) : null}
        <div className="DashboardWalletsDiv_area3">
          <TablePagination
            tableTitle={"Wallet Transactions"}
            TableData={Staticdata.productsTableData}
          />
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
        <WithdrawNairaToUser
          ToggleNairaUserWithdrawtModal={ToggleNairaUserWithdrawtModal}
        />
      ) : null}
    </div>
  );
};

export default DashboardWallets;
