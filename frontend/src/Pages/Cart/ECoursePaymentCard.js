import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function ECoursePaymentCard({ v }) {
  return (
    <>
      {" "}
      {v.type === "e_course" && (
        <div className="col-md-12">
          <ul className="all-courses-liststyle">
            <li className="filter">
              <div className="list-style-wrapper">
                <div className="course-image-wrapper">
                  <Link to={`courses-details/${v?.e_course?.slug}`}>
                    {v.e_course.media_type === "video" ? (
                       <LazyLoadImage
                        src={v.e_course?.thumb_image}
                        alt={v?.e_course?.media_alt_tag}
                        height="100%"
                        width="100%"
                      />
                    ) : (
                       <LazyLoadImage
                        src={v.e_course?.media}
                        alt={v?.e_course?.media_alt_tag}
                        height="100%"
                        width="100%"
                      />
                    )}
                  </Link>
                </div>
                <div className="course-detail-wrapper">
                  <div className="row m-m-0">
                    <div className="col-md-12 m-pad-0">
                      <div className="list-style-detailwrapper">
                        <Link to={`/e-learning-study/${v.e_course.slug}`}>
                          <h3 className="mb-1 list-style-course-name">
                            {v?.e_course?.name}
                          </h3>
                        </Link>
                      </div>
                      <div
                        className="card-bottom data text-center d-flex justify-content-between border-top"
                      >
                        <div className="price-list price-style-01 text-start">
                          <div className="price current-price">Price:</div>
                          <div className="price current-price">
                            {localStorage.getItem("symbol")
                              ? localStorage.getItem("symbol")
                              : "₹"}
                            {v.amount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
