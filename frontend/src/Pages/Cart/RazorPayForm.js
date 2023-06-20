import React from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import CartService from "../../Services/CartService";

export default function RazorPayForm({
  value,
  percentage,
  setLoader,
  ValidateSchema,
  discountCouponAmt,
  ip,
  coupon,
  setOrderPaymentData,
  gettingCartItemslist,
  setItemInCart
}) {
  const navigate = useNavigate();
  const cartServe = new CartService();
  const onSubmit = async () => {
    if (percentage.amount == 0) {
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
          payment_gateway: "razorpay",
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
          payment_gateway: "razorpay",
          ip_address: ip,
        };
        if (coupon) {
          activity["coupon_code"] = coupon;
        }

        try {
          let response = await cartServe.placeOrder(activity);
          if (response.data.order_id) {
            var options = {
              key: response.data.key,
              amount: percentage.payable_price,
              currency: localStorage.getItem("currency")
                ? localStorage.getItem("currency")
                : "INR",
              description: response.data.description,
              image: response.data.image,
              order_id: response.data.order_id,
              handler: function (response) {
                let activity = {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                };
                setLoader(true);
                if (response) {
                  cartServe
                    .payment(activity)
                    .then((response) => {
                      if (response.status === "success")
                        localStorage.setItem(
                          "payment",
                          JSON.stringify(response.data)
                        );
                      setOrderPaymentData(response.data);
                      setLoader(false);
                      gettingCartItemslist();
                      setItemInCart(0);
                      navigate("/ordersuccess");
                    })
                    .catch((err) => {
                      throw err;
                    });
                }
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#3399cc",
              },
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
              alert(response.error.code);
              alert(response.error.description);
              alert(response.error.source);
              alert(response.error.step);
              alert(response.error.reason);
              alert(response.error.metadata.order_id);
              alert(response.error.metadata.payment_id);
            });
            rzp1.open();
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
      onSubmit={onSubmit}
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
                Terms & Conditions
              </Link>
            </label>
            {props.touched.terms && props.errors.terms ? (
              <div className="formik-errors bg-error">{props.errors.terms}</div>
            ) : null}
          </div>
          <div className="card-body cart-summary-button-group pt--0">
            <button className="edu-btn w-100 text-center" type="submit">
              Proceed To Checkout
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
