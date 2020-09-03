import React, { useContext, useRef, useState } from "react";
import HeaderContext from "../../context/HeaderContext";
// import CropImage from "../CropImage/Index";
import CamPlus from "../../Images/camPlus.png";
import Upload from "../../Images/upload.png";
import IdWithFace from "../../Images/withID.png";
import loadImage from "blueimp-load-image/js";
import jwt from "jsonwebtoken";
import axios from "axios";
import LoadingPage from "../Common/LoadingPage";
import { calculatePercent } from "../Common/Calculate";
const StepTwo = () => {
  const [itemToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  const { setPercent } = useContext(HeaderContext);
  const { setIsLoading } = useContext(HeaderContext);
  const { stepTwoUploadB, setStepTwoUploadB } = useContext(HeaderContext);
  const [stepTwoFileUploadB, setStepTwoFileUploadB] = useState(null);
  const [isCount, setIsCount] = React.useState(0);
  const { count, setCount } = useContext(HeaderContext);
  const fileUploader = useRef(null);
  const handleInputFile = () => {
    fileUploader.current.click();
  };
  const handleFileOnChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      loadImage(
        e.target.files[0],
        setStepTwoUploadB(URL.createObjectURL(e.target.files[0])),
        { orientation: true }
      );
      setStepTwoFileUploadB(e.target.files[0]);
      // const reader = new FileReader();
      // reader.addEventListener('load', () =>
      //   this.setState({ src: reader.result })
      // );
      // reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onSubmitFile = async () => {
    if (stepTwoUploadB === null) {
      alert("Please input image");
    } else {
      // alert("Image uploaded");
      // setCount(count + 1);
      setIsLoading(true);

      try {
        // const local = "http://localhost:5000";
        // const STRAPI_BASE_URL = "https://minikyc.herokuapp.com";
        // const LOCAL_BASE_URL = "http://localhost:1337";
        const STRAPI_BASE_URL = "http://64.227.98.23";
        const userId = jwt.decode(itemToken);
        const data = new FormData();
        data.append("userId", userId._id);
        data.append("upload", stepTwoFileUploadB);
        await axios.post(`${STRAPI_BASE_URL}/api/upload`, data, {
          headers: { "Content-Type": "application/json" },
          onUploadProgress: progress =>
            setPercent(calculatePercent(progress.loaded, progress.total))
        });

        setIsLoading(false);
        setPercent(0);
        setIsCount(isCount + 1);
        setStepTwoUploadB(null);
        if (isCount === 1) {
          setCount(count + 1);
          setStepTwoUploadB(null);
          setIsCount(0);
          setPercent(0);
        }
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <React.Fragment>
      <LoadingPage />
      <div className="d-flex justify-content-center my-3 mb-4 px-2">
        <div className="px-1">
          <img src={CamPlus} alt="Cam Plus" height="22" width="22" />
        </div>
        <h5 className="px-1 m-0 valid-id">Step 2</h5>
        <h5
          className="px-1 m-0"
          style={{ color: "grey", fontSize: "20px", width: "auto" }}
        >
          Take a Selfie with the 2 valid IDs one by one
        </h5>
      </div>
      {isCount === 1 ? (
        <div className="alert alert-warning" role="alert">
          Succesfully Upload photo! upload 1 more!
        </div>
      ) : isCount === 2 ? (
        <div className="alert alert-success" role="alert">
          Succesfully Upload photo!
        </div>
      ) : null}
      <div className="border position-relative mx-auto box-h300 box-w300">
        <div className="position-absolute border-inner-box box-h310 box-w225"></div>
        <div className="position-absolute box-img w-90 h-100 py-10">
          <div className="position-relative h-100">
            <img
              className="img-fluid-step-two-b "
              src={stepTwoUploadB ? stepTwoUploadB : IdWithFace}
              alt="Your Selfie"
              height="100%"
              width="100%"
              onClick={handleInputFile}
            />
          </div>
        </div>
      </div>

      <div className="my-3 text-center text-warning">
        <p>1. One photo per ID</p>
        <p>2. Make sure your in focus</p>
      </div>
      <input
        type="file"
        id="file"
        ref={fileUploader}
        onChange={handleFileOnChange}
        style={{ display: "none" }}
        accept="image/*"
      />

      <div className="text-center mb-5">
        <button
          onClick={() => onSubmitFile()}
          className="btn btn-danger py-3 px-5"
          style={{ fontSize: "24px" }}
        >
          <img
            className="mr-4 pb-1"
            style={{ height: "30px" }}
            src={Upload}
            alt="upload"
          />
          Send Photo
        </button>
      </div>
    </React.Fragment>
  );
};

export default StepTwo;
