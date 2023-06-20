import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, FieldArray } from "formik";

export default function Follow({ props,imageUrl }) {

  return (
    <FieldArray
      name="follow"
      render={(arrayHelpers) => (
        <div>
          {arrayHelpers?.form?.values?.follow?.map((v, index) => (
            <div className="row" key={index}>
              <div className="form-group col-md-5">
                <label className="form-label">
                  Icon name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`follow.${index}.icon`}
                  type="text"
                  value={props.values.follow?.[index]?.icon}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  placeholder="Enter  icon name"
                />{" "}
                {props.touched.follow?.[index]?.icon &&
                props.errors.follow?.[index]?.icon ? (
                  <div className="formik-errors bg-error">
                    {props.errors.follow?.[index]?.icon}
                  </div>
                ) : null}
              </div>

            

              <div className="form-group col-md-5">
                <label className="form-label">
                  Link <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`follow.${index}.link`}
                  value={props.values.follow?.[index]?.link}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter  Link"
                />{" "}
                {props.touched.follow?.[index]?.link &&
                props.errors.follow?.[index]?.link ? (
                  <div className="formik-errors bg-error">
                    {props.errors.follow?.[index]?.link}
                  </div>
                ) : null}
              </div>

              {props.values.follow.length > 1 && (
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
          {arrayHelpers?.form?.values?.follow.length<4&&<button
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
          </button>}
          
        <ToastContainer autoClose={1000} />
        </div>
      )}
    />
  );
}
