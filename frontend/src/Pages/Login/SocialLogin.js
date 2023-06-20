import React from "react";
import { Link } from "react-router-dom";

export default function SocialLogin() {

  return (
    <div className="d-flex justify-content-between text-center">
      <Link
        className="edu-btn btn-white text-center"
        to="#"
      >
        <i className="ri-google-fill"> Google</i>
      </Link>
      <Link
        className="edu-btn btn-white text-center"
        to="#"
      >
      <i className="ri-facebook-fill"></i> Facebook
      </Link>
    </div>
  );
}
