import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import CheckIcon from "@mui/icons-material/Check";
// import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PlanSubDivModal from "./PlanSubDivModal";
import PlanSubDivs from "./PlanSubDivs";
import {
  FETCH_SUBSCRIPTION,
  SUBSCRIBE_MEMBERSHIP,
} from "../../../services/membership_services";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";
// import CloseIcon from "@mui/icons-material/Close";
const Step2Div2 = ({ toggleSteps, toggleCheckAgree, checkAgree }) => {
  const [activePlan, setActivePlan] = useState("");
  const [planDiv, setPlanDiv] = useState("");
  // const [proDiv, setProDiv] = useState(false);
  // const [priseDiv, setPriseDiv] = useState(false);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const toggleActivePlan = (e) => {
    setActivePlan(e.currentTarget.id);
    console.log(e.currentTarget.id);
  };

  const fetchPlans = async () => {
    const response = await FETCH_SUBSCRIPTION();
    setLoading(false);
    if (!response.success) return;

    setPlans(response.data.subscriptionPlan);
    console.log(response);
  };

  useEffect(() => {
    fetchPlans();
  }, []);
  const togglePlanDivs = (e) => {
    console.log(e.currentTarget);
    setPlanDiv(e.currentTarget.id);
    console.log(e.currentTarget.id);
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
          Pay once, use forever
        </div>
        <div className="Step2Div2_member_div_content_txt_para">
          Get started with Brainave - AI chat app today and experience the power
          of AI in your conversations.{" "}
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

            {plans && plans.length >= 1 ? (
              plans
                .sort((a, b) => a.amount - b.amount)
                .map((plan, index) => {
                  return (
                    <PlanSubDivs
                      id={plan.id}
                      Plan={plan.type}
                      PlanAmountLocal={numberWithCommas(
                        parseFloat(plan.amount).toFixed(2).toString()
                      )}
                      PlanTitle={
                        plan.type === "MONTHLY"
                          ? "Standard"
                          : plan.type === "ANNUALLY"
                          ? "Ultra"
                          : plan.type === "SEMI-ANNUALLY"
                          ? "Premium"
                          : plan.type === "QUARTERLY"
                          ? "Plus"
                          : ""
                      }
                      // PlanAmountLocal="--"
                      activePlan={activePlan}
                      discount="5"
                      toggleActivePlan={toggleActivePlan}
                      toggleDiv={togglePlanDivs}
                    />
                  );
                })
            ) : (
              <div>
                <p>No Subscription plan </p>

                <button>retry</button>
              </div>
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
