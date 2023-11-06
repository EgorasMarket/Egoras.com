import React, { useState } from "react";
import "./webPin.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ScaleLoader from "react-spinners/ScaleLoader";
import CloseIcon from "@mui/icons-material/Close";

import { PinInput, StatefulPinInput } from "react-input-pin-code";
const WebPin = ({
  btnFunc,
  pinTitle,
  pinPara,
  btnFuncTxt,
  isLoading,
  handleOnComplete,
  toggleWebpin,
  newUser,
}) => {
  //   const [values, setValues] = React.useState(["", "", "", " "]);
  const [pinHidden, setPinHidden] = useState(true);
  const ViewPin = () => {
    setPinHidden(!pinHidden);
  };
  return (
    <div className="otp_modal">
      {newUser ? null : (
        <CloseIcon
          className="plan_swap_modal_div_icon"
          onClick={toggleWebpin}
        />
      )}

      <div className="otp_modal_container">
        <div className="otp_modal_container_head">{pinTitle}</div>
        <div className="otp_modal_container_para">{pinPara}</div>
        <div className="otp_modal_container_body2">
          <StatefulPinInput
            length={4}
            placeholder="0"
            autoTab={true}
            mask={pinHidden}
            className="otp_modal_container_body_pin_input"
            autoComplete="off"
            onComplete={handleOnComplete}
          />
          {pinHidden ? (
            <VisibilityIcon
              onClick={ViewPin}
              className="otp_modal_container_body_icon"
            />
          ) : (
            <VisibilityOffIcon
              onClick={ViewPin}
              className="otp_modal_container_body_icon"
            />
          )}

          {/* <PinInput
            placeholder="0"
            autoFocus={true}
            autoTab={true}
            // values={values}
            // onChange={(value, index, values) => setValues(values)}
          /> */}
        </div>
        <div className="otp_modal_container_body_button" onClick={btnFunc}>
          <button className="otp_modal_container_body_button_btn">
            {isLoading ? (
              <>
                <ScaleLoader color="#366e51" height={20} />
              </>
            ) : (
              <>{btnFuncTxt}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebPin;
