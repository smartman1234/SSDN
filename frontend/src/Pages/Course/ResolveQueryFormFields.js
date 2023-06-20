import React from "react";
import Captcha from "react-numeric-captcha";
import PhoneInput from "react-phone-input-2/lib/lib";
import "react-phone-input-2/lib/bootstrap.css";

export default function ResolveQueryFormFields({
  props,
  setVerify,
  error,
  loader,
}) {
  return (
    <form className="row p-4 pt-0" onSubmit={props.handleSubmit}>
      <div className="col-lg-12 d-flex position-relative">
        <div className="comment-form-consent input-box mb--10">
          <input
            id="radio-1"
            type="radio"
            name="enquiry_type"
            checked={props.values.enquiry_type === "individual"}
            onChange={props.handleChange}
            value="individual"
          />
          <label htmlFor="radio-1">Individual</label>
        </div>
        <div className="comment-form-consent input-box mb--10 pl--20">
          <input
            id="radio-2"
            type="radio"
            name="enquiry_type"
            onChange={props.handleChange}
            value="company"
            checked={props.values.enquiry_type === "company"}
          />
          <label htmlFor="radio-2">Company</label>
        </div>
        {props.touched.enquiry_type && props.errors.enquiry_type ? (
          <div className="formik-errors bg-error" style={{ bottom: "0px" }}>
            {props.errors.enquiry_type}
          </div>
        ) : null}
      </div>
      {props.values.enquiry_type === "company" ? (
        <>
          <div className="col-md-12 form-group">
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
          <div className="col-md-12 form-group">
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
          <div className="col-md-6 form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={props.handleChange}
              value={props.values.email}
              placeholder="Enter email"
            />
            {props.touched.email && props.errors.email ? (
              <div className="formik-errors bg-error">
                {props.errors.email}
              </div>
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
          <div className="col-lg-4 col-6 form-group">
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

          <div className="col-lg-8 col-6 form-group">
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
              <textarea
                className="form-control"
                onChange={props.handleChange}
                value={props.values.message}
                name="message"
                placeholder="Your Message"
                rows="1"
              />
              {props.touched.message && props.errors.message ? (
                <div className="formik-errors bg-error">
                  {props.errors.message}
                </div>
              ) : null}
            </div>
        </>
      ) : (
        <>
          <div className="col-lg-12 form-group">
              <input
                name="name"
                onChange={props.handleChange}
                value={props.values.name}
                type="text"
                className="form-control form-control-lg"
                placeholder="Name*"
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
                className="form-control form-control-lg"
                name="email"
                onChange={props.handleChange}
                value={props.values.email}
                placeholder="Email*"
              />
              {props.touched.email && props.errors.email ? (
                <div className="formik-errors bg-error">
                  {props.errors.email}
                </div>
              ) : null}
            </div>
          <div className="col-lg-4 col-6 form-group">
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
          <div className="col-lg-8 col-6 form-group">
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
        </>
      )}
      <div className="col-lg-12">
        <div className="form-group">
          <Captcha onChange={(e) => setVerify(e)} />
          <div className="formik-errors bg-error">{error}</div>
        </div></div>
      <div className="col-lg-12">
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
  );
}
