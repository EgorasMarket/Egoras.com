import React from "react";
import "./otpModal.css";
import ScaleLoader from "react-spinners/ScaleLoader";

import OtpInput from "react18-input-otp";
const OtpModal = ({
  handleChange,
  otp,
  handleVerifyOtp,
  payload,
  otpLoading,
  otpDisable,
  resendOtp,
}) => {
  return (
    <div className="otp_modal">
      <div className="otp_modal_container">
        <div className="otp_modal_container_head">Verify your phone number</div>
        <div className="otp_modal_container_para">
          Enter the otp code sent to your mobile number. Be careful not to share
          the code with anyone.
        </div>
        <div className="otp_modal_container_body">
          <OtpInput
            id="myInput"
            placeholder="000000"
            value={otp}
            onChange={handleChange}
            numInputs={6}
            isSuccessed={true}
            errorStyle="error"
            successStyle="success"
            separator={<span> </span>}
            separateAfter={1}
            shouldAutoFocus
            className="otp_modal_container_body_otp_input"
            // onSubmit={//// console.logog(otp)}
          />
          <div className="otp_modal_container_body_resend">
            Didn't receive otp?{" "}
            <span
              className="otp_modal_container_body_resend_span"
              onClick={resendOtp}
            >
              Resend OTP
            </span>
          </div>
        </div>
        <div className="otp_modal_container_body_button">
          <button
            onClick={handleVerifyOtp}
            className="otp_modal_container_body_button_btn"
            disabled={otpDisable}
          >
            {otpLoading ? (
              <>
                <ScaleLoader color="#366e51" height={20} />
              </>
            ) : (
              " Verify"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
