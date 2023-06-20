import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import GetInTouchService from "../../../../../Services/SitePanelServices/GetInTouchService";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../../../../BreadCrumb/Breadcrumb";
import { json, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function DepartmentWiseEdit() {
  const [data, setData] = useState(
    JSON.parse(sessionStorage.getItem("getintouch"))
  );

  const navigate = useNavigate();
  const getInTouch = new GetInTouchService();
  const [values, setValues] = useState({
    heading: "",
    contact1: "",
    contact2: "",
    skype: "",
  });
  const regex = /^[a-z][a-z0-9\.,\-_,\:]{5,31}$/i;

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    heading: Yup.string().required("Required"),
    skype: Yup.string().matches(regex, "not valid id ").required("Required"),
    contact1: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required")
      .min(10, "too short")
      .max(10, "too long"),
    contact2: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required")
      .min(10, "too short")
      .max(10, "too long"),
  });
  useEffect(() => {
    setValues({
      heading: data.contact_title,
      contact1: JSON.parse(data.contact_numbers || "[]")?.[0],
      contact2: JSON.parse(data.contact_numbers || "[]")?.[1],
      skype: data.skype_id,
    });
  }, []);
  const onSubmit = async (values, { resetForm }) => {

    let obj = {
      contact_title: values.heading,
      skype_id: values.skype,
      contact_numbers: [values.contact1, values.contact2],
    };

    try {
      let response = await getInTouch.contact(obj);
      if (response.status === "success") {
        toast.success("Updated Successfully");
        setTimeout(() => {
          navigate("/getin-touch");
        }, [2000]);
      } 
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="page-body">
      <Breadcrumb heading="Edit Connect with us" />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Edit Connect with us</h5>
              </div>
              <Formik
                initialValues={values}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
              >
                {(props) => (
                  <form className="" onSubmit={props.handleSubmit}>
                    <div className="card-body">
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            Heading <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            onChange={props.handleChange}
                            value={props.values.heading}
                            name="heading"
                            type="text"
                            placeholder="Enter heading"
                          />
                          {props.touched.heading && props.errors.heading ? (
                            <div className="formik-errors bg-error">
                              {props.errors.heading}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            Phone No. 1 <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            onChange={props.handleChange}
                            value={props.values.contact1}
                            name="contact1"
                            type="tel"
                            placeholder="Enter phone no"
                          />
                          {props.touched.contact1 && props.errors.contact1 ? (
                            <div className="formik-errors bg-error">
                              {props.errors.contact1}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">Phone No. 2</label>
                          <input
                            className="form-control"
                            onChange={props.handleChange}
                            value={props.values.contact2}
                            name="contact2"
                            type="text"
                            placeholder="Enter phone no"
                          />
                          {props.touched.contact2 && props.errors.contact2 ? (
                            <div className="formik-errors bg-error">
                              {props.errors.contact2}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            Skype ID <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            name="skype"
                            type="text"
                            onChange={props.handleChange}
                            value={props.values.skype}
                            placeholder="Enter skype id"
                          />
                          {props.touched.skype && props.errors.skype ? (
                            <div className="formik-errors bg-error">
                              {props.errors.skype}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-end">
                      <button className="btn btn-primary me-2" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    <ToastContainer autoClose={1000} />
    </div>
  );
}

export default DepartmentWiseEdit;
