import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import "react-phone-input-2/lib/bootstrap.css";
import Captcha from "react-numeric-captcha";
import EventService from "../../Services/EventService/EventService";
export default function RegisterEvent({ data }) {
  const navigate = useNavigate();
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");
  const serve = new EventService();
  const [ip, setIP] = useState("");
  const [value, setValue] = useState({
    name: "",
    email: "",
    mobile: "",
    ip_address: "",
    message: "",
    code: "91",
  });

  useEffect(() => {
    getData();

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };
  let payment = {
    type: "event",
  };
  const onSubmit = async (values, { resetForm }) => {
    let obj = {
      event_slug: data.slug,
      name: values.name,
      email: values.email,
      contact_number: values.mobile,
      comment_message: values.message,
      ip_address: ip,
      price_type: data.price_type,
      currency: data.currency,
      payment_gateway: "razorpay",
    };
    if (data.price_type === "paid") {
      obj["payable_price"] = data.payable_price;
    }
    if (data.price_type === "paid") {
      if (typeof window.user?.data?.auth_token !== "undefined") {
        if (localStorage.getItem("currency") === "INR") {
          if (verify) {
            try {
              let response = await serve.eventregister(obj);

              var options = {
                key: response.data.key,
                amount: data.payable_price,
                currency: localStorage.getItem("currency")
                  ? localStorage.getItem("currency")
                  : "INR",
                order_id: response.data.order_id,
                handler: function (response) {
                  let activity = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                  };

                  if (response) {
                    serve
                      .eventcallback(activity)
                      .then((response) => {
                        if (response.status === "success")
                          payment["data"] = response.data;
                        localStorage.setItem(
                          "payment",
                          JSON.stringify(payment)
                        );
                        localStorage.setItem("type", "event");
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
            } catch (err) {
              throw err;
            }
          } else {
            setError(" Please fill Recapcha correctly ");
          }
        } else {
          await stripePayment(values);
        }
      } else {
        navigate("/login");
      }
    } else {
      if (verify) {
        try {
          const response = await serve.eventregister(obj);
          if (response) {
            toast.success("Registration has been successfully");
            resetForm();
            setValue({
              name: "",
              email: "",
              mobile: "",
              ip_address: "",
              message: "",
              code: "91",
            });
          } else {
            toast.error(response.message);
          }
        } catch (err) {
          throw err;
        }
      } else {
        setError(" Please fill Recapcha correctly ");
      }
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    mobile: Yup.string()
      .matches(phoneRegExp, "mobile number is not valid")
      .required("Required")
      .min(10, "too short")
      .max(10, "too long"),
    message: Yup.string().required("Required"),
  });

  const stripePayment = async (values) => {
    let obj = {
      event_slug: data.slug,
      name: values.name,
      email: values.email,
      contact_number: values.mobile,
      comment_message: values.message,
      ip_address: ip,
      price_type: data.price_type,
      currency: data.currency,
      payment_gateway: "stripe",
    };
    if (data.price_type === "paid") {
      obj["payable_price"] = data.payable_price;
    }
    try {
      let response = await serve.eventregister(obj);
      if (response) {
        localStorage.setItem("clientKey", response.data.key);
        localStorage.setItem("clientsecretkey", response.data.client_secret);
        localStorage.setItem("clientName", response.data.name);
        localStorage.setItem("eventslug", data.slug);
        localStorage.setItem("type", "event");
        navigate("/event/stripe-payment");
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="col-lg-4">
      <div className="eduvibe-sidebar">
        <div className="eduvibe-widget eduvibe-widget-details">
          <h5 className="title">REGISTER</h5>
          <div className="widget-content">
            <Formik
              initialValues={value}
              onSubmit={onSubmit}
              enableReinitialize={true}
              validationSchema={ValidateSchema}
            >
              {(props) => (
                <form
                  className="row pt--20"
                  onSubmit={props.handleSubmit}
                  style={{ borderTop: "1px solid rgba(45, 40, 78, 0.07)" }}
                >
                  
                  <div className="form-group col-lg-12">
                      <input
                        name="name"
                        onChange={props.handleChange}
                        value={props.values.name}
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Name*"
                      />{" "}
                      {props.touched.name && props.errors.name ? (
                        <div className="formik-errors bg-error">
                          {props.errors.name}
                        </div>
                      ) : null}
                    </div>

                  
                    <div className="form-group col-lg-12">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        onChange={props.handleChange}
                        value={props.values.email}
                        name="email"
                        placeholder="Email*"
                      />{" "}
                      {props.touched.email && props.errors.email ? (
                        <div className="formik-errors bg-error">
                          {props.errors.email}
                        </div>
                      ) : null}
                  </div>

                  <div className="col-lg-4 col-6 form-group">
                      <PhoneInput
                        className="form-selected"
                        country={"in"}
                        enableSearch={true}
                        value={props.values.code}
                        onChange={(e) => {
                          props.setFieldValue("code", e);
                        }}
                      />
                      {props.touched.code && props.errors.code ? (
                        <div className="formik-errors bg-error">
                          {props.errors.code}
                        </div>
                      ) : null}
                  </div>
                  <div className="col-lg-8 col-6 form-group">
                      <input
                        type="text"
                        placeholder="Mobile"
                        className="form-control"
                        name="mobile"
                        onChange={props.handleChange}
                        value={props.values.mobile}
                      />
                      {props.touched.mobile && props.errors.mobile ? (
                        <div className="formik-errors bg-error">
                          {props.errors.mobile}
                        </div>
                      ) : null}
                    </div>
                  <div className="col-lg-12 form-group">
                      <textarea
                        className="form-control"
                        name="message"
                        onChange={props.handleChange}
                        value={props.values.message}
                        placeholder="Your Message"
                      ></textarea>{" "}
                      {props.touched.message && props.errors.message ? (
                        <div className="formik-errors bg-error">
                          {props.errors.message}
                        </div>
                      ) : null}
                    </div>
                  <div className="col-lg-12">
                  <Captcha onChange={(e) => setVerify(e)} />
                    <div className="formik-errors bg-error">{error}</div>
                  </div>

                  <div className="col-lg-12 mt-4">
                    <button
                      className="edu-btn w-100"
                      name="submit"
                      type="submit"
                    >
                      Register Now
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}
