import React from 'react'
import {Link} from"react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function VoucherPaymentCard({v}) {
  return (
  <>  {v.type === "voucher" && (
    <div className="col-md-12" >
      <ul className="all-courses-liststyle">
        <li className="filter">
          <div className="list-style-wrapper">
            <div className="course-image-wrapper">
              <Link
                to={`/vouchers/${v?.voucher?.category?.slug}/${v?.voucher?.slug}`}
              >
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
                    <Link
                      to={`/vouchers/${v?.voucher?.category?.slug}/${v?.voucher?.slug}`}
                    >
                      <h3 className="mb-1 list-style-course-name">
                        {v?.voucher?.name}
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
                        {v?.amount}
                      </div>
                    </div>

                    <div className="price-list price-style-01 text-start">
                      <div className="price">
                        Quantity :
                      </div>
                      <div className="price ">
                        {v.quantity}
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
