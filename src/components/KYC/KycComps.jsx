import React from "react";

const KycEmailComp = ({ toggleEmailCont }) => {
  return (
    <div className="kypageDiv_cont">
      <div className="kypageDiv_cont_body_conts">
        <div className="kypageDiv_cont_head_div">
          <div className="kypageDiv_cont_head">Verify your email</div>
          <div className="kypageDiv_cont_para">
            An email was sent to your inbox with an activation link on
            registration.{" "}
          </div>
        </div>
        <div className="kypageDiv_cont_body">
          <div className="kypageDiv_cont_body_txt">
            Didn't receive any email? Resend{" "}
          </div>
          <div className="kypageDiv_cont_body_email_input_div">
            <input
              type="text"
              value={"samuelify225@gmail.com"}
              className="kypageDiv_cont_body_email_input"
            />
            <button className="kypageDiv_cont_body_email_input_btn">
              Resend
            </button>
          </div>
        </div>
      </div>
      <div className="kypageDiv_cont_button_div">
        <button
          className="kypageDiv_cont_button_div_btn"
          onClick={toggleEmailCont}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
const KycStartComp = ({ startVerify }) => {
  return (
    <div className="kypageDiv_cont">
      <div className="kypageDiv_cont_body_conts">
        <div className="kypageDiv_cont_head_div">
          <div className="kypageDiv_cont_head">Start Verification</div>
          <div className="kypageDiv_cont_para">
            An email was sent to your inbox with an activation link on
            registration.{" "}
          </div>
        </div>
        <div className="kypageDiv_cont_body">
          <div className="kypageDiv_cont_body_txt">
            Didn't receive any email? Resend{" "}
          </div>
          <div className="kypageDiv_cont_body_email_input_div">
            <input
              type="text"
              value={"samuelify225@gmail.com"}
              className="kypageDiv_cont_body_email_input"
            />
            <button className="kypageDiv_cont_body_email_input_btn">
              Resend
            </button>
          </div>
        </div>
      </div>
      <div className="kypageDiv_cont_button_div">
        <button className="kypageDiv_cont_button_div_btn" onClick={startVerify}>
          Start Verification
        </button>
      </div>
    </div>
  );
};
const KycBvnComp = ({ nextStep1 }) => {
  return (
    <div className="kypageDiv_cont">
      <div className="kypageDiv_cont_body_conts">
        <div className="kypageDiv_cont_head_div">
          <div className="kypageDiv_cont_head">Verify your BVN</div>
          <div className="kypageDiv_cont_para">
            An email was sent to your inbox with an activation link on
            registration.{" "}
          </div>
        </div>
        <div className="kypageDiv_cont_body">
          <div className="kypageDiv_cont_body_txt">
            Didn't receive any email? Resend{" "}
          </div>
          <div className="kypageDiv_cont_body_email_input_div">
            <input
              type="text"
              value={"samuelify225@gmail.com"}
              className="kypageDiv_cont_body_email_input"
            />
            <button className="kypageDiv_cont_body_email_input_btn">
              Resend
            </button>
          </div>
        </div>
      </div>
      <div className="kypageDiv_cont_button_div">
        <button className="kypageDiv_cont_button_div_btn" onClick={nextStep1}>
          Next Step
        </button>
      </div>
    </div>
  );
};
const KycAddressComp = ({ nextStep2 }) => {
  return (
    <div className="kypageDiv_cont">
      <div className="kypageDiv_cont_body_conts">
        <div className="kypageDiv_cont_head_div">
          <div className="kypageDiv_cont_head">Verify your Address</div>
          <div className="kypageDiv_cont_para">
            An email was sent to your inbox with an activation link on
            registration.{" "}
          </div>
        </div>
        <div className="kypageDiv_cont_body">
          <div className="kypageDiv_cont_body_txt">
            Didn't receive any email? Resend{" "}
          </div>
          <div className="kypageDiv_cont_body_email_input_div">
            <input
              type="text"
              value={"samuelify225@gmail.com"}
              className="kypageDiv_cont_body_email_input"
            />
            <button className="kypageDiv_cont_body_email_input_btn">
              Resend
            </button>
          </div>
        </div>
      </div>
      <div className="kypageDiv_cont_button_div">
        <button className="kypageDiv_cont_button_div_btn" onClick={nextStep2}>
          Next Step
        </button>
      </div>
    </div>
  );
};
const KycFacialComp = ({ submitVerify }) => {
  return (
    <div className="kypageDiv_cont">
      <div className="kypageDiv_cont_body_conts">
        <div className="kypageDiv_cont_head_div">
          <div className="kypageDiv_cont_head">Verify your Face</div>
          <div className="kypageDiv_cont_para">
            An email was sent to your inbox with an activation link on
            registration.{" "}
          </div>
        </div>
        <div className="kypageDiv_cont_body">
          <div className="kypageDiv_cont_body_txt">
            Didn't receive any email? Resend{" "}
          </div>
          <div className="kypageDiv_cont_body_email_input_div">
            <input
              type="text"
              value={"samuelify225@gmail.com"}
              className="kypageDiv_cont_body_email_input"
            />
            <button className="kypageDiv_cont_body_email_input_btn">
              Resend
            </button>
          </div>
        </div>
      </div>
      <div className="kypageDiv_cont_button_div">
        <button
          className="kypageDiv_cont_button_div_btn"
          onClick={submitVerify}
        >
          Submit Verification
        </button>
      </div>
    </div>
  );
};

export {
  KycEmailComp,
  KycBvnComp,
  KycStartComp,
  KycAddressComp,
  KycFacialComp,
};
