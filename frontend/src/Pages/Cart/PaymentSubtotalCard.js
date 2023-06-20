import React from 'react'
import {Link} from 'react-router-dom'

export default function PaymentSubtotalCard({payment}) {
  return (
    <div className="col-md-5">
    <div className="cart-summary">
      <div className="cart-summary-wrap">
        <ul className="cart-summary-inner">
          <li>
            <span className="subtitle">Sub Total</span>
            <span className="total">
              {localStorage.getItem("symbol")
                ? localStorage.getItem("symbol")
                : "₹"}{" "}
              {payment?.total_pay}
            </span>
          </li>
          {localStorage.getItem("currency") ===
          "INR" ? (
            <li>
              <span className="subtitle">
                GST (18%)
              </span>
              <span className="total">
                {localStorage.getItem("symbol")
                  ? localStorage.getItem("symbol")
                  : "₹"}{" "}
                {payment?.gst}
              </span>
            </li>
          ) : null}

          <li>
            <span className="subtitle">
              Other Charge (
              {payment?.transaction_charge} %)
            </span>
            <span className="total">
              {localStorage.getItem("symbol")
                ? localStorage.getItem("symbol")
                : "₹"}{" "}
              {payment?.transaction_charge_amount}
            </span>
          </li>
          <li>
            <span className="subtitle">
              <strong>Grand Total</strong>
            </span>
            <span className="total">
              <strong>
                {" "}
                {localStorage.getItem("symbol")
                  ? localStorage.getItem("symbol")
                  : "₹"}{" "}
                {payment?.payable_price}
              </strong>
            </span>
          </li>
        </ul>
      </div>
      <div className="cart-summary-button-group text-end mt--20">
        <Link
          className="edu-btn text-center"
          to="/my-profile"
        >
          My Profile
        </Link>
      </div>
    </div>
  </div>
  )
}
