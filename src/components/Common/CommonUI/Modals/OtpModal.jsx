import React from "react";
import "./otpModal.css";
import OtpInput from "react18-input-otp";
const OtpModal = ({ handleChange, otp, handleVerifyOtp, payload }) => {
  return (
    <div className="otp_modal">
      <div className="otp_modal_container">
        <div className="otp_modal_container_head">Verify your phone number</div>
        <div className="otp_modal_container_para">
          Enter the otp code sent to your mobile number {"+" + payload.phone}.
          Be careful not to share the code with anyone.
        </div>
        <div className="otp_modal_container_body">
          <OtpInput
            id="myInput"
            placeholder="000000"
            value={otp}
            onChange={handleChange}
            numInputs={6}
            isSuccessed={false}
            errorStyle="error"
            successStyle="success"
            separator={<span> </span>}
            separateAfter={1}
            shouldAutoFocus
            className="otp_modal_container_body_otp_input"
            // onSubmit={console.log(otp)}
          />
        </div>
        <div
          className="otp_modal_container_body_button"
          onClick={handleVerifyOtp}
        >
          <button className="otp_modal_container_body_button_btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
