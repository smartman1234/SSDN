import React from 'react'
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CartService from "../../Services/CartService";

export default function TokenForm({inputvalue,gettingCartItemslist,setInputValue,setRemovedCoupon}) {
    const cartServe = new CartService();
    const navigate = useNavigate();
    const couponSchema = Yup.object().shape({
        coupon: Yup.string().required("Please enter coupon code"),
      });

      const SubmitHandle = async (value, { resetForm }) => {
        if (typeof window.user?.data?.auth_token !== "undefined") {
          sessionStorage.setItem("coupon", value.coupon);
          let activity = {
            coupon_code: value.coupon,
          };
    
          gettingCartItemslist();
          try {
            let response = await cartServe.gettingCartList(activity);
            if (response.coupon_status === "success") {
              setRemovedCoupon(true);
              toast.success(response.coupon_message);
              resetForm();
              setInputValue({
                coupon: "",
              });
            } else {
              toast.error(response.coupon_message);
            }
          } catch (err) {
            throw err;
          }
        } else {
          navigate("/login");
        }
      };
  return (
    <Formik
          initialValues={inputvalue}
          onSubmit={SubmitHandle}
          enableReinitialize={true}
          validationSchema={couponSchema}
        >
          {(props) => (
            <form method="POST" onSubmit={props.handleSubmit}>
              <div className="card-body coupon-code-btn w-100 pt--0 pb--0">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  name="coupon"
                  onChange={props.handleChange}
                  value={props.values.coupon}
                />
                {props.touched.coupon && props.errors.coupon ? (
                  <div className="card-body pt--0 pb--0 formik-errors bg-error">
                    {props.errors.coupon}
                  </div>
                ) : null}
                <button className="edu-btn btn-dark" type="submit">
                  Apply
                </button>
              </div>
            </form>
          )}
        </Formik>
  )
}
