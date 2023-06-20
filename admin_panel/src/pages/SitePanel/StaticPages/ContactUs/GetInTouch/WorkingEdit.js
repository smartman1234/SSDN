import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import GetInTouchService from "../../../../../Services/SitePanelServices/GetInTouchService";
import Breadcrumb from "../../../../BreadCrumb/Breadcrumb";

function DepartmentWiseEdit() {
  const [data, setData] = useState(
    JSON.parse(sessionStorage.getItem("getintouch"))
  );
  const navigate = useNavigate();
  const [values, setValues] = useState({
    heading: "",
    time: "",
  });
  const getInTouch = new GetInTouchService();

  const validationSchema = Yup.object().shape({
    heading: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {

    let obj = {
      working_title: values.heading,
      working: [values.time],
    };

    try {
      let response = await getInTouch.contact(obj);
      if (response.status === "success") {
        toast.success("Updated Successfully");
        setTimeout(() => {
          navigate("/getin-touch");
        }, [1000]);
      } 
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    setValues({
      heading: data.working_title,
      time: JSON.parse(data.working || "[]")?.[0],
    });
  }, []);
  return (
    <div className="page-body">
      <Breadcrumb heading="Edit Working" />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Edit Working</h5>
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
                            name="heading"
                            onChange={props.handleChange}
                            value={props.values.heading}
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
                          <label className="form-label">Information</label>
                          <input
                            className="form-control"
                            name="time"
                            type="text"
                            onChange={props.handleChange}
                            value={props.values.time}
                            placeholder="Enter Information"
                          />
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

export default DepartmentWiseEdit;
