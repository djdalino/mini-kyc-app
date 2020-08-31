import HeaderContext from "./HeaderContext";
import React, { useState } from "react";

function ContextWrapper({ children }) {
  const [count, setCount] = useState(0);
  const [src, setSrc] = useState(null);
  const [srcStepTwoB, setSrcStepTwoB] = useState(null);
  const [crop, setCrop] = useState({
    unit: "px",
    x: 15,
    y: 15,
    width: 50,
    height: 50
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [upload, setUpload] = useState(null);
  const [stepTwoFileUpload, setStepTwoFileUpload] = useState(null);
  const [stepOneUpload, setStepOneUpload] = useState(null);
  const [stepTwoUploadB, setStepTwoUploadB] = useState(null);
  const [stepThreeUpload, setStepThreeUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  let [imageRef] = useState(null);
  let [fileUrl] = useState(null);
  return (
    <HeaderContext.Provider
      value={{
        percent,
        setPercent,
        count,
        setCount,
        src,
        setSrc,
        srcStepTwoB,
        setSrcStepTwoB,
        crop,
        setCrop,
        upload,
        setUpload,
        stepTwoFileUpload,
        setStepTwoFileUpload,
        stepOneUpload,
        setStepOneUpload,
        stepTwoUploadB,
        setStepTwoUploadB,
        croppedImageUrl,
        setCroppedImageUrl,
        imageRef,
        fileUrl,
        stepThreeUpload,
        setStepThreeUpload,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export default ContextWrapper;
