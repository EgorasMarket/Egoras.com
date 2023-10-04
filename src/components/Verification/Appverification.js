import React, { useState, useEffect, Fragment } from "react";
// import "../../../../css/signup.css";
import { connect } from "react-redux";
import "./login.css";
import { EGORAS_PAY_URL } from "../../core/constants";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingIcons from "react-loading-icons";
// import { CustomAlert } from "../../../../CustomAlert";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Kcl.css";

// import { verifyEgorasAppEmail } from "../../../../actions/auth";
// import { getAuthentication } from "../../../../actions/auth";
// import { setAlert } from "../../../../actions/alert";

const AppVerification = ({ match }) => {
  // const [token,setToken]=useState();
  const [formData2, setFormData2] = useState(match.params.id);
  const [loadingState, setLoadingState] = useState(true);
  const [successState, setSuccessState] = useState(null);
  const [toke, setToke] = useState({ email: "", password: "" });
  console.log(formData2);

  const verifyEgorasAppEmail = (email_auth) => async (dispatch) => {
    const config = {
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const body = JSON.stringify({
      code: email_auth,
    });

    console.log(body);

    try {
      const res = await axios.post(
        EGORAS_PAY_URL + "/pub/verify/email/address",
        body,
        config
      );
      console.log(res);
      return {
        success: true,
        data: res.data,
      };
    } catch (err) {
      console.log(err.response);

      return {
        success: false,
        data: err.response,
      };
    }
  };
  useEffect(async () => {
    let res3 = await verifyEgorasAppEmail(formData2);

    console.log(res3);

    if (res3.success == true) {
      setLoadingState(false);
      setSuccessState(true);
      console.log("success");
    } else {
      setLoadingState(false);
      setSuccessState(false);
      console.log("error");
    }
  }, [formData2]);

  const submitLogin = async (e) => {
    window.close();
  };

  return (
    <Fragment>
      <div>
        <section className="signup_section">
          <div className="container">
            <div className="signup_area">
              <div className="signup_cont_head">
                <a href="/">
                  <img
                    src="/img/egoras-logo.svg"
                    alt=""
                    className="signup_title_img"
                  />
                </a>
              </div>
              <div className="signup_cont">
                {loadingState ? (
                  <>
                    <LoadingIcons.TailSpin
                      stroke="#000"
                      width="145px"
                      height="145px"
                      strokeWidth="3"
                    />
                    <p>Authenticating please wait ...</p>
                  </>
                ) : (
                  <>
                    {successState ? (
                      <div>
                        <img
                          src="/img/check.png"
                          alt=""
                          className="signup_title_img"
                          style={{
                            width: "90px",
                            height: "90px",
                            marginBottom: "10px",
                          }}
                        />
                        <div className="signup_title">Congratulation!</div>
                        <span
                          className="signup_para"
                          style={{ fontSize: "22px", fontWeight: "600" }}
                        >
                          You have successfully verified your email address.
                        </span>

                        <div
                          className="signup_para"
                          style={{ fontSize: "16px", fontWeight: "500" }}
                        >
                          Proceed to App to view your dashboard.
                        </div>
                        <div className="signup_inputs_cont">
                          {/* <button
                                                            type="submit"
                                                            className="sign_up_btn"
                                                            onClick={submitLogin}
                                                        // disabled={disable}
                                                        >
                                                            <span>Close</span>
                                                        </button> */}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <img
                          src="/img/close.png"
                          alt=""
                          className="signup_title_img"
                          style={{
                            width: "90px",
                            height: "90px",
                            marginBottom: "10px",
                          }}
                        />
                        <div
                          className="signup_title"
                          style={{ color: "#e04f60" }}
                        >
                          Oops!
                        </div>
                        <span
                          className="signup_para"
                          style={{ fontSize: "22px", fontWeight: "600" }}
                        >
                          Sorry, your email verification was not successful
                        </span>

                        {/* <div className="signup_para" style={{ fontSize: "16px", fontWeight: "500" }}>
                                                        Proceed to App to view your dashboard.
                                                    </div> */}
                        <div className="signup_inputs_cont">
                          {/* <button
                                                            type="submit"
                                                            className="sign_up_btn"
                                                            onClick={submitLogin}
                                                        // disabled={disable}
                                                        >
                                                            <span>Close</span>
                                                        </button> */}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <img src="/img/piggy_bg.svg" alt="" className="piggy_bg" />
        </section>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  // isAuthenticated: state.auth.isAuthenticated,
});

export default AppVerification;
