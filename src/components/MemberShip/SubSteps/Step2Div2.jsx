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
  // Plan="Lite"
  // PlanAmount="16.0"
  // PlanAmountLocal="50,000"
  // checkAgree={checkAgree}
  // discount="5"
  // toggleCheckAgree={toggleCheckAgree}
  // toggleDiv={toggleLiteDiv}
  // subMembership={subscribe_membership}

  // const plans = [
  //   {
  //     PlanAmount: "16.0",
  //     Plan: "Lite",
  //     PlanAmountLocal: "50,000",
  //     discount: "5",
  //   },
  //   {
  //     PlanAmount: "16.0",
  //     Plan: "Lite",
  //     PlanAmountLocal: "50,000",
  //     discount: "5",
  //   },
  //   {
  //     PlanAmount: "16.0",
  //     Plan: "Lite",
  //     PlanAmountLocal: "50,000",
  //     discount: "5",
  //   },
  // ];

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

          {plans && plans.length >= 1 ? (
            plans.map((plan, index) => {
              return (
                <PlanSubDivs
                  id={plan.id}
                  Plan={plan.type}
                  PlanAmountLocal={numberWithCommas(
                    parseFloat(plan.amount).toFixed(2).toString()
                  )}
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
      <div className="Step2Div2_member_div3"></div>

      {/* {plans && plans.} */}

      {planDiv === ""
        ? null
        : plans.map((plan) => {
            return (
              <>
                {plan.id == planDiv ? (
                  <PlanSubDivModal
                    Plan={plan.type}
                    PlanAmount={plan.amount}
                    planId={plan.id}
                    PlanAmountLocal={plan.amount}
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
