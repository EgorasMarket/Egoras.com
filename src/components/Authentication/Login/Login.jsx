import React, { useEffect, useState } from "react";
import "../../../stylesheet/signupLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/auth/authActions";
import { useNavigate } from "react-router-dom";
import ComponentLoading from "../../Common/CommonUI/Modals/ComponentLoading";
import ScaleLoader from "react-spinners/ScaleLoader";
import WebPin from "../../Common/CommonUI/Modals/WebPin";
import SuccessModal from "../../Common/CommonUI/Modals/SuccessModal/SuccessModal";
import ErrorModal from "../../Common/CommonUI/Modals/ErrorModal/ErrorModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import OtpModal from "../../Common/CommonUI/Modals/OtpModal";
import { RESEND_SMS_OTP, VERIFY_OTP } from "../../../services/auth";
// dummySelectData;
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [userPin, setUserPin] = useState(!null);
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorTxt, setErrorTxt] = useState("");
  const [pinModal, setPinModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpDisable, setOtpDisable] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleLogin = async () => {
    setDisable(true);

    const { email, password } = values;

    if (email === "" || password === "") return;

    setIsLoading(true);
    const res = await dispatch(loginUser(values));
    setIsLoading(false);
    // //console.logog(res);
    if (res.payload.code === 200) {
      setDisable(false);
      if (userPin === null) {
        setPinModal(true);
        return;
      }
      setSuccess(true);
      return;
    }

    if (res.payload?.data?.success === false) {
      // //console.logog(res);
      if (res.payload?.data?.errorMessage === "VERIFICATION_REQUIRED") {
        // call the resend API

        const resendsms = await RESEND_SMS_OTP({
          email: values.email,
        });

        // //console.logog(resendsms);
        setOtpModal(true);
        return;
      }
      setDisable(false);
      setErrorTxt(res.payload?.data?.errorMessage);
      setErrorModal(true);
    }
  };

  const handleChange = (enteredOtp) => {
    //console.logog(enteredOtp);
    setOtp(enteredOtp);
  };

  const processOtp = async () => {
    //console.logog("return");
  };
  const handleVerifyOtp = async () => {
    setOtpDisable(true);

    const response = await VERIFY_OTP({
      code: otp,
      email: values.email,
    });

    //console.logog(response);

    if (response.success) {
      window.location.reload();
      // setSuccess(true);
      // setOtpDisable(false);
      // setOtpLoading(false);
      return;
    }
    setErrorModal(true);
    setErrorTxt(response.data.errorMessage || "Verification failed!!1");
    setOtpDisable(false);
    setOtpLoading(false);
  };
  const handleOnChange = (e) => {
    const { value, id } = e.target;

    setValues({
      ...values,

      [id]: value,
    });
  };

  const createPin = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (values.email && values.password !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [values]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  function redirectToSavedRoute() {
    const savedRoute = localStorage.getItem("RedirectRoute");
    if (savedRoute) {
      localStorage.removeItem("RedirectRoute"); // Remove the stored route
      window.location.href = savedRoute; // Redirect to the intended checkout page
    } else {
      window.location.href = "/dashboard"; // Replace with your default checkout
    }
  }
  return (
    <div className="signup_div">
      <section
        className="signup_div_section"
        style={{ backgroundImage: "url(/img/signup_bg.png)" }}
      >
        <div className="custom_container">
          <div className="signup_div_section_div">
            <div className="signup_div_section_div_title">Welcome Back</div>

            <div className="signup_div_section_div_container_form">
              <label
                htmlFor="email"
                className="signup_div_section_div_container_form_label"
              >
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                onChange={handleOnChange}
                name="email"
                className="signup_div_section_div_container_form_input"
                autoComplete="off"
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
                  name="password"
                  onChange={handleOnChange}
                  className="signup_div_section_div_container_form_input_pasowrd"
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
              <div className="forgot_password_link_div">
                <div className="forgot_password_link_div_1">
                  <input type="checkbox" id="checkbox-1" name="checkbox" />
                  <label
                    for="checkbox-1"
                    className="checkBox_agree_div_body_label"
                  >
                    <div className="checkBox_agree_div_body_txt">
                      Remember me
                    </div>
                  </label>
                </div>
                <div className="forgot_password_link_div_2">
                  <a
                    className="forgot_password_link_div_2_link"
                    href="/forgotpassword"
                  >
                    Forgot Password?{" "}
                  </a>
                </div>
              </div>
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              <button
                className="signup_div_section_div_container_form_btn"
                onClick={handleLogin}
                disabled={disable}
              >
                {isLoading ? (
                  <>
                    <ScaleLoader color="#366e51" height={20} />
                  </>
                ) : (
                  " Login"
                )}
              </button>
            </div>

            <div className="signup_div_section_div_para">
              Don't have an account?{"   "}
              <a href="/signup" className="signup_div_section_div_para_link">
                Signup
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
          otpDisable={otpDisable}
          otpLoading={otpLoading}
          payload={values}
        />
      ) : null}
      {pinModal ? (
        <WebPin
          isLoading={isLoading}
          btnFunc={createPin}
          pinTitle="Create a transaction pin"
          pinPara="Create a transaction pin that will be used to validate your transactions within the platform"
          btnFuncTxt="Create Pin"
        />
      ) : null}
      {success ? (
        <SuccessModal
          SuccesTxt={"You have successfully logged in "}
          successFunc={redirectToSavedRoute}
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

export default Login;
