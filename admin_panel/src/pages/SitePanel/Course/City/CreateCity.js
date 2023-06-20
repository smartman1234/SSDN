import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import axios from "axios";
import Select from "react-select";
import BatchService from "../../../../Services/BatchServices/BatchServices";
import CityService from "../../../../Services/CityService/CityService";

export default function CreateCity() {
  const [trainingMode, setTrainingMode] = useState([]);
  const batchServe = new CityService();
  const [course, setCourse] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    city: "",
    longitude: "",
    latitude: "",
  });

  const name = (
    <Link to="/batch-list" className="btn btn-primary">
      Back
    </Link>
  );

  const onSubmit = async (values) => {
    let obj = {
      name: values.city,
      latitude: values.latitude,
      longitude: values.longitude,
    };
    if (values.id) {
      obj["id"] = values.id;
    }

    if (values.id) {
      try {
        const response = await batchServe.updatecity(obj);
        if (response) {
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/cities-list");
          }, [1000]);
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        throw err;
      }
    } else {
      try {
        const response = await batchServe.createcity(obj);
        if (response) {
          toast.success("Record created successfully");
          setTimeout(() => {
            navigate("/cities-list");
          }, [1000]);
        } else {
          toast.error(response.data?.message);
        }
      } catch (err) {
        throw err;
      }
    }
  };

  const VoucherSchema = Yup.object().shape({
    city: Yup.string().required("Required"),
    latitude: Yup.number().required("Required"),
    longitude: Yup.number().required("Required"),
  });

  const getCourseListApi = async () => {
    try {
      let response = await batchServe.courseList();
      if (response) {
        const arr = response.data.map((v, i) => {
          return { value: v.value, label: v.label };
        });
        setCourse(arr);
      }
    } catch (err) {
      throw err;
    }
  };

  const getDetailApi = async () => {
    try {
      let response = await batchServe.getCourseCitydata(params.id);
      if (response.status === "success") {
        setValues({
          id: response.data.id,
          city: response.data.name,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        });
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (params.id) {
      getDetailApi();
    }
    getCourseListApi();
  }, []);


  return (
    <div className="page-body">
      <Breadcrumb heading={params.id ? "Edit City" : "Add City"} add={name} />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>{params.id ? "Edit City" : "Add City"}</h5>
              </div>
              <Formik
                initialValues={values}
                validationSchema={VoucherSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
              >
                {(props) => (
                  <form className="" onSubmit={props.handleSubmit}>
                    <div className="card-body">
                      <div className="row">
                        <div className="form-group col-md-4">
                          <label className="form-label">
                            City <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={props.values.city}
                            name="city"
                            onChange={props.handleChange}
                            placeholder="Enter city"
                          />
                          {props.touched.city && props.errors.city ? (
                            <div className="formik-errors bg-error">
                              {props.errors.city}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-4">
                          <label className="form-label">
                            Latitude <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            value={props.values.latitude}
                            name="latitude"
                            onChange={props.handleChange}
                            placeholder="Enter latitude"
                          />
                          {props.touched.latitude && props.errors.latitude ? (
                            <div className="formik-errors bg-error">
                              {props.errors.latitude}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-4">
                          <label className="form-label">
                            Longitude <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={props.values.longitude}
                            name="longitude"
                            onChange={props.handleChange}
                            placeholder="Enter longitude"
                          />
                          {props.touched.longitude &&
                            props.errors.longitude ? (
                            <div className="formik-errors bg-error">
                              {props.errors.longitude}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="card-footer text-end">
                        <button className="btn btn-primary" type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
