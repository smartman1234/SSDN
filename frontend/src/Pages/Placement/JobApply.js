import { Formik } from "formik";
import React, { useState, } from "react";
import * as Yup from "yup";
import axios from "axios";
import PhoneInput from "react-phone-input-2/lib/lib";
import "react-phone-input-2/lib/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Captcha from "react-numeric-captcha";



export default function JobApply({
    id,
    active,
    setActive,
    jobId,
    open,
    setOpen,
}) {
    const [verify, setVerify] = useState(false);
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const [value, setValue] = useState({
        name: "",
        code: "91",
        number: "",
        email: "",
        experiance_type: "",
        year_of_experience: "",
        year_of_passout: "",
        degree: "",
        is_certificate: "",
        certificate_name: "",
        skills: "",
        location: "",
        tell_something: "",
        resume: "",
    });

    const onSubmit = async (values) => {
        const formData = new FormData();
        if (values.id) {
            formData.set("id", values.id);
        }
        formData.set("name", values.name);
        formData.set("job_id", jobId);
        formData.set("number", values.number);
        formData.set("email", values.email);
        formData.set("experience_type", values.experiance_type);
        if (typeof experience_type === "experienced") {
        } else {
            formData.append("year_of_experience", values.year_of_experience);
        }

        formData.set("is_certificate", values.is_certificate);
        if (typeof is_certificate == 1) {
        } else {
            formData.append("certificate_name", values.certificate_name);
        }
        formData.set("skills", values.skills);
        formData.set("location", values.location);
        formData.set("tell_something", values.tell_something);
        formData.set("year_of_passout", values.year_of_passout);
        formData.set("degree", values.degree);
        formData.set("resume", values.resume);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (verify) {
      setError();
      setLoader(true);
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + "web/apply-job",
          formData,
          config
        );
        if (response.data?.status === "success") {
          setLoader(false);
          toast.success("Successfully Applied");
          if (open) {
            setOpen(false);
          } else {
            setActive(false);
          }
        } else {
          setLoader(false);
          toast.error("error");
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
  const SUPPORTED_FORMATS = ["application/pdf", "application/msword"];
  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    is_certificate: Yup.string().required("Required"),
    certificate_name: Yup.string()
      .when("is_certificate", {
        is: (is_certificate) => is_certificate == 1,
        then: Yup.string().required("Required"),
      })
      .nullable(),
    experiance_type: Yup.string().required("Required"),
    year_of_experience: Yup.string()
      .when("experiance_type", {
        is: (experiance_type) => experiance_type === "experienced",
        then: Yup.string().required("Required"),
      })
      .nullable(),

        year_of_passout: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        degree: Yup.string().required("Required"),
        code: Yup.string().required("Required"),
        number: Yup.string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("Required"),
        skills: Yup.string().required("Required"),
        location: Yup.string().required("Required"),
        tell_something: Yup.string().required("Required"),
        resume: Yup.mixed().required("A file is required"),
    });

    return (
        <div
            className={open || active[id] ? "modal fade show" : "modal fade"}
            id="exampleModal1"
            style={{ display: "block", paddingLeft: "0px" }}
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Apply Now
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => {
                                if (open) {
                                    setOpen(false);
                                } else {
                                    setActive(false);
                                }
                            }}
                        ></button>
                    </div>
                    <div className="card mt-0">
                        <div className="card-body">
                            <Formik
                                initialValues={value}
                                onSubmit={onSubmit}
                                enableReinitialize={true}
                                validationSchema={ValidateSchema}
                            >
                                {(props) => (
                                    <form className="login-form_id row" onSubmit={props.handleSubmit}>
                                        <div className="col-lg-6 form-group">
                                            <input
                                                name="name"
                                                onChange={props.handleChange}
                                                value={props.values.name}
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter name*"
                                            />
                                            {props.touched.name && props.errors.name ? (
                                                <div className="formik-errors bg-error">
                                                    {props.errors.name}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="col-lg-6 form-group">
                                            <input
                                                type="email"
                                                className="form-control"
                                                onChange={props.handleChange}
                                                value={props.values.email}
                                                name="email"
                                                placeholder="Enter email*"
                                            />{" "}
                                            {props.touched.email && props.errors.email ? (
                                                <div className="formik-errors bg-error">
                                                    {props.errors.email}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="col-lg-2 col-6 form-group">
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
                                        <div className="col-lg-4 col-6  form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="number"
                                                onChange={props.handleChange}
                                                value={props.values.number}
                                                placeholder="Enter mobile no"
                                            />
                                            {props.touched.number && props.errors.number ? (
                                                <div className="formik-errors bg-error">
                                                    {props.errors.number}
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="col-lg-6 form-group">
                                            <input
                                                type="file"
                                                className="form-control"
                                                onChange={(e) => {
                                                    props.setFieldValue("resume", e.target.files[0]);
                                                }}
                                                name="resume"
                                                accept="application/pdf"
                                            />{" "}
                                            {props.touched.resume && props.errors.resume ? (
                                                <div className="formik-errors bg-error">
                                                    {props.errors.resume}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="col-lg-6 form-group">
                                            <select
                                                className="form-select digits"
                                                value={props.values.experiance_type}
                                                name="experiance_type"
                                                onChange={(e) => {
                                                    props.setFieldValue(
                                                        "experiance_type",
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                <option value="">Experience Type</option>
                                                <option value="experienced">
                                                    Experienced
                                                </option>{" "}
                                                <option value="fresher">Fresher</option>
                                            </select>
                                            {props.touched.experiance_type &&
                                                props.errors.experiance_type ? (
                                                <div className="formik-errors bg-error">
                                                    {props.errors.experiance_type}
                                                </div>
                                            ) : null}
                                        </div>
                                        {props.values.experiance_type === "experienced" && (
                                            <div className="col-lg-6 form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="year_of_experience"
                                                    onChange={props.handleChange}
                                                    value={props.values.year_of_experience}
                                                    placeholder="Enter year of experience"
                                                />{" "}
                                                {props.touched.year_of_experience &&
                                                    props.errors.year_of_experience ? (
                                                    <div className="formik-errors bg-error">
                                                        {props.errors.year_of_experience}
                                                    </div>
                                                ) : null}
                                            </div>
                                        )}

                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="year_of_passout"
                            onChange={props.handleChange}
                            value={props.values.year_of_passout}
                            placeholder="Enter year of passout"
                          />{" "}
                          {props.touched.year_of_passout &&
                          props.errors.year_of_passout ? (
                            <div className="formik-errors bg-error">
                              {props.errors.year_of_passout}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <select
                            className="form-select digits"
                            value={props.values.is_certificate}
                            name="is_certificate"
                            onChange={(e) => {
                              props.setFieldValue(
                                "is_certificate",
                                e.target.value
                              );
                            }}
                          >
                            <option value="">Certificate Requirement</option>
                            <option value="1">Yes</option>{" "}
                            <option value="0">No</option>
                          </select>
                          {props.touched.is_certificate &&
                          props.errors.is_certificate ? (
                            <div className="formik-errors bg-error">
                              {props.errors.is_certificate}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      {props.values.is_certificate == 1 && (
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="certificate_name"
                              onChange={props.handleChange}
                              value={props.values.certificate_name}
                              placeholder="Enter certificate name"
                            />{" "}
                            {props.touched.certificate_name &&
                            props.errors.certificate_name ? (
                              <div className="formik-errors bg-error">
                                {props.errors.certificate_name}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )}
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            onChange={props.handleChange}
                            value={props.values.degree}
                            name="degree"
                            placeholder="Enter degree*"
                          />{" "}
                          {props.touched.degree && props.errors.degree ? (
                            <div className="formik-errors bg-error">
                              {props.errors.degree}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            onChange={props.handleChange}
                            value={props.values.location}
                            name="location"
                            placeholder="Enter location*"
                          />{" "}
                          {props.touched.location && props.errors.location ? (
                            <div className="formik-errors bg-error">
                              {props.errors.location}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            onChange={props.handleChange}
                            value={props.values.skills}
                            name="skills"
                            placeholder=" your skills"
                          ></textarea>{" "}
                          {props.touched.skills && props.errors.skills ? (
                            <div className="formik-errors bg-error">
                              {props.errors.skills}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            onChange={props.handleChange}
                            value={props.values.tell_something}
                            name="tell_something"
                            placeholder="About your self"
                          ></textarea>{" "}
                          {props.touched.tell_something &&
                          props.errors.tell_something ? (
                            <div className="formik-errors bg-error">
                              {props.errors.tell_something}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-6">
                      <Captcha onChange={(e) => setVerify(e)} />
                        <div className="formik-errors bg-error">{error}</div>
                      </div>
                      <div className="col-lg-6 text-end">
                        {" "}
                        {loader ? (
                          <div className="col-lg-12 text-center mt-1">
                          <strong className="me-2">Loading...</strong>
                          <div className="spinner-border text-warning"
                          ></div>
                      </div>
                        ) : (
                          <button className="edu-btn" type="submit">
                            <span>Submit Now</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>{" "}
      <ToastContainer autoClose={1000} />
    </div>
  );
}
