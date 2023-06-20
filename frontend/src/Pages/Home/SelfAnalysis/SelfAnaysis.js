import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function SelfAnaysis({ data }) {
  return (
    <div className="edu-feature-area eduvibe-home-one-video edu-section-gap bg-color-white">
      <div className="container eduvibe-animated-shape">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="section-title text-center">
              <h3 className="title mb-4">
                {data?.page_description?.analysis_title_1}
              </h3>
              <span className="pre-title">
                {data?.page_description?.analysis_title_2}
              </span>
              <div className="meter">
                <span style={{ width: "50%" }}>
                  <span className="progress"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt--30 align-items-center">
          <div className="col-lg-6 d-none d-md-block">
            <LazyLoadImage
              src={`
                      ${
                        data?.page_description?.image_url +
                        data?.page_description?.analysis_image
                      }`}
              height="100%"
              width="100%"
              alt="image"
            />
          </div>
          <div className="col-lg-6">
            <div className="feature-list-wrapper mt-0">
              <div className="feature-list" style={{ animationDuration: "1s" }}>
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
                  <h6 className="title">
                    {" "}
                    {data?.page_description?.analysis_card_1_title}
                  </h6>
                  <p
                    className="feature-description"
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.page_description?.analysis_card_1_description,
                    }}
                  />
                </div>
              </div>
              <div className="feature-list" style={{ animationDuration: "1s" }}>
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
                  <h6 className="title">
                    {" "}
                    {data?.page_description?.analysis_card_2_title}
                  </h6>
                  <p
                    className="feature-description"
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.page_description?.analysis_card_2_description,
                    }}
                  />
                </div>
              </div>
              <div className="feature-list" style={{ animationDuration: "1s" }}>
                <div className="icon">
                  <LazyLoadImage
                    alt="img"
                    src="/assets/images/svgg/icons8-alarm-clock-42.png"
                    style={{ transform: "scale(0.60)" }}
                    height="100%"
                    width="100%"
                  />
                </div>
                <div className="content">
                  <h6 className="title">
                    {" "}
                    {data?.page_description?.analysis_card_3_title}
                  </h6>
                  <p
                    className="feature-description"
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.page_description?.analysis_card_3_description,
                    }}
                  />
                </div>
              </div>
              <div className="feature-list" style={{ animationDuration: "1s" }}>
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
                  <h6 className="title">
                    {" "}
                    {data?.page_description?.analysis_card_4_title}
                  </h6>
                  <p
                    className="feature-description"
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.page_description?.analysis_card_4_description,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center mt-4">
                <Link className="edu-btn" to="/assessment">
                  Explore Assessment Test
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video-lightbox-wrapper"></div>
    </div>
  );
}
