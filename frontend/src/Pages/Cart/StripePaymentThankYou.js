import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const StripeELearningThankYou = React.lazy(() =>
  import("./StripeELearningThankYou")
);

export default function StripePaymentThankYou({ v }) {
  return (
    <>
      {v?.type === "assessment" && (
        <div className="col-md-12">
          <ul className="all-courses-liststyle">
            <li className="filter">
              <div className="list-style-wrapper">
                <div className="course-image-wrapper">
                  <Link to="courses-details.html">
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
                        <Link to="courses-details.html">
                          <h3 className="mb-1 list-style-course-name">
                            {v?.assessment?.name}
                          </h3>
                        </Link>
                      </div>
                      <div
                        className="card-bottom data text-center border-top"
                      >
                        <div className="price-list price-style-01 text-start">
                          <div className="price current-price">Price:</div>
                          <div className="price current-price">
                            {v?.assessment?.currency_symbol
                              ? v?.assessment?.currency_symbol
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
      )}
      {v?.type === "voucher" && (
        <div className="col-md-12">
          <ul className="all-courses-liststyle">
            <li className="filter">
              <div className="list-style-wrapper">
                <div className="course-image-wrapper">
                  <Link to="courses-details.html">
                    <LazyLoadImage
                      src={v.voucher?.logo}
                      alt={v?.voucher?.logo_alt_tag}
                      height="100%"
                      width="100%"
                    />
                  </Link>
                </div>
                <div className="course-detail-wrapper">
                  <div className="row m-m-0">
                    <div className="col-md-12 m-pad-0">
                      <div className="list-style-detailwrapper">
                        <Link to={`/voucher/${v?.voucher?.category?.slug}`}>
                          <h3 className="mb-1 list-style-course-name">
                            {v?.voucher?.name}
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
                            {v?.amount}
                          </div>
                        </div>

                        <div className="price-list price-style-01 text-start">
                          <div className="price">Quantity :</div>
                          <div className="price ">{v.quantity}</div>
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
      {v?.type === "course" && (
        <div className="col-md-12">
          <ul className="all-courses-liststyle">
            <li className="filter">
              <div className="list-style-wrapper">
                <div className="course-image-wrapper">
                  <Link to={`courses-details/${v?.course?.slug}`}>
                    {v?.course.media_type === "video" ? (
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
                        <Link to={`/course-details/${v.course.slug}`}>
                          <h3 className="mb-1 list-style-course-name">
                            {v?.course?.name}
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
      <React.Suspense fallback="">
        <StripeELearningThankYou v={v} />
      </React.Suspense>
    </>
  );
}
