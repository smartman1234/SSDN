import React from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
export default function AboutUs({ data }) {
  return (
    <>
      <div className="about-style-1 edu-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-none d-md-block">
              <div className="about-image-gallery">
                <LazyLoadImage
                  className="image-1"
                  src={`
                    ${
                      data?.page_description?.image_url +
                      data?.page_description?.about_image
                    }`}
                  height="100%"
                  width="100%"
                  alt={data?.page_description?.about_image_alt_tag}
                />
                {/* <picture>
                  <source
                    srcset={`
                    ${
                      data?.page_description?.image_url +
                      data?.page_description?.about_image
                    }`}
                    media="(min-width: 800px)"
                  />
                </picture> */}
                <div className="badge-inner">
                  <LazyLoadImage
                    className="image-3"
                    src={`
                      ${
                        data?.page_description?.image_url +
                        data?.page_description?.about_experiance_image
                      }`}
                    height="100%"
                    width="100%"
                    alt={data?.page_description?.about_experiance_image_alt_tag}
                  />
                </div>
                <div className="shape-image shape-image-1">
                  <LazyLoadImage
                    src="/assets\images\shapes\shape-04-01.png"
                    alt="Shape Thumb"
                    height="116px"
                    width="87px"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section-title">
                <span className="pre-title">
                  {data?.page_description?.about_title_1}
                </span>
                <h3 className="title">
                  {data?.page_description?.about_title_2}
                </h3>
              </div>
              <p
                className="description mb-5 mt-3"
                dangerouslySetInnerHTML={{
                  __html: data?.page_description?.about_description,
                }}
              />
              <div className="about-feature-list">
                <div className="our-feature">
                  <div className="icon">
                    <i className="icon-Hand---Book"></i>
                  </div>
                  <div className="feature-content">
                    <h6 className="feature-title">
                      {data?.page_description?.about_sub_title_1}
                    </h6>
                    <p
                      className="feature-description"
                      dangerouslySetInnerHTML={{
                        __html: data?.page_description?.about_sub_description_1,
                      }}
                    />
                  </div>
                </div>
                <div className="our-feature">
                  <div className="icon">
                    <i className="icon-Campus"></i>
                  </div>
                  <div className="feature-content">
                    <h6 className="feature-title">
                      {data?.page_description?.about_sub_title_2}
                    </h6>
                    <p
                      className="feature-description"
                      dangerouslySetInnerHTML={{
                        __html: data?.page_description?.about_sub_description_2,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt--20">
                <Link className="edu-btn" to="/about-us">
                  Know About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
