import React from 'react'

export default function EnquiryFormFields({ props, loader }) {
  return (
    <form
      action="/blog/category/citrix/#wpcf7-f3366-o2"
      method="post"
      onSubmit={props.handleSubmit}
    >
      <div className="form-group">
        <p>
          <span
            className="wpcf7-form-control-wrap"
            data-name="your-name"
          >
            <input
              size="40"
              className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control"
              id="enquiry-search-name"
              aria-required="true"
              aria-invalid="false"
              placeholder="Enter name*"
              type="text"
              name="name"
              onChange={(event) => {
                props.setFieldValue("name", event.target.value);
              }}
              onBlur={props.handleBlur}
              value={props.values.name}
            />{" "}
            {props.touched.name && props.errors.name ? (
              <div className="formik-errors bg-error">
                {props.errors.name}
              </div>
            ) : null}
          </span>
        </p>
      </div>
      <div className="form-group">
        <p>
          <span
            className="wpcf7-form-control-wrap"
            data-name="your-email"
          >
            <input
              size="40"
              className="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email form-control"
              id="enquiry-search-email"
              aria-required="true"
              aria-invalid="false"
              placeholder="Enter email*"
              type="email"
              name="email"
              onChange={(event) => {
                props.setFieldValue("email", event.target.value);
              }}
              onBlur={props.handleBlur}
              value={props.values.email}
            />{" "}
            {props.touched.email && props.errors.email ? (
              <div className="formik-errors bg-error">
                {props.errors.email}
              </div>
            ) : null}
          </span>
        </p>
      </div>
      <div className="form-group">
        <p>
          <span
            className="wpcf7-form-control-wrap"
            data-name="your-phone"
          >
            <input
              className="wpcf7-form-control wpcf7-number wpcf7-validates-as-required wpcf7-validates-as-number form-control"
              id="enquiry-search-phone"
              aria-required="true"
              aria-invalid="false"
              placeholder="Enter contact no*"
              type="text"
              name="mobile"
              onChange={(event) => {
                props.setFieldValue("mobile", event.target.value);
              }}
              onBlur={props.handleBlur}
              value={props.values.mobile}
            />{" "}
            {props.touched.mobile && props.errors.mobile ? (
              <div className="formik-errors bg-error">
                {props.errors.mobile}
              </div>
            ) : null}
          </span>
        </p>
      </div>
      <div className="form-group">
        <p>
          <span
            className="wpcf7-form-control-wrap"
            data-name="your-course"
          >
            <input
              size="40"
              className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control"
              id="enquiry-search-course"
              aria-required="true"
              aria-invalid="false"
              placeholder="Enter course*"
              type="text"
              name="course"
              onChange={(event) => {
                props.setFieldValue("course", event.target.value);
              }}
              onBlur={props.handleBlur}
              value={props.values.course}
            />{" "}
            {props.touched.course && props.errors.course ? (
              <div className="formik-errors bg-error">
                {props.errors.course}
              </div>
            ) : null}
          </span>
        </p>
      </div>
      {loader ? (
        <div className="col-lg-12 text-center mt-1">
          <strong className="me-2">Loading...</strong>
          <div className="spinner-border text-warning"
          ></div>
        </div>
      ) : (
        <p>
          <button className="edu-btn w-100" type="submit">
            Submit
          </button>
          <span className="wpcf7-spinner"></span>
        </p>
      )}
    </form>
  )
}
