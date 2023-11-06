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
import {
  GET_SWAP_PRICE,
  SWAP,
  LIQUIDITY,
} from "../../../../services/swap_services";
import { numberWithCommas } from "../../../../assets/js/numberWithCommas";
import WebPin from "../../../Common/CommonUI/Modals/WebPin";
import { useSelector } from "react-redux";
import SuccessModal from "../../../Common/CommonUI/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../../Common/CommonUI/Modals/ErrorModal/ErrorModal";
import { Am } from "react-country-flags-select";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const AddLiquidity = () => {
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
  const [tokenDrop, setTokenDrop] = useState(false);
  const [showLiquidPool, setShowLiquidPool] = useState(false);
  const [baseTokenObject, setBaseTokenObject] = useState({
    id: "1",
    name: "Egoras Credit",
    symbol: "EGC",
    img: "/img/egc_icon2.svg",
    balance: 0.0,
  });

  const [assetTokenObject2, setAssetTokenObject2] = useState([
    {
      id: "1",
      name: "Naira",
      symbol: "NGN",
      img: "https://i.imgur.com/JXm7zwC.png",
      balance: 0.0,
    },
    // {
    //   id: "2",
    //   name: "TETHER",
    //   symbol: "USDT",
    //   img: "/img/Tether-USDT-icon.png",
    //   balance: 0.0,
    // },
  ]);
  const [selectedToken, setSelectedToken] = useState("");
  // started here
  const [marketPrice, setMarketPrice] = useState(0.0);
  //variables for the new swap
  const getSwapPrice = async () => {
    const response = await GET_SWAP_PRICE({
      tokenA: "NGN",
      tokenB: "EGC",
    });
    //console.logog(response);
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
  console.log("====================================");
  console.log(selectedToken);
  console.log("====================================");
  const handleTokenClick = (token) => {
    setSelectedToken(token);
    ToggleTokenDrop(); // Close the dropdown if needed
    setShowLiquidPool(true);
  };

  const ToggleTokenDrop = () => {
    setTokenDrop(!tokenDrop);
  };
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  const process = () => {
    setPinModal(true);
  };

  const getTokenBalances = () => {
    console.log(data);
    const newBaseTokenObject = {
      ...baseTokenObject,
      balance: data[0]?.value === null ? "0" : data[0]?.value,
    };
    const newBaseTokenObject2 = {
      ...baseTokenObject,
      balance: data[1]?.value === null ? "0" : data[1]?.value,
    };
    const newAssetTokenObjectb = {
      ...selectedToken,
      balance: data[0]?.value === null ? "0" : data[0]?.value,
    };
    const newAssetTokenObject2b = {
      ...selectedToken,
      balance: data[1]?.value === null ? "0" : data[1]?.value,
    };

    if (data[0].name === "Egoras Credit") {
      setBaseTokenObject(newBaseTokenObject);
    } else {
      setBaseTokenObject(newBaseTokenObject2);
    }

    // if (data[0].name === "Naira") {
    //   setAssetTokenObject(newAssetTokenObject);
    // } else {
    //   setAssetTokenObject(newAssetTokenObject2);
    // }

    if (data[0].name === "Naira") {
      setSelectedToken(newAssetTokenObjectb);
    } else {
      setSelectedToken(newAssetTokenObject2b);
    }

    const newAssetTokenObject2a = assetTokenObject2.map((token) => {
      const index = data.findIndex((item) => item.name === token.name);
      if (index !== -1 && data[index].value !== null) {
        return { ...token, balance: data[index].value };
      }
      return { ...token, balance: "0" };
    });

    setAssetTokenObject2(newAssetTokenObject2a);
  };
  useEffect(() => {
    getTokenBalances();
  }, []);
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================

  useEffect(() => {
    //console.logog("====================================");
    //console.logog(SwapAmount, baseTokenObject.balance, parseFloat(SwapAmount));
    //console.logog("====================================");
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
  const TokenLiquidity = async () => {
    setLoading(true);
    const payload = {
      pin_code: pin,
      ticker: selectedToken.symbol + "/EGC",
      token_a_symbol: selectedToken.symbol,
      token_b_symbol: baseTokenObject.symbol,
      token_a_amount: AmountOut,
      token_b_amount: SwapAmount,
    };
    //console.logog(payload);
    const response = await LIQUIDITY(payload);
    //console.logog(response);
    if (response.success === true) {
      setLoading(false);
      setSuccessModal(true);
      setPinModal(false);
      setSuccessTxt(
        ` You have successfully added ${SwapAmount} ${baseTokenObject.symbol} with ${AmountOut} ${selectedToken.symbol} liquidity`
      );
      //console.logog(response);
      return;
    }
    if (!response?.data?.success || !response?.data) {
      setLoading(false);
      setPinModal(false);
      setErrorModal(true);
      setErrorTxt(response.data.errorMessage);
      //console.logog(response);
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
    //console.logog(e.target.value);
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

  //   const ToggleShareSwap = () => {
  //     setShareSwap(!shareSwap);
  //   };

  //console.logog("====================================");
  //console.logog(AmountOut);
  //console.logog("====================================");
  return (
    <div className="liquidity_area">
      <div className="liquidity_area1">
        <div className="swap_container_settings_cont">
          <div className="swap_container_settings_cont_area1">
            Add Liquidity
          </div>
          <div className="swap_container_settings_cont_area2">
            <InfoOutlinedIcon className="swap_container_settings_cont_area2_icon" />
            <ShareOutlinedIcon
              className="swap_container_settings_cont_area2_icon2"
              //   onClick={ToggleShareSwap}
            />
          </div>
        </div>
        <div className="liquidity_cont">
          <div className="liquidity_cont_body">
            <div className="liquidity_cont_body_tabs">
              <div className="liquidity_cont_body_tabs_1">Add</div>
              <div className="liquidity_cont_body_tabs_2">Remove</div>
            </div>
            <div className="liquidity_select_div">
              <div className="liquidity_select_div_title">
                Select Currency Pair
              </div>
              <div className="liquidity_select_div_conts">
                <button className="liquidity_select_div_btn1_last">
                  <img
                    src={baseTokenObject.img}
                    alt=""
                    className="display_tokens_drop_img"
                  />
                  {baseTokenObject.symbol}
                </button>
                <span className="liquidity_select_div_btn_span">+</span>

                <div
                  className="liquidity_select_div_btn1_drop_div
                "
                >
                  <button
                    className="liquidity_select_div_btn1"
                    onClick={ToggleTokenDrop}
                  >
                    {!showLiquidPool ? (
                      <>Select Currency</>
                    ) : (
                      <div className="liquidity_select_div_btn1_div1">
                        <img
                          src={selectedToken.img}
                          alt=""
                          className="display_tokens_drop_img"
                        />
                        {selectedToken.symbol}
                      </div>
                    )}

                    <ArrowDropDownIcon className="liquidity_select_div_btn1_icon" />
                  </button>
                  {tokenDrop ? (
                    <div className="liquidity_select_div_btn1_drop_down">
                      {assetTokenObject2.map((data) => (
                        <div
                          key={data.id}
                          className="liquidity_select_div_btn1_drop_down_cont1"
                          onClick={() => handleTokenClick(data)}
                        >
                          <img
                            src={data.img}
                            alt=""
                            className="display_tokens_drop_img"
                          />
                          {data.symbol}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            {/* ===== */}
            {/* ===== */}
            {/* ===== */}
            {/* ===== */}

            {!showLiquidPool ? null : (
              <div className="liquidity_cont_body_conts">
                <div className="liquidity_cont_body_conts_cont1">
                  <div className="input_amnt_layer">
                    <div className="amnt_input">
                      <div className="amnt_input_layer1">
                        <div className="amnt_input_layer1_input_div">
                          <div className="amnt_input_layer1_input_div_span">
                            Deposit Amount
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
                  <div className="input_amnt_layer">
                    <div className="amnt_input">
                      <div className="amnt_input_layer1">
                        <div className="amnt_input_layer1_input_div">
                          <div className="amnt_input_layer1_input_div_span">
                            Deposit Amount
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
                              parseFloat(selectedToken.balance).toFixed(2)
                            )}
                          </span>

                          <button className="display_tokens_drop">
                            {" "}
                            <img
                              src={selectedToken.img}
                              alt=""
                              className="display_tokens_drop_img"
                            />
                            {selectedToken.symbol}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* </div> */}
                </div>

                <div className="swap_price_rate_div">
                  <span className="swap_price_rate_div_span">
                    Current Price:{" "}
                  </span>
                  <div className="swap_price_rate_div1">
                    {" "}
                    {numberWithCommas(parseFloat(marketPrice).toFixed(2))}{" "}
                    {selectedToken.symbol}
                  </div>
                  <div className="swap_price_rate_div1">
                    per {baseTokenObject.symbol}
                  </div>
                </div>
                <button
                  id="generate"
                  class="updatedSwapSwapBtn"
                  disabled={swapDisable}
                  onClick={process}
                >
                  {parseFloat(SwapAmount) > baseTokenObject.balance
                    ? "Insufficient Balance"
                    : "Add Liquidity"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {pinModal ? (
        <WebPin
          isLoading={loading}
          btnFunc={TokenLiquidity}
          pinTitle="Enter Pin to validate Transaction"
          pinPara="Input your pin to complete this transaction."
          btnFuncTxt="Proceed"
          handleOnComplete={(e) => {
            const a = e.join("");
            setPin(a);
            return;
          }}
          toggleWebpin={() => {
            setPinModal(false);
          }}
        />
      ) : null}
      {successModal ? (
        <SuccessModal
          SuccesTxt={successTxt}
          successFunc={() => {
            window.location.href = "/dashboard/transaction";
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

export default AddLiquidity;
