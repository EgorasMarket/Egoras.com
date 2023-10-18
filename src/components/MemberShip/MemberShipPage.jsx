import React, { useState } from "react";
// import { connect } from "react-redux";
// import axios from "axios";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./membership.css";
import { Step1Div } from "./SubSteps/Step1Div";
import Step2Div2 from "./SubSteps/Step2Div2";
import { useSelector } from "react-redux";

const MemberShipPage = () => {
  const { error } = useSelector((store) => store.auth);
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [checkedMonth, setCheckedMonth] = useState(false);
  const [checkedSemiAnnual, setcheckedSemiAnnual] = useState(false);
  const [checkedYear, setCheckedYear] = useState(false);
  const [checkAgree, setCheckAgree] = useState(false);

  const checkMonthBox = () => {
    setCheckedMonth(true);
    setcheckedSemiAnnual(false);
    setCheckedYear(false);
  };
  const checkSemiAnnualBox = () => {
    setCheckedMonth(false);
    setcheckedSemiAnnual(true);
    setCheckedYear(false);
  };
  const checkYearBox = () => {
    setCheckedYear(true);
    setcheckedSemiAnnual(false);
    setCheckedMonth(false);
  };
  const toggleCheckAgree = () => {
    setCheckAgree(!checkAgree);
  };

  const toggleSteps = () => {
    setStep1(!step1);
    setStep2(!step2);
  };

  return (
    <section className="joinCooperativeDiv">
      <img
        src="/img/scrolling_images.webp"
        alt=""
        className="HomeDivSection3_bg"
      />

      {step1 ? <Step1Div toggleSteps={toggleSteps} /> : null}
      {step2 ? (
        <Step2Div2
          toggleSteps={toggleSteps}
          checkAgree={checkAgree}
          toggleCheckAgree={toggleCheckAgree}
        />
      ) : null}
    </section>
  );
};

export default MemberShipPage;
