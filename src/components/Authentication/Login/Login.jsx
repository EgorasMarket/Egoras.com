import React, { useEffect, useState } from "react";
import "../../../stylesheet/signupLogin.css";
import Staticdata from "../../../assets/json/Static";
// dummySelectData;
const Login = () => {
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
                className="signup_div_section_div_container_form_input"
              />
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              {/* ============ */}
              <button className="signup_div_section_div_container_form_btn">
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
