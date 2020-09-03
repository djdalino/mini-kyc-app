import React from "react";
import CamPlus from "../../Images/camPlus.png";
const Step = ({ step, data }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center my-3 mb-4 px-2"
      style={{ maxWidth: "375px" }}
    >
      <div className="px-1">
        <img src={CamPlus} alt="Cam Plus" height="25" width="25" />
      </div>
      <h5
        className="px-1 m-0"
        style={{ color: "#3b5cf6", width: "4.5rem", fontSize: "20px" }}
      >
        {step}
      </h5>
      <h5
        className="px-1 m-0"
        style={{ color: "grey", fontSize: "20px", width: "auto" }}
      >
        {data}
      </h5>
    </div>
  );
};

export default Step;
