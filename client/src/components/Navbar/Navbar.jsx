import React, { useContext } from "react";
import HeaderContext from "../../context/HeaderContext";
import CropImage from "../CropImage/Index";
import CropImageStepTwoB from "../CropImage/StepTwoB";
const Navbar = () => {
  const { src } = useContext(HeaderContext);
  const { srcStepTwoB } = useContext(HeaderContext);
  return (
    <React.Fragment>
      {src ? (
        <CropImage />
      ) : srcStepTwoB ? (
        <CropImageStepTwoB />
      ) : (
        <div className="fixed-top mb-5">
          <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-dark p-4">
              <h5 className="text-white h4">Collapsed content</h5>
              <span className="text-muted">
                Toggleable via the navbar brand.
              </span>
            </div>
          </div>
          <nav className="navbar navbar-light bg-light">
            <div className="container-sm">
              <button
                className="navbar-toggler ml-auto"
                style={{ color: "red" }}
                type="button"
                data-toggle="collapse"
                data-target="#navbarToggleExternalContent"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon "></span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </React.Fragment>
  );
};

export default Navbar;
