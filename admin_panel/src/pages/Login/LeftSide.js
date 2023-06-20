import React from "react";

function LeftSide() {
  return (
    <div
      className="col-xl-7 b-center bg-size"
      style={{
        backgroundImage: `url(/assets/images/login/2.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "block",
      }}
    >
      <img
        className="bg-img-cover bg-center"
        src="/assets/images/login/2.jpg"
        alt="looginpage"
        style={{ display: "none" }}
      />
    </div>
  );
}

export default LeftSide;
