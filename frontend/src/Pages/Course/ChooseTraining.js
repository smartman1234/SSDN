import React from "react";
import { Link } from "react-router-dom";

export default function ChooseTraining({
  trainingMode,
  setCourseEnquiry,
}) {
  return (
    <>
      {trainingMode && (
        <div
          className="edu-contact-us-area eduvibe-contact-us edu-section-gap"
          id="Training"
        >
          <div className="container eduvibe-animated-shape">
            <div className="col-lg-12">
              <div className="section-title text-start">
                <h3 className="title">
                  Choose the training that's best for you
                </h3>
              </div>
            </div>
            <div className="row mt--20">
              <div className="col-lg-4 mt--0 mb--10">
                <div className="edu-blog blog-type-1 bg-white radius-small">
                  <div className="inner">
                    <div className="content data-color-base">
                      <h6 className="title mb--0">
                        <Link to="#">{trainingMode?.mode_1_title}</Link>
                      </h6>
                    </div>

                    <div className="content1">
                      <ul className="blog-meta">
                        <li>
                          <i className="ri-time-line"></i>
                          {trainingMode?.mode_1_feature_1}
                        </li>
                        <li>
                          <i className="icon-calendar-2-line"></i>
                          {trainingMode?.mode_1_feature_2}
                        </li>
                        <li>
                          <i className="icon-calendar-2-line"></i>
                          {trainingMode?.mode_1_feature_3}
                        </li>
                        <li>
                          <i className="ri-file-edit-line"></i>{" "}
                          {trainingMode?.mode_1_feature_4}
                        </li>
                        <li>
                          <i className="ri-24-hours-line"></i>
                          {trainingMode?.mode_1_feature_5}
                        </li>
                      </ul>
                      <div
                        className="card-bottom text-center pt--10"
                        style={{
                          borderTop: "1px solid rgba(45, 40, 78, 0.07)",
                        }}
                      >
                        <div className="read-more-btn">
                          <Link className="edu-btn" to="/e-learning">
                            Explore Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt--0 mb--10">
                <div className="edu-blog blog-type-1 bg-white radius-small">
                  <div className="inner">
                    <div className="content data-color-base">
                      <h6 className="title mb--0">
                        <Link to="#">{trainingMode?.mode_2_title}</Link>
                      </h6>
                    </div>

                    <div className="content1">
                      <ul className="blog-meta">
                        <li>
                          <i className="ri-time-line"></i>
                          {trainingMode?.mode_2_feature_1}
                        </li>
                        <li>
                          <i className="icon-calendar-2-line"></i>
                          {trainingMode?.mode_2_feature_2}
                        </li>
                        <li>
                          <i className="icon-calendar-2-line"></i>
                          {trainingMode?.mode_2_feature_3}
                        </li>
                        <li>
                          <i className="ri-file-edit-line"></i>{" "}
                          {trainingMode?.mode_2_feature_4}
                        </li>
                        <li>
                          <i className="ri-24-hours-line"></i>
                          {trainingMode?.mode_2_feature_5}
                        </li>
                      </ul>
                      <div
                        className="card-bottom text-center pt--10"
                        style={{
                          borderTop: "1px solid rgba(45, 40, 78, 0.07)",
                        }}
                      >
                        <div
                          className="read-more-btn"
                          onClick={() => setCourseEnquiry(true)}
                        >
                          <button className="edu-btn">
                            Enquiry Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt--0 mb--10">
                <div className="edu-blog blog-type-1 bg-white radius-small">
                  <div className="inner">
                    <div className="content data-color-base">
                      <h6 className="title mb--0">
                        <Link to="#">{trainingMode?.mode_3_title}</Link>
                      </h6>
                    </div>

                    <div className="content1">
                      <ul className="blog-meta">
                        <li>
                          <i className="ri-time-line"></i>
                          {trainingMode?.mode_3_feature_1}
                        </li>
                        <li>
                          <i className="icon-calendar-2-line"></i>
                          {trainingMode?.mode_3_feature_2}
                        </li>
                        <li>
                          <i className="icon-calendar-2-line"></i>
                          {trainingMode?.mode_3_feature_3}
                        </li>
                        <li>
                          <i className="ri-file-edit-line"></i>{" "}
                          {trainingMode?.mode_3_feature_4}
                        </li>
                        <li>
                          <i className="ri-24-hours-line"></i>
                          {trainingMode?.mode_3_feature_5}
                        </li>
                      </ul>
                      <div
                        className="card-bottom text-center pt--10"
                        style={{
                          borderTop: "1px solid rgba(45, 40, 78, 0.07)",
                        }}
                      >
                        <div
                          className="read-more-btn"
                          onClick={() => setCourseEnquiry(true)}
                        >
                          <button className="edu-btn">
                            Enquiry Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
