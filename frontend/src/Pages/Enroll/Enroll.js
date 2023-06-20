import React, { useEffect, useState, useMemo, useContext } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-toastify";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import Select from "react-select";
import Captcha from "react-numeric-captcha";
import HeadingName from "../HeadingName/HeadingName";
import countryList from "react-select-country-list/country-list";
import CourseService from "../../Services/CourseService/CourseService";

export default function Enroll() {
  const [loaded, setLoaded] = useState(false);
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const options = useMemo(() => countryList().getData(), []);
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    position: "",
    mobile: "",
    city: "",
    country: [{ label: "", value: "" }],
    how_did_you_hear: "",
    message: "",
    payment_method: "",
  });
  const course = new CourseService();
  let params = useParams();
  params = params.id.split("&");
  const course_id = params[0];
  const batch_id = params[1];
  const inr_price = params[2];
  const courName = params[3];

  const stripePayment = async (values) => {
    let obj = {
      course_slug: course_id,
      batch_id: batch_id,
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      company: values.company,
      position: values.position,
      country: values.country.label,
      city: values.city,
      email: values.email,
      how_did_you_hear: values.how_did_you_hear,
      payment_method: values.payment_method,
      payment_gateway: "stripe",
      message: values.message,
      currency: localStorage.getItem("currency")
        ? localStorage.getItem("currency")
        : "INR",
    };
    if (values.payment_method === "pay_now") {
      obj["payable_price"] = inr_price;
    }
    try {
      let response = await course.enroll(obj);
      if (response) {
        localStorage.setItem("clientKey", response.data.key);
        localStorage.setItem("clientsecretkey", response.data.client_secret);
        localStorage.setItem("clientName", response.data.name);
        localStorage.setItem("type", "enroll");
        if (inr_price == 0) {
          toast.success(response.message);
          setTimeout(() => {
            navigate(`/course-details/${course_id}`);
          }, [1000]);
        } else {
          navigate("/enroll/stripe-payment");
        }

      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  let payment = {
    type: "enroll",
  };
  const onSubmit = async (values) => {
    let obj = {
      course_slug: course_id,
      batch_id: batch_id,
      name: values.name,
      email: values.email,
      mobile: values.mobile,
      company: values.company,
      position: values.position,
      country: values.country.label,
      city: values.city,
      email: values.email,
      how_did_you_hear: values.how_did_you_hear,
      payment_method: values.payment_method,
      payment_gateway: "razorpay",
      message: values.message,
      currency: localStorage.getItem("currency")
        ? localStorage.getItem("currency")
        : "INR",
    };
    if (values.payment_method === "pay_now") {
      obj["payable_price"] = inr_price;
    }

    if (values.payment_method === "pay_now") {
      if (typeof window.user?.data?.auth_token !== "undefined") {
        if (localStorage.getItem("currency") === "INR") {
          if (verify) {
            setLoaded(true);
            try {
              let response = await course.enroll(obj);
              if (response.status === "success") {
                setLoaded(false);
                if (inr_price == 0) {
                  toast.success(response.message);
                  setTimeout(() => {
                    navigate(`/course-details/${course_id}`);
                  }, [1000]);
                }
              }
              var options = {
                key: response.data.key,
                amount: response.data.payable_price,
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
                    course
                      .enrollPayment(activity)
                      .then((response) => {
                        if (response.status === "success")
                          payment["data"] = response.data;
                        localStorage.setItem(
                          "payment",
                          JSON.stringify(payment)
                        );
                        localStorage.setItem("type", "enroll");
                        setLoaded(false);
                        setTimeout(() => {
                          navigate("/ordersuccess");
                        }, [1000]);
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
      try {
        const response = await course.enroll(obj);
        if (response) {
          toast.success(response.message);
          setTimeout(() => {
            navigate(`/course-details/${course_id}`);
          }, [1000]);
        } else {
          toast.error(response.message);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const VoucherSchema = Yup.object().shape({
    company: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    how_did_you_hear: Yup.string().required("Required"),
    position: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required")
      .min(10, "too short")
      .max(10, "too long"),
    country: Yup.object()
      .shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
      .required("Required")
      .nullable(),
    city: Yup.string().required("Required"),
    payment_method: Yup.string().required("Required"),
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <HeadingName name="Enroll" home="Home" heading="Enroll" />

      <div className="edu-event-grid-area edu-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card-header">
                <h6 className="mb--0">
                  Enrollment for :{" "}
                  {capitalizeFirstLetter(params[0].replaceAll("-", " "))}
                </h6>
              </div>
              <div className="course-details-card">
                <Formik
                  initialValues={values}
                  validationSchema={VoucherSchema}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                >
                  {(props) => (
                    <form className="row" onSubmit={props.handleSubmit}>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="name">
                            Name <span className="text-danger"> *</span>
                          </label>
                          <input
                            name="name"
                            onChange={props.handleChange}
                            value={props.values.name}
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                          />
                          {props.touched.name && props.errors.name ? (
                            <div className="formik-errors bg-error">
                              {props.errors.name}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          {" "}
                          <label htmlFor="email">
                            Email<span className="text-danger"> *</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            onChange={props.handleChange}
                            value={props.values.email}
                            name="email"
                            placeholder="Enter email"
                          />
                          {props.touched.email && props.errors.email ? (
                            <div className="formik-errors bg-error">
                              {props.errors.email}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          {" "}
                          <label htmlFor="company">
                            Company<span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="company"
                            onChange={props.handleChange}
                            value={props.values.company}
                            placeholder="Enter company"
                          />
                          {props.touched.company && props.errors.company ? (
                            <div className="formik-errors bg-error">
                              {props.errors.company}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          {" "}
                          <label htmlFor="position">
                            Position<span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="position"
                            onChange={props.handleChange}
                            value={props.values.position}
                            placeholder="Enter position/title"
                          />
                          {props.touched.position && props.errors.position ? (
                            <div className="formik-errors bg-error">
                              {props.errors.position}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          {" "}
                          <label htmlFor="mobile">
                            Mobile<span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="mobile"
                            onChange={props.handleChange}
                            value={props.values.mobile}
                            placeholder="Enter mobile no"
                          />
                          {props.touched.mobile && props.errors.mobile ? (
                            <div className="formik-errors bg-error">
                              {props.errors.mobile}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="country">
                            Select Country
                            <span className="text-danger"> *</span>
                          </label>
                          <Select
                            options={options}
                            value={props.values.country}
                            name="country"
                            className="form-select"
                            onChange={(e) => {
                              props.setFieldValue("country", e);
                            }}
                            placeholder={".....Select Country"}
                          />
                          {props.touched.country && props.errors.country ? (
                            <div className="formik-errors bg-error">
                              {props.errors.country}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="city">
                            City<span className="text-danger"> *</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            onChange={props.handleChange}
                            value={props.values.city}
                            placeholder="Enter city"
                          />
                          {props.touched.city && props.errors.city ? (
                            <div className="formik-errors bg-error">
                              {props.errors.city}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="how_did_you_hear">
                            {" "}
                            How did you hear of us?
                            <span className="text-danger"> *</span>
                          </label>
                          <select
                            className="form-select"
                            onChange={props.handleChange}
                            value={props.values.how_did_you_hear}
                            name="how_did_you_hear"
                          >
                            <option value="" selected={false}>
                              How did you hear of us?
                            </option>
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                          </select>
                          {props.touched.how_did_you_hear &&
                            props.errors.how_did_you_hear ? (
                            <div className="formik-errors bg-error">
                              {props.errors.how_did_you_hear}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          {" "}
                          <label htmlFor="message">
                            {" "}
                            Message<span className="text-danger"> *</span>
                          </label>
                          <textarea
                            className="form-control"
                            onChange={props.handleChange}
                            value={props.values.message}
                            name="message"
                            placeholder="Message"
                          ></textarea>
                          {props.touched.message && props.errors.message ? (
                            <div className="formik-errors bg-error">
                              {props.errors.message}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-12 d-flex">
                        <div className="comment-form-consent input-box mb--20">
                          <input
                            id="radio-1"
                            type="radio"
                            value="pay_now"
                            onChange={props.handleChange}
                            checked={props.values.payment_method === "pay_now"}
                            name="payment_method"
                          />
                          <label htmlFor="radio-1">
                            Pay Now<span className="text-danger"> *</span>
                          </label>
                        </div>
                        <div className="comment-form-consent input-box mb--20 pl--30">
                          <input
                            id="radio-2"
                            type="radio"
                            name="payment_method"
                            value="pay_later"
                            onChange={props.handleChange}
                            checked={
                              props.values.payment_method === "pay_later"
                            }
                          />
                          <label htmlFor="radio-2">
                            Pay Later<span className="text-danger"> *</span>
                          </label>
                        </div>
                      </div>

                      {props.values.payment_method === "pay_now" && (
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="inr_price"
                              value={inr_price}
                              disabled
                            />
                          </div>
                        </div>
                      )}
                      {props.touched.payment_method &&
                        props.errors.payment_method ? (
                        <div className="formik-errors bg-error">
                          {props.errors.payment_method}
                        </div>
                      ) : null}
                      <div className="col-lg-6">
                        <Captcha onChange={(e) => setVerify(e)} />
                        <div className="formik-errors bg-error">{error}</div>
                      </div>
                      {loaded ? (
                        <div className="col-lg-12 text-center mt-1">
                          <strong className="me-2">Loading...</strong>
                          <div className="spinner-border text-warning"
                          ></div>
                        </div>
                      ) : (
                        <div className="col-lg-6 text-end">
                          <button
                            className="edu-btn"
                            name="submit"
                            type="submit"
                          >
                            {props.values.payment_method === "pay_now" ? (
                              <span>Pay Now</span>
                            ) : (
                              <span>Submit Now</span>
                            )}
                          </button>
                        </div>
                      )}
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LetUsHelp />
    </>
  );
}
