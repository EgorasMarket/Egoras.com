import React, { useState, useRef, useEffect } from "react";
import FaceIcon from "@mui/icons-material/Face";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from "react-select";
import VerifiedIcon from "@mui/icons-material/Verified";
import Staticdata from "../../assets/json/Static";
import ReactCountryFlagsSelect from "react-country-flags-select";
import Webcam from "react-webcam";
const KycEmailComp = ({ toggleEmailCont }) => {
  return (
    <div className="kypageDiv_cont_div">
      <div className="kypageDiv_cont_div_btn">
        <div className="kypageDiv_cont_div_btn_func_btn">
          <ArrowBackIcon className="kypageDiv_cont_div_btn_func_btn_icon" />
          Home
        </div>
      </div>
      <div className="kypageDiv_cont">
        <div className="kypageDiv_cont_body_conts">
          <div className="kypageDiv_cont_head_div">
            <div className="kypageDiv_cont_head">Email Verification</div>
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
    </div>
  );
};
const KycStartComp = ({ startVerify, prev }) => {
  return (
    <div className="kypageDiv_cont_div">
      <div className="kypageDiv_cont_div_btn">
        <div className="kypageDiv_cont_div_btn_func_btn" onClick={prev}>
          <ArrowBackIcon className="kypageDiv_cont_div_btn_func_btn_icon" />
          Home
        </div>
        Verify
      </div>
      <div className="kypageDiv_cont">
        <div className="kypageDiv_cont_body_conts">
          <div className="kypageDiv_cont_head_div">
            <div className="kypageDiv_cont_img_div">
              <img
                src="/img/verification_svg1.svg"
                alt=""
                className="kypageDiv_cont_img"
              />
            </div>
            <div className="kypageDiv_cont_head">Verify Your Identity</div>
            <div className="kypageDiv_cont_para">
              Please submit the following requirements to process the
              application.
            </div>
          </div>
          <div className="kypageDiv_cont_body_start_verify">
            <div className="kypageDiv_cont_body_start_verify_cont1">
              <FaceIcon className="kypageDiv_cont_body_start_verify_cont1_icon" />
              <div className="kypageDiv_cont_body_start_verify_cont1_body2">
                <div className="kypageDiv_cont_body_start_verify_cont1_body2_title">
                  Take a selfie of yourself
                </div>
                <div className="kypageDiv_cont_body_start_verify_cont1_body2_para">
                  To match your face to your BVN
                </div>
              </div>
            </div>
            <div className="kypageDiv_cont_body_start_verify_cont1">
              <FaceIcon className="kypageDiv_cont_body_start_verify_cont1_icon" />
              <div className="kypageDiv_cont_body_start_verify_cont1_body2">
                <div className="kypageDiv_cont_body_start_verify_cont1_body2_title">
                  Take a selfie of yourself
                </div>
                <div className="kypageDiv_cont_body_start_verify_cont1_body2_para">
                  To match your face to your BVN
                </div>
              </div>
            </div>
            <div className="kypageDiv_cont_body_start_verify_cont1">
              <FaceIcon className="kypageDiv_cont_body_start_verify_cont1_icon" />
              <div className="kypageDiv_cont_body_start_verify_cont1_body2">
                <div className="kypageDiv_cont_body_start_verify_cont1_body2_title">
                  Take a selfie of yourself
                </div>
                <div className="kypageDiv_cont_body_start_verify_cont1_body2_para">
                  To match your face to your BVN
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="kypageDiv_cont_button_div">
          <div className="kypageDiv_cont_button_div_txt">
            Your infos will be encrypted and stored securely.
          </div>
          <button
            className="kypageDiv_cont_button_div_btn"
            onClick={startVerify}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
const KycBvnComp = ({ nextStep1, prevStep }) => {
  return (
    <div className="kypageDiv_cont_div">
      <div className="kypageDiv_cont_div_btn">
        <div className="kypageDiv_cont_div_btn_func_btn" onClick={prevStep}>
          <ArrowBackIcon className="kypageDiv_cont_div_btn_func_btn_icon" />
          Back
        </div>
        Step1/3
      </div>
      <div className="kypageDiv_cont">
        <div className="kypageDiv_cont_body_conts">
          <div className="kypageDiv_cont_head_div">
            <div className="kypageDiv_cont_head">Please provide your BVN</div>
            <div className="kypageDiv_cont_para">
              If you don't have your BVN yo can request from your bank
              instituition, or dial the code below using the phone nuber
              registered with your BVN.
            </div>
          </div>
          <div className="kypageDiv_cont_body">
            <div className="kypageDiv_cont_body_email_input_code">*565*0#</div>
            <div className="kypageDiv_cont_body_email_input_div">
              <input
                type="number"
                placeholder={"Enter BVN here"}
                className="kypageDiv_cont_body_email_input2"
              />
            </div>
          </div>
          <div className="kypageDiv_cont_body_start_verify">
            <div className="kypageDiv_cont_body_start_verify_title">
              Why we need your BVN?
            </div>
            <div className="kypageDiv_cont_body_start_verify_answers_conts">
              <div className="kypageDiv_cont_body_start_verify_answers_conts_title">
                We use your BVN to verify the following
              </div>
              <div className="kypageDiv_cont_body_start_verify_answers_cont1">
                <VerifiedIcon className="kypageDiv_cont_body_start_verify_answers_cont1_icon" />

                <div className="kypageDiv_cont_body_start_verify_answers_cont1_txt">
                  Full name
                </div>
              </div>
              <div className="kypageDiv_cont_body_start_verify_answers_cont1">
                <VerifiedIcon className="kypageDiv_cont_body_start_verify_answers_cont1_icon" />

                <div className="kypageDiv_cont_body_start_verify_answers_cont1_txt">
                  Phone Number
                </div>
              </div>
              <div className="kypageDiv_cont_body_start_verify_answers_cont1">
                <VerifiedIcon className="kypageDiv_cont_body_start_verify_answers_cont1_icon" />

                <div className="kypageDiv_cont_body_start_verify_answers_cont1_txt">
                  Date of Birth
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="kypageDiv_cont_button_div">
          <button className="kypageDiv_cont_button_div_btn" onClick={nextStep1}>
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};
const KycAddressComp = ({ nextStep2, prevStep }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="kypageDiv_cont_div">
      <div className="kypageDiv_cont_div_btn">
        <div className="kypageDiv_cont_div_btn_func_btn" onClick={prevStep}>
          <ArrowBackIcon className="kypageDiv_cont_div_btn_func_btn_icon" />
          Back
        </div>
        Step2/3
      </div>
      <div className="kypageDiv_cont">
        <div className="kypageDiv_cont_body_conts">
          <div className="kypageDiv_cont_head_div">
            <div className="kypageDiv_cont_head">Address Verification</div>
          </div>
          <div className="kypageDiv_cont_body">
            <div className="kypageDiv_cont_body_input_div">
              <div className="kypageDiv_cont_body_input_div_title">
                Select Country:
              </div>
              <ReactCountryFlagsSelect
                selected={selected}
                onSelect={setSelected}
                className="kypageDiv_cont_body_email_input2"
                searchable={true}
                clearIcon={true}
              />
              ;
            </div>
            <div className="kypageDiv_cont_body_input_div">
              <div className="kypageDiv_cont_body_input_div_title">
                Select State:
              </div>
              <Select
                placeholder="Select State"
                classNamePrefix="select"
                className="kypageDiv_cont_body_input_div_slect"
                defaultValue={Staticdata.options2[0]}
                id="gender"
                isSearchable={true}
                name="gender"
                options={Staticdata.options2}
              />
            </div>
            <div className="kypageDiv_cont_body_input_div">
              <div className="kypageDiv_cont_body_input_div_title">
                Select City:
              </div>
              <Select
                placeholder="Select City"
                classNamePrefix="select"
                className="kypageDiv_cont_body_input_div_slect"
                defaultValue={Staticdata.options2[0]}
                id="gender"
                isSearchable={true}
                name="gender"
                options={Staticdata.options2}
              />
            </div>
            <div className="kypageDiv_cont_body_input_div">
              <div className="kypageDiv_cont_body_input_div_title">
                Enter Address:
              </div>
              <input
                type="text"
                placeholder={"Enter your address"}
                className="kypageDiv_cont_body_email_input2"
              />
            </div>
          </div>
        </div>
        <div className="kypageDiv_cont_button_div">
          <button className="kypageDiv_cont_button_div_btn" onClick={nextStep2}>
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};
const KycFacialComp = ({ submitVerify, prevStep }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };
  const ToggleOpenCamera = () => {
    setOpenCamera(!openCamera);
  };
  const RetakeImage = () => {
    setCapturedImage(null);
  };
  useEffect(() => {
    console.log(capturedImage);
  }, [capturedImage]);

  return (
    <div className="kypageDiv_cont_div">
      <div className="kypageDiv_cont_div_btn">
        <div className="kypageDiv_cont_div_btn_func_btn" onClick={prevStep}>
          <ArrowBackIcon className="kypageDiv_cont_div_btn_func_btn_icon" />
          Back
        </div>
        Step3/3
      </div>
      <div className="kypageDiv_cont">
        <div className="kypageDiv_cont_body_conts">
          <div className="kypageDiv_cont_head_div">
            <div className="kypageDiv_cont_head">Facial Verification</div>
            <div className="kypageDiv_cont_para">
              Please put your face in front of your device's camera
            </div>
          </div>
          <div className="kypageDiv_cont_body">
            <div className="face_id_div">
              {openCamera ? (
                <>
                  {capturedImage == null ? (
                    <div className="camera-container">
                      <div className="camera-feed">
                        <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          className="face_id_div_video"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="captured-image">
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="captured_image_img"
                      />
                    </div>
                  )}
                </>
              ) : (
                <img
                  src="/img/face_scan_icon.png"
                  alt=""
                  className="face_id_div_img"
                />
              )}
              {openCamera ? (
                <>
                  {capturedImage == null ? (
                    <button className="face_id_div_btn" onClick={captureImage}>
                      Capture Image
                    </button>
                  ) : (
                    <button className="face_id_div_btn" onClick={RetakeImage}>
                      Retake Image
                    </button>
                  )}
                </>
              ) : (
                <button className="face_id_div_btn" onClick={ToggleOpenCamera}>
                  Take a selfie
                </button>
              )}
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
