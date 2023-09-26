import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import "./componentLoader.css";
const ComponentLoading = ({ loadingTxt }) => {
  return (
    <div className="componentLoaderDiv">
      {" "}
      <div className="componentLoaderDiv_cont">
        <PuffLoader
          color="#22ad62"
          aria-label="Loading Spinner"
          data-testid="loader"
          className="componentLoaderDiv_loader"
          //   speedMultiplier={1}
          size={90}
          //   speedMultiplier={0.5}
        />
        <div className="componentLoaderDiv_cont_txt">{loadingTxt}</div>
      </div>
    </div>
  );
};

export default ComponentLoading;
