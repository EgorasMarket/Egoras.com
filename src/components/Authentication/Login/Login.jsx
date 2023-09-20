import React, { useEffect, useState } from "react";
import "../../../stylesheet/signupLogin.css";
import Staticdata from "../../../assets/json/Static";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/auth/authActions";
import { useNavigate } from "react-router-dom";
// dummySelectData;
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const { email, password } = values;

    if (email === "" || password === "") return;

    const res = await dispatch(loginUser(values));
    console.log(res);
    if (res.payload.code === 200) {
      alert("Login successful");

      return;
    }

    if (res.payload?.data?.success === false) {
      alert(res.payload?.data?.errorMessage);
    }
  };

  const handleOnChange = (e) => {
    const { value, id } = e.target;

    setValues({
      ...values,

      [id]: value,
    });
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
                onChange={handleOnChange}
                className="signup_div_section_div_container_form_input"
              />
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
              >
                Login
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
    </div>
  );
};

export default Login;
