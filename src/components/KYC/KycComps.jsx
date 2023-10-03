import React, { useState, useRef, useEffect } from "react";
import FaceIcon from "@mui/icons-material/Face";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from "react-select";
import VerifiedIcon from "@mui/icons-material/Verified";
import Staticdata from "../../assets/json/Static";
import ReactCountryFlagsSelect from "react-country-flags-select";
import {
  GET_KYC_STATUS,
  UPLOAD_IMAGE,
  UPLOAD_LEVEL_2_KYC,
} from "../../services/kyc_services";
import { useDispatch, useSelector } from "react-redux";
import { setPayload } from "../../features/kyc/kycSlice";
import Webcam from "react-webcam";

import axios from "axios";
import { dataUrlToFile } from "../../utils/Base64ToFile";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const levels = Object.freeze({
  level1: "LEVEL_1",
  level2: "LEVEL_2",
  level3: "LEVEL_3",
});
const status = Object.freeze({
  verified: "VERIFIED",
  notVerified: "NOT_VERIFIED",
});
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
  },
  video: {
    width: "100%",
    maxWidth: "400px",
    marginBottom: "1rem",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
    marginBottom: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
const KycEmailComp = ({ toggleEmailCont }) => {
  const [response, setResponse] = useState({});
  const fetchKycStatus = async () => {
    const response = await GET_KYC_STATUS();
    console.log(response);

    if (response?.code === null || !response?.code === 200) {
      return;
    }

    // if (response.data.data.status === status.verified) {
    //   toggleEmailCont();
    //   return;
    // }

    if (
      (response.data.data.level === levels.level1 &&
        response.data.data.status === status.verified) ||
      (response.data.data.level === levels.level2 &&
        response.data.data.status === status.notVerified) ||
      (response.data.data.level === levels.level2 &&
        response.data.data.status === status.verified) ||
      (response.data.data.level === levels.level3 &&
        response.data.data.status === status.notVerified) ||
      (response.data.data.level === levels.level3 &&
        response.data.data.status === status.verified)
    ) {
      toggleEmailCont();
    }
    setResponse(response?.data?.data);
    console.log(response);
  };

  useEffect(() => {
    fetchKycStatus();
  }, []);

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
        {/* {!response?.level === levels.level1 && (
          <div className="kypageDiv_cont_button_div">
            <button
              className="kypageDiv_cont_button_div_btn"
              onClick={toggleEmailCont}
            >
              Continue
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};
const KycStartComp = ({ startVerify, prev }) => {
  const [response, setResponse] = useState({});
  const fetchKycStatus = async () => {
    const response = await GET_KYC_STATUS();
    console.log(response);

    if (response?.code === null || !response?.code === 200) {
      return;
    }

    if (
      response.data?.data?.level === levels.level2 &&
      response.data.data.status === status.notVerified
    ) {
      // nextStep1();
    }
    setResponse(response?.data?.data);
  };

  useEffect(() => {
    fetchKycStatus();
  }, []);

  if (
    response.level === levels.level2 &&
    response.status === status.notVerified
  ) {
    return (
      <div className="kypageDiv_cont_div">
        <div className="kypageDiv_cont_div_btn">
          <h1>Your Document is being reviewied </h1>
          <p>Once completed, you'll be notified</p>
        </div>
      </div>
    );
  }
  return (
    <div className="kypageDiv_cont_div">
      <>
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
      </>
    </div>
  );
};
const KycBvnComp = ({ nextStep1, prevStep }) => {
  const dispatch = useDispatch();
  const { payload } = useSelector((state) => state.kyc);

  return (
    <div className="kypageDiv_cont_div">
      <>
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
              <div className="kypageDiv_cont_body_email_input_code">
                *565*0#
              </div>
              <div className="kypageDiv_cont_body_email_input_div">
                <input
                  type="number"
                  placeholder={"Enter BVN here"}
                  className="kypageDiv_cont_body_email_input2"
                  onChange={(e) => {
                    const { value } = e.target;
                    if (payload.bvnNumber.length >= 11) return;

                    dispatch(setPayload({ ...payload, bvnNumber: value }));
                  }}
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
          <div
            className="kypageDiv_cont_button_div"
            onClick={() => {
              alert(JSON.stringify(payload));
            }}
          >
            <button
              className="kypageDiv_cont_button_div_btn"
              onClick={nextStep1}
            >
              Next Step
            </button>
          </div>
        </div>
      </>
    </div>
  );
};
const KycAddressComp = ({ nextStep2, prevStep }) => {
  const dispatch = useDispatch();
  const { payload } = useSelector((state) => state.kyc);

  const [selected, setSelected] = useState(null);

  const [data, setData] = useState({
    country: "",
    state: "",
    city: "",
    address: "",
  });

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
                labelWithCountryCode
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
                onChange={(e) => {
                  setData({ state: e.label });
                }}
                id="state"
                isSearchable={true}
                name="state"
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
                onChange={(e) => {
                  setData({ city: e.label });
                }}
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
                onChange={(e) => {
                  setData({ address: e.target.value });
                }}
                id=""
                placeholder={"Enter your address"}
                className="kypageDiv_cont_body_email_input2"
              />
            </div>
          </div>
        </div>
        <div
          className="kypageDiv_cont_button_div"
          onClick={async () => {
            await dispatch(
              setPayload({
                ...payload,
                address: `address, city, state, country`,
              })
            );
          }}
        >
          <button className="kypageDiv_cont_button_div_btn" onClick={nextStep2}>
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};
const KycFacialComp = ({ submitVerify, prevStep }) => {
  const navigate = useNavigate();
  const { payload } = useSelector((state) => state.kyc);
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const [capturedImage, setCapturedImage] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);
  const [processing, setProcessing] = useState(false);

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    await dispatch(setPayload({ ...payload, image: imageSrc }));
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
          {processing ? (
            <p>loading ...</p>
          ) : (
            <button
              className="kypageDiv_cont_button_div_btn"
              onClick={async () => {
                setProcessing(true);
                const file = dataUrlToFile(payload.image, "file.jpg");
                let data = new FormData();
                data.append("image_file", file);
                const response = await UPLOAD_IMAGE(data);
                console.log(response);

                if (!response.success || response?.success === false) {
                  return;
                }

                let new_payload = payload;
                new_payload = {
                  ...new_payload,
                  image: response.data.image_name,
                };
                console.log(new_payload);
                const res = await UPLOAD_LEVEL_2_KYC(new_payload);
                console.log(res);
                setProcessing(false);
                if (res.success) {
                  toast.success("Information Submitted Successfully");
                  setTimeout(() => {
                    navigate(0);
                  }, 2000);
                  return;
                }

                if (typeof res?.data?.errorMessage === "string") {
                  toast.error(res.data.errorMessage);
                  return;
                }
                toast.success("An error Occured!!!");
              }}
            >
              Submit Verification
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
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
