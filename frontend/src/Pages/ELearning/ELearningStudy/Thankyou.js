import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Container/Context";
import HeadingName from "../../HeadingName/HeadingName";

export default function Thankyou() {
  const { bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  return (
    <>
        <HeadingName
                name="Thank You!"
                home="Home"
                heading="Thank You!"
            />
      <div className="edu-feature-area eduvibe-home-one-video edu-section-gap bg-color-white">
        <div className="container eduvibe-animated-shape">
          <div className="row mt--40 mb--30 align-items-center">
            <div className="col-lg-12">
              <h3 className="thankyou-heading text-center">Thank You!</h3>
              <p className="thankyou-contant text-center">
                Thanks for showing your interest with SSDN Technologies. Our
                Training consultant will get back to you in next 12 hours. You
                can also call us at +91-9999-111-686 and choose option 1 from
                IVR.
              </p>
              <div className="meter">
                <span style={{ width: "50%" }}>
                  <span className="progress"></span>
                </span>
              </div>
              <div className="row mt--30">
                <div className="col-md-12">
                  <p className="text-center">
                    Having trouble? <Link to="/contact-us">Contact us</Link>
                  </p>
                  <div className="mt-3 sal-animate text-center">
                    <Link className="edu-btn" href="/">
                      Continue to Homepage
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="video-lightbox-wrapper"></div>
      </div>
    </>
  );
}
