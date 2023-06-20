import React from "react";

export default function cartTable({
  percentage,
  removedCoupon,
  successCoupon,discountCouponAmt
}) {
  return (
    <div className="card-body cart-summary-wrap">
      <h4 className="title">PRICE DETAILS</h4>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Total MRP</th>
            <td>
              {localStorage.getItem("symbol")
                ? localStorage.getItem("symbol")
                : "₹"}
              {percentage.mrp}
            </td>
          </tr>
          <tr>
            <th className="without-minus">Discount on MRP</th>

            <td className="without-minus">
              {" "}
              {localStorage.getItem("symbol")
                ? localStorage.getItem("symbol")
                : "₹"}{" "}
              {percentage.discount_on_mrp}{" "}
            </td>
          </tr>

          {removedCoupon && successCoupon === "success" ? (
            <tr>
              <th className="without-minus">Coupon Discount</th>

              <td className="without-minus">
                {localStorage.getItem("symbol")
                  ? localStorage.getItem("symbol")
                  : "₹"}{" "}
                {discountCouponAmt}
              </td>
            </tr>
          ) : (
            ""
          )}
          <tr>
            <th>Sub Total</th>
            <td>
              {localStorage.getItem("symbol")
                ? localStorage.getItem("symbol")
                : "₹"}{" "}
              {percentage.amount}{" "}
            </td>
          </tr>
          {localStorage.getItem("currency") === "INR" ? (
            <tr>
              <th>
                GST ({percentage.gst}
                %)
              </th>
              <td>
                {localStorage.getItem("symbol")
                  ? localStorage.getItem("symbol")
                  : "₹"}{" "}
                {percentage.gst_amount}{" "}
              </td>
            </tr>
          ) : null}

          <tr>
            <th>Other Charges ({percentage.transaction_charge} %)</th>
            <td>
              {" "}
              {localStorage.getItem("symbol")
                ? localStorage.getItem("symbol")
                : "₹"}{" "}
              {percentage.transaction_charge_amount}
            </td>
          </tr>

          <tr>
            <th style={{ fontWeight: 600 }}>Grand Total</th>
            <td style={{ fontWeight: 600 }}>
              {localStorage.getItem("symbol")
                ? localStorage.getItem("symbol")
                : "₹"}{" "}
              {percentage.payable_price}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
