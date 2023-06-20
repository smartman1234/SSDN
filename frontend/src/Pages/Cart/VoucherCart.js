import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function VoucherCart({
  v,
  successCoupon,
  cartItemRemovehandle,
  decreaseVoucherHandle,
  increaseVoucherHandle,count
}) {
  return (
    <>
      {" "}
      {v.voucher && (
        <li className="filter">
          <div className="list-style-wrapper">
            <div className="course-image-wrapper ssdn-cart-image">
              <Link to="#">
                 <LazyLoadImage
                  src={v.voucher?.logo}
                  alt={v.voucher?.logo_alt_tag}
                  height="100%"
                  width="100%"
                />
              </Link>
            </div>
            <div className="course-detail-wrapper">
              <div className="row align-items-center">
                <div className="col-md-5">
                  <div className="list-style-detailwrapper pl--0 pt--0">
                    <Link to="#">
                      <h3 className="mb-1 list-style-course-name">
                        {v?.voucher?.name}
                        {successCoupon && (
                          <p>
                            Coupon Discount :
                            {v.coupons_discount ? v.coupons_discount : 0}
                          </p>
                        )}

                        <p
                          className="ssdn-editor-font leading-tight5"
                          dangerouslySetInnerHTML={{
                            __html: v?.voucher?.voucher_valid_for?.replaceAll(
                              "null",
                              ""
                            ),
                          }}
                        />
                      </h3>
                    </Link>
                  </div>
                </div>

                <div className="col-md-3">
                    <div className="quantity">
                      <button
                        className="minus-btn"
                        type="button"
                        onClick={() => decreaseVoucherHandle(v.id)}
                      >
                        <i>
                          _
                        </i>
                      </button>
                      <input
                        type="text"
                        min={1}
                        className="cart-qtyCount"
                        name="qty-assessment-134"
                        readOnly="readonly"
                        value={count[v.id]}
                        aria-labelledby="quantity"
                      />
                      <button
                        className="plus-btn"
                        type="button"
                        onClick={() => increaseVoucherHandle(v.id, 1)}
                        aria-label="Plus btn"
                      >
                        <i className="ri-add-line"></i>
                      </button>
                    </div>
                </div>
                <div className="col-md-3">
                  <div className="price-list price-style-01 text-center">
                    <div className="price old-price w-100">
                      {v?.voucher
                        ? v?.voucher?.is_inr_discount === 1 &&
                          (v.voucher?.currency_symbol
                            ? v.voucher?.currency_symbol
                            : "₹")
                        : v?.voucher?.is_inr_discount === 1 &&
                          (v.voucher?.currency_symbol
                            ? v.voucher?.currency_symbol
                            : "₹")}
                      {v?.voucher?.is_inr_discount === 1 ||
                      v?.is_buy_together == 1
                        ? v?.voucher?.inr_price
                        : v?.voucher?.is_inr_discount === 1 &&
                          v?.voucher?.inr_price}
                    </div>
                    <div className="price current-price w-100">
                      {v.voucher?.is_inr_discount === 1
                        ? (v.voucher?.currency_symbol
                            ? v.voucher?.currency_symbol
                            : "₹") + v?.voucher?.payable_price_new
                        : (v.voucher?.currency_symbol
                            ? v.voucher?.currency_symbol
                            : "₹") + v?.voucher?.inr_price}
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
