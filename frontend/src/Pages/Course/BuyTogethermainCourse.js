import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function BuyTogethermainCourse({
  buytogether,
  currency
}) {
  return (
    <>
      {" "}
      {buytogether?.main_course && (
        <div className="col-md-4 position-relative">
          <div className="edu-card card-type-3 radius-small">
            <div className="inner" style={{ height: "280px" }}>
              <div className="thumbnail">
                <Link to="#">
                  {buytogether?.main_course?.media_type === "video" ? (
                     <LazyLoadImage
                      className="w-100"
                      src={buytogether?.main_course?.thumb_image}
                      alt="Course Thumb"
                      height="100%"
                      width="100%"
                    />
                  ) : (
                     <LazyLoadImage
                      className="w-100"
                      src={buytogether?.main_course?.media}
                      alt="Course Thumb"
                      height="100%"
                      width="100%"
                    />
                  )}
                </Link>
                <div className="wishlist-top-right">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={
                        buytogether?.main_course && buytogether?.main_course?.id
                      }
                    />
                    <label className="form-check-label"></label>
                  </div>
                </div>
              </div>
              <div className="content">
                <h6 className="title leading-tight2">
                  <Link to="#" className="leading-tight2">
                    {buytogether?.main_course?.name}
                  </Link>
                </h6>

                <div className="card-bottom">
                  <div className="price-list price-style-02">
                    <div className="price current-price">
                      {currency ? currency : "₹"}{" "}
                      {buytogether?.main_course?.price_type === "paid"
                        ? buytogether?.main_course?.payable_price
                        : "Free"}
                    </div>

                    {buytogether?.main_course?.is_inr_discount == 1 && (
                      <div className="price old-price">
                        {currency ? currency : "₹"}
                        {buytogether?.main_course?.inr_price}
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
