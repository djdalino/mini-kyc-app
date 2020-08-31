//use this if need to crop image

import React, { useContext } from "react";
import HeaderContext from "../../context/HeaderContext";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const CropImageStepTwoB = () => {
  const { srcStepTwoB, setSrcStepTwoB } = useContext(HeaderContext);

  const { stepTwoUploadB, setStepTwoUploadB } = useContext(HeaderContext);
  const { crop, setCrop } = useContext(HeaderContext);
  const { croppedImageUrl, setCroppedImageUrl } = useContext(HeaderContext);

  //   const onSelectFile = e => {
  //     if (e.target.files && e.target.files.length > 0) {
  //       const reader = new FileReader();
  //       reader.addEventListener("load", () => setSrc(reader.result));
  //       reader.readAsDataURL(e.target.files[0]);
  //     }
  //   };

  //   const onImageLoaded = image => {
  //     imageRef = image;
  //   };

  //   const onCropComplete = crop => {
  //     makeClientCrop(crop);
  //   };

  //   const onCropChange = (crop, percentCrop) => {
  //     // You could also use percentCrop:
  //     // setState({ crop: percentCrop });
  //     setCrop(crop);
  //   };
  //   const makeClientCrop = async crop => {
  //     if (imageRef && crop.width && crop.height) {
  //       const croppedImageUrl = await getCroppedImg(
  //         imageRef,
  //         crop,
  //         "newFile.jpeg"
  //       );
  //       setCroppedImageUrl(croppedImageUrl);
  //     }
  //   };

  const getCroppedImg = () => {
    const canvas = document.createElement("canvas");
    const scaleX = croppedImageUrl.naturalWidth / croppedImageUrl.width;
    const scaleY = croppedImageUrl.naturalHeight / croppedImageUrl.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      croppedImageUrl,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    // As Base64 string
    const base64Image = canvas.toDataURL("image/png");
    setStepTwoUploadB([...stepTwoUploadB, base64Image]);
    setSrcStepTwoB(null);
    setCrop({
      unit: "px", // default, can be 'px' or '%'
      x: 15,
      y: 15,
      width: 50,
      height: 50
    });
    // return new Promise((resolve, reject) => {
    //   canvas.toBlob(blob => {
    //     if (!blob) {
    //       //reject(new Error('Canvas is empty'));
    //       console.error("Canvas is empty");
    //       return;
    //     }
    //     blob.name = fileName;
    //     window.URL.revokeObjectURL(fileUrl);
    //     fileUrl = window.URL.createObjectURL(blob);
    //     resolve(fileUrl);
    //   }, "image/jpeg");
    // });
  };

  return (
    <div className="position-fixed crop-container w-100 h-100 bg-light">
      <div className="position-relative">
        <div
          className="text-center position-fixed"
          style={{ height: "100vh", width: "100wh", margin: "auto" }}
        >
          {srcStepTwoB && (
            <ReactCrop
              src={srcStepTwoB}
              crop={crop}
              ruleOfThirds
              onImageLoaded={setCroppedImageUrl}
              onChange={setCrop}
            />
          )}
        </div>

        {/* {croppedImageUrl && (
          <img alt="Crop" style={{ width: "100%" }} src={croppedImageUrl} />
        )} */}
        <div
          className="text-center m-5 position-fixed"
          style={{ zIndex: "1000" }}
        >
          <button className="btn btn-primary" onClick={getCroppedImg}>
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropImageStepTwoB;
