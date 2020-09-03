import React, { useContext, useRef, useState } from "react";
import Human from "../../Images/docsWithID.png";
import Camera from "../../Images/camera.png";
import Upload from "../../Images/upload.png";
import HeaderContext from "../../context/HeaderContext";
import ReactPlayer from "react-player";
import LoadingPage from "../Common/LoadingPage";
import { calculatePercent } from "../Common/Calculate";
import jwt from "jsonwebtoken";
import axios from "axios";
const StepOne = () => {
  const [itemToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  const { count, setCount } = useContext(HeaderContext);
  const { setPercent } = useContext(HeaderContext);
  const { setIsLoading } = useContext(HeaderContext);
  const { stepThreeUpload, setStepThreeUpload } = useContext(HeaderContext);
  const [uploadVideo, setUploadVideo] = useState(null);
  const fileUploader = useRef(null);
  const handleInputFile = () => {
    fileUploader.current.click();
  };
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      setStepThreeUpload(URL.createObjectURL(e.target.files[0]));
      setUploadVideo(e.target.files[0]);
    }
  };
  const onSubmitFile = async () => {
    if (stepThreeUpload === null) {
      alert("Please input video");
    } else {
      setIsLoading(true);
      try {
        // const local = "http://localhost:5000";
        // const LOCAL_BASE_URL = "http://localhost:1337";
        // const STRAPI_BASE_URL = "https://minikyc.herokuapp.com";

        const data = new FormData();

        const userId = jwt.decode(itemToken);
        data.append("userId", userId._id);
        data.append("upload", uploadVideo);
        await axios.post("/api/upload", data, {
          headers: { "Content-Type": "application/json" },
          onUploadProgress: progress =>
            setPercent(calculatePercent(progress.loaded, progress.total))
        });

        setIsLoading(false);
        setPercent(0);
        localStorage.removeItem("token");
        setCount(count + 1);
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    }
  };
  const deleteItem = () => {
    setStepThreeUpload(null);
  };

  return (
    <React.Fragment>
      <LoadingPage />
      {stepThreeUpload ? (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Succesfully added video!</strong>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
      <p
        className="text-center mt-3 px-2"
        style={{ color: "grey", fontSize: "14px", fontWeight: "700" }}
      >
        Take Video With the ID In your right hand and a A4 paper in the left
        hand and write down in the middle of the paper
      </p>
      <div className="border mt-5 position-relative mx-auto box-h300 box-w300">
        <div className="position-absolute border-inner-box box-h310 box-w225"></div>
        <div className="position-absolute box-img w-75 py-10">
          {stepThreeUpload ? (
            <div className="position-relative h-100 w-100">
              <button
                className="close position-absolute"
                style={{
                  top: "-20px",
                  right: "-10px",
                  color: "red",
                  zIndex: "100px"
                }}
                aria-label="Close"
                onClick={() => deleteItem(stepThreeUpload.length - 1)}
              >
                <span aria-hidden="true">&times;</span>
              </button>

              <ReactPlayer
                controls
                height="100%"
                width="100%"
                url={stepThreeUpload}
              />
            </div>
          ) : (
            <img
              src={Human}
              alt="Selfie"
              height="100%"
              width="100%"
              onClick={handleInputFile}
            />
          )}
        </div>
      </div>

      <div className="my-3 text-center text-warning">
        <img src={Camera} alt="camera" onClick={handleInputFile} />
      </div>
      <input
        type="file"
        id="file"
        ref={fileUploader}
        onChange={onSelectFile}
        style={{ display: "none" }}
        accept="video/*"
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
          Send Video
        </button>
      </div>
    </React.Fragment>
  );
};

export default StepOne;
