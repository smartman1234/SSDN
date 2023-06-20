import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateContact({ active, setActive, getProfileData }) {
  const [contact, setContact] = useState({ mobile: "" });
  const [value, setValue] = useState({ mobile: "", otp: "" });
  const [success, setSuccess] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const mobileSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
  });
  const otpSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
  });
  const onSubmit = (values) => {
    setValue({ ...value, mobile: values.mobile });
    const formdata = new FormData();
    formdata.set("mobile", values.mobile);
    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    axios
      .post(
        process.env.REACT_APP_API_BASEURL + "user/update-contact-number",
        formdata,
        config
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data?.message);
          setSuccess(true);
        } else {
          toast.error(res?.data?.data?.mobile);
        }
      });
  };
  const otpSubmit = (values) => {
    const formdata = new FormData();
    formdata.set("mobile", values.mobile);
    formdata.set("verification_token", values.otp);
    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    axios
      .post(
        process.env.REACT_APP_API_BASEURL + "user/verify-contact-number-otp",
        formdata,
        config
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data?.message);
          setSuccess(true);
          setActive(false);
          getProfileData();
        } else {
          toast.error(res?.data?.data?.mobile);
          setActive(false);
        }
      });
  };
  return (
    <div
      className={active ? "modal fade show" : "modal fade"}
      style={active ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <button
            type="button"
            className="btn-close"
            onClick={() => setActive(false)}
            style={{
              position: "absolute",
              right: "30px",
              top: "15px",
            }}
          ></button>
          <div className="edu-section-gap bg-color-white ssdn-data-section">
            <div className="container eduvibe-animated-shape">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center">
                    <h3 className="title mb-0">
                      <span className="down-mark-line">
                        Update Contact Number
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
              {success ? (
                <div className="card-body">
                  <Formik
                    initialValues={value}
                    onSubmit={otpSubmit}
                    enableReinitialize={true}
                    validationSchema={otpSchema}
                  >
                    {(props) => (
                      <form
                        className="login-form_id"
                        onSubmit={props.handleSubmit}
                      >
                        <div className="form-group">
                          <label>Mobile No.</label>
                          <input
                            type="text"
                            placeholder="Mobile no."
                            name="mobile"
                            autoComplete="false"
                            className="form-control"
                            onChange={props.handleChange}
                            value={props.values.mobile}
                          />
                          {props.touched.mobile && props.errors.mobile ? (
                            <div className="formik-errors bg-error">
                              {props.errors.mobile}
                            </div>
                          ) : null}
                        </div>{" "}
                        <div className="col-lg-12 text-center">
                          <p className="mb--0">Please enter the OTP sent to</p>
                          <p>
                            {props.values.mobile}
                            <i className="ri-pencil-fill text-primary"></i>
                          </p>
                        </div>
                        <div className="col-lg-4"></div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="otp"
                              autoComplete="false"
                              onChange={props.handleChange}
                              value={props.values.otp}
                              placeholder="Enter otp"
                            />
                            {props.touched.otp && props.errors.otp ? (
                              <div className="formik-errors bg-error">
                                {props.errors.otp}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-lg-4"></div>
                        <div className="col-lg-12 text-center">
                          <button
                            className="edu-btn"
                            name="submit"
                            type="submit"
                          >
                            <span>Update Now</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              ) : (
                <div className="card-body">
                  <Formik
                    initialValues={contact}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                    validationSchema={mobileSchema}
                  >
                    {(props) => (
                      <form
                        className="login-form_id"
                        onSubmit={props.handleSubmit}
                      >
                        <div className="form-group">
                          <label>Mobile No.</label>
                          <input
                            type="text"
                            placeholder="Mobile no."
                            name="mobile"
                            className="form-control"
                            onChange={props.handleChange}
                            value={props.values.mobile}
                          />
                          {props.touched.mobile && props.errors.mobile ? (
                            <div className="formik-errors bg-error">
                              {props.errors.mobile}
                            </div>
                          ) : null}
                        </div>{" "}
                        <div className="col-lg-4"></div>
                        <div className="col-lg-12 text-center">
                          <button
                            className="edu-btn"
                            name="submit"
                            type="submit"
                          >
                            <span>Verify Now</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}
