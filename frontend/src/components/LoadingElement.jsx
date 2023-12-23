import React from "react";

const LoadingElement = ({spinnerWidth, thickness}) => {
  return (
    <div className="loader-container" style={{"--loaderWidth": spinnerWidth, "--loaderThicness": thickness}}>
      <div className="loading-element"></div>
    </div>
  );
};

export default LoadingElement;
