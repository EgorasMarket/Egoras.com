import React, { useEffect, useState } from "react";
import "../../../stylesheet/signupLogin.css";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/plain.css";
import Staticdata from "../../../assets/json/Static";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import SuccessModal from "../../Common/CommonUI/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../Common/CommonUI/Modals/ErrorModal/ErrorModal";
// import { setPayload } from "../../../features/user-registration/userRegistration";
import { registerUser } from "../../../features/auth/authActions";
import { setPayload } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { VERIFY_OTP } from "../../../services/auth";
import OtpModal from "../../Common/CommonUI/Modals/OtpModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// dummySelectData;
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { payload, loading, error } = useSelector((state) => state.auth);
  const [defaultForm, setDefaultForm] = useState(true);
  const [submitDisable, setSubmitDisable] = useState(true);
  const [otpDisable, setOtpDisable] = useState(true);
  const [otpLoading, setOtpLoading] = useState(false);
  const [nextDisable, setNextDisable] = useState(true);
  const [errorModal, setErrorModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorTxt, setErrorTxt] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  useEffect(() => {
    if (otp == "") {
      setOtpDisable(true);
    } else {
      setOtpDisable(false);
    }
  }, [otp]);

  useEffect(() => {
    if (
      payload.fullName == "" ||
      payload.email == "" ||
      payload.username == ""
    ) {
      setNextDisable(true);
    } else {
      setNextDisable(false);
    }
  }, [payload.fullName, payload.email, payload.username]);
  useEffect(() => {
    if (
      payload.phone == "" ||
      payload.password == "" ||
      payload.confirm == ""
    ) {
      setSubmitDisable(true);
    } else {
      setSubmitDisable(false);
    }
  }, [payload.phone, payload.password, payload.confirm]);

  const ToggleDefaultForm = () => {
    setDefaultForm(!defaultForm);
  };

  const handleOnChange = (e) => {
    console.log(e);
    const { id, value } = e.target;
    dispatch(setPayload({ ...payload, [id]: value }));
  };

  const handleSignUp = async () => {
    setSubmitDisable(true);
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
    setPayload(newPayload);

    console.log(res);
    if (res.payload?.code === 200) {
      setSubmitDisable(false);
      setOtpModal(true);
      return;
    }

    if (res.payload?.data?.success === false) {
      setSubmitDisable(false);
      setErrorModal(true);
      setErrorTxt(res.payload?.data?.errorMessage);
      // return alert(res.payload?.data?.errorMessage);
    }

    console.log("Failed");
  };

  if (error) {
    return <p>{error}</p>;
  }

  const handleVerifyOtp = async () => {
    setOtpDisable(true);
    setOtpLoading(true);
    console.log(payload);

    let temp = "+" + payload.phone.toString();
    let newPhone = temp.replace(payload.countrycode, "0");

    const response = await VERIFY_OTP({
      email: payload.email,
      code: otp,
      phone: newPhone,
    });

    console.log(response);

    if (response.success) {
      setSuccess(true);
      setOtpDisable(false);
      setOtpLoading(false);
      return;
    }
    setErrorModal(true);
    setErrorTxt(response.data.errorMessage || "Verification failed!!1");
    setOtpDisable(false);
    setOtpLoading(false);
  };

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
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
                    // autoComplete="off"
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
                    // autoComplete="off"
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
                    // autoComplete="off"
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
                    disabled={nextDisable}
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
                    htmlFor="password"
                    className="signup_div_section_div_container_form_label"
                  >
                    Password:
                  </label>

                  <div className="password_div">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      value={payload.password}
                      name="password"
                      className="signup_div_section_div_container_form_input_pasowrd"
                      onChange={handleOnChange}
                      autoComplete="off"
                    />
                    {passwordVisible ? (
                      <VisibilityOffIcon
                        onClick={togglePasswordVisibility}
                        className="otp_modal_container_body_icon2"
                      />
                    ) : (
                      <VisibilityIcon
                        onClick={togglePasswordVisibility}
                        className="otp_modal_container_body_icon2"
                      />
                    )}
                  </div>
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
                  <div className="password_div">
                    <input
                      type={passwordVisible2 ? "text" : "password"}
                      id="confirm"
                      value={payload.confirm}
                      name="confirm"
                      className="signup_div_section_div_container_form_input_pasowrd"
                      onChange={handleOnChange}
                      autoComplete="off"
                    />
                    {passwordVisible2 ? (
                      <VisibilityOffIcon
                        onClick={togglePasswordVisibility2}
                        className="otp_modal_container_body_icon2"
                      />
                    ) : (
                      <VisibilityIcon
                        onClick={togglePasswordVisibility2}
                        className="otp_modal_container_body_icon2"
                      />
                    )}
                  </div>

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
                    autoComplete="off"
                    // aria-autocomplete="off"
                  />
                  {/* ============ */}
                  {/* ============ */}
                  {/* ============ */}
                  {/* ============ */}
                  {/* ============ */}
                  {/* ============ */}
                  <button
                    className="signup_div_section_div_container_form_btn"
                    onClick={handleSignUp}
                    disabled={submitDisable}
                  >
                    {loading ? (
                      <>
                        <ScaleLoader color="#366e51" height={20} />
                      </>
                    ) : (
                      " Create account"
                    )}
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
        <OtpModal
          handleChange={handleChange}
          otp={otp}
          handleVerifyOtp={handleVerifyOtp}
          payload={payload}
          otpDisable={otpDisable}
          otpLoading={otpLoading}
        />
      ) : null}
      {success ? (
        <SuccessModal
          SuccesTxt={"You have successfully verified your phone number "}
          successFunc={() => {
            window.location.href = "/login";
          }}
        />
      ) : null}
      {errorModal ? (
        <ErrorModal
          ErrorTxt={errorTxt}
          errorFunc={() => {
            setErrorModal(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default Signup;
