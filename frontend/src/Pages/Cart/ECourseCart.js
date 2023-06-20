import React from 'react'
import {Link} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function ECourseCart({v,successCoupon,cartItemRemovehandle}) {
  return (
  <>  {v.e_course && (
    <li className="filter">
      <div className="list-style-wrapper">
        <div className="course-image-wrapper ssdn-cart-image">
          <Link to={`/e-learning-study/${v.e_course.slug}`}>
            {v.e_course?.media_type === "video" ? (
               <LazyLoadImage
                src={v.e_course?.thumb_image}
                alt={v.e_course?.media_alt_tag}
                height="100%"
                width="100%"
              />
            ) : (
               <LazyLoadImage
                src={v.e_course?.media}
                alt={v.e_course?.media_alt_tag}
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
                <Link to={`/e-learning-study/${v.e_course.slug}`}>
                  <h3 className="mb-1 list-style-course-name">
                    {v?.e_course?.name}
                    {successCoupon && (
                      <p>
                        Coupon Discount :
                        {v.coupons_discount
                          ? v.coupons_discount
                          : 0}
                      </p>
                    )}
                  </h3>
                </Link>
              </div>
            </div>

            <div className="col-md-3">
              <div className="price-list price-style-01 text-center">
                <div className="price old-price w-100">
                  {v?.e_course
                    ? v?.e_course?.is_inr_discount == 1 &&
                      (v.currency_symbol
                        ? v.currency_symbol
                        : "₹")
                    : v?.e_course?.is_inr_discount == 1 &&
                      (v.e_course?.currency_symbol
                        ? v.course?.currency_symbol
                        : "₹")}
                  {v?.e_course?.is_inr_discount == 1
                    ? v?.e_course?.inr_price
                    : v?.e_course?.is_inr_discount == 1 &&
                      v?.e_course?.inr_price}
                </div>
                <div className="price current-price w-100">
                  {v.e_course?.is_inr_discount == 1
                    ? (v.e_course?.currency_symbol
                        ? v.e_course?.currency_symbol
                        : "₹") + v?.e_course?.payable_price_new
                    : (v.e_course?.currency_symbol
                        ? v.e_course?.currency_symbol
                        : "₹") + v?.e_course?.inr_price}
                </div>
              </div>
            </div>
            <div className="col-md-1 text-center">
              <Link
                to="#"
                className="text-danger"
                onClick={() => cartItemRemovehandle(v)}
              ></Link>
            </div>
            <div className="col-md-12"></div>
          </div>
         
        </div>
      </div>
    </li>
  )}</>
  )
}
