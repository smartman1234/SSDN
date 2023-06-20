import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../../../BreadCrumb/Breadcrumb";
import axios from "axios";
import Select from "react-select";
import BatchService from "../../../../Services/BatchServices/BatchServices";

export default function UpcomingBatches() {
    const batchServe = new BatchService();
    const [course, setCourse] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        mode: "",
        course_id: "",
        training_mode: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        inr_price: "",
    });

    const name = (
        <Link to="/batch-list" className="btn btn-primary">
            Back
        </Link>
    );

    const onSubmit = async (values) => {
        let obj = {
            mode: values.mode,
            training_mode: values.training_mode,
            course_id: values.course_id.value,
            start_time: values.start_time,
            start_date: values.start_date,
            end_time: values.end_time,
            end_date: values.end_date,
            inr_price: values.inr_price,
        };
        if (values.id) {
            obj["id"] = values.id;
        }

        if (values.id) {
            try {
                const response = await batchServe.update(obj);
                if (response) {
                    toast.success("Record update successfully");
                    setTimeout(() => {
                        navigate("/batch-list");
                    }, [1000]);
                } else {
                    toast.error(response.data.message);
                }
            } catch (err) {
                throw err;
            }
        } else {
            try {
                const response = await batchServe.create(obj);
                if (response) {
                    toast.success("Record created successfully");
                    setTimeout(() => {
                        navigate("/batch-list");
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
        mode: Yup.string().required("Required"),
        course_id: Yup.mixed().required("Required"),
        training_mode: Yup.string().required("Required"),
        start_date: Yup.date(),
        end_date: Yup.date().min(
            Yup.ref('start_date'),
            "end date can't be before start date"
          )
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
            let response = await batchServe.getDetail(params.id);
            if (response.status === "success") {
                let obj = {};
                const course = response.data.course;
                obj["value"] = course.id;
                obj["label"] = course.name;
                setValues({
                    id: response.data.id,
                    mode: response.data.mode,
                    course_id: obj,
                    training_mode: response.data.training_mode,
                    start_date: response.data.start_date,
                    start_time: response.data.start_time,
                    end_date: response.data.end_date,
                    end_time: response.data.end_time,
                    inr_price: response.data.inr_price,
                });
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
        <>
            <div className="page-body">
                <Breadcrumb
                    heading={params.id ? "Edit Batch" : "Add Batch"}
                    add={name}
                />
                <div className="container-fluid support-ticket">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>{params.id ? "Edit Batch" : "Add Batch"}</h5>
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
                                                    <div className="form-group  col-md-6">
                                                        <label className="form-label">
                                                            Course <span className="text-danger">*</span>
                                                        </label>
                                                        <Select
                                                            onChange={(value) =>
                                                                props.setFieldValue("course_id", value)
                                                            }
                                                            options={course}
                                                            name="course_id"
                                                            value={props.values.course_id}
                                                        />
                                                        {props.touched.course_id &&
                                                            props.errors.course_id ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.course_id}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group  col-md-6">
                                                        <label className="form-label">
                                                            Training Mode <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            onChange={props.handleChange}
                                                            value={props.values?.training_mode}
                                                            name="training_mode"
                                                            placeholder="Enter training mode"
                                                        />

                                                        {props.touched.training_mode &&
                                                            props.errors.training_mode ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.training_mode}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-md-6">
                                                        <label className="form-label">
                                                            Mode <span className="text-danger">*</span>
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            onChange={props.handleChange}
                                                            value={props.values.mode}
                                                            name="mode"
                                                        >
                                                            <option value="" select="false">
                                                                Select type
                                                            </option>

                                                            <option value="normal">Normal</option>
                                                            <option value="fast_track">Fast Track</option>
                                                        </select>
                                                        {props.touched.mode && props.errors.mode ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.mode}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="form-label">
                                                            Start Time
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            name="start_time"
                                                            type="time"
                                                            value={props.values.start_time}
                                                        />
                                                        {props.touched.start_time &&
                                                            props.errors.start_time ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.start_time}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="form-label">
                                                            End Time
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            name="end_time"
                                                            type="time"
                                                            value={props.values.end_time}
                                                        />
                                                        {props.touched.end_time &&
                                                            props.errors.end_time ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.end_time}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="form-label">
                                                            Start Date <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            name="start_date"
                                                            type="date"
                                                            value={props.values.start_date}
                                                        />
                                                        {props.touched.start_date &&
                                                            props.errors.start_date ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.start_date}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="form-label">
                                                            End Date <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            name="end_date"
                                                            type="date"
                                                            value={props.values.end_date}
                                                        />
                                                        {props.touched.end_date &&
                                                            props.errors.end_date ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.end_date}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="form-label">INR Price</label>
                                                        <input
                                                            className="form-control"
                                                            onChange={props.handleChange}
                                                            onBlur={props.handleBlur}
                                                            name="inr_price"
                                                            type="text"
                                                            value={props.values.inr_price}
                                                            placeholder="Enter inr price "
                                                        />
                                                    </div>
                                                </div>
                                                <div className="card-footer text-end">
                                                    <button
                                                        className="btn btn-primary"
                                                        type="submit"
                                                    >
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

          <ToastContainer autoClose={1000} />
        </>
    );
}
