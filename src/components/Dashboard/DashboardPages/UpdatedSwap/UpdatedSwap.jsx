import React, { useState, useEffect, useRef } from "react";
import SwapVerticalCircleIcon from "@mui/icons-material/SwapVerticalCircle";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import "./UpdatedSwap.css";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AnimatedNumber from "react-awesome-animated-number";
import "react-awesome-animated-number/dist/index.css";
import { UpdatedTokenModal } from "./TokenModal/UpdatedTokenModal";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import "./AddLiquidity.css";
import "./dashboardAddLiquidity.css";
import { GET_SWAP_PRICE, SWAP } from "../../../../services/swap_services";
import { numberWithCommas } from "../../../../assets/js/numberWithCommas";
import WebPin from "../../../Common/CommonUI/Modals/WebPin";
import { useSelector } from "react-redux";
import SuccessModal from "../../../Common/CommonUI/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../../Common/CommonUI/Modals/ErrorModal/ErrorModal";
import { Am } from "react-country-flags-select";

const UpdatedSwap = () => {
  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.wallet);
  const [nairaBalance, setNairaBalance] = useState("0");
  const [egcBalance, setEgcBalance] = useState("0");
  const [SwapAmount, setSwapAmount] = useState("");
  const [AmountOut, setAmountOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [swapDisable, setSwapDisable] = useState(true);
  const [pinModal, setPinModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorTxt, setErrorTxt] = useState("");
  const [successTxt, setSuccessTxt] = useState("");
  const [baseTokenObject, setBaseTokenObject] = useState({
    id: "1",
    name: "Egoras Credit",
    symbol: "EGC",
    img: "/img/egc_icon2.svg",
    balance: 0.0,
  });
  const [assetTokenObject, setAssetTokenObject] = useState({
    id: "2",
    name: "Naira",
    symbol: "NGN",
    img: "https://i.imgur.com/JXm7zwC.png",
    balance: 0.0,
  });
  // started here
  const [marketPrice, setMarketPrice] = useState(0.0);
  //variables for the new swap
  const getSwapPrice = async () => {
    const response = await GET_SWAP_PRICE({
      tokenA: "NGN",
      tokenB: "EGC",
    });
    console.log(response);
    if (!response.success) return;
    if (baseTokenObject.symbol === "NGN") {
      setMarketPrice(1 / response.data.price);
    } else {
      setMarketPrice(response.data.price);
    }
  };
  useEffect(() => {
    getSwapPrice();
  }, [baseTokenObject]);
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  const process = () => {
    // if (
    //   bankInfo.account_name === "" ||
    //   bankInfo.account_number === "" ||
    //   bankInfo.bank_name === "" ||
    //   payload.amount === ""
    // ) {
    //   toast.warn("Some fields are empty");
    //   return;
    // }
    setPinModal(true);
  };

  useEffect(() => {
    console.log(data);
    console.log(data[0]?.value === null ? "0" : data[0]?.value);
    console.log(data[1]?.value === null ? "0" : data[1]?.value);
    const newBaseTokenObject = {
      ...baseTokenObject,
      balance: data[0]?.value === null ? "0" : data[0]?.value,
    };
    const newBaseTokenObject2 = {
      ...baseTokenObject,
      balance: data[1]?.value === null ? "0" : data[1]?.value,
    };
    const newAssetTokenObject = {
      ...assetTokenObject,
      balance: data[0]?.value === null ? "0" : data[0]?.value,
    };
    const newAssetTokenObject2 = {
      ...assetTokenObject,
      balance: data[1]?.value === null ? "0" : data[1]?.value,
    };
    if (data[0].name === "Egoras Credit") {
      setBaseTokenObject(newBaseTokenObject);
    } else {
      setBaseTokenObject(newBaseTokenObject2);
    }

    if (data[0].name === "Naira") {
      setAssetTokenObject(newAssetTokenObject);
      return;
    } else {
      setAssetTokenObject(newAssetTokenObject2);
    }
  }, []);
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================

  useEffect(() => {
    console.log("====================================");
    console.log(SwapAmount, baseTokenObject.balance, parseFloat(SwapAmount));
    console.log("====================================");
    if (SwapAmount === "" || parseFloat(SwapAmount) > baseTokenObject.balance) {
      setSwapDisable(true);
    } else {
      setSwapDisable(false);
    }
  }, [SwapAmount]);

  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  const TokenSwap = async () => {
    setLoading(true);
    const payload = {
      pin_code: pin,
      ticker: baseTokenObject.symbol + "/" + assetTokenObject.symbol,
      tokenIn: baseTokenObject.symbol,
      tokenOut: assetTokenObject.symbol,
      amountIn: SwapAmount,
      amountOut: AmountOut,
      swapWithMarketPrice: false,
    };
    console.log(payload);
    const response = await SWAP(payload);
    console.log(response);
    if (response.success === true) {
      setLoading(false);
      setSuccessModal(true);
      setPinModal(false);
      setSuccessTxt(
        ` You have successfully swapped ${SwapAmount} ${baseTokenObject.symbol} for ${AmountOut} ${assetTokenObject.symbol}`
      );
      console.log(response);
      return;
    }
    if (!response?.data?.success || !response?.data) {
      setLoading(false);
      setPinModal(false);
      setErrorModal(true);
      setErrorTxt(response.data.errorMessage);
      console.log(response);
      return;
    }
  };
  // =================
  // =================
  // =================
  // =================
  // =================

  // ===========Swap Functions Start=====================
  // ================================
  // ================================
  // ================================
  // ================================
  const onChangeSwapAmount = (e) => {
    let parseNumber = parseFloat(e.target.value);
    setSwapAmount(parseNumber);
    setAmountOut(parseNumber * marketPrice);
    console.log(e.target.value);
  };
  const ToggleSwapInputs = () => {
    setBaseTokenObject(assetTokenObject);
    setAssetTokenObject(baseTokenObject);
    setSwapAmount("");
    setAmountOut("");
  };

  const add25Per = () => {
    const parseNumber = parseFloat(baseTokenObject.balance * 0.25);
    setSwapAmount(parseNumber);
    setAmountOut(parseNumber * marketPrice);
    // setSwapBaseAmount(SwapAmount * 4);
  };
  const add50Per = () => {
    const parseNumber = parseFloat(baseTokenObject.balance * 0.5);
    setSwapAmount(parseNumber);
    setAmountOut(parseNumber * marketPrice);
  };
  const add75Per = () => {
    const parseNumber = parseFloat(baseTokenObject.balance * 0.75);
    setSwapAmount(parseNumber);
    setAmountOut(parseNumber * marketPrice);
  };
  const add100Per = () => {
    const parseNumber = parseFloat(baseTokenObject.balance * 1);
    setSwapAmount(parseNumber);
    setAmountOut(parseNumber * marketPrice);
  };

  // const ToggleShareSwap = () => {
  //   setShareSwap(!shareSwap);
  // };

  console.log("====================================");
  console.log(AmountOut);
  console.log("====================================");
  return (
    <div className="liquidity_area">
      <div className="liquidity_area1">
        <div className="swap_container_settings_cont">
          <div className="swap_container_settings_cont_area1">Swap</div>
          <div className="swap_container_settings_cont_area2">
            <InfoOutlinedIcon className="swap_container_settings_cont_area2_icon" />
            <ShareOutlinedIcon
              className="swap_container_settings_cont_area2_icon2"
              // onClick={ToggleShareSwap}
            />
          </div>
        </div>
        <div className="liquidity_cont">
          <div className="liquidity_cont_body">
            <div className="liquidity_cont_body_conts">
              <div className="liquidity_cont_body_conts_cont1">
                <div className="input_amnt_layer">
                  <div className="amnt_input">
                    <div className="amnt_input_layer1">
                      <div className="amnt_input_layer1_input_div">
                        <div className="amnt_input_layer1_input_div_span">
                          You sell
                        </div>
                        <input
                          type="number"
                          name="number"
                          id="number"
                          placeholder="0.00"
                          className="amnt_input_field"
                          autocomplete="off"
                          onChange={onChangeSwapAmount}
                          value={SwapAmount}
                        />
                      </div>

                      <div className="Swap_icondropDownDiv">
                        <span className="token_balances_span">
                          Balance:
                          {numberWithCommas(
                            parseFloat(baseTokenObject.balance).toFixed(2)
                          )}
                        </span>

                        <button className="display_tokens_drop">
                          <img
                            src={baseTokenObject.img}
                            alt=""
                            className="display_tokens_drop_img"
                          />
                          {baseTokenObject.symbol}
                        </button>
                      </div>
                    </div>
                    <div className="amnt_input_layer2">
                      <button
                        className="amnt_input_layer2_cont1"
                        onClick={() => add25Per()}
                      >
                        25%
                      </button>
                      <button
                        className="amnt_input_layer2_cont1"
                        onClick={() => add50Per()}
                      >
                        50%
                      </button>
                      <button
                        className="amnt_input_layer2_cont1"
                        onClick={() => add75Per()}
                      >
                        75%
                      </button>
                      <button
                        className="amnt_input_layer2_cont1_last"
                        onClick={() => add100Per()}
                      >
                        100%
                      </button>
                    </div>
                  </div>
                </div>

                {/* <div className="plus_icon_layer"> */}
                <SwapVertIcon
                  className="toggle_swap_inputs"
                  onClick={ToggleSwapInputs}
                />

                <div className="input_amnt_layer">
                  <div className="amnt_input">
                    <div className="amnt_input_layer1">
                      <div className="amnt_input_layer1_input_div">
                        <div className="amnt_input_layer1_input_div_span">
                          You get
                        </div>
                        <input
                          type="number"
                          name="number"
                          id="number"
                          placeholder="0.00"
                          className="amnt_input_field"
                          autocomplete="off"
                          value={SwapAmount == "" ? " " : AmountOut}
                        />
                      </div>
                      <div className="Swap_icondropDownDiv">
                        <span className="token_balances_span">
                          Balance:{" "}
                          {numberWithCommas(
                            parseFloat(assetTokenObject.balance).toFixed(2)
                          )}
                        </span>

                        <button className="display_tokens_drop">
                          {" "}
                          <img
                            src={assetTokenObject.img}
                            alt=""
                            className="display_tokens_drop_img"
                          />
                          {assetTokenObject.symbol}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* </div> */}
              </div>

              <div className="swap_price_rate_div">
                <div className="swap_price_rate_div1">
                  1 {baseTokenObject.symbol}
                </div>
                <div className="swap_price_rate_div1">
                  {numberWithCommas(marketPrice)} {assetTokenObject.symbol}
                </div>
                <SwapHorizIcon
                  className="swap_price_rate_div_swap_icon"
                  // onClick={ToggleSwapPrices}
                />
              </div>
              <button
                id="generate"
                class="updatedSwapSwapBtn"
                disabled={swapDisable}
                onClick={process}
              >
                {parseFloat(SwapAmount) > baseTokenObject.balance
                  ? "Insufficient Balance"
                  : "Swap"}
              </button>
              <div className="moreSwapInfoDiv">
                <div className="moreSwapInfoDiv_div1">More Information</div>
                <div className="moreSwapInfoDiv_div2">
                  <div className="moreSwapInfoDiv_div2_area1">
                    <div className="moreSwapInfoDiv_div2_area1_cont1">
                      Minimum Received
                    </div>
                    <div className="moreSwapInfoDiv_div2_area1_cont2">
                      {SwapAmount === "" ? <>0</> : AmountOut}
                      <span>{assetTokenObject.symbol}</span>
                    </div>
                  </div>
                  <div className="moreSwapInfoDiv_div2_area1">
                    <div className="moreSwapInfoDiv_div2_area1_cont1">
                      Gas Fee
                    </div>
                    <div className="moreSwapInfoDiv_div2_area1_cont2">
                      $7.75
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {pinModal ? (
        <WebPin
          isLoading={loading}
          btnFunc={TokenSwap}
          pinTitle="Enter Pin to validate Transaction"
          pinPara="Input your pin to complete this transaction."
          btnFuncTxt="Proceed"
          handleOnComplete={(e) => {
            const a = e.join("");
            setPin(a);
            return;
          }}
        />
      ) : null}
      {successModal ? (
        <SuccessModal
          SuccesTxt={successTxt}
          successFunc={() => {
            window.location.href = "/dashboard/wallet";
          }}
        />
      ) : null}
      {errorModal ? (
        <ErrorModal
          ErrorTxt={errorTxt}
          errorFunc={() => {
            setErrorModal(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default UpdatedSwap;
