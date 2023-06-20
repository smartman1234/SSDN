import React from "react";
import Captcha from "react-numeric-captcha";
import PhoneInput from "react-phone-input-2/lib/lib";
import "react-phone-input-2/lib/bootstrap.css";

export default function DownloadFormFields({
  props,
  setVerify,
  error,
  loader,
}) {
  return (
    <form className="login-form" onSubmit={props.handleSubmit}>
      <div className="col-lg-12 form-group">
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            onChange={props.handleChange}
            value={props.values.first_name}
          />
          {props.touched.first_name && props.errors.first_name ? (
            <div className="formik-errors bg-error">
              {props.errors.first_name}
            </div>
          ) : null}
        </div>
      <div className="col-lg-12 form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={props.handleChange}
            value={props.values.email}
          />
          {props.touched.email && props.errors.email ? (
            <div className="formik-errors bg-error">{props.errors.email}</div>
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
              <div className="formik-errors bg-error">{props.errors.code}</div>
            ) : null}
          </div>
        <div className="col-lg-8 col-6 form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Mobile"
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
            placeholder="Message"
            onChange={props.handleChange}
            value={props.values.message}
          />
          {props.touched.message && props.errors.message ? (
            <div className="formik-errors bg-error">{props.errors.message}</div>
          ) : null}
        </div>
      <div className="col-lg-12">
        <Captcha onChange={(e) => setVerify(e)} />
        <div className="formik-errors bg-error">{error}</div>
      </div>
        {loader ? (
          <div className="col-lg-12 text-center mt-1">
          <strong className="me-2">Loading...</strong>
          <div className="spinner-border text-warning"
          ></div>
      </div>
        ) : (
          <button
            className="edu-btn"
            type="submit"
            id="downloadBtn"
            value="download"
          >
            Submit Now
          </button>
        )}
    </form>
  );
}
