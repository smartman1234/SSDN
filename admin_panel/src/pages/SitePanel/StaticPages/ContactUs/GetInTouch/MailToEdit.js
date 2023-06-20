import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import GetInTouchService from "../../../../../Services/SitePanelServices/GetInTouchService";
import Breadcrumb from "../../../../BreadCrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MailToEdit() {
  const [data, setData] = useState(
    JSON.parse(sessionStorage.getItem("getintouch"))
  );
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: "",
    mail1: "",
    mail2: "",
    mail3: "",
  });
  const getInTouch = new GetInTouchService();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    mail1: Yup.string().required("Required"),
    mail2: Yup.string().required("Required"),
    mail3: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {

    let obj = {
      email_title: values.title,
      contact_emails: [values.mail1, values.mail2, values.mail3],
    };

    try {
      let response = await getInTouch.contact(obj);
      if (response.status === "success") {
        toast.success("Updated Successfully");
        setTimeout(() => {
          navigate("/getin-touch");
        }, [1000]);
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    setValues({
      title: data.email_title,
      mail1: JSON.parse(data.contact_emails || "[]")?.[0],
      mail2: JSON.parse(data.contact_emails || "[]")?.[1],
      mail3: JSON.parse(data.contact_emails || "[]")?.[2],
    });
  }, []);
  return (
    <div className="page-body">
      <Breadcrumb heading="Edit Mail To" />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Edit Mail to</h5>
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
                            name="title"
                            onChange={props.handleChange}
                            value={props.values.title}
                            type="text"
                            placeholder="Enter heading"
                          />
                          {props.touched.title && props.errors.title ? (
                            <div className="formik-errors bg-error">
                              {props.errors.title}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            Email ID. <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            name="mail1"
                            type="email"
                            onChange={props.handleChange}
                            value={props.values.mail1}
                            placeholder="Enter phone no"
                          />
                          {props.touched.mail1 && props.errors.mail1 ? (
                            <div className="formik-errors bg-error">
                              {props.errors.mail1}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">Email ID. </label>
                          <input
                            className="form-control"
                            name="mail2"
                            type="email"
                            onChange={props.handleChange}
                            value={props.values.mail2}
                            placeholder="Enter mail to"
                          />
                          {props.touched.mail2 && props.errors.mail2 ? (
                            <div className="formik-errors bg-error">
                              {props.errors.mail2}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">Email ID.</label>
                          <input
                            className="form-control"
                            name="mail3"
                            type="email"
                            onChange={props.handleChange}
                            value={props.values.mail3}
                            placeholder="Enter mail to"
                          />
                          {props.touched.mail3 && props.errors.mail3 ? (
                            <div className="formik-errors bg-error">
                              {props.errors.mail3}
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
      <ToastContainer autoClose={1000} />
      </div>
    </div>
  );
}

export default MailToEdit;
