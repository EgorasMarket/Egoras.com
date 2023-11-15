import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PlanSubDivModal from "./PlanSubDivModal";
import { PlanSubDivs, PlanSubDivsLoading } from "./PlanSubDivs";
import {
  FETCH_SUBSCRIPTION,
  SUBSCRIBE_MEMBERSHIP,
} from "../../../services/membership_services";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";
const Step2Div2 = ({ toggleSteps, toggleCheckAgree, checkAgree }) => {
  const [activePlan, setActivePlan] = useState("");
  const [planDiv, setPlanDiv] = useState("");
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const toggleActivePlan = (e) => {
    setActivePlan(e.currentTarget.id);
    // console.log(e.currentTarget.id);
  };

  const fetchPlans = async () => {
    const response = await FETCH_SUBSCRIPTION();
    setLoading(false);
    if (!response.success) return;

    setPlans(response.data.subscriptionPlan);
    // console.log(response);
  };

  useEffect(() => {
    fetchPlans();
  }, []);
  const togglePlanDivs = (e) => {
    // console.log(e.currentTarget);
    setPlanDiv(e.currentTarget.id);
    // console.log(e.currentTarget.id);
  };
  return (
    <div className="Step2Div2_member_div">
      <div className="Step2Div2_member_div1">
        <button onClick={toggleSteps} className="selectPlanDiv_backButton">
          <ArrowBackIosIcon className="selectPlanDiv_backButton_icon" />
          Back
        </button>
      </div>
      <div className="Step2Div2_member_div_content_txt">
        <div className="Step2Div2_member_div_content_txt_title">
          Egoras Sales Pro
        </div>
        <div className="Step2Div2_member_div_content_txt_para">
          Empowering Your Journey Towards Sustainable Living. Welcome to the
          Egoras Sales-Pro, where membership means:
        </div>
      </div>
      <div className="Step2Div2_member_div2">
        <div className="custom_container">
          <div className="Step2Div2_member_div2_body">
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}

            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
            {loading ? (
              <>
                {" "}
                <PlanSubDivsLoading />
                <PlanSubDivsLoading />
                <PlanSubDivsLoading />
                <PlanSubDivsLoading />
              </>
            ) : (
              <>
                {plans && plans.length >= 1 ? (
                  plans
                    .sort((a, b) => a.amount - b.amount)
                    .map((plan, index) => {
                      return (
                        <PlanSubDivs
                          id={plan.id}
                          Plan={
                            plan.type === "MONTHLY"
                              ? "Monthly Hub"
                              : plan.type === "ANNUALLY"
                              ? "Annual Edge"
                              : plan.type === "SEMI-ANNUALLY"
                              ? "Semi-Annual Pulse"
                              : plan.type === "QUARTERLY"
                              ? "Quarterly Accelerator"
                              : ""
                          }
                          PlanAmountLocal={numberWithCommas(
                            parseFloat(plan.amount).toFixed(2).toString()
                          )}
                          PlanTitle={
                            plan.type === "MONTHLY"
                              ? "Monthly Hub"
                              : plan.type === "ANNUALLY"
                              ? "Annual Edge"
                              : plan.type === "SEMI-ANNUALLY"
                              ? "Semi-Annual Pulse"
                              : plan.type === "QUARTERLY"
                              ? "Quarterly Accelerator"
                              : ""
                          }
                          slashedAmount={
                            plan.type === "MONTHLY"
                              ? ""
                              : plan.type === "ANNUALLY"
                              ? "$180.00"
                              : plan.type === "SEMI-ANNUALLY"
                              ? "$90.00"
                              : plan.type === "QUARTERLY"
                              ? "$45.00"
                              : ""
                          }
                          // PlanAmountLocal="--"
                          activePlan={activePlan}
                          discount="5"
                          toggleActivePlan={toggleActivePlan}
                          toggleDiv={togglePlanDivs}
                          planTxt={
                            plan.type === "MONTHLY"
                              ? "Unleash the power of our fundamental monthly plan at just $15 per month, unveiling a world of transformative lifelong earning potential, perks, benefits and opportunities. transformative life time earnings, benefits and opportunities."
                              : plan.type === "ANNUALLY"
                              ? "Embrace an annual subscription and relish an impressive 25% discount, reducing the yearly cost to $135. This subscription assures unbroken access to the suite's remarkable features."
                              : plan.type === "SEMI-ANNUALLY"
                              ? "Choose a semi-annual subscription to take advantage of a remarkable 16.7% discount, bringing the six-month cost down to $75. This subscription guarantees seamless access to the suite's outstanding features."
                              : plan.type === "QUARTERLY"
                              ? "Opt for a quarterly subscription and enjoy an impressive 11.1% discount, reducing the three-month cost to $40. This subscription ensures uninterrupted access to the suite's exceptional offerings."
                              : ""
                          }
                        />
                      );
                    })
                ) : (
                  <>
                    <PlanSubDivsLoading />
                    <PlanSubDivsLoading />
                    <PlanSubDivsLoading />
                    <PlanSubDivsLoading />
                  </>
                )}
              </>
            )}

            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
            {/* ================== */}
          </div>
        </div>
      </div>

      {planDiv === ""
        ? null
        : plans.map((plan) => {
            return (
              <>
                {plan.id == planDiv ? (
                  <PlanSubDivModal
                    Plan={plan.type}
                    planId={plan.id}
                    PlanAmount={plan.amount}
                    checkAgree={checkAgree}
                    discount="5"
                    toggleCheckAgree={toggleCheckAgree}
                    toggleDiv={togglePlanDivs}
                    visibility={!planDiv}
                  />
                ) : null}
              </>
            );
          })}
    </div>
  );
};

export default Step2Div2;
