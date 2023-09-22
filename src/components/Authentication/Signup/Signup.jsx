import React, { useEffect, useState } from "react";
import "../../../stylesheet/signupLogin.css";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/plain.css";
import Staticdata from "../../../assets/json/Static";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react18-input-otp";
// import { setPayload } from "../../../features/user-registration/userRegistration";
import { registerUser } from "../../../features/auth/authActions";
import { setPayload } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
// dummySelectData;
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { payload, loading, error } = useSelector((state) => state.auth);
  const [defaultForm, setDefaultForm] = useState(true);
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const ToggleDefaultForm = () => {
    setDefaultForm(!defaultForm);
  };

  const handleOnChange = (e) => {
    console.log(e);
    const { id, value } = e.target;
    dispatch(setPayload({ ...payload, [id]: value }));
  };

  const handleSignUp = async () => {
    const {
      email,
      password,
      firstName,
      lastName,
      fullName,
      username,
      phone,
      referral,
      countrycode,
    } = payload;
    console.log(payload);

    let temp = "+" + phone.toString();
    let result = temp.replace(countrycode, "0");
    // payload.phone = result;

    if (email === "" || password === "") return;

    let newPayload = { ...payload, phone: result };

    const res = await dispatch(registerUser(newPayload));

    console.log(res);
    if (res.payload?.code === 200) {
      // alert("Registration Successful -- redirect to choice page");
      // navigate("/login");
      setOtpModal(true);
      return;
    }

    if (res.payload?.data?.success === false) {
      return alert(res.payload?.data?.errorMessage);
    }

    console.log("Failed");
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
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
              <div className="signup_div_section_div_container_form_cont">
                <span className="signup_div_section_div_container_form_cont_span">
                  Step 1/2
                </span>
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
                    value={payload.fullName}
                    name="fullName"
                    className="signup_div_section_div_container_form_input"
                    onChange={handleOnChange}
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
                    value={payload.email}
                    id="email"
                    name="email"
                    className="signup_div_section_div_container_form_input"
                    onChange={handleOnChange}
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
                    id="username"
                    value={payload.username}
                    name="userName"
                    className="signup_div_section_div_container_form_input"
                    onChange={handleOnChange}
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
                    id="gender"
                    isSearchable={true}
                    // value={payload.gender}
                    name="gender"
                    onChange={(data) => {
                      dispatch(setPayload({ ...payload, gender: data.label }));
                    }}
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
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="signup_div_section_div_container_form_input"
                    onChange={handleOnChange}
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
              </div>
            ) : null}
            {!defaultForm ? (
              <div className="signup_div_section_div_container_form_cont">
                <span className="signup_div_section_div_container_form_cont_span">
                  Step 2/2
                </span>
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
                    country={"ng"}
                    enableSearch={true}
                    value={payload.phone}
                    onChange={(value, country, e, formattedValue) => {
                      // let text = value;
                      // let result = text.replace(country.dialCode, "0");
                      // console.log(result);
                      dispatch(
                        setPayload({
                          ...payload,
                          countrycode: "+" + country.dialCode,
                          phone: value,
                        })
                      );
                      console.log(country, formattedValue, value);
                    }}
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
                    id="referral"
                    name="referral"
                    value={payload.referral}
                    className="signup_div_section_div_container_form_input"
                    onChange={handleOnChange}
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
                    value={payload.password}
                    name="password"
                    className="signup_div_section_div_container_form_input"
                    onChange={handleOnChange}
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
                    id="confirm"
                    value={payload.confirm}
                    name="confirm"
                    className="signup_div_section_div_container_form_input"
                    onChange={handleOnChange}
                  />
                  {/* ============ */}
                  {/* ============ */}
                  {/* ============ */}
                  {/* ============ */}
                  {/* ============ */}
                  <button
                    className="signup_div_section_div_container_form_btn"
                    onClick={handleSignUp}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            ) : null}
            <div className="signup_div_section_div_para">
              Already have an acccount?{"   "}
              <a href="/login" className="signup_div_section_div_para_link">
                Login
              </a>
            </div>
          </div>
        </div>
      </section>
      {otpModal ? (
        <div className="otp_modal">
          <div className="otp_modal_container">
            <div className="otp_modal_container_head">Enter the code</div>
            <div className="otp_modal_container_para">
              Enter the otp code sent to your mobile number{" "}
              {"+" + payload.phone}. Be careful not to share the code with
              anyone.
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
                separator={<span> - </span>}
                separateAfter={1}
                shouldAutoFocus
                onSubmit={console.log(otp)}
              />
            </div>
            <div className="otp_modal_container_body_button">
              <button className="otp_modal_container_body_button_btn">
                Send
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Signup;
