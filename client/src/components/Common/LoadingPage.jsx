import React, { useContext } from "react";
import HeaderContext from "../../context/HeaderContext";
const LoadingPage = () => {
  const { isLoading } = useContext(HeaderContext);
  const { percent } = useContext(HeaderContext);
  if (isLoading === true) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          height: "100vh",
          width: "100%",
          zIndex: "20000",
          backgroundColor: "rgba(0,0,0,0.2)"
        }}
        className="d-flex align-items-center justify-content-center flex-column"
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div
          style={{
            height: "5px",
            width: "200px",
            backgroundColor: "#fff",
            marginTop: "20px"
          }}
        >
          <div
            style={{
              width: `${percent}%`,
              height: "5px",
              backgroundColor: "#28a745"
            }}
          ></div>
          <div
            className="text-center"
            style={{ width: "200px", color: "#28a745" }}
          >{`${percent}%`}</div>
        </div>
      </div>
    );
  }
  return null;
};

export default LoadingPage;
