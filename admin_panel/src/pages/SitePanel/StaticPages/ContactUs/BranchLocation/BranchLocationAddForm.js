import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Breadcrumb from "../../../../BreadCrumb/Breadcrumb";
import * as Yup from "yup";
import { Formik } from "formik";
import LocationService from "../../../../../Services/SitePanelServices/LocationService";

const DepartmentWiseAddForm = () => {
  const params = useParams();
  const locationServe = new LocationService();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState({
    name: "",
    address: "",
    phone1: "",
    phone2: "",
    phone3: "",
  });

  const GetLocationContent = async () => {
    try {
      let response = await locationServe.getData(params.id);
      if (response) {

        setValue({
          id: response.data.id,
          name: response.data.title,
          address: response.data.address,
          phone1: JSON.parse(response.data.mobile_number || "[]")?.[0],
          phone2: JSON.parse(response.data.mobile_number || "[]")?.[1],
          phone3: JSON.parse(response.data.mobile_number || "[]")?.[2],
        });
      } else {
        toast.error("data not found!");
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    if (params.id) {
      GetLocationContent();
    }
  }, []);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const VoucherSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    phone1: Yup.string()
      .required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    let mobile_number = [];
    if (values.phone1) {
      mobile_number.push(values.phone1);
    }
    if (values.phone2) {
      mobile_number.push(values.phone2);
    }
    if (values.phone3) {
      mobile_number.push(values.phone3);
    }
    let obj = {
      title: values.name,
      address: values.address,
      mobile_number: mobile_number,
    };

    if (values.id) {
      obj["id"] = values.id;
    }

    try {
      if (values.id) {
        let response = await locationServe.updatedata(obj);
        if (response.status === "success") {
          toast.success(" updated Successfully");
          setTimeout(() => {
            navigate("/branch-location");
          }, [1000]);
          setValue({
            name: "",
            address: "",
            phone1: "",
            phone2: "",
            phone3: "",
          });
          resetForm();
        } else {
          toast.error(response.message);
        }
      } else {
        let response = await locationServe.createdata(obj);
        if (response.status === "success") {
          toast.success(" created Successfully");
          setTimeout(() => {
            navigate("/branch-location");
          }, [1000]);
          setValue({
            name: "",
            address: "",
            phone1: "",
            phone2: "",
            phone3: "",
          });
        } else {
          toast.error(response.message);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div className="page-body">
        <Breadcrumb
          heading={params.id ? "Edit Branch Location" : "Add Branch Location"}
        />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>{params.id ? "Edit" : "Add"} Branch Location</h5>
                </div>
                <Formik
                  initialValues={value}
                  validationSchema={VoucherSchema}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                >
                  {(props) => (
                    <form className="" onSubmit={props.handleSubmit}>
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Branch Name <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              value={props.values.name}
                              onBlur={props.handleBlur}
                              name="name"
                              type="text"
                              placeholder="Enter branch name"
                            />
                            {props.touched.name && props.errors.name ? (
                              <div className="formik-errors bg-error">
                                {props.errors.name}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Branch Address{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              value={props.values.address}
                              onBlur={props.handleBlur}
                              name="address"
                              type="text"
                              placeholder="Enter branch address"
                            />
                            {props.touched.address && props.errors.address ? (
                              <div className="formik-errors bg-error">
                                {props.errors.address}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Phone No. <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              value={props.values.phone1}
                              onBlur={props.handleBlur}
                              name="phone1"
                              type="text"
                              placeholder="Enter phone no"
                            />
                            {props.touched.phone1 && props.errors.phone1 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.phone1}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Phone No. </label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              value={props.values.phone2}
                              onBlur={props.handleBlur}
                              name="phone2"
                              type="text"
                              placeholder="Enter phone no"
                            />
                            {props.touched.phone2 && props.errors.phone2 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.phone2}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">Phone No. </label>
                            <input
                              className="form-control"
                              onChange={props.handleChange}
                              value={props.values.phone3}
                              onBlur={props.handleBlur}
                              name="phone3"
                              type="text"
                              placeholder="Enter phone no"
                            />
                            {props.touched.phone3 && props.errors.phone3 ? (
                              <div className="formik-errors bg-error">
                                {props.errors.phone3}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="card-footer text-end">
                        <button className="btn btn-primary me-2" type="submit">
                          Submit
                        </button>
                        <button className="btn btn-danger" type="reset">
                          Reset
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              <ToastContainer autoClose={1000} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentWiseAddForm;
