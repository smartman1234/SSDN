import React from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import CartService from "../../Services/CartService";

export default function StripeForm({
  value,
  percentage,
  setLoader,
  ValidateSchema,
  discountCouponAmt,
  ip,
  coupon,
  setOrderPaymentData,
  gettingCartItemslist,
  setItemInCart,
  setPaymentLoading,isPaymentLoading
}) {
  const navigate = useNavigate();

  const cartServe = new CartService();

  const stripePayment = async (e) => {
    setLoader(true);
    if (percentage.amount == 0) {
      if (typeof window.user?.data?.auth_token !== "undefined") {
        navigate("");
        let activity = {
          amount: percentage.amount,
          currency: localStorage.getItem("currency")
            ? localStorage.getItem("currency")
            : "INR",
          mrp: percentage.mrp,
          coupon_discount: coupon ? discountCouponAmt : 0,
          discount_on_mrp: percentage.discount_on_mrp,
          gst_amount: percentage.gst_amount,
          payable_price: percentage.payable_price,
          transaction_charge_amount: percentage.transaction_charge_amount,
          payment_gateway: "stripe",
          ip_address: ip,
        };
        if (coupon) {
          activity["coupon_code"] = coupon;
        }

        try {
          setLoader(true);
          let response = await cartServe.placeOrder(activity);
          if (response) {
            setOrderPaymentData(response.data);
            setLoader(false);
            gettingCartItemslist();
            setItemInCart(0);
            navigate("/ordersuccess");
          } else {
          }
        } catch (err) {
          throw err;
        }
      } else {
        navigate("/login");
      }
    } else {
      if (typeof window.user?.data?.auth_token !== "undefined") {
        let activity = {
          amount: percentage.amount,
          currency: localStorage.getItem("currency")
            ? localStorage.getItem("currency")
            : "INR",
          mrp: percentage.mrp,
          coupon_discount: coupon ? discountCouponAmt : 0,
          discount_on_mrp: percentage.discount_on_mrp,
          gst_amount: percentage.gst_amount,
          payable_price: percentage.payable_price,
          transaction_charge_amount: percentage.transaction_charge_amount,
          payment_gateway: "stripe",
          ip_address: ip,
        };
        if (coupon) {
          activity["coupon_code"] = coupon;
        }

        try {
          setLoader(true);
          let response = await cartServe.placeOrder(activity);
          if (response) {
            setPaymentLoading(false);

            localStorage.setItem("clientKey", response.data.key);
            localStorage.setItem(
              "clientsecretkey",
              response.data.client_secret
            );
            localStorage.setItem("clientName", response.data.name);
            localStorage.setItem("type", "both");
            navigate("/stripe-payment");
            setLoader(false);
          }
        } catch (err) {
          throw err;
        }
      } else {
        navigate("/login");
      }
    }
  };

  return (
    <Formik
      initialValues={value}
      onSubmit={stripePayment}
      enableReinitialize={true}
      validationSchema={ValidateSchema}
    >
      {(props) => (
        <form method="POST" onSubmit={props.handleSubmit}>
          <div className="card-body cart-summary-button-group">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              onChange={(e) => {
                props?.setFieldValue(
                  "terms",
                  e.target.checked ? e.target.value : ""
                );
              }}
            />
            <label htmlFor="terms">
              Accept{" "}
              <Link to="/term-conditions">
                {" "}
                Terms & Conditions{" "}
              </Link>
            </label>
            {props.touched.terms && props.errors.terms ? (
              <div className="formik-errors bg-error">{props.errors.terms}</div>
            ) : null}
          </div>

          <div className="card-body cart-summary-button-group pt--0">
            {isPaymentLoading ? (
              "Loading..."
            ) : (
              <button className="edu-btn w-100 text-center" type="submit">
                Proceed To Checkout
              </button>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
}
