import React, { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import "react-phone-input-2/lib/bootstrap.css";
import CurrencyService from "../../Services/CurrencyService/CurrencyService";
import PaymentServices from "../../Services/PaymentService/PaymentService";

export default function OfflineAndOnlinePayment({ setloading, loading }) {
  const [ip, setIP] = useState("");
  const [currencyList, setCurrencyList] = useState([]);
  const ref = useRef();
  const currency = new CurrencyService();
  const serve = new PaymentServices();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [charges, setCharges] = useState(0);
  const [course, setCourse] = useState([]);
  const [amount, setAmount] = useState(0);
  const [transactioncharges, setTransactionCharges] = useState(0);
  const [values, setValues] = useState({
    candidate_id: "",
    candidate_name: "",
    email: "",
    course: "",
    mobile: "",
    amount: "",
    currency: "",
    extra_charges: "",
    gst: "",
    total_amount: "",
    terms: "",
  });

  const stripePayment = async (values) => {
    let obj = {
      candidate_id: values.candidate_id,
      name: values.candidate_name,
      email: values.email,
      contact_number: values.mobile,
      course_name: values.course,
      currency: values.currency,
      amount: values.amount,
      transaction_charge_amount: values.extra_charges,
      gst_amount: values.gst,
      payable_price: values.total_amount,
      payment_gateway: "stripe",
      ip_address: ip,
    };
    try {
      let response = await serve.paymentOrder(obj);
      if (response) {
        localStorage.setItem("clientKey", response.data.key);
        localStorage.setItem("clientsecretkey", response.data.client_secret);
        localStorage.setItem("clientName", response.data.name);
        localStorage.setItem("type", "ofline");
        navigate("/ofline/stripe-payment");
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
    type: "ofline",
  };
  const onSubmit = async (values) => {
    let obj = {
      candidate_id: values.candidate_id,
      name: values.candidate_name,
      email: values.email,
      contact_number: values.mobile,
      course_name: values.course,
      currency: values.currency,
      amount: values.amount,
      transaction_charge_amount: values.extra_charges,
      gst_amount: values.gst,
      payable_price: values.total_amount,
      payment_gateway: "razorpay",
      ip_address: ip,
    };
    setloading(true);
    if (values.currency === "INR") {
      try {
        let response = await serve.paymentOrder(obj);
        if (response.status === "success") {
          setloading(false);
          var options = {
            key: response.data?.key,
            amount: response.data?.payable_price,
            currency: response.data?.currency,
            order_id: response.data?.order_id,
            handler: function (response) {
              let activity = {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              };
              setloading(true);
              if (response) {
                serve
                  .razorpaycallback(activity)
                  .then((response) => {
                    if (response.status === "success") setloading(false);
                    localStorage.setItem(
                      "payment",
                      JSON.stringify(response.data)
                    );
                    setTimeout(() => {
                      navigate("/offline-payment");
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
        } else {
          setloading(false);
          toast.error(response.message);
        }
      } catch (err) {
        throw err;
      }
    } else {
      await stripePayment(values);
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const VoucherSchema = Yup.object().shape({
    candidate_name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    candidate_id: Yup.string().required("Required"),
    amount: Yup.string().required("Required"),
    course: Yup.mixed().required("Required"),
    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required")
      .min(10, "too short")
      .max(10, "too long"),
    terms: Yup.string().required("Required"),
  });

  useEffect(() => {
    getData();
    localStorage.getItem("currency");
    getCurrencyApi();
    getCourseList();
    if (values.course === "") {
      getCourseList();
    }
  }, []);
  const getCurrencyApi = async () => {
    try {
      let response = await currency.currency();
      if (response) {
        setCurrencyList(response.data);

        if (localStorage.getItem("currency") === null) {
          localStorage.setItem("currency", "INR");
        }
      }
    } catch (err) {
      throw err;
    }
  };
  const getCurrencyDetail = async (id, props) => {
    try {
      let response = await currency.detail(id);
      if (response) {
        setCharges(parseInt(response.data?.transaction_charge));
        props.setFieldValue(
          "extra_charges",
          percentage(amount, parseInt(response.data?.transaction_charge))
        );
        setTransactionCharges(
          percentage(amount, parseInt(response.data?.transaction_charge))
        );
        if (response.data?.currency === "INR") {
          props.setFieldValue(
            "total_amount",
            percentage(amount, 18) +
              amount +
              percentage(amount, parseInt(response.data?.transaction_charge))
          );
        } else {
          props.setFieldValue(
            "total_amount",
            amount +
              percentage(amount, parseInt(response.data?.transaction_charge))
          );
        }
      }
    } catch (err) {
      throw err;
    }
  };
  function percentage(num, per) {
    let number = (num / 100) * per;
    return Math.round(number);
  }
  const getCourseList = async () => {
    try {
      let response = await serve.courselist();
      if (response) {
        const arr = response.data.map((v, i) => {
          return { value: v.id, label: v.name };
        });
        setCourse(arr);

        if (localStorage.getItem("currency") === null) {
          localStorage.setItem("currency", "INR");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const handleNameClick = (value, props) => {
    props.setFieldValue("course", value.label);
    if (props.values.course === "") {
      getCourseList();
    }
    setCourse([]);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref?.current?.contains(event.target)) {
        setCourse([]);
      } else {
      }
    };
    document.addEventListener("click", handleClickOutside, true);
  }, [ref]);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };
  return (
    <div className="col-md-6">
      <div className="card mt-0">
        <div className="card-body">
          <Formik
            initialValues={values}
            validationSchema={VoucherSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="row payment">
                  <div className="col-lg-6 form-group">
                    <label>Candidate Id</label>
                    <input
                      type="text"
                      placeholder="Enter candidate ID *"
                      name="candidate_id"
                      onChange={props.handleChange}
                      value={props.values.candidate_id}
                    />
                    {props.touched.candidate_id && props.errors.candidate_id ? (
                      <div className="formik-errors bg-error data">
                        {props.errors.candidate_id}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-lg-6 form-group">
                    {" "}
                    <label>Candidate Name</label>
                    <input
                      type="text"
                      placeholder="Enter candidate name *"
                      name="candidate_name"
                      onChange={props.handleChange}
                      value={props.values.candidate_name}
                    />{" "}
                    {props.touched.candidate_name &&
                    props.errors.candidate_name ? (
                      <div className="formik-errors bg-error data">
                        {props.errors.candidate_name}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-lg-6 form-group">
                    {" "}
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      onChange={props.handleChange}
                      value={props.values.email}
                      name="email"
                      placeholder="Enter email *"
                    />{" "}
                    {props.touched.email && props.errors.email ? (
                      <div className="formik-errors bg-error data">
                        {props.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-lg-6 form-group">
                    <label>Course Name</label>
                    <input
                      type="text"
                      ref={ref}
                      className="form-select"
                      placeholder="Search course *"
                      value={props.values.course}
                      name="course"
                      onChange={(e) => {
                        props.setFieldValue("course", e.target.value);
                      }}
                    />
                    {props.touched.course && props.errors.course ? (
                      <div className="formik-errors bg-error data">
                        {props.errors.course}
                      </div>
                    ) : null}
                    <div
                      style={
                        props.values.course
                          ? {
                              overflow: "auto",
                              height: "204px",
                              position: "absolute",
                              backgroundColor: "var(--color-white)",
                              borderBottom: "1px solid #ced4da",
                              boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, .35)",
                            }
                          : {}
                      }
                    >
                      {" "}
                      {props.values.course?.length > 0 &&
                        course.map((v, i) => (
                          <div
                            className="pt-2 search-person"
                            key={i}
                            onClick={() => handleNameClick(v, props)}
                          >
                            {v.label}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="col-lg-4 col-6 form-group">
                    <label>Country Code</label>
                    <PhoneInput
                      className="form-select"
                      country={"in"}
                      enableSearch={true}
                      value={props.values.code}
                      onChange={(e) => {
                        props.setFieldValue("code", e);
                      }}
                    />
                    {props.touched.code && props.errors.code ? (
                      <div className="formik-errors bg-error data">
                        {props.errors.code}
                      </div>
                    ) : null}
                  </div>{" "}
                  <div className="col-lg-8 col-6 form-group">
                    {" "}
                    <label>Mobile</label>
                    <input
                      type="text"
                      placeholder="Enter mobile *"
                      name="mobile"
                      onChange={props.handleChange}
                      value={props.values.mobile}
                      className="form-control"
                    />
                    {props.touched.mobile && props.errors.mobile ? (
                      <div className="formik-errors bg-error data">
                        {props.errors.mobile}
                      </div>
                    ) : null}
                  </div>
                  {props.values.total_amount ? (
                    <div className="col-lg-6 form-group">
                      {" "}
                      <label>Currency</label>
                      <select
                        className="form-select"
                        name="currency"
                        value={props.values.currency}
                        onChange={(e) => {
                          props.setFieldValue("currency", e.target.value);
                          getCurrencyDetail(e.target.value, props);

                          if (e.target.value === "INR") {
                            props.setFieldValue("gst", percentage(amount, 18));
                          } else {
                            props.setFieldValue("gst", 0);
                          }
                        }}
                      >
                        <option value="" disabled>Select Currency</option>
                        {currencyList &&
                          currencyList.map((v, i) => (
                            <option key={i} value={v.currency}>
                              {v.currency}
                            </option>
                          ))}
                      </select>
                    </div>
                  ) : (
                    <div className="col-lg-6 form-group">
                      {" "}
                      <label>Currency</label>
                      <select
                        className="form-select"
                        name="currency"
                        disabled
                        value={props.values.currency}
                        onChange={(e) => {
                          props.setFieldValue("currency", e.target.value);
                          getCurrencyDetail(e.target.value, props);

                          if (e.target.value === "INR") {
                            props.setFieldValue("gst", percentage(amount, 18));
                          } else {
                            props.setFieldValue("gst", 0);
                          }
                        }}
                      >
                        <option value="" disabled>
                          Select Currency
                        </option>
                        {currencyList &&
                          currencyList.map((v, i) => (
                            <option key={i} value={v.currency}>
                              {v.currency}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                  <div className="col-lg-6 form-group">
                    <label>Amount</label>
                    <input
                      type="text"
                      placeholder="Enter amount *"
                      name="amount"
                      onChange={(e) => {
                        setAmount(parseInt(e.target.value));
                        props.setFieldValue("amount", e.target.value);
                        props.setFieldValue(
                          "extra_charges",
                          percentage(parseInt(e.target.value), charges)
                        );
                        if (props.values.currency === "INR") {
                          props.setFieldValue(
                            "gst",
                            percentage(parseInt(e.target.value), 18)
                          );
                        } else {
                          props.setFieldValue("gst", 0);
                        }
                        percentage(parseInt(e.target.value), 18, props);
                        if (props.values.currency === "INR") {
                          props.setFieldValue(
                            "total_amount",
                            percentage(parseInt(e.target.value), 18) +
                              parseInt(e.target.value) +
                              parseInt(
                                (e.target.value * parseInt(charges)) / 100
                              )
                          );
                        } else {
                          props.setFieldValue(
                            "total_amount",
                            parseInt(e.target.value) +
                              (parseInt(e.target.value) * parseInt(charges)) /
                                100
                          );
                        }
                      }}
                      value={props.values.amount}
                    />
                    {props.touched.amount && props.errors.amount ? (
                      <div className="formik-errors bg-error data">
                        {props.errors.amount}
                      </div>
                    ) : null}
                  </div>{" "}
                  <div className="col-lg-6 form-group">
                    {" "}
                    <label>Transaction Charges</label>
                    <input
                      type="text"
                      placeholder="Enter transaction charges"
                      name="extra_charges"
                      value={props.values.extra_charges}
                    />{" "}
                    {props.touched.extra_charges &&
                    props.errors.extra_charges ? (
                      <div className="formik-errors bg-error data">
                        {props.errors.extra_charges}
                      </div>
                    ) : null}
                  </div>
                  {props.values.currency === "INR" && props.values.amount && (
                    <div className="col-lg-6 form-group">
                      {" "}
                      <label>GST</label>
                      <input
                        type="text"
                        placeholder="Enter (GST) *"
                        name="gst"
                        readOnly
                        onChange={props.handleChange}
                        value={props.values.gst}
                      />{" "}
                      {props.touched.gst && props.errors.gst ? (
                        <div className="formik-errors bg-error data">
                          {props.errors.gst}
                        </div>
                      ) : null}
                    </div>
                  )}
                  <div className="col-lg-6 form-group">
                    {" "}
                    <label>Total Account</label>
                    <input
                      type="text"
                      placeholder="Enter total amount"
                      name="total_amount"
                      value={props.values.total_amount}
                    />
                    {props.touched.total_amount && props.errors.total_amount ? (
                      <div className="formik-errors bg-error data">
                        {props.errors.total_amount}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      onChange={(e) => {
                        if (e.target.checked) {
                          props.setFieldValue("terms", e.target.value);
                        } else {
                          props.setFieldValue("terms", "");
                        }
                      }}
                     
                    />
                    <label htmlFor="terms">
                      Accept{" "}
                      <Link to="/term-conditions">
                        Terms &amp; Conditions
                      </Link>
                    </label>{" "}
                    {props.touched.terms && props.errors.terms ? (
                      <div className="formik-errors bg-error data">
                        {props.errors.terms}
                      </div>
                    ) : null}
                  </div>
                  {loading ? (
                    <div className="col-lg-12 text-center mt-1">
                    <strong className="me-2">Loading...</strong>
                    <div className="spinner-border text-warning"
                    ></div>
                </div>
                  ) : (
                    <div className="col-lg-6 text-end">
                      <button className="edu-btn" type="submit">
                        Pay Now
                      </button>
                    </div>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
