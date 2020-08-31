import React, { useContext } from "react";
import HeaderContext from "../../context/HeaderContext";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
const CropImage = () => {
  const { src, setSrc } = useContext(HeaderContext);
  const { setUpload } = useContext(HeaderContext);
  const { crop, setCrop } = useContext(HeaderContext);
  const { croppedImageUrl, setCroppedImageUrl } = useContext(HeaderContext);
  const { setStepTwoFileUpload } = useContext(HeaderContext);

  const onCropComplete = () => {
    makeClientCrop(crop);
  };

  //   const onCropChange = (crop, percentCrop) => {
  //     // You could also use percentCrop:
  //     // setState({ crop: percentCrop });
  //     setCrop(crop);
  //   };
  const makeClientCrop = async () => {
    if (croppedImageUrl && crop.width && crop.height) {
      const croppedImage = await getCroppedImg(
        croppedImageUrl,
        crop,
        "newFile.jpeg"
      );
      setUpload(window.URL.createObjectURL(croppedImage));
      setStepTwoFileUpload(croppedImage);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
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
    // const base64Image = canvas.toDataURL("image/png");
    // setUpload([...upload, base64Image]);
    setSrc(null);
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
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => {
          blob.name = fileName;
          blob.ext = ".png";
          // setUpload([...upload, window.URL.createObjectURL(blob)]);
          // setStepTwoFileUpload([...stepTwoFileUpload, blob]);
          resolve(blob);
        },
        "image/jpeg",
        1
      );
    });
  };

  return (
    <div className="position-fixed crop-container w-100 h-100 bg-light">
      <div className="position-relative">
        <div
          className="text-center position-fixed"
          style={{ height: "100vh", width: "100wh", margin: "auto" }}
        >
          {src && (
            <ReactCrop
              src={src}
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
          <button className="btn btn-primary" onClick={onCropComplete}>
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropImage;
