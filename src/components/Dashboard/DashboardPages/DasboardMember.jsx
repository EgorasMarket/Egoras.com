import React, { useEffect, useState } from "react";
import "../DashboardStyles/dashboardMember.css";
import { Line, Circle } from "rc-progress";
import { useSelector } from "react-redux";
import { GET_MY_SUBSCRIPTION } from "../../../services/referral_services";
import { numberWithCommas } from "../../../assets/js/numberWithCommas";
import { ShimmerButton } from "react-shimmer-effects-18";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

const DasboardMember = ({ refCode }) => {
  const [componentLoading, setComponentLoading] = useState(true);
  const [progressColor, setProgressColor] = useState("#22ad62");
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentPlan, setCurrentPlan] = useState("No Plan");
  const [planAmount, setPlanAmount] = useState("0");
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [noPlan, setNoPlan] = useState(false);
  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  const [CurrentDate, setCurrentDate] = useState(new Date());

  const getMySubscriptions = async () => {
    const response = await GET_MY_SUBSCRIPTION();
    // console.log(response);
    // console.log(response.data.subcribers);
    if (response.success === true) {
      setComponentLoading(false);
      if (response.data.subcribers == null) {
        setNoPlan(true);
      } else {
        setCurrentPlan(response.data.subcribers.type);
        setPlanAmount(response.data.subcribers.amount);
        setStartDate(new Date(response.data.subcribers.createdAt));
        setEndDate(new Date(response.data.subcribers.expiring_date));
        setNoPlan(false);
        if (CurrentDate >= new Date(response.data.subcribers.expiring_date)) {
          setDaysRemaining(0);
          setProgressPercent(100);
          setNoPlan(true);
          return;
        }
      }
      return;
    }
  };

  useEffect(() => {
    getMySubscriptions();
  }, []);
  // console.log(noPlan);
  useEffect(() => {
    const elapsedTime = CurrentDate - StartDate;
    const totalTimeRange = EndDate - StartDate;
    // console.log(progressPercent);
    const progressPercentVar = (elapsedTime / totalTimeRange) * 100;
    const daysRemainingVar = Math.ceil(
      (EndDate - CurrentDate) / (1000 * 60 * 60 * 24)
    );
    setProgressPercent(progressPercentVar);
    setDaysRemaining(daysRemainingVar);
  }, [StartDate]);

  useEffect(() => {
    if (progressPercent > 90) {
      setProgressColor("#bb3a3a");
      return;
    }
    if (progressPercent > 70) {
      setProgressColor("#c6a64d");
      return;
    }
    if (progressPercent < 70) {
      setProgressColor("#22ad62");
      return;
    }
  }, [progressPercent]);
  const copyText2 = () => {
    var copyText = document.getElementById("myInput2");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    var tooltip = document.getElementById("myTooltip2");
    tooltip.innerHTML = "Copied code ";
    tooltip.style.display = "block";
  };
  function outFunc2() {
    var tooltip = document.getElementById("myTooltip2");
    tooltip.innerHTML = "Copy to clipboard";
    tooltip.style.display = "none";
  }
  return (
    <div className="dash_member_sub_div_1">
      <div className="dash_member_sub_div_1_head1">Current Plan</div>
      <div className="dash_member_sub_div_1_txt_conts">
        <div className="dash_member_sub_div_1_txt_conts_1">
          {componentLoading ? (
            <ShimmerButton size="lg" className="custom_shimmer" />
          ) : (
            currentPlan
          )}
        </div>

        <div className="dash_member_sub_div_1_txt_conts_2">
          {componentLoading ? (
            <ShimmerButton size="sm" className="custom_shimmer" />
          ) : (
            <>${numberWithCommas(parseFloat(planAmount).toFixed(2))}</>
          )}
        </div>
        <div className="dash_member_sub_div_1_txt_conts_3">
          {componentLoading ? (
            <>
              <ShimmerButton size="sm" className="custom_shimmer" /> -
              <ShimmerButton size="sm" className="custom_shimmer" />
            </>
          ) : (
            <>
              {" "}
              Start: {StartDate.toDateString()} - End: {EndDate.toDateString()}
            </>
          )}
        </div>
      </div>
      <div className="dash_member_sub_div_1_progress_conts">
        <div className="dash_member_sub_div_1_progress_conts_1">
          {" "}
          <Line
            strokeWidth={0.5}
            percent={progressPercent}
            strokeColor={progressColor}
          />
        </div>
        <div className="dash_member_sub_div_1_progress_conts_2">
          {componentLoading ? (
            <>
              {" "}
              <ShimmerButton size="sm" className="custom_shimmer" />
            </>
          ) : (
            <> {daysRemaining} day(s) left</>
          )}
        </div>
      </div>
      {noPlan && (
        <div className="noPlanDiv">
          <div className="noPlanDiv_cont">
            <div className="noPlanDiv_title">You don't have an active plan</div>
            <div className="noPlanDiv_para">
              please subscribe to a plan to access this feature .
            </div>
            <button
              className="noPlanDiv_btn"
              onClick={() => {
                window.location.href = "/membership/sub";
              }}
            >
              Join Sales-Pro
            </button>
          </div>
        </div>
      )}

      <div className="memberRefCode_div">
        <div className="memberRefCode_div_title">Referral Code</div>
        <div className="memberRefCode_div_input_div">
          <input
            type="text"
            value={refCode}
            className="memberRefCode_div_input"
            id="myInput2"
          />
          <button
            className="memberRefCode_div_input_btn"
            onClick={copyText2}
            onMouseOut={outFunc2}
          >
            <ContentCopyOutlinedIcon
              className="memberRefCode_div_input_btn_icon"
              onClick={copyText2}
              onMouseOut={outFunc2}
            />
            <span className=" tooltiptext tooltiptext2" id="myTooltip2"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DasboardMember;
