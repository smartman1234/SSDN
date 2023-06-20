import React from "react";
import { Editor } from "@tinymce/tinymce-react";

import { Formik, Form, Field, FieldArray } from "formik";

export default function AnalyticalsSkill({ props }) {
  return (
    <FieldArray
      name="analytic_skils"
      render={(arrayHelpers) => (
        <div className="">
          {arrayHelpers?.form?.values?.analytic_skils?.map((v, index) => (
            <div className="row">
              <div className="form-group col-md-10 p-0">
                <label className="form-label">
                 Analytical Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  name={`analytic_skils.${index}.description`}
                  value={props.values.analytic_skils?.[index].description}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter curriculum accordion description"
                />
                {props.touched.analytic_skils?.[index]?.description &&
                props.errors.analytic_skils?.[index]?.description ? (
                  <div className="formik-errors bg-error">
                    {props.errors.analytic_skils?.[index]?.description}
                  </div>
                ) : null}
              </div>
              {props.values?.analytic_skils.length > 1 && (
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
          ))}

          <button
            className="btn btn-primary mb-4"
            type="button"
            onClick={() =>
              arrayHelpers.push({
                description: "",
              })
            }
          >
            +
          </button>
        </div>
      )}
    />
  );
}
