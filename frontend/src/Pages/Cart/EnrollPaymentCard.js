import React from "react";
import {Link} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function EnrollPaymentCard({ payment }) {
  return (
    <>
      {" "}
      {payment?.type === "enroll" && (
        <div className="col-md-12">
          <ul className="all-courses-liststyle">
            <li className="filter">
              <div className="list-style-wrapper">
                <div className="course-image-wrapper">
                  <Link to={`courses-details/${payment?.data?.course?.slug}`}>
                    {payment?.data?.course.media_type === "video" ? (
                       <LazyLoadImage
                        src={payment?.data?.course?.thumb_image}
                        alt={payment?.data?.course?.media_alt_tag}
                        height="100%"
                        width="100%"
                      />
                    ) : (
                       <LazyLoadImage
                        src={payment?.data?.course?.media}
                        alt={payment?.data?.course?.media_alt_tag}
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
                        <Link
                          to={`/${payment?.data?.course?.category?.slug}/${payment?.data?.course.slug}`}
                        >
                          <h3 className="mb-1 list-style-course-name">
                            {payment?.data?.course?.name}
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
                            {payment?.data?.payable_price}
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
