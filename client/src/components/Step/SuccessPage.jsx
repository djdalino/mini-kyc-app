import React from "react";
const SuccessPage = () => {
  return (
    <div
      className="mx-auto d-flex flex-column align-items-center justify-content-center"
      style={{ maxWidth: "375px", height: "60vh" }}
    >
      <img
        style={{ width: "200px", height: "200px" }}
        src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
        alt="congrats"
      />
      <p style={{ color: "grey", fontSize: "20px" }}>Congratulations!!</p>
      <p style={{ color: "grey", fontSize: "20px" }}>
        We will contact you soon..
      </p>
    </div>
  );
};

export default SuccessPage;
