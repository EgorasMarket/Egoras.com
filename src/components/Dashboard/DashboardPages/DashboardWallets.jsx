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
import DepositUsd from "./DashboardWalletsComponents/depositUsd";
import DepositUsdFromUser from "./DashboardWalletsComponents/depositUsdFromUser";
import SendUsdInternal from "./DashboardWalletsComponents/sendUsdInternal";
import SendUsdExternal from "./DashboardWalletsComponents/sendUsdExternal";
import { TablePagination, Table } from "../../Common/CommonUI/Tables/TableComp";
import { FETCH_WALLET_TRANSACTIONS } from "../../../services/finance_services";
import Staticdata from "../../../assets/json/Static";
import { useSelector } from "react-redux";

const DashboardWallets = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, loading } = useSelector((state) => state.wallet);
  const [nairaBalance, setNairaBalance] = useState("0");
  const [egcBalance, setEgcBalance] = useState("0");
  const [activeTab, setActiveTab] = useState("naira");
  const [depositMoney, setDepositMoney] = useState(false);
  const [withdrawMoney, setWithdrawMoney] = useState(false);
  const [egcBlockchainDeposit, setEgcBlockchainDeposit] = useState(false);
  const [egcBlockchainWithdrawal, setEgcBlockchainWithdrawal] = useState(false);
  const [egcUserWithdrawal, setEgcUserWithdrawal] = useState(false);
  const [egcUserDeposit, setEgcUserDeposit] = useState(false);
  const [usdBlockchainDeposit, setUsdBlockchainDeposit] = useState(false);
  const [usdBlockchainWithdrawal, setUsdBlockchainWithdrawal] = useState(false);
  const [usdUserWithdrawal, setUsdUserWithdrawal] = useState(false);
  const [usdUserDeposit, setUsdUserDeposit] = useState(false);
  const [depositMoneyNaira, setDepositMoneyNaira] = useState(false);
  const [depositMoneyUSD, setDepositMoneyUSD] = useState(false);
  const [depositMoneyNairaBank, setDepositMoneyNairaBank] = useState(false);
  const [depositMoneyNairaUser, setDepositMoneyNairaUser] = useState(false);
  const [withdrawMoneyNaira, setWithdrawMoneyNaira] = useState(false);
  const [withdrawMoneyUSD, setWithdrawMoneyUSD] = useState(false);
  const [nairaBankWithdrawal, setNairaBankWithdrawal] = useState(false);
  const [nairaUserWithdrawal, setNairaUserWithdrawal] = useState(false);
  const [contentLoadingTable, setContentLoadingTable] = useState(true);
  const [usdtBalance, setUsdtBalance] = useState("0");

  const [tableData, setTableData] = useState([]);
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

  const ToggleDepositMoneyUSDModal = () => {
    setDepositMoneyUSD(!depositMoneyUSD);
  };

  const ToggleWithdrawMoneyUSDModal = () => {
    setWithdrawMoneyUSD(!withdrawMoneyUSD);
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

  const ToggleUSDBlockchainDepositModal = () => {
    setUsdBlockchainDeposit(!usdBlockchainDeposit);
    setDepositMoney(!depositMoney);
  };

  const ToggleUSDBlockchainWithdrawModal = () => {
    setUsdBlockchainWithdrawal(!usdBlockchainWithdrawal);
    setWithdrawMoney(!withdrawMoney);
  };

  const ToggleUSDUserDepositModal = () => {
    setUsdUserDeposit(!usdUserDeposit);
    setDepositMoney(!depositMoney);
  };

  const ToggleUSDUserWithdrawtModal = () => {
    setUsdUserWithdrawal(!usdUserWithdrawal);
    setWithdrawMoney(!withdrawMoney);
  };
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      switch (data[i].name) {
        case "Naira":
          setNairaBalance(data[i]?.value === null ? "0" : data[i]?.value);
          break;
        case "Egoras Credit":
          setEgcBalance(data[i]?.value === null ? "0" : data[i]?.value);
          break;
        case "Dollar":
          setUsdtBalance(data[i]?.value === null ? "0" : data[i]?.value);
          break;
      }
    }
  }, []);
  const fetchWalletTransactions = async () => {
    setContentLoadingTable(true);
    const response = await FETCH_WALLET_TRANSACTIONS();
    if (response.success === true) {
      setContentLoadingTable(false);
      setTableData(response.data);
    } else {
      setContentLoadingTable(true);
      //  setTableData([]);
    }
    //// console.logog(response.data);
    //// console.logog(response);
  };
  useEffect(() => {
    fetchWalletTransactions();
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
          <div
            id="usd"
            className={
              activeTab === "usd"
                ? "DashboardWalletsDiv_area1_cont_tab1_active"
                : "DashboardWalletsDiv_area1_cont_tab1"
            }
            onClick={ToggleActiveTab}
          >
            USD Wallet
          </div>
        </div>
      </div>
      <div className="DashboardWalletsDiv_body">
        {activeTab === "egc" ? (
          <WalletBalanceDisplay
            walletBal={parseFloat(egcBalance).toFixed(2)}
            walletsymbol={"egc"}
            depositFunc={ToggleDepositMoneyModal}
            withdrawFunc={ToggleWithdrawMoneyModal}
            loading={loading}
            img="/img/egc_icon2.svg"
          />
        ) : null}
        {activeTab === "naira" ? (
          <WalletBalanceDisplay
            walletBal={parseFloat(nairaBalance).toFixed(2)}
            walletsymbol={"ngn"}
            depositFunc={ToggleDepositMoneyNairaModal}
            withdrawFunc={ToggleWithdrawMoneyNairaModal}
            loading={loading}
            img="https://i.imgur.com/JXm7zwC.png"
          />
        ) : null}
        {activeTab === "usd" ? (
          <WalletBalanceDisplay
            walletBal={parseFloat(usdtBalance).toFixed(2)}
            walletsymbol={"usd"}
            depositFunc={ToggleDepositMoneyUSDModal}
            withdrawFunc={ToggleWithdrawMoneyUSDModal}
            loading={loading}
            img="/img/usd_icon.webp"
          />
        ) : null}
        <div className="DashboardWalletsDiv_area3">
          <Table
            tableTitle={"Wallet Transactions"}
            TableData={tableData
              .filter((data) => data.type !== "PURCHASE")
              .slice(0, 7)}
            contentLoading={contentLoadingTable}
            dummyData={Staticdata.productsTableData.slice(0, 8)}
            userName={user.username}
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
      {depositMoneyUSD ? (
        <DepositModalComp
          symbol={"USD"}
          DynamicFunc1={ToggleUSDBlockchainDepositModal}
          DynamicFunc2={ToggleUSDUserDepositModal}
          DynamicPara1={"Add funds directly from a blockachain account "}
          DynamicTitle1={"Deposit via blockchain "}
          closeModal={ToggleDepositMoneyUSDModal}
          DepositModaldiv={"USD"}
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
      {withdrawMoneyUSD ? (
        <WithdrawModalComp
          symbol={"USD"}
          DynamicFunc1={ToggleUSDBlockchainWithdrawModal}
          DynamicFunc2={ToggleUSDUserWithdrawtModal}
          DynamicPara1={
            "Transfer your USD funds with an array of swift and efficient transfer options!"
          }
          DynamicTitle1={"USD Wallet Withdrawal "}
          closeModal={ToggleWithdrawMoneyUSDModal}
          WithdrawModaldiv={"USD"}
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
          balance={parseFloat(egcBalance).toFixed(4)}
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
          balance={parseFloat(egcBalance).toFixed(4)}
        />
      ) : null}
      {usdBlockchainDeposit ? (
        <DepositUsd
          ToggleEgcBlockchainDepositModal={ToggleUSDBlockchainDepositModal}
        />
      ) : null}
      {usdBlockchainWithdrawal ? (
        <SendUsdExternal
          ToggleEgcBlockchainWithdrawModal={ToggleUSDBlockchainWithdrawModal}
          balance={parseFloat(usdtBalance).toFixed(4)}
        />
      ) : null}
      {usdUserDeposit ? (
        <DepositUsdFromUser
          ToggleEgcUserDepositModal={ToggleUSDUserDepositModal}
        />
      ) : null}
      {usdUserWithdrawal ? (
        <SendUsdInternal
          ToggleEgcUserWithdrawtModal={ToggleUSDUserWithdrawtModal}
          balance={parseFloat(usdtBalance).toFixed(4)}
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
          balance={parseFloat(nairaBalance).toFixed(4)}
        />
      ) : null}
      {nairaUserWithdrawal ? (
        <WithdrawNairaToUser
          ToggleNairaUserWithdrawtModal={ToggleNairaUserWithdrawtModal}
          balance={parseFloat(nairaBalance).toFixed(4)}
        />
      ) : null}
    </div>
  );
};

export default DashboardWallets;
