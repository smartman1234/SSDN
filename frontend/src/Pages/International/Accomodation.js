import React from "react";
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Accomodation({ detailData, accommodation }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <>
      <div className="edu-service-area edu-section-gap" id="accommodation">
        <div className="container eduvibe-animated-shape">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h3 className="title mb-4">Accommodation</h3>
                <span
                  className="pre-title1"
                  dangerouslySetInnerHTML={{
                    __html:
                      detailData?.accomodation_description &&
                      detailData?.accomodation_description,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            {accommodation?.length < 4 &&
              accommodation.map((v, i) => (
                <div className="col-md-4" key={i}>
                  <div
                    className="edu-card card-type-3 radius-small"
                    style={{ marginRight: "20px" }}
                  >
                    <div className="inner">
                      <div className="thumbnail1">
                        <a href="#">
                           <LazyLoadImage
                            className="w-100"
                            src={detailData?.image_url + v.image}
                            alt={v?.image_alt_tag}
                            height="100%"
                            width="100%"
                          />
                        </a>
                      </div>
                      <div className="content">
                        <h6 className="title">
                          <a href="#">{v?.hotel_name}</a>
                        </h6>
                        <div className="card-top">
                          <div className="edu-rating rating-default m-0">
                            {v?.avg_review == 5 && (
                              <div className="rating">
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                              </div>
                            )}
                            {v?.avg_review == 4 && (
                              <div className="rating">
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                              </div>
                            )}{" "}
                            {v?.avg_review == 3 && (
                              <div className="rating">
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                              </div>
                            )}{" "}
                            {v?.avg_review == 2 && (
                              <div className="rating">
                                <i className="icon-Star"></i>
                                <i className="icon-Star"></i>
                              </div>
                            )}
                            {v?.avg_review == 1 && (
                              <div className="rating">
                                <i className="icon-Star"></i>
                              </div>
                            )}
                            <span className="rating-count">
                              ({v?.total_review} Review)
                            </span>
                          </div>
                          <div className="author-meta">
                            <div className="author-thumb">
                              <span className="author-title">
                                <i className="ri-phone-fill data"></i>{" "}
                                {v?.mobile}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="card-bottom">
                          <div className="edu-rating rating-default d-block">
                            <i className="ri-map-pin-line"></i> {v?.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-hover-action">
                      <div className="hover-content">
                        <div className="content">
                          <h6 className="title">
                            <a href="#">{v?.hotel_name}</a>
                          </h6>
                          <div className="card-bottom p-3">
                            <div className="edu-rating rating-default m-0">
                              {v?.avg_review == 5 && (
                                <div className="rating">
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                </div>
                              )}
                              {v?.avg_review == 4 && (
                                <div className="rating">
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                </div>
                              )}{" "}
                              {v?.avg_review == 3 && (
                                <div className="rating">
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                </div>
                              )}{" "}
                              {v?.avg_review == 2 && (
                                <div className="rating">
                                  <i className="icon-Star"></i>
                                  <i className="icon-Star"></i>
                                </div>
                              )}
                              {v?.avg_review == 1 && (
                                <div className="rating">
                                  <i className="icon-Star"></i>
                                </div>
                              )}
                              <span className="rating-count">
                                ({v?.total_review} Review)
                              </span>
                            </div>
                            <div className="author-meta">
                              <div className="author-thumb">
                                <span className="author-title text-white">
                                  <i className="ri-phone-fill"></i> {v?.mobile}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="card-bottom">
                            <div className=" leading-tight1">
                              <i className="ri-map-pin-line"></i> {v?.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {accommodation?.length >= 4 && (
              <div className=" mt--20 edu-slick-button slick-activation-wrapper service-activation-item5 edu-slick-arrow-top">
                    <Slider {...settings}>
                      {accommodation.map((v, i) => (
                        <div className="col-md-4 mb--0" key={i}>
                          <div
                            className="edu-card card-type-3 radius-small"
                          >
                            <div className="inner">
                              <div className="thumbnail1">
                                <a href="#">
                                   <LazyLoadImage
                                    className="w-100"
                                    src={detailData.image_url + v.image}
                                    alt={v.image_alt_tag}
                                    height="100%"
                                    width="100%"
                                  />
                                </a>
                              </div>
                              <div className="content">
                                <h6 className="title">
                                  <a href="#">{v.hotel_name}</a>
                                </h6>
                                <div className="card-bottom p-3">
                                  <div className="edu-rating rating-default m-0">
                                    {v.avg_review == 5 && (
                                      <div className="rating">
                                        <i className="icon-Star"></i>
                                        <i className="icon-Star"></i>
                                        <i className="icon-Star"></i>
                                        <i className="icon-Star"></i>
                                        <i className="icon-Star"></i>
                                      </div>
                                    )}
                                    {v.avg_review == 4 && (
                                      <div className="rating">
                                        <i className="icon-Star"></i>
                                        <i className="icon-Star"></i>
                                        <i className="icon-Star"></i>
                                        <i className="icon-Star"></i>
                                      </div>
                                    )}{" "}
                                    {v.avg_review == 3 && (
                                      <div className="rating">
                                        <i className="icon-Star"></i>
                                        <i className="icon-Star"></i>
                                        <i className="icon-Star"></i>
                                      </div>
                                    )}{" "}
                                    {v.avg_review == 2 && (
                                      <div className="rating">
                                        <i className="icon-Star"></i>
                                        <i className="icon-Star"></i>
                                      </div>
                                    )}
                                    {v.avg_review == 1 && (
                                      <div className="rating">
                                        <i className="icon-Star"></i>
                                      </div>
                                    )}
                                    <span className="rating-count">
                                      ({v.total_review} Review)
                                    </span>
                                  </div>
                                </div>

                                <div className="card-bottom p-3">
                                  <div className="author-meta">
                                    <div className="author-thumb">
                                      <span className="author-title">
                                        <i className="ri-phone-fill data"></i>{" "}
                                        {v.mobile}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-bottom">
                                  <div className="leading-tight1">
                                    <i className="ri-map-pin-line"></i>{" "}
                                    {v.location}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="card-hover-action">
                              <div className="hover-content">
                                <div className="content">
                                  <h6 className="title">
                                    <a href="#">{v.hotel_name}</a>
                                  </h6>
                                  <div className="card-bottom pb-3">
                                    <div className="edu-rating rating-default m-0">
                                      {v.avg_review == 5 && (
                                        <div className="rating">
                                          <i className="icon-Star"></i>
                                          <i className="icon-Star"></i>
                                          <i className="icon-Star"></i>
                                          <i className="icon-Star"></i>
                                          <i className="icon-Star"></i>
                                        </div>
                                      )}
                                      {v.avg_review == 4 && (
                                        <div className="rating">
                                          <i className="icon-Star"></i>
                                          <i className="icon-Star"></i>
                                          <i className="icon-Star"></i>
                                          <i className="icon-Star"></i>
                                        </div>
                                      )}{" "}
                                      {v.avg_review == 3 && (
                                        <div className="rating">
                                          <i className="icon-Star"></i>
                                          <i className="icon-Star"></i>
                                          <i className="icon-Star"></i>
                                        </div>
                                      )}{" "}
                                      {v.avg_review == 2 && (
                                        <div className="rating">
                                          <i className="icon-Star"></i>
                                          <i className="icon-Star"></i>
                                        </div>
                                      )}
                                      {v.avg_review == 1 && (
                                        <div className="rating">
                                          <i className="icon-Star"></i>
                                        </div>
                                      )}
                                      <span className="rating-count">
                                        ({v.total_review} Review)
                                      </span>
                                    </div>
                                    <div className="author-meta">
                                      <div className="author-thumb">
                                        <span className="author-title text-white">
                                          <i className="ri-phone-fill"></i>{" "}
                                          {v.mobile}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card-bottom">
                                    <div className="edu-rating rating-default text-white d-block m-0">
                                      <i className="ri-map-pin-line"></i>{" "}
                                      {v.location}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
