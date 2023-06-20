import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function SelfAnalysisTest() {
  return (
    <div className="edu-feature-area eduvibe-home-one-video edu-section-gap bg-color-white">
      <div className="container eduvibe-animated-shape">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h3 className="title mb-4">
                Self Analysis <span className="down-mark-line">Test</span>
              </h3>
              <span className="pre-title">
                Your intent to master next level skills are appreciated
              </span>
              <div className="meter">
                <span style={{ width: "50%" }}>
                  <span className="progress"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt--40 mb--30 align-items-center">
          <div className="col-lg-6">
            <LazyLoadImage  src="/assets/images/course/1.png" alt="image"
                                height="100%"
                                width="100%"/>
          </div>
          <div className="col-lg-6">
            <div className="inner mt_md--40 mt_sm--40">
              <div className="feature-list-wrapper mt--10">
                <div className="feature-list">
                  <div className="icon">
                    <LazyLoadImage
                    alt="img"
                      src="/assets/images/svgg/icons8-question-42.png"
                      style={{ transform: "scale(0.60)" }}
                      height="100%"
                      width="100%"
                    />
                  </div>
                  <div className="content">
                    <h6 className="title">10,000+ Questions</h6>
                    <p className="feature-description">
                      It is a long established fact that a reader will be
                      distracted by this on readable content of when looking at
                      its layout.
                    </p>
                  </div>
                </div>
                <div className="feature-list">
                  <div className="icon">
                    <LazyLoadImage
                    alt="img"
                      src="/assets/images/svgg/icons8-test-42 (1).png"
                      style={{ transform: "scale(0.60)" }}
                      height="100%"
                      width="100%"
                    />
                  </div>
                  <div className="content">
                    <h6 className="title">Mockup Test</h6>
                    <p className="feature-description">
                      It is a long established fact that a reader will be
                      distracted by this on readable content of when looking at
                      its layout.
                    </p>
                  </div>
                </div>
                <div className="feature-list">
                  <div className="icon">
                    <LazyLoadImage
                      src="/assets/images/svgg/icons8-alarm-clock-42.png"
                      alt="img"
                      style={{ transform: "scale(0.60)" }}
                      height="100%"
                      width="100%"
                    />
                  </div>
                  <div className="content">
                    <h6 className="title">Time Analysis</h6>
                    <p className="feature-description">
                      It is a long established fact that a reader will be
                      distracted by this on readable content of when looking at
                      its layout.
                    </p>
                  </div>
                </div>
                <div className="feature-list">
                  <div className="icon">
                    <LazyLoadImage
                    alt="img"
                      src="/assets/images/svgg/icons8-scorecard-42.png"
                      style={{ transform: "scale(0.60)" }}
                      height="100%"
                      width="100%"
                    />
                  </div>
                  <div className="content">
                    <h6 className="title">Score Analysis</h6>
                    <p className="feature-description">
                      It is a long established fact that a reader will be
                      distracted by this on readable content of when looking at
                      its layout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="mt-5">
                  <Link className="edu-btn" to="/assessment">
                    Explore Assessment Test
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video-lightbox-wrapper"></div>
    </div>
  );
}
