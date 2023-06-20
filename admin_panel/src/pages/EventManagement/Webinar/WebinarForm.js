import React, { useContext, useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import CourseCourseService from "../../../Services/CourseService/CourseCourseService";

import ELearningCourseService from "../../../Services/ELearningService/ELearningCourseService";

export default function WebinarForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [ogImage, setOgImage] = useState("");
  const [blogForm, setBlogForm] = useState(false);
  const [mainForm, setMainForm] = useState(true);
  const [values, setValues] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const serve = new ELearningCourseService();
  const courseServe = new CourseCourseService();
  const VoucherSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    date: Yup.string().required("Required"),
    time: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    let related_courseArr =
      values.related_course &&
      values.related_course.map((v) => {
        return v.value;
      });
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("title", values.title);

    formData.set("description", values.description);
    formData.set("date", values.date);

    formData.set("time", values.time);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };

    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `webinar/update-webinar`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/webinar");
          }, [1000]);
        } else {
          toast.error(response.data?.message);
        }
      } catch (err) {
        throw err;
      }
    } else {
        axios
          .post(
            process.env.REACT_APP_API_BASEURL + "webinar/create-webinar",
            formData,
            config
          )
          .then((res) => {
            if (res.data?.status === "success") {
              toast.success("Record created successfully");
              setTimeout(() => {
                navigate("/webinar");
              }, [1000]);
            } else if (res.data?.status === "fail") {
              toast.error(res.data?.message);
            }
          })
          .catch((err) => {
            throw err;
          });
    
    }
  };

  useEffect(() => {
    if (params.id) {
      getDataById();
    }
  }, []);
  const getDataById = async () => {
    try {
      let response = await serve.edit(params.id);
      if (response) {
        setValues({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          date: response.data.date,
          time: response.data.time,
        });

      } else {
        toast.error(response);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="page-body">
      <Breadcrumb heading={params.id?"Edit Webinar":"Add Webinar" }/>
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
              </div>
              <div className="card-body">
             
                  <Formik
                    initialValues={values}
                    validationSchema={VoucherSchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                  >
                    {(props) => (
                      <>
                        <form className="" onSubmit={props.handleSubmit}>
                          <div className="row">
                            {}
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Title <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="title"
                                onChange={props.handleChange}
                                value={props.values.title}
                                type="text"
                                placeholder="Enter  title"
                              />
                              {props.touched.title && props.errors.title ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.title}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Time <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="time"
                                onChange={props.handleChange}
                                value={props.values.time}
                                type="time"
                              />
                              {props.touched.time && props.errors.time ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.time}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Date <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                name="date"
                                value={props.values.date}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                type="date"
                              />
                              {props.touched.date && props.errors.date ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.date}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Description
                                <span className="text-danger">*</span>
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
                              />
                              {props.touched.description &&
                              props.errors.description ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.description}
                                </div>
                              ) : null}
                            </div>

                            <div className="card-footer text-end">
                              <button className="btn btn-primary" type="submit">
                                Submit
                              </button>
                            </div>
                          </div>
                        <ToastContainer autoClose={1000} />
                        </form>
                      </>
                    )}
                  </Formik>
              

            
              </div>
            </div>
          <ToastContainer autoClose={1000} />
          </div>
        </div>
      </div>
    </div>
  );
}
