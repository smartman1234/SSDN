import React from "react";
import {Link} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function EventPaymentCard({ payment }) {
  return (
    <>
      {payment?.type === "event" && (
        <div className="col-md-12">
          <ul className="all-courses-liststyle">
            <li className="filter">
              <div className="list-style-wrapper">
                <div className="course-image-wrapper">
                  <Link to={`event-details/${payment?.data?.event?.slug}`}>
                     <LazyLoadImage
                      src={payment?.data.event?.image}
                      alt={payment?.data?.event?.image_alt_tag}
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
                          to={`/event-details/${payment?.data.event?.slug}`}
                        >
                          <h3 className="mb-1 list-style-course-name">
                            {payment?.data?.event?.title}
                          </h3>
                        </Link>
                      </div>
                      <div
                        className="card-bottom data text-center d-flex justify-content-between border-top"
                      >
                        <div className="price-list price-style-01 text-start">
                          <div className="price current-price">Price:</div>
                          <div className="price current-price">
                            {payment?.data?.currency_symbol}
                            {payment?.data.amount_paid}
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
