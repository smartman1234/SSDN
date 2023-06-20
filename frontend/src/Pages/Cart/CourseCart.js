import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function CourseCart({ v, successCoupon, cartItemRemovehandle }) {
  return (
    <>
      {" "}
      {v.course && (
        <li className="filter">
          <div className="list-style-wrapper">
            <div className="course-image-wrapper ssdn-cart-image">
              <Link
                to={`/${v?.course?.category?.slug}/${v?.course?.slug.replaceAll(
                  "-{{in-varcity}}",
                  ""
                )}`}
              >
                {v.course.media_type === "video" ? (
                   <LazyLoadImage
                    src={v.course?.thumb_image}
                    alt={v.course?.media_alt_tag}
                    height="100%"
                    width="100%"
                  />
                ) : (
                   <LazyLoadImage
                    src={v.course?.media}
                    alt={v.course?.media_alt_tag}
                    height="100%"
                    width="100%"
                  />
                )}
              </Link>
            </div>
            <div className="course-detail-wrapper">
              <div className="row align-items-center">
                <div className="col-md-5">
                  <div className="list-style-detailwrapper pl--0 pt--0">
                    <Link
                      to={`/${
                        v?.course?.category?.slug
                      }/${v?.course?.slug.replaceAll("-{{in-varcity}}", "")}`}
                    >
                      <h3 className="mb-1 list-style-course-name">
                        {v?.course?.name}
                        {successCoupon && (
                          <p>
                            Coupon Discount :
                            {v.coupons_discount ? v.coupons_discount : 0}
                          </p>
                        )}
                      </h3>
                    </Link>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="price-list price-style-01 text-center">
                    <div className="price old-price w-100">
                      {v?.course
                        ? v?.course?.is_inr_discount == 1 &&
                          (v.currency_symbol ? v.currency_symbol : "₹")
                        : v?.course?.is_inr_discount == 1 &&
                          (v.course?.currency_symbol
                            ? v.course?.currency_symbol
                            : "₹")}
                      {v?.course?.is_inr_discount == 1
                        ? v?.course?.inr_price
                        : v?.course?.is_inr_discount == 1 &&
                          v?.course?.inr_price}
                    </div>
                    <div className="price current-price w-100">
                      {v.course?.is_inr_discount == 1
                        ? (v.course?.currency_symbol
                            ? v.course?.currency_symbol
                            : "₹") + v?.course?.payable_price_new
                        : (v.course?.currency_symbol
                            ? v.course?.currency_symbol
                            : "₹") + v?.course?.inr_price}
                    </div>
                  </div>
                </div>
                <div className="col-md-1 text-center">
                  <Link
                    to="#"
                    className="text-danger fs-22"
                    onClick={() => cartItemRemovehandle(v)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </li>
      )}
    </>
  );
}
