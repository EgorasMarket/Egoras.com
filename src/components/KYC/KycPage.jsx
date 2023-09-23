import React, { useState } from "react";
import {
  KycEmailComp,
  KycBvnComp,
  KycStartComp,
  KycAddressComp,
  KycFacialComp,
} from "./KycComps";
import "./kyc.css";
const KycPage = () => {
  const [emailStep, setEmailStep] = useState(true);
  const [startStep, setStartStep] = useState(false);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const ToggleEmailStep = () => {
    setEmailStep(!emailStep);
    setStartStep(true);
  };
  const ToggleStartStep = () => {
    setStartStep(!startStep);
    setStep1(true);
  };
  const ToggleStep1 = () => {
    setStep1(!step1);
    setStep2(true);
  };
  const ToggleStep2 = () => {
    setStep2(!step2);
    setStep3(true);
  };
  const submitVerification = () => {
    alert("Finished Verification");
  };

  return (
    <div className="kypageDiv">
      <div className="custom_container">
        {emailStep ? <KycEmailComp toggleEmailCont={ToggleEmailStep} /> : null}
        {startStep ? <KycStartComp startVerify={ToggleStartStep} /> : null}
        {step1 ? <KycBvnComp nextStep1={ToggleStep1} /> : null}
        {step2 ? <KycAddressComp nextStep2={ToggleStep2} /> : null}
        {step3 ? <KycFacialComp submitVerify={submitVerification} /> : null}
      </div>
    </div>
  );
};

export default KycPage;
