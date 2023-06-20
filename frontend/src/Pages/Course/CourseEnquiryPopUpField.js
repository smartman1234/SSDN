import React from "react";
import Captcha from "react-numeric-captcha";
import PhoneInput from "react-phone-input-2/lib/lib";
import "react-phone-input-2/lib/bootstrap.css";

export default function CourseEnquiryPopUpField({
  props,
  setVerify,
  error,
  loader,
  verify,
}) {
  return (
    <form className="row p-2" onSubmit={props.handleSubmit}>
      <div className="col-lg-6">
        <div className="form-group">
          <input
            name="name"
            onChange={props.handleChange}
            value={props.values.name}
            type="text"
            className="form-control"
            placeholder="Enter name*"
          />
          {props.touched.name && props.errors.name ? (
            <div className="formik-errors bg-error">{props.errors.name}</div>
          ) : null}
        </div>
      </div>
      <div className="col-lg-6">
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={props.handleChange}
            value={props.values.email}
            placeholder="Enter email*"
          />
          {props.touched.email && props.errors.email ? (
            <div className="formik-errors bg-error">{props.errors.email}</div>
          ) : null}
        </div>
      </div>
      <div className="col-lg-4">
        <div className="form-group">
          <PhoneInput
            className="form-selected me-3"
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
      </div>
      <div className="col-lg-8">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="mobile"
            onChange={props.handleChange}
            value={props.values.mobile}
            placeholder="Phone"
          />
          {props.touched.mobile && props.errors.mobile ? (
            <div className="formik-errors bg-error">{props.errors.mobile}</div>
          ) : null}
        </div>
      </div>
      <div className="col-lg-12">
        <div className="form-group">
          <textarea
            className="form-control"
            onChange={props.handleChange}
            value={props.values.message}
            name="message"
            placeholder="Message"
          ></textarea>
          {props.touched.message && props.errors.message ? (
            <div className="formik-errors bg-error">{props.errors.message}</div>
          ) : null}
        </div>
      </div>
      <div className="col-lg-12">
        <div className="form-group">
          <Captcha onChange={(e) => setVerify(e)} />
          <div className="formik-errors bg-error">{error}</div>
        </div>
      </div>
      {loader ? (
        <div className="col-lg-12 text-center mt-1">
        <strong className="me-2">Loading...</strong>
        <div className="spinner-border text-warning"
        ></div>
    </div>
      ) : (
        <div className="col-lg-12 text-center">
          <button
            className="edu-btn"
            name="submit"
            type="submit"
           
          >
            Submit Now
          </button>
        </div>
      )}
    </form>
  );
}
