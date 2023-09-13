import React from "react";
import "./Button.css";
const BgButtonNoBorder = ({ btnTxt, customClass }) => {
  return (
    <button className={` BgButtonNoBorder  ${customClass}`}>{btnTxt}</button>
  );
};
const BgButtonWithBorder = ({ btnTxt, customClass }) => {
  return (
    <button className={` BgButtonWithBorder ${customClass}`}>{btnTxt}</button>
  );
};
const NoBgButtonWithBorder = ({ btnTxt, customClass }) => {
  return (
    <button className={`NoBgButtonWithBorder ${customClass}  `}>
      {btnTxt}
    </button>
  );
};

export { BgButtonNoBorder, BgButtonWithBorder, NoBgButtonWithBorder };
