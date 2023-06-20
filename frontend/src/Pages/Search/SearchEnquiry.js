import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2/lib/lib";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-phone-input-2/lib/bootstrap.css";
import Captcha from "react-numeric-captcha";
import PaymentServices from "../../Services/PaymentService/PaymentService";

export default function SearchEnquiry() {
  const serve = new PaymentServices();
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [ip, setIP] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    course: "",
    mobile: "",
    ip_address: "",
    message: "",
    country_code: "91",
    enquiry_type: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };
  const onSubmit = async (values) => {
    let obj = {
      country_code: values.country_code,
      course_voucher_assessment: values.course,
      name: values.name,
      mobile: values.mobile,
      country_code: values.country_code,
      email: values.email,
      enquiry_type: "individual",
      message: values.message,
      ip_address: ip,
    };
    if (values.enquiry_type === "company") {
      obj["company_name"] = values.company_name;
      obj["attendees"] = values.attendees;
    }
    if (verify) {
      setError();
      setLoader(true);
      try {
        const response = await serve.enquiry(obj);
        if (response) {
          setLoader(false);
          toast.success(response.message);

          setValues({
            name: "",
            email: "",
            mobile: "",
            ip_address: "",
            message: "",
            course: "",
            country_code: "91",
          });
        } else {
          setLoader(false);
          toast.error(response.message);
        }
      } catch (err) {
        throw err;
      }
    } else {
      setError(" Please fill Recapcha correctly ");
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const VoucherSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    course: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required")
      .min(10, "too short")
      .max(10, "too long"),
    country_code: Yup.string().required("Required"),
  });
  return (
    <div className="inner">
      <h5 className="widget-title">Enquiry Now</h5>
      <div className="content">
        {" "}
        <Formik
          initialValues={values}
          validationSchema={VoucherSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(props) => (
            <form className="pt-0" onSubmit={props.handleSubmit}>
              <div className="row">
                <div className="col-lg-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={props.handleChange}
                      value={props.values.name}
                      placeholder="Contact person name"
                    />
                    {props.touched.name && props.errors.name ? (
                      <div className="formik-errors bg-error">
                        {props.errors.name}
                      </div>
                    ) : null}
                  </div>
                <div className="col-lg-12 form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={props.handleChange}
                      value={props.values.email}
                      placeholder="Contact person email"
                    />
                    {props.touched.email && props.errors.email ? (
                      <div className="formik-errors bg-error">
                        {props.errors.email}
                      </div>
                    ) : null}
                  </div>
                <div className="col-lg-5 col-6 form-group">
                    <PhoneInput
                      className="form-select me-3"
                      country={"in"}
                      enableSearch={true}
                      value={props.values.country_code}
                      onChange={(e) => {
                        props.setFieldValue("country_code", e);
                      }}
                    />
                    {props.touched.country_code && props.errors.country_code ? (
                      <div className="formik-errors bg-error">
                        {props.errors.country_code}
                      </div>
                    ) : null}
                  </div>
                <div className="col-lg-7 col-6 form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="mobile"
                      onChange={props.handleChange}
                      value={props.values.mobile}
                      placeholder="Phone"
                    />
                    {props.touched.mobile && props.errors.mobile ? (
                      <div className="formik-errors bg-error">
                        {props.errors.mobile}
                      </div>
                    ) : null}
                  </div>
                <div className="col-md-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="course"
                      onChange={props.handleChange}
                      value={props.values.course}
                      placeholder="Enter course name"
                    />
                    {props.touched.course && props.errors.course ? (
                      <div className="formik-errors bg-error">
                        {props.errors.course}
                      </div>
                    ) : null}
                  </div>
                <div className="col-lg-12 form-group">
                    <textarea
                      className="form-control"
                      onChange={props.handleChange}
                      value={props.values.message}
                      name="message"
                      placeholder="Your Message"
                    />
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
                <div className="col-lg-12 text-center mt-4">
                  {" "}
                  {loader ? (
                    <div className="col-lg-12 text-center mt-1">
                    <strong className="me-2">Loading...</strong>
                    <div className="spinner-border text-warning"
                    ></div>
                </div>
                  ) : (
                    <button className="edu-btn" type="submit">
                      Submit Now
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </Formik>{" "}
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}
