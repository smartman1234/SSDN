import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";

import { Formik, Form, Field, FieldArray } from "formik";

export default function Curriculum({
  params,
  setBlogForm,
  setMainForm,
  setCurriculumForm,
  curriculumValue,
  setCurriculumValue,
}) {
  const onSubmit = async (values) => {
    setCurriculumValue(values);
    setBlogForm(true);
    setMainForm(false);
    setCurriculumForm(false);
  };

  const CurriculumBackBtn = () => {
    setCurriculumForm(false);
    setMainForm(true);
    setBlogForm(false);
  };
  return (
    <>
      <Formik
        initialValues={curriculumValue}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(props) => (
          <form className="" onSubmit={props.handleSubmit}>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-label">Curriculum Title </label>
                <input
                  className="form-control"
                  name="curriculum_title"
                  value={props.values?.curriculum_title}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter curriculum title"
                />
                {props.touched.curriculum_title &&
                props.errors.curriculum_title ? (
                  <div className="formik-errors bg-error">
                    {props.errors.curriculum_title}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-5">
                <label className="form-label">PDF</label>

                <input
                  className="form-control"
                  type="file"
                  name="pdf"
                  accept="application/pdf"
                  onChange={(e) => {
                    props.setFieldValue("pdf", e.target.files[0]);
                  }}
                />
                {props.touched.pdf && props.errors.pdf ? (
                  <div className="formik-errors bg-error">
                    {props.errors.pdf}
                  </div>
                ) : null}
                
              {params && (
                <p className="color-pdf">
                  Note:{" "}
                  <a href={props.values.pdf} target="_blank">
                    Click here
                  </a> 
                  {" "} to view pdf
                </p>
              )}
              </div>
              {props.values.pdf && (
                <div
                  className="input-group-append col-md-2"
                  style={{
                    top: "25px",
                    paddingLeft: "0px",
                    height: "49px",
                    width: "55px",
                  }}
                >
                  {props.values.pdf && (
                    <a href={props.values.pdf} target="_blank">
                      {" "}
                      <img
                        src="/assets/images/PDF_file.svg.png"
                        alt="image"
                        style={{
                          padding: "0",
                          width: "100%",
                          height: "72%",
                        }}
                      />
                    </a>
                  )}
                </div>
              )}
              <div className="form-group col-md-6">
                <label className="form-label">Curriculum Description</label>
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
                  value={props.values.curriculum}
                  onEditorChange={(e) => props.setFieldValue("curriculum", e)}
                />
                {props.touched.curriculum && props.errors.curriculum ? (
                  <div className="formik-errors bg-error">
                    {props.errors.curriculum}
                  </div>
                ) : null}
              </div>
              <FieldArray
                name="curriculum_accordion"
                render={(arrayHelpers) => (
                  <div className="">
                    {arrayHelpers?.form?.values?.curriculum_accordion &&
                      arrayHelpers?.form?.values.curriculum_accordion.map(
                        (v, index) => (
                          <div className="row">
                            <div className="form-group col-md-5 p-0">
                              <label className="form-label">
                                Curriculum Accordion Question
                              </label>
                              <input
                                className="form-control"
                                name={`curriculum_accordion.${index}.title`}
                                value={
                                  props.values.curriculum_accordion?.[index]
                                    .title
                                }
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                type="text"
                                placeholder="Enter curriculum accordion question"
                              />
                              {props.touched.curriculum_accordion?.[index]
                                ?.title &&
                              props.errors.curriculum_accordion?.[index]
                                ?.title ? (
                                <div className="formik-errors bg-error">
                                  {
                                    props.errors.curriculum_accordion?.[index]
                                      ?.title
                                  }
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group col-md-6">
                              <label className="form-label">
                                Curriculum Accordion Description
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
                                value={
                                  props.values.curriculum_accordion?.[index]
                                    .description
                                }
                                onEditorChange={(e) =>
                                  props.setFieldValue(
                                    `curriculum_accordion.${index}.description`,
                                    e
                                  )
                                }
                              />
                              {props.touched.curriculum_accordion?.[index]
                                ?.description &&
                              props.errors.curriculum_accordion?.[index]
                                ?.description ? (
                                <div className="formik-errors bg-error">
                                  {
                                    props.errors.curriculum_accordion?.[index]
                                      ?.description
                                  }
                                </div>
                              ) : null}
                            </div>
                            {props.values.curriculum_accordion.length > 1 && (
                              <div className="col-md-2 open-button">
                                <button
                                  className="btn btn-danger "
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  -
                                </button>
                              </div>
                            )}
                          </div>
                        )
                      )}

                    <button
                      className="btn btn-primary mb-2"
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          title: "",
                          description: "",
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                )}
              />
              <h5 className="mt-5">faqs Details</h5>
              <hr />
              <FieldArray
                name="faqs"
                render={(arrayHelpers) => (
                  <div>
                    {arrayHelpers?.form?.values?.faqs?.map((v, index) => (
                      <div className="row" key={index}>
                        <div className="form-group col-md-5 p-0">
                          <label className="form-label">FAQs Title</label>
                          <input
                            className="form-control"
                            name={`faqs.${index}.title`}
                            value={props.values.faqs?.[index]?.title}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            type="text"
                            placeholder="Enter faqs title"
                          />{" "}
                          {props.touched.faqs?.[index]?.title &&
                          props.errors.faqs?.[index]?.title ? (
                            <div className="formik-errors bg-error">
                              {props.errors.faqs?.[index]?.title}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            FAQs Description{" "}
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
                            value={props.values.faqs?.[index]?.description}
                            onEditorChange={(e) =>
                              props.setFieldValue(
                                `faqs.${index}.description`,
                                e
                              )
                            }
                          />
                          {props.touched.faqs?.[index]?.description &&
                          props.errors.faqs?.[index]?.description ? (
                            <div className="formik-errors bg-error">
                              {props.errors.faqs?.[index]?.description}
                            </div>
                          ) : null}
                        </div>

                        {props.values.faqs.length > 1 && (
                          <div className="col-md-2 open-button">
                            <button
                              className="btn btn-danger"
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              -
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    <button
                      className="btn btn-primary mb-4"
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          title: "",
                          description: "",
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                )}
              />
              <div className="card-footer text-end">
                <button
                  className="btn btn-danger me-2"
                  type="button"
                  onClick={CurriculumBackBtn}
                >
                  Previous
                </button>
                <button className="btn btn-primary" type="submit">
                  Next
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>

      <ToastContainer autoClose={1000} />
    </>
  );
}
