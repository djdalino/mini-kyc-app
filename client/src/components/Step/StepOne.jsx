import React, { useContext, useRef, useState } from "react";
import Step from "../Common/Step";
import Human from "../../Images/human.png";
import Upload from "../../Images/upload.png";
import HeaderContext from "../../context/HeaderContext";
import LoadingPage from "../Common/LoadingPage";
import { calculatePercent } from "../Common/Calculate";
import axios from "axios";
const StepOne = () => {
  const { setPercent } = useContext(HeaderContext);
  const { setIsLoading } = useContext(HeaderContext);
  const { stepOneUpload, setStepOneUpload } = useContext(HeaderContext);
  const [selfieUpload, setSelfieUpload] = useState(null);
  const { count, setCount } = useContext(HeaderContext);
  const fileUploader = useRef(null);
  const handleInputFile = () => {
    fileUploader.current.click();
  };

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setStepOneUpload(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setSelfieUpload(e.target.files[0]);
    }
  };
  const onSubmitFile = async e => {
    if (!stepOneUpload) {
      alert("Please input image");
    } else {
      setIsLoading(true);

      try {
        // const local = "http://localhost:5000";
        // const LOCAL_BASE_URL = "http://localhost:1337";
        // const STRAPI_BASE_URL = "https://minikyc.herokuapp.com";
        const data = new FormData();
        data.append("upload", selfieUpload);
        await axios.post("/api/upload", data, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: progress =>
            setPercent(calculatePercent(progress.loaded, progress.total))
        });

        setIsLoading(false);
        setPercent(0);
        setCount(count + 1);
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <React.Fragment>
      <LoadingPage />
      <Step step="Step 1" data="take a selfie" />
      {stepOneUpload ? (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Succesfully added photo!</strong>
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
      <p className="text-center">Top of your head</p>
      <div
        className="border position-relative mx-auto box-h260 box-w250"
        onClick={handleInputFile}
      >
        <div className="position-absolute border-inner-box box-h270 box-w185"></div>
        <div className="position-absolute box-img w-75 py-10">
          <img
            src={stepOneUpload ? stepOneUpload : Human}
            alt="Selfie"
            height="100%"
            width="100%"
          />
        </div>
      </div>
      <p className="text-center">End of your torso</p>

      <div className="my-3 text-center text-warning">
        <p>1. Keep a neutral face (no smiling)</p>
        <p>2. Make sure your in focus</p>
        <p>3. Follow guideline below</p>
      </div>
      <input
        type="file"
        id="file"
        ref={fileUploader}
        onChange={onSelectFile}
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

export default StepOne;
