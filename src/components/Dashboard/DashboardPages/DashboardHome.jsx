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
import { useSelector } from "react-redux";
import { GET_WALLET } from "../../../services/finance_services";
import {
  GENERATE_USER_WALLET_ADDRESS,
  GENERATE_USER_WALLET_ADDRESS_MART_GPT,
  SET_USER_PIN,
} from "../../../services/auth";
import WebPin from "../../Common/CommonUI/Modals/WebPin";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [nairaBalance, setNairaBalance] = useState("");
  const [egcBalance, setEgcBalance] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.wallet);
  const [pin, setPinVal] = useState("");
  const [confirmPin, setConfirmPinVal] = useState("");
  const [confirmPinModal, setConfirmPinModal] = useState(false);
  const [pinModal, setPinModal] = useState(false);

  const generateWallet = async () => {
    const response = await GET_WALLET({
      symbol: "EGC",
    });

    if (response.success === undefined || !response.success) {
      return;
    }

    console.log(response.data.address, "generating wallet");
    const registerAddress = await GENERATE_USER_WALLET_ADDRESS({
      wallet: response.data.address,
      email: user.email,
    });
    await GENERATE_USER_WALLET_ADDRESS_MART_GPT({
      userAddress: response.data.address,
    });
    console.log(registerAddress, "responses");
  };

  const setPin = async () => {
    setPinModal(true);
  };
  useEffect(() => {
    console.log("i am running here");
    if (user?.wallet_address === "n/a" || user?.wallet_address === "") {
      generateWallet();
    }
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(data[0]?.value);
    console.log(data[1]?.value);
    setEgcBalance(data[0]?.value === null ? "0" : data[0]?.value);
    setNairaBalance(data[1]?.value === null ? "0" : data[1]?.value);
  }, []);

  useEffect(() => {
    //check if the pin is empty
    if (
      user?.user_pin === null ||
      user?.user_pin === "" ||
      user?.user_pin === undefined
    ) {
      setPin();
    }
  }, []);

  const proceedToConfirm = () => {
    setPinModal(false);
    setConfirmPinModal(true);
  };
  const processPinRequest = async () => {
    if (pin !== confirmPin) {
      toast.warn("Pin does not match");
      console.log("pin does not match");
      return;
    }

    const response = await SET_USER_PIN({
      code: pin,
      type: "set",
    });

    console.log(response);

    if (response.success) {
      toast.success("Pin is set Successfully");
      navigate(0);
      return;
    }

    toast.warn(response.errorMessage);
  };

  const handleOnComplete1 = (e) => {
    const value = e.join("");
    setPinVal(value);
    // setPinPayload({ ...pinPayload, pin: value });
  };
  const handleOnComplete2 = (e) => {
    const value = e.join("");
    setConfirmPinVal(value);
  };

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
                  {parseFloat(egcBalance).toFixed(4)}
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
                  {parseFloat(nairaBalance).toFixed(2)}
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

      {pinModal && (
        <WebPin
          btnFunc={proceedToConfirm}
          btnFuncTxt={"Next"}
          handleOnComplete={handleOnComplete1}
          pinTitle={"Please Set a Pin"}
          pinPara={
            "You'll need to create a pin to be able to make transactions"
          }
        />
      )}
      {confirmPinModal && (
        <WebPin
          btnFunc={processPinRequest}
          btnFuncTxt={"Confirm"}
          handleOnComplete={handleOnComplete2}
          pinTitle={"Please Confirm Your Pin"}
          pinPara={"Just to be sure, we'll want you to confirm your pin "}
        />
      )}
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

      <ToastContainer />
    </div>
  );
};

export default DashboardHome;
