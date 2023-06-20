import React from 'react'
import {Link} from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function AssessmentPaymentCard({v}) {
  return (
   <> {v.type === "assessment" && (
    <div className="col-md-12" >
      <ul className="all-courses-liststyle">
        <li className="filter">
          <div className="list-style-wrapper">
            <div className="course-image-wrapper">
              <Link
                to={`/assessment/${v?.assessment?.category?.slug}/${v.assessment?.slug}`}
              >
                 <LazyLoadImage
                  src={v?.assessment?.image}
                  alt="Full Stack Web Developer – MEAN Stack"
                  height="100%"
                  width="100%"
                />
              </Link>
            </div>
            <div className="course-detail-wrapper">
              <div className="row m-m-0">
                <div className="col-md-12 m-pad-0">
                  <div className="list-style-detailwrapper">
                    <Link
                      to={`/assessment/${v?.assessment?.category?.slug}/${v.assessment?.slug}`}
                    >
                      <h3 className="mb-1 list-style-course-name">
                        {v?.assessment?.name}
                      </h3>
                    </Link>
                  </div>
                  <div
                    className="card-bottom data text-center"
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
                        {v?.assessment
                          ?.currency_symbol
                          ? v?.assessment
                              ?.currency_symbol
                          : "₹"}{" "}
                        {v?.amount}
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
