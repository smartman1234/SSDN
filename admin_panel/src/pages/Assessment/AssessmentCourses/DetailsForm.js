import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";

function DetailsForm({ onSubmit, metaForm, metaBackBtn, initialValues }) {
  const [show, setShow] = useState(0);

  const MetaSchema = Yup.object().shape({
    level: Yup.string().required("Required"),
    duration: Yup.number().required("Required"),
    number_of_question: Yup.number().required("Required"),
    total_marks: Yup.number().required("Required").typeError("invalid number."),
    passing_marks: Yup.number().required("Required"),
    is_re_attempt: Yup.number().required("Required").nullable(),
    is_certificate: Yup.number().required("Required").nullable(),
    certificate_name: Yup.string()
      .when("is_certificate", {
        is: (is_certificate) => is_certificate === 1,
        then: Yup.string().required("Required"),
      })
      .nullable(),
    result_declaration: Yup.string().required("Required"),
  });

  const CertificateName = () => {
    setShow(1);
  };
  const removeCertificate = () => {
    setShow(0);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={MetaSchema}
    >
      {(props) => (
        <form className="" onSubmit={props.handleSubmit}>
          {metaForm && (
            <>
              <div className="tab" style={metaForm && { display: "block" }}>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="contact">
                      Level <span className="text-danger">*</span>
                    </label>
                    <select
                      name="level"
                      onChange={(e) => {
                        props.setFieldValue("level", e.target.value);
                      }}
                      value={props.values.level}
                      className="form-select digits"
                    >
                      <option value="0">Select level</option>
                      <option value="beginner">Beginner</option>
                      <option value="associate">Associate</option>
                      <option value="professional">Professional</option>
                      <option value="expert">Expert</option>
                      <option value="advance">Advance</option>
                    </select>
                    {props.touched.level && props.errors.level ? (
                      <div className="formik-errors bg-error">
                        {props.errors.level}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="control-label">
                      Duration (in minutes)
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control digits"
                      placeholder="Duration (in minutes)"
                      type="text"
                      name="duration"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.duration}
                    />
                    {props.touched.duration && props.errors.duration ? (
                      <div className="formik-errors bg-error">
                        {props.errors.duration}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="control-label">
                      Question Number Asked
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control digits"
                      placeholder="Question number asked"
                      type="text"
                      name="number_of_question"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.number_of_question}
                    />
                    {props.touched.number_of_question &&
                    props.errors.number_of_question ? (
                      <div className="formik-errors bg-error">
                        {props.errors.number_of_question}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="exampleFormControlInput1">
                      Total marks <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control digits"
                      type="text"
                      name="total_marks"
                      placeholder="Total marks"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.total_marks}
                    />
                    {props.touched.total_marks && props.errors.total_marks ? (
                      <div className="formik-errors bg-error">
                        {props.errors.total_marks}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="control-label">
                      Passing Marks (%)<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control digits"
                      placeholder="Passing marks"
                      type="text"
                      name="passing_marks"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.passing_marks}
                    />
                    {props.touched.passing_marks &&
                    props.errors.passing_marks ? (
                      <div className="formik-errors bg-error">
                        {props.errors.passing_marks}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="control-label">
                      Re-Attempts <span className="text-danger">*</span>
                    </label>
                    <div className="col">
                      <div className="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                        <div className="radio radio-primary">
                          <input
                            id="attempt"
                            type="radio"
                            name="is_re_attempt"
                            value="1"
                            checked={props.values.is_re_attempt === "1"}
                            onChange={props.handleChange}
                          />
                          <label className="mb-0" htmlFor="attempt">
                            Yes
                          </label>
                        </div>
                        <div className="radio radio-primary">
                          <input
                            id="attempt1"
                            type="radio"
                            name="is_re_attempt"
                            value="0"
                            checked={props.values.is_re_attempt === "0"}
                            onChange={props.handleChange}
                          />
                          <label className="mb-0" htmlFor="attempt1">
                            No
                          </label>
                        </div>
                      </div>
                      {props.touched.is_re_attempt &&
                      props.errors.is_re_attempt ? (
                        <div className="formik-errors bg-error">
                          {props.errors.is_re_attempt}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label className="control-label">
                      Required Certificate
                      <span className="text-danger">*</span>
                    </label>
                    <div className="col">
                      <div className="form-group m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                        <div className="radio radio-primary">
                          <input
                            id="certificate"
                            type="radio"
                            name="is_certificate"
                            value="1"
                            checked={props.values.is_certificate === "1"}
                            onChange={props.handleChange}
                            onClick={CertificateName}
                          />
                          <label className="mb-0" htmlFor="certificate">
                            Yes
                          </label>
                        </div>
                        <div className="radio radio-primary">
                          <input
                            id="certificate1"
                            type="radio"
                            name="is_certificate"
                            checked={props.values.is_certificate === "0"}
                            onChange={props.handleChange}
                            value="0"
                            onClick={removeCertificate}
                          />
                          <label className="mb-0" htmlFor="certificate1">
                            No
                          </label>
                        </div>
                      </div>
                      {props.touched.is_certificate &&
                      props.errors.is_certificate ? (
                        <div className="formik-errors bg-error">
                          {props.errors.is_certificate}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {show === 1 ? (
                    <>
                      <div className="form-group col-md-6">
                        <label className="control-label">
                          Certification Name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control digits"
                          placeholder="Certificate name"
                          type="text"
                          name="certificate_name"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.certificate_name}
                        />
                        {props.touched.certificate_name &&
                        props.errors.certificate_name ? (
                          <div className="formik-errors bg-error">
                            {props.errors.certificate_name}
                          </div>
                        ) : null}
                      </div>
                    </>
                  ) : null}

                  <div className="form-group col-md-6">
                    <label className="control-label">
                      Result Declaration <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control digits"
                      placeholder="Result declaration"
                      type="text"
                      name="result_declaration"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.result_declaration}
                    />
                    {props.touched.result_declaration &&
                    props.errors.result_declaration ? (
                      <div className="formik-errors bg-error">
                        {props.errors.result_declaration}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="text-end btn-mb">
                  <button
                    className="btn btn-secondary me-3"
                    id="activeForm"
                    type="button"
                    onClick={metaBackBtn}
                    style={
                      metaForm ? { display: "inline" } : { display: "none" }
                    }
                  >
                    <i className="fa-solid fa-chevron-left"></i> Previous
                  </button>
                  <button
                    className="btn btn-primary"
                    id="nextBtn"
                    type="submit"
                  >
                    Next<i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      )}
    </Formik>
  );
}

export default DetailsForm;
