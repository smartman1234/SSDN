import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import CourseCourseService from "../../../../Services/CourseService/CourseCourseService";
import TrendingService from "../../../../Services/TrendingService/TrendingService";

function Related() {
  const params = useParams();
  const navigate = useNavigate();
  const [relatedVoucher, setRelatedVoucher] = useState([]);
  const [relatedAssessment, setRelatedAssessment] = useState([]);
  const [values, setValues] = useState({
    type: "",
    voucher: "",
    assessment: "",
  });
  const courseServe = new CourseCourseService();
  const trending = new TrendingService();
  const VoucherSchema = Yup.object().shape({
    type: Yup.string().required("Required"),
    voucher: Yup.string()
      .when("type", {
        is: (type) => type && type === "voucher",
        then: Yup.string().required("Required"),
      })
      .nullable(),
    assessment: Yup.string().when("type", {
      is: (type) => type && type === "assessment",
      then: Yup.string().required("Required"),
    }),
  });

  const onSubmit = async (values) => {
    let obj = {
      type: values.type,
    };
    if (values.id) {
      obj["id"] = values.id;
    }
    if (values.type === "assessment") {
      obj["assessment_id"] = values.assessment;
    } else {
      obj["voucher_id"] = values.voucher;
    }
    try {
      if (values.id) {
        let response = await trending.updatetrending(obj);
        if (response) {
          toast.success(response.message);
          setTimeout(() => {
            navigate("/trending-list");
          }, [1000]);
        } 
      } else {
        let response = await trending.createtrending(obj);
        if (response) {
          toast.success(response.message);
          setTimeout(() => {
            navigate("/trending-list");
          }, [1000]);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const getDataById = async () => {
    try {
      let response = await trending.data(params.id);
      if (response) {
        setValues({
          id: response.data.id,
          type: response.data.type,
          voucher: response.data.voucher_id.toString(),
          assessment: response.data.assessment_id.toString(),
        });

      } else {
        toast.error(response);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (params.id) {
      getDataById();
    }
    relatedAssessmentApi();
    relatedVoucherApi();
  }, []);

  const relatedVoucherApi = async () => {
    try {
      if (params.id) {
        let response = await courseServe.editrelatedvoucher(params.id);
        if (response) {
          let items = [];
          for (const i in response.data) {
            items.push({
              value: response.data[i].id,
              label: response.data[i].name,
            });
          }
          setRelatedVoucher(items);
        }
      } else {
        let response = await courseServe.relatedvoucher();
        if (response) {
          let items = [];
          for (const i in response.data) {
            items.push({
              value: response.data[i].id,
              label: response.data[i].name,
            });
          }
          setRelatedVoucher(items);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const relatedAssessmentApi = async () => {
    try {
      if (params.id) {
        let response = await courseServe.editrelatedassessment(params.id);

        if (response) {
          let items = [];
          for (const i in response.data) {
            items.push({
              value: response.data[i].id,
              label: response.data[i].name,
            });
          }
          setRelatedAssessment(response.data);
        }
      } else {
        let response = await courseServe.relatedassessment();

        if (response) {
          let items = [];
          for (const i in response.data) {
            items.push({
              value: response.data[i].id,
              label: response.data[i].name,
            });
          }
          setRelatedAssessment(response.data);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="page-body">
      <Breadcrumb heading="Add Trending Assessment and Voucher" />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5> Add Trending Assessment and Voucher</h5>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={values}
                  validationSchema={VoucherSchema}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label className="form-label">Type</label>
                          <span className="text-danger">*</span>
                          <select
                            className="form-select"
                            name="type"
                            onChange={props.handleChange}
                            value={props.values.type}
                          >
                            <option value="" select="false">
                              Select type
                            </option>
                            <option value="assessment">Assessment</option>
                            <option value="voucher">Voucher</option>
                          </select>

                          {props.touched.type && props.errors.type ? (
                            <div className="formik-errors bg-error">
                              {props.errors.type}
                            </div>
                          ) : null}
                        </div>
                        {props.values.type === "assessment" && (
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Trending Assessment
                            </label>
                            <span className="text-danger">*</span>
                            <select
                              className="form-select"
                              onChange={props.handleChange}
                              options={relatedAssessment}
                              value={props.values.assessment}
                              name="assessment"
                            >
                              <option value="" select="false">
                                Select type
                              </option>
                              {relatedAssessment.length > 0 &&
                                relatedAssessment.map((v, i) => (
                                  <option value={v.value} key={i}>
                                    {v.label}
                                  </option>
                                ))}
                            </select>
                            {props.touched.assessment &&
                            props.errors.assessment ? (
                              <div className="formik-errors bg-error">
                                {props.errors.assessment}
                              </div>
                            ) : null}
                          </div>
                        )}
                        {props.values.type === "voucher" && (
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Trending Vouchers
                            </label>
                            <span className="text-danger">*</span>

                            <select
                              className="form-select"
                              onChange={props.handleChange}
                              options={relatedVoucher}
                              value={props.values.voucher}
                              name="voucher"
                            >
                              <option value="" select="false">
                                select type
                              </option>
                              {relatedVoucher.length > 0 &&
                                relatedVoucher.map((v, i) => (
                                  <option value={v.value} key={i}>
                                    {v.label}
                                  </option>
                                ))}
                            </select>
                            {props.touched.voucher && props.errors.voucher ? (
                              <div className="formik-errors bg-error">
                                {props.errors.voucher}
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                      <div className="card-footer text-end">
                        <button className="btn btn-primary" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            <ToastContainer autoClose={1000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Related;
