import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function TrendingCourseLessThan3({
    trendingCourse,
    addedtoCart,
    addCourseTocart,
}) {
    return (
        <>
            {" "}
            {trendingCourse?.length <= 3 && (
                <div
                    className="row mt--20"
                    style={{ display: "flex" }}
                >
                    {trendingCourse.map((v, i) => (
                        <div className="col-md-4 edu-card card-type-3 radius" key={i}>
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
                                                .substring(0, 60)}
                                            {v.name.length > 60 && "..."}
                                        </Link>
                                    </h6>
                                    <p className="delivery-format">Delivery Format</p>
                                    <div className="delivery-format-icons d-flex justify-content-between pt--10 pb--10">
                                         <LazyLoadImage
                                            src={
                                                v.training_mode?.image_url +
                                                    v.training_mode?.mode_1_icon
                                                    ? v.training_mode?.image_url +
                                                    v.training_mode?.mode_1_icon
                                                    : "/assets/images/mode-1540729954980.png"
                                            }
                                            alt="Instructor-led"
                                            height="31"
                                            width="31"
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
                                            height="31"
                                            width="31"
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
                                            height="31"
                                            width="31"
                                        />
                                    </div>
                                    <div className="card-bottom">
                                        {v.course_duration} {v.course_duration_time}
                                        {v.average_review == 5 && (
                                            <div className="rating">
                                                <i className="icon-Star"></i>
                                                <i className="icon-Star"></i>
                                                <i className="icon-Star"></i>
                                                <i className="icon-Star"></i>
                                                <i className="icon-Star"></i>
                                            </div>
                                        )}
                                        {v.average_review == 4 && (
                                            <div className="rating">
                                                <i className="icon-Star"></i>
                                                <i className="icon-Star"></i>
                                                <i className="icon-Star"></i>
                                                <i className="icon-Star"></i>
                                            </div>
                                        )}
                                        {v.average_review == 3 && (
                                            <div className="rating">
                                                <i className="icon-Star"></i>
                                                <i className="icon-Star"></i>
                                                <i className="icon-Star"></i>
                                            </div>
                                        )}
                                        {v.average_review == 2 && (
                                            <div className="rating">
                                                <i className="icon-Star"></i>
                                                <i className="icon-Star"></i>
                                            </div>
                                        )}
                                        {v.average_review == 1 && (
                                            <div className="rating">
                                                <i className="icon-Star"></i>
                                            </div>
                                        )}
                                        {v.average_review == 0 ||
                                            (v.average_review === null && (
                                                <div className="rating"></div>
                                            ))}
                                        <span className="rating-count">
                                            ({Math.round(v.review_count)})
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-hover-action">
                                <h6 className="title leading-tight2">
                                    <Link to="#">
                                        {v.name
                                            .replaceAll("{{in VARCITY}}", "")
                                            .substring(0, 42)}
                                        {v.name.length > 42 && "..."}
                                    </Link>
                                </h6>

                                <p
                                    className="description ssdn-editor-font leading-tight4 mt-3 mb-5"
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
                    ))}
                </div>
            )}
        </>
    );
}
