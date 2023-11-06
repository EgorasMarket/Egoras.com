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
import { ShimmerButton } from "react-shimmer-effects-18";
import "./dashboardAddLiquidity.css";
import {
  GET_SWAP_PRICE,
  SWAP,
  FETCH_SWAP,
} from "../../../../services/swap_services";
import { numberWithCommas } from "../../../../assets/js/numberWithCommas";
import WebPin from "../../../Common/CommonUI/Modals/WebPin";
import { useSelector } from "react-redux";
import SuccessModal from "../../../Common/CommonUI/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../../Common/CommonUI/Modals/ErrorModal/ErrorModal";
import { Am, To } from "react-country-flags-select";
import CloseIcon from "@mui/icons-material/Close";
import "./TokenModal/UpatedTokenModal.css";

const UpdatedSwap = () => {
  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.wallet);
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
  const [tokenModal1, setTokenModal1] = useState(false);
  const [tokenModal2, setTokenModal2] = useState(false);
  const [selectedToken1, setSelectedToken1] = useState(null);
  const [selectedToken2, setSelectedToken2] = useState(null);
  const [marketPrice, setMarketPrice] = useState(0.0);
  const [priceLoading, setPriceLoading] = useState(true);
  const getSwapPrice = async () => {
    setPriceLoading(true);
    if (selectedToken1 === null || selectedToken2 === null) {
      return;
    }

    if (selectedToken1.symbol === "EGC" && selectedToken2.symbol === "USD") {
      console.log("USD/EGC");
      setPriceLoading(true);
      const response = await GET_SWAP_PRICE({
        tokenA: "USD",
        tokenB: "EGC",
      });
      console.log(response);
      if (!response.success) {
        setPriceLoading(false);
        return;
      }
      setMarketPrice(response.data.price);
      setPriceLoading(false);
      return;
    }

    if (selectedToken1.symbol === "USD" && selectedToken2.symbol === "EGC") {
      console.log("USD/EGC");
      setPriceLoading(true);
      const response = await GET_SWAP_PRICE({
        tokenA: "USD",
        tokenB: "EGC",
      });
      console.log(response);
      if (!response.success) {
        setPriceLoading(false);
        return;
      }
      setMarketPrice(1 / response.data.price);
      setPriceLoading(false);

      return;
    }

    if (selectedToken1.symbol === "NGN" && selectedToken2.symbol === "EGC") {
      console.log("NGN/EGC");
      setPriceLoading(true);
      const response = await GET_SWAP_PRICE({
        tokenA: "NGN",
        tokenB: "EGC",
      });
      console.log(response);
      if (!response.success) {
        setPriceLoading(false);
        return;
      }
      setMarketPrice(1 / response.data.price);
      setPriceLoading(false);
      return;
    }

    if (selectedToken1.symbol === "EGC" && selectedToken2.symbol === "NGN") {
      console.log("NGN/EGC");
      setPriceLoading(true);
      const response = await GET_SWAP_PRICE({
        tokenA: "NGN",
        tokenB: "EGC",
      });
      console.log(response);
      if (!response.success) {
        setPriceLoading(false);
        return;
      }
      setMarketPrice(response.data.price);
      setPriceLoading(false);
      return;
    }

    if (selectedToken1.symbol === "USD" && selectedToken2.symbol === "NGN") {
      console.log("USD/NGN");
      setPriceLoading(true);
      const response = await GET_SWAP_PRICE({
        tokenA: "USD",
        tokenB: "NGN",
      });
      console.log(response);

      if (!response.success) {
        setPriceLoading(false);
        return;
      }
      setMarketPrice(1 / response.data.price);
      setPriceLoading(false);
      return;
    }

    if (selectedToken1.symbol === "NGN" && selectedToken2.symbol === "USD") {
      console.log("USD/NGN");
      setPriceLoading(true);
      const response = await GET_SWAP_PRICE({
        tokenA: "USD",
        tokenB: "NGN",
      });
      console.log(response);
      if (!response.success) {
        setPriceLoading(false);
        return;
      }
      setMarketPrice(response.data.price);
      setPriceLoading(false);
      return;
    }
  };
  const getSwapTickers = async () => {
    const response = await FETCH_SWAP();
    console.log(response);
  };
  console.log(marketPrice);
  useEffect(() => {
    getSwapTickers();
  }, []);

  const TokenObject = [
    {
      id: "0",
      name: "Egoras Credit",
      symbol: "EGC",
      symbol2: "EGC",
      img: "/img/egc_icon2.svg",
      balance: 0.0,
    },
    {
      id: "1",
      name: "Nigerian Naira",
      symbol: "NGN",
      symbol2: "NGN",
      img: "https://i.imgur.com/JXm7zwC.png",
      balance: 0.0,
    },
    {
      id: "2",
      name: "Dollar",
      symbol: "USD",
      symbol2: "USDT",
      img: "/img/usd_icon.webp",
      balance: 0.0,
    },
  ];
  useEffect(() => {
    getSwapPrice();
  }, [selectedToken1, selectedToken2]);
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

  // =================
  // =================
  // =================
  // =================
  // =================
  // =================
  // =================

  useEffect(() => {
    if (selectedToken1) {
      console.log(parseFloat(SwapAmount), parseFloat(selectedToken1.balance));
      const ParsedSwapAmount = parseFloat(SwapAmount);
      const ParsedTokenBal = parseFloat(selectedToken1.balance);
      if (
        ParsedSwapAmount > ParsedTokenBal ||
        ParsedSwapAmount <= 0 ||
        SwapAmount === ""
      ) {
        setSwapDisable(true);
        return;
      } else {
        setSwapDisable(false);
      }
      return;
    }
  }, [SwapAmount, selectedToken1]);

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
    if (selectedToken1 === null || selectedToken2 === null) {
      return;
    }

    if (selectedToken1.symbol === "EGC" && selectedToken2.symbol === "USD") {
      const payload = {
        pin_code: pin,
        ticker: "USD/EGC",
        tokenIn: selectedToken1.symbol,
        tokenOut: selectedToken2.symbol,
        amountIn: SwapAmount,
        amountOut: AmountOut,
        swapWithMarketPrice: false,
      };
      //console.logog(payload);
      const response = await SWAP(payload);
      //console.logog(response);
      if (response.success === true) {
        setLoading(false);
        setSuccessModal(true);
        setPinModal(false);
        setSuccessTxt(
          ` You have successfully swapped ${SwapAmount} ${selectedToken1.symbol} for ${AmountOut} ${selectedToken2.symbol}`
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
      return;
    }

    if (selectedToken1.symbol === "USD" && selectedToken2.symbol === "EGC") {
      const payload = {
        pin_code: pin,
        ticker: "USD/EGC",
        tokenIn: selectedToken1.symbol,
        tokenOut: selectedToken2.symbol,
        amountIn: SwapAmount,
        amountOut: AmountOut,
        swapWithMarketPrice: false,
      };
      //console.logog(payload);
      const response = await SWAP(payload);
      //console.logog(response);
      if (response.success === true) {
        setLoading(false);
        setSuccessModal(true);
        setPinModal(false);
        setSuccessTxt(
          ` You have successfully swapped ${SwapAmount} ${selectedToken1.symbol} for ${AmountOut} ${selectedToken2.symbol}`
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
      return;
    }

    if (selectedToken1.symbol === "NGN" && selectedToken2.symbol === "EGC") {
      const payload = {
        pin_code: pin,
        ticker: "NGN/EGC",
        tokenIn: selectedToken1.symbol,
        tokenOut: selectedToken2.symbol,
        amountIn: SwapAmount,
        amountOut: AmountOut,
        swapWithMarketPrice: false,
      };
      //console.logog(payload);
      const response = await SWAP(payload);
      //console.logog(response);
      if (response.success === true) {
        setLoading(false);
        setSuccessModal(true);
        setPinModal(false);
        setSuccessTxt(
          ` You have successfully swapped ${SwapAmount} ${selectedToken1.symbol} for ${AmountOut} ${selectedToken2.symbol}`
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
      return;
    }

    if (selectedToken1.symbol === "EGC" && selectedToken2.symbol === "NGN") {
      const payload = {
        pin_code: pin,
        ticker: "NGN/EGC",
        tokenIn: selectedToken1.symbol,
        tokenOut: selectedToken2.symbol,
        amountIn: SwapAmount,
        amountOut: AmountOut,
        swapWithMarketPrice: false,
      };
      //console.logog(payload);
      const response = await SWAP(payload);
      //console.logog(response);
      if (response.success === true) {
        setLoading(false);
        setSuccessModal(true);
        setPinModal(false);
        setSuccessTxt(
          ` You have successfully swapped ${SwapAmount} ${selectedToken1.symbol} for ${AmountOut} ${selectedToken2.symbol}`
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
      return;
    }

    if (selectedToken1.symbol === "USD" && selectedToken2.symbol === "NGN") {
      const payload = {
        pin_code: pin,
        ticker: "USD/NGN",
        tokenIn: selectedToken1.symbol,
        tokenOut: selectedToken2.symbol,
        amountIn: SwapAmount,
        amountOut: AmountOut,
        swapWithMarketPrice: false,
      };
      //console.logog(payload);
      const response = await SWAP(payload);
      //console.logog(response);
      if (response.success === true) {
        setLoading(false);
        setSuccessModal(true);
        setPinModal(false);
        setSuccessTxt(
          ` You have successfully swapped ${SwapAmount} ${selectedToken1.symbol} for ${AmountOut} ${selectedToken2.symbol}`
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
      return;
    }

    if (selectedToken1.symbol === "NGN" && selectedToken2.symbol === "USD") {
      const payload = {
        pin_code: pin,
        ticker: "USD/NGN",
        tokenIn: selectedToken1.symbol,
        tokenOut: selectedToken2.symbol,
        amountIn: SwapAmount,
        amountOut: AmountOut,
        swapWithMarketPrice: false,
      };
      //console.logog(payload);
      const response = await SWAP(payload);
      //console.logog(response);
      if (response.success === true) {
        setLoading(false);
        setSuccessModal(true);
        setPinModal(false);
        setSuccessTxt(
          ` You have successfully swapped ${SwapAmount} ${selectedToken1.symbol} for ${AmountOut} ${selectedToken2.symbol}`
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
    setSwapAmount(e.target.value);
    setAmountOut(parseNumber * marketPrice);
  };

  console.log(SwapAmount);
  const ToggleSwapInputs = () => {
    setSwapAmount("");
    setSelectedToken2(selectedToken1);
    setSelectedToken1(selectedToken2);
  };

  const add25Per = () => {
    const parseNumber = parseFloat(selectedToken1.balance * 0.25);
    setSwapAmount(parseNumber);
    setAmountOut(parseNumber * marketPrice);
  };
  const add50Per = () => {
    const parseNumber = parseFloat(selectedToken1.balance * 0.5);
    setSwapAmount(parseNumber);
    setAmountOut(parseNumber * marketPrice);
  };
  const add75Per = () => {
    const parseNumber = parseFloat(selectedToken1.balance * 0.75);
    setSwapAmount(parseNumber);
    setAmountOut(parseNumber * marketPrice);
  };
  const add100Per = () => {
    const parseNumber = parseFloat(selectedToken1.balance * 1);
    setSwapAmount(parseNumber);
    setAmountOut(parseNumber * marketPrice);
  };
  const OpenTokenModal1 = () => {
    setTokenModal1(!tokenModal1);
  };
  const closeTokenModal1 = (token) => {
    setSwapAmount("");
    setTokenModal1(!tokenModal1);
    console.log(token);
    console.log(selectedToken2);
    console.log(selectedToken1);
    if (selectedToken1 === null && selectedToken2 === null) {
      setSelectedToken1(token);
      return;
    }
    if (selectedToken2 !== null && selectedToken1 === null) {
      if (token.id === selectedToken2.id) {
        setSelectedToken2(selectedToken1);
        setSelectedToken1(selectedToken2);
      } else {
        setSelectedToken1(token);
      }
      return;
    }
    if (selectedToken1 !== null && selectedToken2 === null) {
      setSelectedToken1(token);
      return;
    }
    if (selectedToken1 !== null && selectedToken2 !== null) {
      if (token.id === selectedToken2.id) {
        setSelectedToken2(selectedToken1);
        setSelectedToken1(selectedToken2);
      } else {
        setSelectedToken1(token);
      }
      return;
    }
  };
  const OpenTokenModal2 = () => {
    setTokenModal2(!tokenModal2);
  };
  const closeTokenModal2 = (token) => {
    setSwapAmount("");
    setTokenModal2(!tokenModal2);
    console.log(token);
    console.log(selectedToken1);
    console.log(selectedToken2);
    if (selectedToken1 === null && selectedToken2 === null) {
      setSelectedToken2(token);
      return;
    }
    if (selectedToken1 !== null && selectedToken2 === null) {
      if (token.id === selectedToken1.id) {
        setSelectedToken1(selectedToken2);
        setSelectedToken2(selectedToken1);
      } else {
        setSelectedToken2(token);
      }
      return;
    }
    if (selectedToken2 !== null && selectedToken1 === null) {
      setSelectedToken2(token);
      return;
    }
    if (selectedToken2 !== null && selectedToken1 !== null) {
      if (token.id === selectedToken1.id) {
        setSelectedToken1(selectedToken2);
        setSelectedToken2(selectedToken1);
      } else {
        setSelectedToken2(token);
      }
      return;
    }
  };

  console.log(data);
  const updatedTokenObject = TokenObject.map((token) => {
    const matchingNewToken = data.find(
      (newToken) => newToken.symbol === token.symbol
    );
    if (matchingNewToken) {
      // Update the balance if a matching symbol is found
      token.balance = matchingNewToken.value;
    }
    return token;
  });
  console.log(updatedTokenObject);
  return (
    <div className="liquidity_area">
      <div className="liquidity_area1">
        <div className="swap_container_settings_cont">
          <div className="swap_container_settings_cont_area1">Swap</div>
          <div className="swap_container_settings_cont_area2">
            <InfoOutlinedIcon className="swap_container_settings_cont_area2_icon" />
            <ShareOutlinedIcon className="swap_container_settings_cont_area2_icon2" />
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
                        {priceLoading ? (
                          <ShimmerButton size="lg" className="custom_shimmer" />
                        ) : (
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
                        )}
                      </div>

                      <div className="Swap_icondropDownDiv">
                        <span className="token_balances_span">
                          Balance:{" "}
                          {selectedToken1
                            ? numberWithCommas(
                                parseFloat(selectedToken1.balance).toFixed(4)
                              )
                            : "0.00"}
                        </span>

                        <button
                          className="display_tokens_drop"
                          onClick={() => OpenTokenModal1()}
                        >
                          {selectedToken1 ? (
                            <div className="selectedTokenInfo">
                              <img
                                src={selectedToken1.img}
                                alt=""
                                className="display_tokens_drop_img"
                              />
                              <span className="selectedTokenSymbol">
                                {selectedToken1.symbol}
                              </span>
                            </div>
                          ) : (
                            "Select Token"
                          )}
                          <ArrowDropDownIcon className="liquidity_select_div_btn1_icon" />
                        </button>
                      </div>
                    </div>
                    <div className="amnt_input_layer2">
                      <button
                        className="amnt_input_layer2_cont1"
                        disabled={
                          selectedToken1 && selectedToken2 ? false : true
                        }
                        onClick={() => add25Per()}
                      >
                        25%
                      </button>
                      <button
                        className="amnt_input_layer2_cont1"
                        disabled={
                          selectedToken1 && selectedToken2 ? false : true
                        }
                        onClick={() => add50Per()}
                      >
                        50%
                      </button>
                      <button
                        className="amnt_input_layer2_cont1"
                        disabled={
                          selectedToken1 && selectedToken2 ? false : true
                        }
                        onClick={() => add75Per()}
                      >
                        75%
                      </button>
                      <button
                        className="amnt_input_layer2_cont1_last"
                        disabled={
                          selectedToken1 && selectedToken2 ? false : true
                        }
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
                        {priceLoading ? (
                          <ShimmerButton size="lg" className="custom_shimmer" />
                        ) : (
                          <input
                            type="number"
                            name="number"
                            id="number"
                            placeholder="0.00"
                            className="amnt_input_field"
                            autocomplete="off"
                            value={SwapAmount == "" ? " " : AmountOut}
                          />
                        )}
                      </div>
                      <div className="Swap_icondropDownDiv">
                        <span className="token_balances_span">
                          Balance:{" "}
                          {selectedToken2
                            ? numberWithCommas(
                                parseFloat(selectedToken2.balance).toFixed(4)
                              )
                            : "0.00"}
                        </span>

                        <button
                          className="display_tokens_drop"
                          onClick={() => OpenTokenModal2()}
                        >
                          {selectedToken2 ? (
                            <div className="selectedTokenInfo">
                              <img
                                src={selectedToken2.img}
                                alt=""
                                className="display_tokens_drop_img"
                              />
                              <span className="selectedTokenSymbol">
                                {selectedToken2.symbol}
                              </span>
                            </div>
                          ) : (
                            "Select Token"
                          )}
                          <ArrowDropDownIcon className="liquidity_select_div_btn1_icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* </div> */}
              </div>
              <div className="swap_price_rate_div">
                {priceLoading ? (
                  <ShimmerButton size="sm" className="custom_shimmer" />
                ) : (
                  <>
                    {" "}
                    <div className="swap_price_rate_div1">
                      1
                      {selectedToken1 == null ? (
                        <ShimmerButton size="sm" className="custom_shimmer" />
                      ) : (
                        <> {selectedToken1.symbol}</>
                      )}
                    </div>
                    <div className="swap_price_rate_div1">
                      {selectedToken2 == null ? (
                        <ShimmerButton size="sm" className="custom_shimmer" />
                      ) : (
                        <>
                          {" "}
                          {numberWithCommas(marketPrice)}{" "}
                          {selectedToken2.symbol}
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
              {/* {parseFloat(SwapAmount) < 0 || SwapAmount === "" ? (
                <button id="generate" class="updatedSwapSwapBtn" disabled>
                  Enter Amount
                </button>
              ) : ( */}
              <button
                id="generate"
                class="updatedSwapSwapBtn"
                disabled={swapDisable}
                onClick={process}
              >
                {selectedToken1 && selectedToken2 ? (
                  <>
                    {" "}
                    {parseFloat(SwapAmount) > selectedToken1.balance
                      ? "Insufficient Balance"
                      : parseFloat(SwapAmount) < 0 || SwapAmount == ""
                      ? "Enter an amount"
                      : "Swap"}
                  </>
                ) : (
                  "Select a token"
                )}
              </button>
              {/* // )} */}
              <div className="moreSwapInfoDiv">
                <div className="moreSwapInfoDiv_div1">More Information</div>
                <div className="moreSwapInfoDiv_div2">
                  <div className="moreSwapInfoDiv_div2_area1">
                    <div className="moreSwapInfoDiv_div2_area1_cont1">
                      Minimum Received
                    </div>
                    <div className="moreSwapInfoDiv_div2_area1_cont2">
                      {SwapAmount === "" ? (
                        <ShimmerButton size="sm" className="custom_shimmer" />
                      ) : (
                        numberWithCommas(parseFloat(AmountOut).toFixed(2))
                      )}
                      <span>
                        {" "}
                        {SwapAmount === "" ? null : (
                          <>{selectedToken2.symbol}</>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="moreSwapInfoDiv_div2_area1">
                    <div className="moreSwapInfoDiv_div2_area1_cont1">Fee</div>
                    <div className="moreSwapInfoDiv_div2_area1_cont2">
                      $0.75
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {tokenModal1 ? (
        <div className=" dark updatedTokenModal">
          <div
            className="updatedTokenModal_closeDiv"
            onClick={() => {
              setTokenModal1(!tokenModal1);
            }}
          ></div>
          <div className="updatedTokenModal_area">
            <div className="updatedTokenModal_area1">
              <div className="updatedTokenModal_area1_head">
                <span>Select a token </span>
                <CloseIcon
                  className="updatedTokenModal_area1_head_close_icon"
                  onClick={() => {
                    setTokenModal1(!tokenModal1);
                  }}
                />
              </div>
              <div className="updatedTokenModal_area1_para">
                You can search and select any token on EgoSwap
              </div>
              <div className="updatedTokenModal_area1_search">
                <input
                  type="search"
                  name=""
                  id=""
                  className="updatedTokenModal_area1_search_input"
                />
              </div>
            </div>
            <div className="updatedTokenModal_area_body">
              <div className="updatedTokenModal_area_body_area">
                {selectedToken1 == null ? (
                  <>
                    {" "}
                    {updatedTokenObject.map((token) => (
                      <button
                        id={token.id}
                        className="updatedTokenModal_area_body_area1"
                        onClick={() => closeTokenModal1(token)}
                      >
                        <div className="updatedTokenModal_area_body_area1_cont1">
                          <div className="updatedTokenModal_area_body_area1_cont1_div1">
                            <img
                              src={token.img}
                              alt=""
                              className="updatedTokenModal_area_body_area1_cont1_div1_img"
                            />
                          </div>
                          <div className="updatedTokenModal_area_body_area1_cont1_div2">
                            <div className="updatedTokenModal_area_body_area1_cont1_div2_cont1">
                              {token.symbol}
                            </div>
                            <div className="updatedTokenModal_area_body_area1_cont1_div2_cont2">
                              {token.name}
                            </div>
                          </div>
                        </div>
                        <div className="updatedTokenModal_area_body_area1_cont2">
                          {numberWithCommas(
                            parseFloat(token.balance).toFixed(4)
                          )}
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    {updatedTokenObject.map((token) => (
                      <button
                        disabled={token.id === selectedToken1.id ? true : false}
                        id={token.id}
                        className="updatedTokenModal_area_body_area1"
                        onClick={() => closeTokenModal1(token)}
                      >
                        <div className="updatedTokenModal_area_body_area1_cont1">
                          <div className="updatedTokenModal_area_body_area1_cont1_div1">
                            <img
                              src={token.img}
                              alt=""
                              className="updatedTokenModal_area_body_area1_cont1_div1_img"
                            />
                          </div>
                          <div className="updatedTokenModal_area_body_area1_cont1_div2">
                            <div className="updatedTokenModal_area_body_area1_cont1_div2_cont1">
                              {token.symbol}
                            </div>
                            <div className="updatedTokenModal_area_body_area1_cont1_div2_cont2">
                              {token.name}
                            </div>
                          </div>
                        </div>
                        <div className="updatedTokenModal_area_body_area1_cont2">
                          {numberWithCommas(
                            parseFloat(token.balance).toFixed(4)
                          )}
                        </div>
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {tokenModal2 ? (
        <div className=" dark updatedTokenModal">
          <div
            className="updatedTokenModal_closeDiv"
            onClick={() => {
              setTokenModal2(!tokenModal2);
            }}
          ></div>
          <div className="updatedTokenModal_area">
            <div className="updatedTokenModal_area1">
              <div className="updatedTokenModal_area1_head">
                <span>Select a token </span>
                <CloseIcon
                  className="updatedTokenModal_area1_head_close_icon"
                  onClick={() => {
                    setTokenModal2(!tokenModal2);
                  }}
                />
              </div>
              <div className="updatedTokenModal_area1_para">
                You can search and select any token on egoswap
              </div>
              <div className="updatedTokenModal_area1_search">
                <input
                  type="search"
                  name=""
                  id=""
                  className="updatedTokenModal_area1_search_input"
                />
              </div>
            </div>
            <div className="updatedTokenModal_area_body">
              <div className="updatedTokenModal_area_body_area">
                {selectedToken2 == null ? (
                  <>
                    {" "}
                    {updatedTokenObject.map((token) => (
                      <button
                        id={token.id}
                        className="updatedTokenModal_area_body_area1"
                        onClick={() => closeTokenModal2(token)}
                      >
                        <div className="updatedTokenModal_area_body_area1_cont1">
                          <div className="updatedTokenModal_area_body_area1_cont1_div1">
                            <img
                              src={token.img}
                              alt=""
                              className="updatedTokenModal_area_body_area1_cont1_div1_img"
                            />
                          </div>
                          <div className="updatedTokenModal_area_body_area1_cont1_div2">
                            <div className="updatedTokenModal_area_body_area1_cont1_div2_cont1">
                              {token.symbol}
                            </div>
                            <div className="updatedTokenModal_area_body_area1_cont1_div2_cont2">
                              {token.name}
                            </div>
                          </div>
                        </div>
                        <div className="updatedTokenModal_area_body_area1_cont2">
                          {numberWithCommas(
                            parseFloat(token.balance).toFixed(4)
                          )}
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    {updatedTokenObject.map((token) => (
                      <button
                        disabled={token.id == selectedToken2.id ? true : false}
                        id={token.id}
                        className="updatedTokenModal_area_body_area1"
                        onClick={() => closeTokenModal2(token)}
                      >
                        <div className="updatedTokenModal_area_body_area1_cont1">
                          <div className="updatedTokenModal_area_body_area1_cont1_div1">
                            <img
                              src={token.img}
                              alt=""
                              className="updatedTokenModal_area_body_area1_cont1_div1_img"
                            />
                          </div>
                          <div className="updatedTokenModal_area_body_area1_cont1_div2">
                            <div className="updatedTokenModal_area_body_area1_cont1_div2_cont1">
                              {token.symbol}
                            </div>
                            <div className="updatedTokenModal_area_body_area1_cont1_div2_cont2">
                              {token.name}
                            </div>
                          </div>
                        </div>
                        <div className="updatedTokenModal_area_body_area1_cont2">
                          {numberWithCommas(
                            parseFloat(token.balance).toFixed(4)
                          )}
                        </div>
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

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
