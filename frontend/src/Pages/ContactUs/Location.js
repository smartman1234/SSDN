import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Location() {
    const url = process.env.REACT_APP_API_BASEURL;
    const [location, setLocation] = useState([]);

    const GetContactData = async () => {
        var requestOptions = {
            method: "GET",
        };
        fetch(`${url}web/contact-location`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "success") {
                    setLocation(result.data);
                }
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        GetContactData();
    }, []);

  return (
    <div className="home-one-cat edu-contact-address eduvibe-contact-me-bottom edu-section-gap contact-address-bottom-shape">
      <div className="container eduvibe-animated-shape">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <span className="pre-title">LOCATIONS</span>
              <h3 className="title">Our Offices Locations</h3>
            </div>
          </div>
        </div>
        <div className="row mt--0">
          {location.length > 0 &&
            location.map((value, i) => (
              <div className="col-md-6" key={i}>
                <div className="resolve-query contact-address-card-2">
                  <div className="resolve-query-img text-center">
                    <LazyLoadImage  src="/assets/images/Location.png" alt="image"
                      height="100%"
                      width="100%" />
                  </div>
                  <div className="col-lg-12">
                    <div className="content">
                      <h6 className="title text-center">{value.title}</h6>
                      <p className="mb-0 text-center">{value.address}</p>
                      <p className="mb-0 text-center">
                        <span className="subtitle">Contact Us : </span>
                        {JSON.parse(value.mobile_number || "[]").length > 0 &&
                          JSON.parse(value.mobile_number).map((phn, index) => (
                            <>
                              <a href={"tel:" + phn} key={index}>
                                {(index ? ", " : "") + (phn ? phn : "")}
                              </a>
                            </>
                          ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
          <div className="shape-image shape-image-1">
            <LazyLoadImage  src="assets\images\shapes\shape-03-01.png" alt="Shape Thumb"
              height="100%"
              width="100%" />
          </div>
          <div className="shape-image shape-image-2">
            <LazyLoadImage  src="assets\images\shapes\shape-05-06.png" alt="Shape Thumb"
              height="100%"
              width="100%" />
          </div>
          <div className="shape-image shape-image-3">
            <LazyLoadImage  src="assets\images\shapes\shape-14-03.png" alt="Shape Thumb"
              height="100%"
              width="100%" />
          </div>
          <div className="shape-image shape-image-4">
            <LazyLoadImage  src="assets\images\shapes\shape-05-03.png" alt="Shape Thumb"
              height="100%"
              width="100%" />
          </div>
          <div className="shape-image shape-image-5">
            <LazyLoadImage  src="assets\images\shapes\shape-01-03.png" alt="Shape Thumb"
              height="100%"
              width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}
