import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import CheckIcon from "@mui/icons-material/Check";
// import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PlanSubDivModal from "./PlanSubDivModal";
import PlanSubDivs from "./PlanSubDivs";
import { SUBSCRIBE_MEMBERSHIP } from "../../../services/membership_services";
// import CloseIcon from "@mui/icons-material/Close";
const Step2Div2 = ({ toggleSteps, toggleCheckAgree, checkAgree }) => {
  const [activePlan, setActivePlan] = useState("");
  const [liteDiv, setliteDiv] = useState(false);
  const [proDiv, setProDiv] = useState(false);
  const [priseDiv, setPriseDiv] = useState(false);
  const toggleActivePlan = (e) => {
    setActivePlan(e.currentTarget.id);
    console.log(e.currentTarget.id);
  };
  // Plan="Lite"
  // PlanAmount="16.0"
  // PlanAmountLocal="50,000"
  // checkAgree={checkAgree}
  // discount="5"
  // toggleCheckAgree={toggleCheckAgree}
  // toggleDiv={toggleLiteDiv}
  // subMembership={subscribe_membership}

  const plans = [
    {
      PlanAmount: "16.0",
      Plan: "Lite",
      PlanAmountLocal: "50,000",
      discount: "5",
    },
    {
      PlanAmount: "16.0",
      Plan: "Lite",
      PlanAmountLocal: "50,000",
      discount: "5",
    },
    {
      PlanAmount: "16.0",
      Plan: "Lite",
      PlanAmountLocal: "50,000",
      discount: "5",
    },
  ];

  const toggleLiteDiv = (e) => {
    setliteDiv(!liteDiv);
  };
  const toggleProDiv = (e) => {
    setProDiv(!proDiv);
  };
  const togglePriseDiv = (e) => {
    setPriseDiv(!priseDiv);
  };
  return (
    <div className="Step2Div2_member_div">
      <div className="Step2Div2_member_div1">
        <div onClick={toggleSteps} className="selectPlanDiv_backButton">
          <ArrowBackIosIcon className="selectPlanDiv_backButton_icon" />
          Back
        </div>
      </div>

      <div className="Step2Div2_member_div2">
        <div className="Step2Div2_member_div2_head">Annual Plans</div>
        <div className="Step2Div2_member_div2_body">
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          <PlanSubDivs
            id="lite"
            Plan="Lite"
            PlanAmount="16.0"
            PlanAmountLocal="50,000"
            activePlan={activePlan}
            discount="5"
            toggleActivePlan={toggleActivePlan}
            toggleDiv={toggleLiteDiv}
          />
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          <PlanSubDivs
            id="pro"
            Plan="Pro"
            PlanAmount="47.7"
            PlanAmountLocal="150,000"
            activePlan={activePlan}
            discount="12.5"
            toggleActivePlan={toggleActivePlan}
            toggleDiv={toggleProDiv}
          />
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          <PlanSubDivs
            id="prise"
            Plan="EnterPrise"
            PlanAmount="95.4"
            PlanAmountLocal="300,000"
            activePlan={activePlan}
            discount="25"
            toggleActivePlan={toggleActivePlan}
            toggleDiv={togglePriseDiv}
          />
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
          {/* ================== */}
        </div>
      </div>
      <div className="Step2Div2_member_div3"></div>

      <PlanSubDivModal
        Plan="Lite"
        PlanAmount="16.0"
        PlanAmountLocal="50,000"
        checkAgree={checkAgree}
        discount="5"
        toggleCheckAgree={toggleCheckAgree}
        toggleDiv={toggleLiteDiv}
        visibility={!liteDiv}
      />

      <PlanSubDivModal
        Plan="Pro"
        PlanAmount="47.7"
        PlanAmountLocal="150,000"
        checkAgree={checkAgree}
        discount="12.5"
        toggleCheckAgree={toggleCheckAgree}
        toggleDiv={toggleProDiv}
        visibility={!proDiv}
      />

      <PlanSubDivModal
        Plan="Enterprise"
        PlanAmount="95.4"
        PlanAmountLocal="300,000"
        checkAgree={checkAgree}
        discount="25"
        toggleCheckAgree={toggleCheckAgree}
        toggleDiv={togglePriseDiv}
        visibility={!priseDiv}
      />
    </div>
  );
};

export default Step2Div2;
