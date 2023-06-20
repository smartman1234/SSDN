import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, FieldArray } from "formik";
import ElearningVideoService from "../../../Services/ELearningService/ElearningVideoService";
import { json } from "react-router";

export default function VideoContent({
  active,
  setActive,
  values,
  param,
  SectionlistApi,
  sectionList,
  sectionHeadingForm,
  setSectionHeadingForm,
}) {
  const elearning = new ElearningVideoService();

  const onSubmit = async (values) => {
    let obj = {
      course_id: param.id,
      title: values.headline,
      what_will_able_to_do: values.description,
    };
    if (values.id) {
      obj["id"] = values.id;
    }
    try {
      if (values.id) {
        let response = await elearning.editSection(obj);
        if (response) {
          toast.success(response.message);
          setSectionHeadingForm(false);
          SectionlistApi(param.id);
          setActive((prev) => ({ [response.data.id]: false }));
        }
      } else {
        let response = await elearning.createLecture(obj);
        if (response) {
          toast.success(response.message);
          setSectionHeadingForm(false);
          SectionlistApi(param.id);
          setActive((prev) => ({ [response.data.id]: false }));
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const VoucherSchema = Yup.object().shape({
    headline: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });
  return (
    <>
      {" "}
      <div
        className="card-header d-flex justify-content-between"
        id="mainsectionheading"
      >
        <h5>Add Video Course Content </h5>
        <button
          className="btn btn-primary me-2"
          type="button"
          onClick={() => {
            setSectionHeadingForm(true);
          }}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
      {(sectionHeadingForm || sectionList.length < 0) && (
        <Formik
          initialValues={values}
          validationSchema={VoucherSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(props) => (
            <form className="" onSubmit={props.handleSubmit}>
              <div className="row">
                <div className="form-group col-md-12">
                  <label className="form-label">
                    Headline <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="headline"
                    value={props.values.headline}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    type="text"
                    placeholder="Enter headline"
                  />
                  {props.touched.headline && props.errors.headline ? (
                    <div className="formik-errors bg-error">
                      {props.errors.headline}
                    </div>
                  ) : null}
                </div>
                <div className="form-group col-md-12">
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
                    name="description"
                    value={props.values.description}
                    onEditorChange={(e) =>
                      props.setFieldValue("description", e)
                    }
                    onBlur={props.handleBlur}
                  />
                  {props.touched.description && props.errors.description ? (
                    <div className="formik-errors bg-error">
                      {props.errors.description}
                    </div>
                  ) : null}
                </div>
                <div className="col-md-12 text-end">
                  <button className="btn btn-primary me-2" type="submit">
                    Add Section
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => setSectionHeadingForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>{" "}
            <ToastContainer autoClose={1000} />
            </form>
          )}
        </Formik>
      )}
    </>
  );
}
