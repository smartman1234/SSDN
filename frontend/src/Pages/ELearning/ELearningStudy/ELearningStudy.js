import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ELearningService from "../../../Services/ELearningService/ELearningService";

export default function ElearningStudy() {
  const [data, setData] = useState({});
  const elearning = new ELearningService();
  const param = useParams();
  useEffect(() => {
    window.scrollTo(0,0)
    VideoListApi();
  }, []);

  const VideoListApi = async () => {
    try {
      let response = await elearning.videoList(param.id);
      if (response) {
        setData(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <header className="learning-env-header custom-learning-env-header-theme ng-star-inserted">
        <div className="learning-env-header__back-btn custom-learning-env-header__back-btn-theme ng-star-inserted">
          <button className="btn-plain" title="Back">
            <svg
              fill="none"
              height="19"
              viewBox="0 0 10 19"
              width="10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="back-icon-theme"
                d="M8.55078 1.57895L2.03078 8.09895C1.26078 8.86895 1.26078 10.1289 2.03078 10.8989L8.55078 17.4189"
                stroke="var(--color-white)"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="learning-env-header">
          <li className="info__progress">
            <h1 className="info__ename custom-info__ename-theme">
              Introduction to Big Data and Hadoop
            </h1>
          </li>
          <li className="info__progress">
            <span className="topic">100% of Self-Learning Videos Watched</span>
          </li>
        </ul>
        <div className="right-section">
          <ul className="learning-env-header__tools">
            <li className="tools tools_notes ng-star-inserted">
              <a className="le-notes-icon" href="javascript:void(0);">
                <svg
                  className="notes-btn-svg"
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="notes-btn-icon"
                    d="M11.2145 4.07764H9.61129C5.60323 4.07764 4 5.68086 4 9.68893V14.4986C4 18.5067 5.60323 20.1099 9.61129 20.1099H14.421C18.429 20.1099 20.0323 18.5067 20.0323 14.4986V12.8954"
                    stroke="var(--color-white)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                  <path
                    className="notes-btn-icon"
                    d="M9.24643 11.5276C9.00594 11.7681 8.76546 12.241 8.71736 12.5857L8.06375 14.6833C7.93549 15.5571 8.55273 16.1663 9.42649 16.046L11.1955 15.7288C11.5322 15.6807 12.0051 15.4402 12.8975 15.1723L18.5703 8.88301C19.6605 7.79281 20.8174 6.49883 19.2142 4.8956C17.611 3.29238 16.6533 4.12069 15.5631 5.21088L9.24643 11.5276Z"
                    stroke="var(--color-white)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                  <path
                    className="notes-btn-icon"
                    d="M15.1172 6.10059C15.6543 8.01644 16.3066 8.66875 18.2305 9.21385"
                    stroke="var(--color-white)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                </svg>
                <span>Notes</span>
              </a>
            </li>
            <li className="tools tools_notes ng-star-inserted">
              <a className="le-notes-icon" href="#" title="Community">
                <svg
                  className="community-btn-svg"
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="community-btn-icon"
                    d="M9.83462 11.8844C7.71906 11.8133 6.03906 10.08 6.03906 7.94667C6.03906 5.76889 7.79906 4 9.98573 4C12.1635 4 13.9324 5.76889 13.9324 7.94667C13.9235 10.08 12.2435 11.8133 10.128 11.8844C10.0391 11.8756 9.9324 11.8756 9.83462 11.8844Z"
                    stroke="var(--color-white)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                  <path
                    className="community-btn-icon"
                    d="M15.682 5.77734C17.4064 5.77734 18.7931 7.1729 18.7931 8.88845C18.7931 10.5685 17.4597 11.9373 15.7975 11.9996C15.7264 11.9907 15.6464 11.9907 15.5664 11.9996"
                    stroke="var(--color-white)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                  <path
                    className="community-btn-icon"
                    d="M4.10966 20C3.91371 18.9125 3.76302 16.8889 5.68302 15.1644C7.60302 13.44 12.5097 13.44 14.5808 15.1644C16.6519 16.8889 16.3522 18.9097 16.153 20"
                    stroke="var(--color-white)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                  <path
                    className="community-btn-icon"
                    d="M20.5303 19.9996C20.7012 18.8832 20.9582 16.814 19.1822 15.0482C18.4726 14.3427 17.3746 13.919 16.207 13.7773"
                    stroke="var(--color-white)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                </svg>
                <span className="data-ssdn-ab">Community</span>
              </a>
            </li>
          </ul>
        </div>
      </header>
      <div className="edu-contact-us-area eduvibe-contact-us edu-section-gap home-one-cat pb--20 pt--20 ">
        <div className="row p-5 pt--0 pb--0">
          <div className="col-lg-3">
            <div className="card mt--0">
              <div className="card-body pb--0">
                <div className="card-heading">
                  <h5 className="widget-title mb--0">Courses</h5>
                </div>
              </div>
              <div className="card-body scrolly">
                <div className="edu-accordion-02" id="accordionExample1">
                  <div className="edu-accordion-item bg-active">
                    <div className="edu-accordion-header" id="headingOne">
                      <button
                        className="edu-accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        The First Steps
                      </button>
                    </div>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample1"
                    >
                      <div className="edu-accordion-body">
                        <ul>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Introduction
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Introduction
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Introduction
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Introduction
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Introduction
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Introduction
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="edu-accordion-item">
                    <div className="edu-accordion-header" id="headingTwo">
                      <button
                        className="edu-accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Data Types and More
                      </button>
                    </div>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample1"
                    >
                      <div className="edu-accordion-body">
                        <ul>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Introduction
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Local
                              Development Environment Tools
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="edu-accordion-item">
                    <div className="edu-accordion-header" id="headingThree">
                      <button
                        className="edu-accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Control Structure
                      </button>
                    </div>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample1"
                    >
                      <div className="edu-accordion-body">
                        <ul>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Introduction
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="edu-accordion-item">
                    <div className="edu-accordion-header" id="headingFour">
                      <button
                        className="edu-accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        Control Structure
                      </button>
                    </div>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExample1"
                    >
                      <div className="edu-accordion-body">
                        <ul>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Introduction
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="edu-accordion-item">
                    <div className="edu-accordion-header" id="headingFibe">
                      <button
                        className="edu-accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        Control Structure
                      </button>
                    </div>
                    <div
                      id="collapseFive"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFibe"
                      data-bs-parent="#accordionExample1"
                    >
                      <div className="edu-accordion-body">
                        <ul>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Introduction
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="edu-accordion-item">
                    <div className="edu-accordion-header" id="headingSix">
                      <button
                        className="edu-accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSix"
                        aria-expanded="false"
                        aria-controls="collapseSix"
                      >
                        Control Structure
                      </button>
                    </div>
                    <div
                      id="collapseSix"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingSix"
                      data-bs-parent="#accordionExample1"
                    >
                      <div className="edu-accordion-body">
                        <ul>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Introduction
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="edu-accordion-item">
                    <div className="edu-accordion-header" id="headingSeven">
                      <button
                        className="edu-accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSeven"
                        aria-expanded="false"
                        aria-controls="collapseSeven"
                      >
                        Control Structure
                      </button>
                    </div>
                    <div
                      id="collapseSeven"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingSeven"
                      data-bs-parent="#accordionExample1"
                    >
                      <div className="edu-accordion-body">
                        <ul>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Introduction
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                          <li className="d-flex">
                            <div className="text">
                              <i className="icon-draft-line"></i> Course
                              Overview
                            </div>
                            <div className="icon">
                              <i className="ri-play-line"></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div
              className="eduvibe-sidebar course-details-sidebar p-0 "
              style={{ height: "80vh" }}
            >
              <div className="inner">
                <div className="eduvibe-widget">
                  <div className="video-area">
                    <div className="thumbnail video-popup-wrapper">
                       <LazyLoadImage
                        className="radius-small w-100"
                        src="assets/images/course/video-bg/course-02.jpg"
                        alt="Course Images"
                        style={{ height: "80vh" }}
                        height="100%"
                        width="100%"
                      />
                      <a
                        href="https://www.youtube.com/watch?v=pNje3bWz7V8"
                        className="video-play-btn position-to-top video-popup-activation"
                      >
                        <span className="play-icon course-details-video-popup"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}