import React from "react";
import Captcha from "react-numeric-captcha";

export default function QueryFormField({
  props,
  setVerify,
  nameErrorhandle,
  error,
  loader,
}) {
  return (
    <div className="card-body">
      <form className="row" onSubmit={props.handleSubmit}>
        <div className="col-lg-6 form-group">
            <input
              name="name"
              type="text"
              onChange={props.handleChange}
              value={props.values.name}
              onBlur={(e) => nameErrorhandle(e)}
              onKeyUp={(e) => nameErrorhandle(e)}
              className="form-control form-control-lg"
              placeholder="Name*"
            />
            {props.touched.name && props.errors.name ? (
              <div className="formik-errors bg-error">{props.errors.name}</div>
            ) : null}
          </div>

        <div className="col-lg-6 form-group">
            <input
              type="text"
              onChange={props.handleChange}
              value={props.values.email}
              className="form-control form-control-lg"
              name="email"
              placeholder="Email*"
            />
            {props.touched.email && props.errors.email ? (
              <div className="formik-errors bg-error">{props.errors.email}</div>
            ) : null}
          </div>

        <div className="col-lg-12 form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              name="mobile"
              onChange={props.handleChange}
              value={props.values.mobile}
              placeholder="Phone*"
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
              placeholder="Your Message*"
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
        <div className="col-lg-12 mt-4">
          {loader ? (
            <div className="d-flex align-items-center">
              <strong>Loading...</strong>
              <div
                className="spinner-border ml-auto text-warning"
              ></div>
            </div>
          ) : (
            <button className="edu-btn w-100" type="submit">
              Submit Now
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
