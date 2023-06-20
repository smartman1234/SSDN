import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, FieldArray } from "formik";

export default function MenuThree({props}) {
  return (
    <FieldArray
    name="menu_3"
    render={(arrayHelpers) => (
      <div>
        {arrayHelpers?.form?.values?.menu_3?.map((v, index) => (
          <div className="row" key={index}>
            <div className="form-group col-md-5">
              <label className="form-label">
                 Title <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name={`menu_3.${index}.title`}
                value={props.values.menu_3?.[index]?.title}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                type="text"
                placeholder="Enter  title"
              />{" "}
              {props.touched.menu_3?.[index]?.title &&
              props.errors.menu_3?.[index]?.title ? (
                <div className="formik-errors bg-error">
                  {props.errors.menu_3?.[index]?.title}
                </div>
              ) : null}
            </div>
            <div className="form-group col-md-5">
              <label className="form-label">
                Link <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name={`menu_3.${index}.link`}
                value={props.values.menu_3?.[index]?.link}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                type="text"
                placeholder="Enter Link"
              />{" "}
              {props.touched.menu_3?.[index]?.link &&
              props.errors.menu_3?.[index]?.link ? (
                <div className="formik-errors bg-error">
                  {props.errors.menu_3?.[index]?.link}
                </div>
              ) : null}
            </div>

            {props.values.menu_3.length > 1 && (
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
            <hr />
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
