import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function RelatedCourseLessThan3({
  addCourseTocart,
  addedtoCart,
  detailData,
}) {
  return (
    <>
      {detailData?.related_courses?.length <= 3 && (
        <div
          className="mt--20 row edu-slick-button slick-activation-wrapper eduvibe-course-one-carousel eduvibe-course-details-related-course-carousel"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {detailData?.related_courses?.map((v, i) => (
            <div className="single-slick-card col-md-4" key={i}>
              <div
                className="edu-card card-type-3 radius-small"
                style={{ height: "380px" }}
              >
                <div className="inner">
                  {v.media_type === "video" && (
                    <div className="thumbnail">
                      <Link to="#">
                         <LazyLoadImage
                          src={v.thumb_image}
                          alt="image"
                          height="100%"
                          width="100%"
                        />
                      </Link>
                    </div>
                  )}
                  {v.media_type === "image" && (
                    <div className="thumbnail">
                      <Link to="#">
                         <LazyLoadImage
                          className="w-100"
                          src={v.media}
                          alt="Course Meta"
                          height="100%"
                          width="100%"
                        />
                      </Link>
                    </div>
                  )}
                  <div className="content">
                    <h6 className="title">
                      <Link to="#">
                        {v.name
                          .replaceAll("{{in VARCITY}}", "")
                          .substring(0, 42)}
                        {v.name.replaceAll("{{in VARCITY}}", "").length > 42 &&
                          "..."}
                      </Link>
                    </h6>
                    <p className="delivery-format">Delivery Format</p>
                    <div className="delivery-format-icons d-flex justify-content-between  pt--10 pb--10">
                       <LazyLoadImage
                        src={
                          v.training_mode?.image_url +
                          v.training_mode?.mode_1_icon
                            ? v.training_mode?.image_url +
                              v.training_mode?.mode_1_icon
                            : "/assets/images/mode-1540729954980.png"
                        }
                        alt="Instructor-led"
                        height="100%"
                        width="100%"
                      />
                       <LazyLoadImage
                        src={
                          v.training_mode?.image_url +
                          v.training_mode?.mode_2_icon
                            ? v.training_mode?.image_url +
                              v.training_mode?.mode_2_icon
                            : "/assets/images/mode-1540729954980.png"
                        }
                        alt="E-learning"
                        height="100%"
                        width="100%"
                      />
                       <LazyLoadImage
                        src={
                          v.training_mode?.image_url +
                          v.training_mode?.mode_3_icon
                            ? v.training_mode?.image_url +
                              v.training_mode?.mode_3_icon
                            : "/assets/images/mode-1540729954980.png"
                        }
                        alt="Boot Camp"
                        height="100%"
                        width="100%"
                      />
                    </div>
                    <div className="card-bottom">
                      <div className="price-list price-style-02">
                        <div className="price current-price">
                          {v.course_duration} {v.course_duration_time}
                        </div>
                      </div>
                      <div className="edu-rating rating-default">
                        {v.average_review === "5" && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.average_review === "4" && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.average_review === "3" && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.average_review === "2" && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.average_review === "1" && (
                          <div className="rating">
                            <i className="icon-Star"></i>
                          </div>
                        )}
                        {v.average_review === "0" ||
                          (v.average_review === null && (
                            <div className="rating"></div>
                          ))}
                        <span className="rating-count">({v.review_count})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-hover-action">
                  <div className="hover-content">
                    <h6 className="title leading-tight1">
                      <Link to="#">
                        {v.name
                          .replaceAll("{{in VARCITY}}", "")
                          .substring(0, 42)}
                        {v.name.replaceAll("{{in VARCITY}}", "").length > 42 &&
                          "..."}
                      </Link>
                    </h6>

                    <p
                      className="description leading-tight4 ssdn-editor-font mt-3 mb-5"
                      dangerouslySetInnerHTML={{
                        __html: v.course_overview.replaceAll(
                          "{{in VARCITY}}",
                          ""
                        ),
                      }}
                    />

                    <div className="custom-button-design">
                      {v?.price_type === "paid" ? (
                        <div className="read-more-btn">
                          {addedtoCart[v.id] ? (
                            <Link
                              to="/cart"
                              className="edu-btn btn-bg-alt text-center mb-3"
                            >
                              Go to Cart
                            </Link>
                          ) : (
                            <>
                              {v.is_order != 0 ? (
                                <Link
                                  to="/my-course"
                                  className="edu-btn btn-bg-alt text-center mb-3"
                                >
                                  Go to My Course
                                </Link>
                              ) : (
                                <Link
                                  to="#"
                                  className="edu-btn btn-bg-alt text-center mb-3"
                                  onClick={() => addCourseTocart(v.id)}
                                >
                                  Add to Cart
                                </Link>
                              )}
                            </>
                          )}
                          <Link
                            className="edu-btn btn-medium btn-white"
                            to={`/${v?.category?.slug}/${v.slug}`}
                          >
                            View Details
                          </Link>
                        </div>
                      ) : (
                        <div className="read-more-btn">
                          <Link
                            className="edu-btn btn-medium btn-white"
                            to={`/${v?.category?.slug}/${v.slug}`}
                          >
                            View Details
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
