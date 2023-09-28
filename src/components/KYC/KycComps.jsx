import React, { useState, useRef, useEffect } from "react";
import FaceIcon from "@mui/icons-material/Face";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from "react-select";
import VerifiedIcon from "@mui/icons-material/Verified";
import Staticdata from "../../assets/json/Static";
import ReactCountryFlagsSelect from "react-country-flags-select";
import { GET_KYC_STATUS } from "../../services/kyc_services";
import { useDispatch, useSelector } from "react-redux";
import { setPayload } from "../../features/kyc/kycSlice";
import axios from "axios";

const levels = Object.freeze({
  level1: "LEVEL_1",
  level2: "LEVEL_2",
  level3: "LEVEL_3",
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

    if (response?.code === null || !response?.code === 200) {
      return;
    }

    if (
      response.data.data.level === levels.level1 ||
      response.data.data.level === levels.level2 ||
      response.data.data.level === levels.level3
    ) {
      toggleEmailCont();
      return;
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
        {!response.level === levels.level1 && (
          <div className="kypageDiv_cont_button_div">
            <button
              className="kypageDiv_cont_button_div_btn"
              onClick={toggleEmailCont}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
const KycStartComp = ({ startVerify }) => {
  return (
    <div className="kypageDiv_cont_div">
      <div className="kypageDiv_cont_div_btn">
        <div className="kypageDiv_cont_div_btn_func_btn">
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
  const dispatch = useDispatch();
  const { payload } = useSelector((state) => state.kyc);

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
                onChange={(e) => {
                  const { value } = e.target;

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
          <button className="kypageDiv_cont_button_div_btn" onClick={nextStep1}>
            Next Step
          </button>
        </div>
      </div>
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
  const videoRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true); // Show the camera feed
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/png");
      setImageSrc(imageUrl);
      setShowCamera(false); // Hide the camera feed after capturing
    }
  };

  const toggleCamera = () => {
    if (showCamera) {
      // If the camera feed is shown, capture the image
      captureImage();
    } else {
      // If the camera feed is hidden, start the camera
      startCamera();
    }
  };
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
              <img
                src="/img/face_scan_icon.png"
                alt=""
                className="face_id_div_img"
              />
              <button className="face_id_div_btn">Take a selfie </button>
            </div>
          </div>
        </div>
        <div style={styles.container}>
          {showCamera ? (
            <video ref={videoRef} autoPlay muted style={styles.video} />
          ) : (
            imageSrc && (
              <img src={imageSrc} alt="Captured" style={styles.image} />
            )
          )}
          <button onClick={toggleCamera} style={styles.button}>
            {showCamera ? "Capture" : "Open Camera"}
          </button>
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
