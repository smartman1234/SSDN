import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2/lib/lib";
import "react-phone-input-2/lib/bootstrap.css";
import Captcha from "react-numeric-captcha";
import EventService from "../../../Services/EventService/EventService";

export default function WebinarRegister({ id }) {
  const serve = new EventService();
  const [verify, setVerify] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [ip, setIP] = useState("");
  const [value, setValue] = useState({
    name: "",
    email: "",
    mobile: "",
    code: "91",
    message: "",
    ip_address: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };
  const onSubmit = async (values, { resetForm }) => {
    let obj = {};

    obj["webinar_id"] = id;
    obj["name"] = values.name;
    obj["email"] = values.email;
    obj["country_code"] = values.code;
    obj["contact_number"] = values.mobile;
    obj["ip_address"] = ip;
    obj["comment"] = values.message;
    if (verify) {
      setError();
      setLoader(true);
      try {
        let response = await serve.webinarregister(obj);
        if (response.status === "success") {
          setLoader(false);
          resetForm();
          setValue({
            name: "",
            email: "",
            mobile: "",
            code: "",
            message: "",
            ip_address: "",
          });
          toast.success(response.message);
        } else {
          setLoader(false);
          toast.error(
            response.data.email || response.data.name || response.data.mobile
          );
          resetForm();
          setValue({
            name: "",
            email: "",
            mobile: "",
            ip_address: "",
            message: "",
          });
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

  return (
    <div className="col-md-5">
      <div className="form-ineer">
        <div className="card-body">
          <div className="content-left width-button-wrapper data-webinar-rap1">
            <h5 className="title data-base-heading">
               <LazyLoadImage
                src="https://d1jnx9ba8s6j9r.cloudfront.net/imgver.1666246386/img/elearningpop.svg"
                alt="Form Header Image"
                className="mr--10"
                height="100%"
                width="100%"
              />
              RESERVE YOUR SPOT NOW
            </h5>
          </div>
          <Formik
            initialValues={value}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validationSchema={ValidateSchema}
          >
            {(props) => (
              <div className="card-body">
                <form
                  className="row"
                  onSubmit={props.handleSubmit}
                  style={{ borderTop: "1px solid rgba(45, 40, 78, 0.07)" }}
                >
                  <div className="col-lg-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      onChange={props.handleChange}
                      value={props.values.name}
                      name="name"
                      placeholder="Enter name *"
                    />{" "}
                    {props.touched.email && props.errors.email ? (
                      <div className="formik-errors bg-error">
                        {props.errors.email}
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
                      placeholder="Enter email *"
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
                      name="mobile"
                      onChange={props.handleChange}
                      className="form-control"
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
                      placeholder="Message"
                      onChange={props.handleChange}
                      value={props.values.message}
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
                    {loader ? (
                      <div className="col-lg-12 text-center mt-1">
                      <strong className="me-2">Loading...</strong>
                      <div className="spinner-border text-warning"
                      ></div>
                  </div>
                    ) : (
                      <button
                        className="edu-btn"
                        name="submit"
                        type="submit"
                      >
                        Submit Now
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </Formik>
        </div>
      </div><ToastContainer />
    </div>
  );
}
