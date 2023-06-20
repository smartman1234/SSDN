import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import "react-toastify/dist/ReactToastify.css";

import PlacementService from "../../../Services/PlacementService/PlacementService";
const JobOpeningAddForm = () => {
  const navigate = useNavigate();
  const serve = new PlacementService();
  const params = useParams();
  const [value, setValue] = useState({
    title: "",
    experience: "",
    is_salary: "",
    salary: "",
    location: "",
    skills: "",
    description: "",
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("title", values.title);
    formData.set("experience", values.experience);
    formData.set("is_salary", values.is_salary);
    if (values.is_salary == 1) {
      formData.set("salary", values.salary);
    }
    formData.set("location", values.location);
    formData.set("skills", values.skills);
    formData.set("description", values.description);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `job/update-job`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/job-opening");
          }, [1000]);
        } else {
          toast.error(response.data?.name);
        }
      } catch (err) {
        throw err;
      }
    } else {
      axios
        .post(
          process.env.REACT_APP_API_BASEURL + "job/create-job",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            toast.success("Record created successfully");
            setTimeout(() => {
              navigate("/job-opening");
            }, [1000]);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const ValidateSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    experience: Yup.string().required("Required"),
    is_salary: Yup.string().required("Required"),
    salary: Yup.string()
      .when("is_salary", {
        is: (is_salary) => is_salary && is_salary == 1,
        then: Yup.string().required("Required"),
      })
      .nullable(),
    location: Yup.string().required("Required"),
    skills: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (params.id) {
      getDetailApi();
    }
  }, []);

  const getDetailApi = async () => {
    try {
      let response = await serve.getjobDetail(params.id);
      if (response) {
        setValue({
          id: response.data.id,
          title: response.data?.title,
          is_salary: response.data?.is_salary,
          salary: response.data?.salary,
          experience: response.data?.experience,
          skills: response.data?.skills,
          location: response.data?.location,
          description: response.data?.description,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  const name = (
    <Link to="/create-blog" className="btn btn-primary">
      <i className="fa-solid fa-plus me-2"></i>Add
    </Link>
  );
  return (
    <>
      <div className="page-body">
        <Breadcrumb heading={params.id ? "Edit Job" : "Add Job"} />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>{params.id ? "Edit Job" : "Add Job"} </h5>
                </div>
                <Formik
                  initialValues={value}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                  validationSchema={ValidateSchema}
                >
                  {(props) => (
                    <form
                      className="form theme-form"
                      onSubmit={props.handleSubmit}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 form-group">
                            <label className="form-label">
                              Job Title<span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.title}
                              name="title"
                              type="text"
                              placeholder="Enter job title"
                            />{" "}
                            {props.touched.title && props.errors.title ? (
                              <div className="formik-errors bg-error">
                                {props.errors.title}
                              </div>
                            ) : null}
                          </div>

                          <div className="col-md-6 form-group">
                            <label className="form-label">
                              Experience<span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.experience}
                              name="experience"
                              type="text"
                              placeholder="Enter experience"
                            />{" "}
                            {props.touched.experience &&
                            props.errors.experience ? (
                              <div className="formik-errors bg-error">
                                {props.errors.experience}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-6 form-group">
                            <label className="form-label">
                              Location <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.location}
                              name="location"
                              type="text"
                              placeholder="Enter company location"
                            />{" "}
                            {props.touched.experience &&
                            props.errors.experience ? (
                              <div className="formik-errors bg-error">
                                {props.errors.experience}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-md-6 form-group">
                            <label className="form-label">
                              Is Salary <span className="text-danger">*</span>
                            </label>
                            <select
                              onChange={props.handleChange}
                              name="is_salary"
                              className="form-select"
                              onBlur={props.handleBlur}
                              value={props.values.is_salary}
                            >
                              <option value="">Select option</option>
                              <option value="1">Show Salary</option>
                              <option value="0">Hide Salary</option>
                            </select>
                            {props.touched.is_salary &&
                            props.errors.is_salary ? (
                              <div className="formik-errors bg-error">
                                {props.errors.is_salary}
                              </div>
                            ) : null}
                          </div>
                          {props.values.is_salary == 1 && (
                            <div className="col-md-6 form-group">
                              <label className="form-label">
                                Salary <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.salary}
                                name="salary"
                                type="text"
                                placeholder="Enter company salary"
                              />{" "}
                              {props.touched.salary && props.errors.salary ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.salary}
                                </div>
                              ) : null}
                            </div>
                          )}
                          <div className="col-md-6 form-group">
                            <label className="form-label">
                              Skills <span className="text-danger">*</span>
                            </label>
                            <Editor
                              textareaName="content"
                              apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                              init={{
                                plugins: [
                                  "advlist",
                                  "autolink",
                                  "lists",
                                  "link",
                                  "image",
                                  "charmap",
                                  "preview",
                                  "anchor",
                                  "searchreplace",
                                  "visualblocks",
                                  "code",
                                  "fullscreen",
                                  "insertdatetime",
                                  "media",
                                  "table",
                                  "help",
                                  "wordcount",
                                ],

                                toolbar:
                                  " undo redo | blocks | image code | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help ",
                              }}
                              value={props.values.skills}
                              onEditorChange={(e) =>
                                props.setFieldValue("skills", e)
                              }
                            />{" "}
                            {props.touched.skills && props.errors.skills ? (
                              <div className="formik-errors bg-error">
                                {props.errors.skills}
                              </div>
                            ) : null}
                          </div>

                          <div className="col-md-6 form-group">
                            <label className="form-label">
                              Description <span className="text-danger">*</span>
                            </label>
                            <Editor
                              textareaName="content"
                              apiKey="j1g23ad6n3ra8f5lbnbe3nldrui85ygcv9zwc1ao74848kmj"
                              init={{
                                plugins: [
                                  "advlist",
                                  "autolink",
                                  "lists",
                                  "link",
                                  "image",
                                  "charmap",
                                  "preview",
                                  "anchor",
                                  "searchreplace",
                                  "visualblocks",
                                  "code",
                                  "fullscreen",
                                  "insertdatetime",
                                  "media",
                                  "table",
                                  "help",
                                  "wordcount",
                                ],

                                toolbar:
                                  " undo redo | blocks | image code | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help ",
                              }}
                              value={props.values.description}
                              onEditorChange={(e) =>
                                props.setFieldValue("description", e)
                              }
                            />{" "}
                            {props.touched.description &&
                            props.errors.description ? (
                              <div className="formik-errors bg-error">
                                {props.errors.description}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="card-footer text-end">
                        <button className="btn btn-primary me-2" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default JobOpeningAddForm;
