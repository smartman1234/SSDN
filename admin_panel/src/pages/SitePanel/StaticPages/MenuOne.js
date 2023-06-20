import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, FieldArray } from "formik";

export default function MenuOne({ props, values, getDataById, setValues }) {
  return (
    <FieldArray
    name="menu_1"
    render={(arrayHelpers) => (
      <div>
        {arrayHelpers?.form?.values?.menu_1?.map((v, index) => (
          <div className="row" key={index}>
            <div className="form-group col-md-5">
              <label className="form-label">
                 Title <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name={`menu_1.${index}.title`}
                value={props.values.menu_1?.[index]?.title}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                type="text"
                placeholder="Enter  title"
              />{" "}
              {props.touched.menu_1?.[index]?.title &&
              props.errors.menu_1?.[index]?.title ? (
                <div className="formik-errors bg-error">
                  {props.errors.menu_1?.[index]?.title}
                </div>
              ) : null}
            </div>
            <div className="form-group col-md-5">
              <label className="form-label">
                Link <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                name={`menu_1.${index}.link`}
                value={props.values.menu_1?.[index]?.link}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                type="text"
                placeholder="Enter  Link"
              />{" "}
              {props.touched.menu_1?.[index]?.link &&
              props.errors.menu_1?.[index]?.link ? (
                <div className="formik-errors bg-error">
                  {props.errors.menu_1?.[index]?.link}
                </div>
              ) : null}
            </div>

            {props.values.menu_1.length > 1 && (
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
