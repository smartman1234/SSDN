import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, FieldArray } from "formik";

export default function FastestCard({props}) {
  return (
    <FieldArray
    name="fastest_growing_card"
    render={(arrayHelpers) => (
      <div>
        {arrayHelpers?.form?.values?.fastest_growing_card?.map((v, index) => (
          <div className="row" key={index}>
            <div className="form-group col-md-12">
              <label className="form-label">
                 Title <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name={`fastest_growing_card.${index}.title`}
                value={props.values.fastest_growing_card?.[index]?.title}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                type="text"
                placeholder="Enter  title"
              />{" "}
              {props.touched.fastest_growing_card?.[index]?.title &&
              props.errors.fastest_growing_card?.[index]?.title ? (
                <div className="formik-errors bg-error">
                  {props.errors.fastest_growing_card?.[index]?.title}
                </div>
              ) : null}
            </div>
            <div className="form-group col-md-12">
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
                  value={props.values.fastest_growing_card?.[index]?.description}
                  onEditorChange={(e) =>
                    props.setFieldValue(`fastest_growing_card.${index}.description`, e)
                  }
                />
              {props.touched.fastest_growing_card?.[index]?.description &&
              props.errors.fastest_growing_card?.[index]?.description ? (
                <div className="formik-errors bg-error">
                  {props.errors.fastest_growing_card?.[index]?.description}
                </div>
              ) : null}
            </div>

            {props.values.fastest_growing_card.length > 1 && (
              <div className="col-md-2 open-button">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => {
                  
                    arrayHelpers.remove(index);
                  }}
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
              link: "",
            })
          }
        >
          +
        </button>
      <ToastContainer autoClose={1000} />
      </div>
    )}
  />
  )
}
