import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function BuyTogetherOtherCourse1Voucher({
  buytogether,
  currency,
  selectedCourseHandler,
}) {
  return (
    <>
      {" "}
      {buytogether?.other_course_1_type === "voucher" && (
        <div className="col-md-4 position-relative">
          <div className="edu-card card-type-3 radius-small">
            <div className="inner" style={{ height: "280px" }}>
              <div className="thumbnail">
                <Link to="#">
                   <LazyLoadImage
                    className="w-100"
                    src={buytogether?.other_course_1?.logo}
                    alt=""
                    height="100%"
                    width="100%"
                  />
                </Link>
                <div className="wishlist-top-right">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={buytogether?.other_course_1?.id}
                      id={`course_${buytogether?.other_course_1?.id}`}
                      onChange={(e) =>
                        selectedCourseHandler(
                          e,
                          buytogether?.other_course_1?.id,
                          buytogether?.other_course_1_type,
                          parseFloat(buytogether?.other_course_1_inr_price)
                        )
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`course_${buytogether?.other_course_1?.id}`}
                    ></label>
                  </div>
                </div>
              </div>
              <div className="content">
                <h6 className="title leading-tight2">
                  <Link to="#">{buytogether?.other_course_1?.name}</Link>
                </h6>

                <div className="card-bottom">
                  <div className="price-list price-style-02">
                    <div className="price current-price">
                      {currency ? currency : "₹"}{" "}
                      {buytogether?.other_course_1_inr_price}
                    </div>

                    {buytogether?.other_course_1?.is_inr_discount == 1 && (
                      <div className="price old-price">
                        {currency ? currency : "₹"}
                        {buytogether?.other_course_1?.inr_price}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="plus-data">+</span>
        </div>
      )}
    </>
  );
}
