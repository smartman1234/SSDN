import React from "react";
import Captcha from "react-numeric-captcha";
import PhoneInput from "react-phone-input-2/lib/lib";
import "react-phone-input-2/lib/bootstrap.css";

export default function EnqueryNowFormFields({
  props,
  loader,
  error,
  setVerify,
}) {
  return (
    <form className="login-form_id row" onSubmit={props.handleSubmit}>
      <div className="col-lg-12 d-flex position-relative">
        <div className="comment-form-consent input-box mb--10">
          <input
            id="enquiry_join_individual"
            type="radio"
            name="enquiry_type"
            onChange={props.handleChange}
            value="individual"
          />
          <label htmlFor="enquiry_join_individual">Individual</label>
        </div>
        <div className="comment-form-consent input-box mb--10 pl--30">
          <input
            id="enquiry_type_company"
            type="radio"
            name="enquiry_type"
            onChange={props.handleChange}
            value="company"
          />
          <label htmlFor="enquiry_type_company">Company</label>
        </div>

        {props.touched.enquiry_type && props.errors.enquiry_type ? (
          <div className="formik-errors bg-error" style={{ bottom: "0px" }}>
            {props.errors.enquiry_type}
          </div>
        ) : null}
      </div>
      {props.values.enquiry_type === "company" ? (
        <>
          <div className="col-lg-6 form-group">
            <input
              type="text"
              className="form-control"
              name="company_name"
              onChange={props.handleChange}
              value={props.values.company_name}
              placeholder="Enter company name"
            />
            {props.touched.company_name && props.errors.company_name ? (
              <div className="formik-errors bg-error">
                {props.errors.company_name}
              </div>
            ) : null}
          </div>

          <div className="col-md-6 form-group">
            <input
              type="text"
              className="form-control"
              name="first_name"
              onChange={props.handleChange}
              value={props.values.first_name}
              placeholder="Contact person name"
            />
            {props.touched.first_name && props.errors.first_name ? (
              <div className="formik-errors bg-error">
                {props.errors.first_name}
              </div>
            ) : null}
          </div>
          <div className="col-md-6 form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={props.handleChange}
              value={props.values.email}
              placeholder="Contact person email"
            />
            {props.touched.email && props.errors.email ? (
              <div className="formik-errors bg-error">{props.errors.email}</div>
            ) : null}
          </div>
          <div className="col-md-6 form-group">
            <input
              type="text"
              className="form-control"
              onChange={props.handleChange}
              name="attendees"
              value={props.values.attendees}
              placeholder="No of employee"
            />
            {props.touched.attendees && props.errors.attendees ? (
              <div className="formik-errors bg-error">
                {props.errors.attendees}
              </div>
            ) : null}
          </div>
          <div className="col-lg-4 form-group">
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
          <div className="col-lg-8 form-group">
            <input
              type="text"
              placeholder="Mobile"
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
          </div>
          <div className="col-lg-12 form-group">
            <textarea
              className="form-control"
              name="message"
              rows="1"
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
          <div className="col-lg-12 form-group">
            <Captcha onChange={(e) => setVerify(e)} />
            <div className="formik-errors bg-error">{error}</div>
          </div>
        </>
      ) : (
        <>
          <div className="col-lg-6 form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
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
          <div className="col-lg-6 form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email ID"
              name="email"
              onChange={props.handleChange}
              value={props.values.email}
            />
            {props.touched.email && props.errors.email ? (
              <div className="formik-errors bg-error">{props.errors.email}</div>
            ) : null}
          </div>
          <div className="col-lg-4 form-group">
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
          <div className="col-lg-8 form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter mobile no"
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
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter course / voucher / assessment name"
              onChange={props.handleChange}
              value={props.values.name}
            />
            {props.touched.name && props.errors.name ? (
              <div className="formik-errors bg-error">{props.errors.name}</div>
            ) : null}
          </div>
          <div className="col-lg-12 form-group">
            <textarea
              className="form-control"
              name="message"
              rows="1"
              placeholder="Enter message"
              onChange={props.handleChange}
              value={props.values.message}
            />
            {props.touched.message && props.errors.message ? (
              <div className="formik-errors bg-error">
                {props.errors.message}
              </div>
            ) : null}
          </div>
          <div className="col-lg-12 form-group">
            <Captcha onChange={(e) => setVerify(e)} />
            <div className="formik-errors bg-error">{error}</div>
          </div>
        </>
      )}

      {loader ? (
        <div className="col-lg-12 text-center mt-1">
          <strong className="me-2">Loading...</strong>
          <div className="spinner-border text-warning"></div>
        </div>
      ) : (
        <button className="edu-btn" type="submit">
          Submit Now
        </button>
      )}
    </form>
  );
}
