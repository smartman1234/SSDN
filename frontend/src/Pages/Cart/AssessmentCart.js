import React from 'react'
import {Link} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function AssessmentCart({v,successCoupon,cartItemRemovehandle}) {
  return (
  <> {v?.assessment && (
    <li className="filter" >
      <div className="list-style-wrapper align-items-center">
        <div className="course-image-wrapper ssdn-cart-image">
          <Link to="#">
             <LazyLoadImage
              src={v?.assessment?.image}
              alt={v?.assessment?.image_alt_tag}
              height="100%"
              width="100%"
            />
          </Link>
        </div>
        <div className="course-detail-wrapper">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="list-style-detailwrapper">
                <Link to="#">
                  <h3 className="mb-1 list-style-course-name">
                    {v?.assessment?.name}
                  </h3>
                  {successCoupon && (
                    <p>
                      Coupon Discount :
                      {v.coupons_discount
                        ? v.coupons_discount
                        : 0}
                    </p>
                  )}
                </Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="price-list price-style-01 text-center">
                <div className="price old-price w-100">
                  {v?.assessment
                    ? (v?.assessment?.is_inr_discount === 1 ||
                        v?.is_buy_together == 1) &&
                      (v.assessment?.currency_symbol
                        ? v.assessment?.currency_symbol
                        : v.assessment?.currency_symbol
                        ? v.assessment?.currency_symbol
                        : "₹")
                    : v?.assessment?.is_inr_discount === 1 &&
                      (v.currency_symbol
                        ? v.currency_symbol
                        : v.currency_symbol
                        ? v.currency_symbol
                        : "₹")}
                  {v?.assessment?.is_inr_discount === 1 ||
                  v?.is_buy_together == 1
                    ? v?.assessment?.inr_price
                    : v?.assessment?.is_inr_discount === 1 &&
                      v?.assessment?.inr_price}
                </div>
                <div className="price current-price w-100">
                  {v?.assessment.is_inr_discount == 1
                    ? (v.assessment?.currency_symbol
                        ? v.assessment?.currency_symbol
                        : "₹") + v?.assessment?.payable_price_new
                    : (v.assessment?.currency_symbol
                        ? v.assessment?.currency_symbol
                        : "₹") + v?.assessment?.inr_price}
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
  )}</>
  )
}
