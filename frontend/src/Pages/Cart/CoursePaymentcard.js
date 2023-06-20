import React from 'react'
import {Link} from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function CoursePaymentcard({v}) {
  return (
   <>  {v.type === "course" && (
    <div className="col-md-12">
      <ul className="all-courses-liststyle">
        <li className="filter">
          <div className="list-style-wrapper">
            <div className="course-image-wrapper">
              <Link
                to={`courses-details/${v?.course?.slug}`}
              >
                {v.course.media_type === "video" ? (
                   <LazyLoadImage
                    src={v.course?.thumb_image}
                    alt={v?.course?.media_alt_tag}
                    height="100%"
                    width="100%"
                  />
                ) : (
                   <LazyLoadImage
                    src={v.course?.media}
                    alt={v?.course?.media_alt_tag}
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
                      to={`/${v?.category?.slug}/${v.course.slug}`}
                    >
                      <h3 className="mb-1 list-style-course-name">
                        {v?.course?.name}
                      </h3>
                    </Link>
                  </div>
                  <div
                    className="card-bottom data text-center d-flex justify-content-between"
                    style={{
                      borderTop:
                        "1px solid #f1f4f6",
                    }}
                  >
                    <div className="price-list price-style-01 text-start">
                      <div className="price current-price">
                        Price:
                      </div>
                      <div className="price current-price">
                        {localStorage.getItem(
                          "symbol"
                        )
                          ? localStorage.getItem(
                              "symbol"
                            )
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
  )}</>
  )
}
