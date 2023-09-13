import React, { useEffect, useState } from "react";
import "../../../stylesheet/signupLogin.css";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/plain.css";
import Staticdata from "../../../assets/json/Static";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// dummySelectData;
const Signup = () => {
  const [defaultForm, setDefaultForm] = useState(true);
  const ToggleDefaultForm = () => {
    setDefaultForm(!defaultForm);
  };
  return (
    <div className="signup_div">
      <section
        className="signup_div_section"
        style={{ backgroundImage: "url(/img/signup_bg.png)" }}
      >
        <div className="custom_container">
          <div className="signup_div_section_div">
            <div className="signup_div_section_div_title">
              Get started with Egoras
            </div>
            {defaultForm ? (
              <div className="signup_div_section_div_container_form">
                <label
                  htmlFor="fullName"
                  className="signup_div_section_div_container_form_label"
                >
                  Full Name:
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="signup_div_section_div_container_form_input"
                />
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                <label
                  htmlFor="email"
                  className="signup_div_section_div_container_form_label"
                >
                  Email Address:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="signup_div_section_div_container_form_input"
                />
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                <label
                  htmlFor="username"
                  className="signup_div_section_div_container_form_label"
                >
                  User Name:
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  className="signup_div_section_div_container_form_input"
                />
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                <label
                  htmlFor="Gender"
                  className="signup_div_section_div_container_form_label"
                >
                  Gender:
                </label>
                <Select
                  placeholder="Select Gender"
                  classNamePrefix="select"
                  // defaultValue={Staticdata.dummySelectData[0]}
                  isSearchable={true}
                  name="color"
                  options={Staticdata.options}
                />
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                <label
                  htmlFor="Date"
                  className="signup_div_section_div_container_form_label"
                >
                  Date Of Birth:
                </label>
                <input
                  type="date"
                  id="custom-date"
                  name="custom-date"
                  className="signup_div_section_div_container_form_input"
                />
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}

                <button
                  className="signup_div_section_div_container_form_btn"
                  onClick={ToggleDefaultForm}
                >
                  Next{" "}
                  <ChevronRightIcon className="signup_div_section_div_container_form_btn_icon" />
                </button>
              </div>
            ) : null}
            {!defaultForm ? (
              <div className="signup_div_section_div_container_form">
                <div className="back_form_btn" onClick={ToggleDefaultForm}>
                  <ChevronLeftIcon className="back_form_btn_icon" /> Back
                </div>
                <label
                  htmlFor="phoneNumber"
                  className="signup_div_section_div_container_form_label"
                >
                  Phone Number:
                </label>
                <PhoneInput
                  country={"us"}
                  enableSearch={true}
                  // value={this.state.phone}
                  // onChange={(phone) => this.setState({ phone })}
                />
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                <label
                  htmlFor="ReferralCode"
                  className="signup_div_section_div_container_form_label"
                >
                  Referral Code:
                </label>
                <input
                  type="text"
                  id="referralCode"
                  name="referralCode"
                  className="signup_div_section_div_container_form_input"
                />
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                <label
                  htmlFor="password"
                  className="signup_div_section_div_container_form_label"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="signup_div_section_div_container_form_input"
                />
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                <label
                  htmlFor="password"
                  className="signup_div_section_div_container_form_label"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="signup_div_section_div_container_form_input"
                />
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                {/* ============ */}
                <button className="signup_div_section_div_container_form_btn">
                  Create Account
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
