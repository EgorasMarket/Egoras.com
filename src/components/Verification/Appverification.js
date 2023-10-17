import React, { useState, useEffect, Fragment } from "react";
// import "../../../../css/signup.css";
import { connect } from "react-redux";
import "./login.css";
import { EGORAS_PAY_URL } from "../../core/constants";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingIcons from "react-loading-icons";
import { useNavigate, useParams } from "react-router-dom";
// import { CustomAlert } from "../../../../CustomAlert";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Kcl.css";

// import { verifyEgorasAppEmail } from "../../../../actions/auth";
// import { getAuthentication } from "../../../../actions/auth";
// import { setAlert } from "../../../../actions/alert";

const AppVerification = () => {
  // const [token,setToken]=useState();
  const { id } = useParams();
  // const [formData2, setFormData2] = useState(id);
  const [loadingState, setLoadingState] = useState(true);
  const [successState, setSuccessState] = useState(null);
  const [toke, setToke] = useState({ email: "", password: "" });
  //console.logog(id);

  const verifyEgorasAppEmail = async () => {
    const config = {
      headers: {
        Accept: "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const body = JSON.stringify({
      code: id,
    });

    //console.logog(body);

    try {
      const res = await axios.post(
        EGORAS_PAY_URL + "/pub/verify/email/address",
        body,
        config
      );
      //console.logog(res);
      if (res.data.success == true) {
        setLoadingState(false);
        setSuccessState(true);
        //console.logog("success");
      } else {
        setLoadingState(false);
        setSuccessState(false);
        //console.logog("error");
      }
    } catch (err) {
      //console.logog(err.response);
      setLoadingState(false);
      setSuccessState(false);
    }
  };
  useEffect(() => {
    verifyEgorasAppEmail();
    // //console.logog(res3);
    // if (res3.success == true) {
    //   setLoadingState(false);
    //   setSuccessState(true);
    //   //console.logog("success");
    // } else {
    //   setLoadingState(false);
    //   setSuccessState(false);
    //   //console.logog("error");
    // }
  }, [id]);

  // const submitLogin = async (e) => {
  //   window.close();
  // };

  return (
    <Fragment>
      <div>
        <section className="signup_section">
          <div className="container">
            <div className="signup_area">
              <div className="signup_cont">
                {loadingState ? (
                  <>
                    <LoadingIcons.TailSpin
                      stroke="#22ad62"
                      width="145px"
                      height="145px"
                      strokeWidth="3"
                    />
                    <p style={{ marginTop: "1em" }}>
                      Authenticating please wait ...
                    </p>
                  </>
                ) : (
                  <>
                    {successState ? (
                      <>
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
                          style={{ fontSize: "18px", fontWeight: "500" }}
                        >
                          You have successfully verified your email address.
                        </span>
                        <div
                          className="signup_para"
                          style={{ fontSize: "16px", fontWeight: "400" }}
                        >
                          Please return to the platform to continue.
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
                      </>
                    ) : (
                      <>
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
                          style={{ fontSize: "18px", fontWeight: "500" }}
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
                      </>
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
