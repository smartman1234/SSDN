import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, FieldArray } from "formik";

export default function BankDetails({ props }) {
  return (
    <FieldArray
      name="bank_details"
      render={(arrayHelpers) => (
        <div> 
          {arrayHelpers?.form?.values?.bank_details.map((v, index) => (
            <div className="row" key={index}>
              <div className="form-group col-md-12">
                <label className="form-label fs-4">
                  Bank Details {index + 1}
                </label>
                <hr />{" "}
               
              </div>{" "}
              <div className="form-group col-md-5">
                <label className="form-label">
                  Bank Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`bank_details.${index}.bank_name`}
                  value={props.values?.bank_details?.[index]?.bank_name}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter bank name"
                />
                {props.touched.bank_details?.[index]?.bank_name &&
                props.errors.bank_details?.[index]?.bank_name ? (
                  <div className="formik-errors bg-error">
                    {props.errors.bank_details?.[index]?.bank_name}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-5">
                <label className="form-label">
                  Account Holder Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`bank_details.${index}.holder_name`}
                  value={props.values?.bank_details?.[index]?.holder_name}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter holder name"
                />{" "}
                {props.touched.bank_details?.[index]?.holder_name &&
                props.errors.bank_details?.[index]?.holder_name ? (
                  <div className="formik-errors bg-error">
                    {props.errors.bank_details?.[index]?.holder_name}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-5">
                <label className="form-label">
                  Account Number <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`bank_details.${index}.account_number`}
                  value={props.values.bank_details?.[index]?.account_number}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter account number"
                />{" "}
                {props.touched.bank_details?.[index]?.account_number &&
                props.errors.bank_details?.[index]?.account_number ? (
                  <div className="formik-errors bg-error">
                    {props.errors.bank_details?.[index]?.account_number}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-5">
                <label className="form-label">
                  IFSC Code <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`bank_details.${index}.ifsc_code`}
                  value={props.values.bank_details?.[index]?.ifsc_code}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter ifsc code"
                />{" "}
                {props.touched.bank_details?.[index]?.ifsc_code &&
                props.errors.bank_details?.[index]?.ifsc_code ? (
                  <div className="formik-errors bg-error">
                    {props.errors.bank_details?.[index]?.ifsc_code}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-5">
                <label className="form-label">
                  Branch Address <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name={`bank_details.${index}.branch_address`}
                  value={props.values.bank_details?.[index]?.branch_address}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  type="text"
                  placeholder="Enter branch address"
                />{" "}
                {props.touched.bank_details?.[index]?.branch_address &&
                props.errors.bank_details?.[index]?.branch_address ? (
                  <div className="formik-errors bg-error">
                    {props.errors.bank_details?.[index]?.branch_address}
                  </div>
                ) : null}
              </div>
              {props.values?.bank_details?.length > 1 && (
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
  );
}
