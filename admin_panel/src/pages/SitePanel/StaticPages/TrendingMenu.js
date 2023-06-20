import React from "react";
import { FieldArray } from "formik";
import TrendingMenuOne from "./TrendingMenuOne";

export default function TrendingMenu({ props }) {
  return (
    <FieldArray
      name="trending_menu"
      render={(arrayHelpers) => (
        <div>
          {arrayHelpers?.form?.values?.trending_menu?.map((v, index) => (
            <div className="row" key={index}>
              <div className="form-group col-md-5">
                <label className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`trending_menu.${index}.heading`}
                  value={props.values.trending_menu?.[index]?.heading}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter  name"
                />{" "}
                {props.touched.trending_menu?.[index]?.heading &&
                props.errors.trending_menu?.[index]?.heading ? (
                  <div className="formik-errors bg-error">
                    {props.errors.trending_menu?.[index]?.heading}
                  </div>
                ) : null}
              </div>
             
              <TrendingMenuOne
                name={`trending_menu.${index}.detail`}
                props={props}
                subIndex={v}
                menuIndex={index}
              />
              {props.values.trending_menu.length > 1 && (
                <div className="col-md-2 mb-2">
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
              <hr/>
            </div>
          ))}
          <button
            className="btn btn-primary mb-4"
            type="button"
            onClick={() =>
              arrayHelpers.push({
                heading: "",
                detail: [
                  {
                    title: "",
                    link: "",
                  },
                ],
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
