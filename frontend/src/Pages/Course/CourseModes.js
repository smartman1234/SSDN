import React from "react";
import { Link } from "react-router-dom";

export default function CourseModes({ detailData, setCourseEnquiry }) {
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card home-purchase-data">
          <div className="card-body" style={{ height: "190px" }}>
            <div className="about-feature-list">
              <div className="our-feature">
                <div className="icon">
                  <i className="ri-time-line"></i>
                </div>
                <div className="feature-content">
                  <h6 className="feature-title mb--0">Course Duration</h6>
                  <p className="feature-description">
                    {detailData?.course_duration}{" "}
                    {detailData?.course_duration_time}
                  </p>
                </div>
              </div>

              <div className="our-feature">
                <div className="icon">
                  <i className="ri-shield-user-line"></i>
                </div>
                <div className="feature-content">
                  <h6 className="feature-title mb--0">Mode of Training</h6>
                  <span className="feature-description leading-tight1">
                    {detailData?.course_mode &&
                      detailData?.course_mode.replaceAll(" ", "/")}{" "}
                  </span>
                </div>
              </div>
              <div className="text-center mt--10">
                <Link
                  className="edu-btn btn-bg-alt"
                  to="#"
                  onClick={() => setCourseEnquiry(true)}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card home-purchase-data" style={{ height: "190px" }}>
          <div className="card-body">
            <div className="about-feature-list">
              <div className="our-feature">
                <div className="icon">
                  <i className="ri-time-line"></i>
                </div>
                <div className="feature-content">
                  <h6 className="feature-title mb--0">Request a</h6>
                  <h5 className="mb--0">Free Demo</h5>
                  <p
                    className="feature-description leading-tight2 ssdn-editor-font"
                    dangerouslySetInnerHTML={{
                      __html: detailData?.free_demo_description
                        ? detailData?.free_demo_description.replaceAll(
                            "{{in VARCITY}}",
                            detailData?.city_name
                          )
                        : detailData?.free_demo_description?.replaceAll(
                            "{{in VARCITY}}",
                            ""
                          ),
                    }}
                  />
                </div>
              </div>

              <div className="text-center mt--5">
                <Link
                  className="edu-btn btn-bg-alt"
                  to="#"
                  onClick={() => setCourseEnquiry(true)}
                >
                  Book Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card home-purchase-data" style={{ height: "190px" }}>
          <div className="card-body">
            <div className="about-feature-list text-center">
              <p className="feature mb--18 text-center">
                Watch Previous Classes
              </p>
              <h6 className="feature-title text-center text-danger mb--10">
                Do you have any query?
              </h6>
              <p className="feature-description text-dark text-center">
                We are very glad to help you.
              </p>
              <div className="text-center mt--10">
                <button
                  className="edu-btn btn-bg-alt"
                  onClick={() => setCourseEnquiry(true)}
                >
                  Enquiry Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
