import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import AssessmentService from "../../Services/AssessmentService";

export default function LeaveCommentForm({ assessmentdata }) {
    const assessmentServe = new AssessmentService();
    const [token, setToken] = useState(false);
    const [value, setValue] = useState({
        name: "",
        email: "",
        comment: "",
        review: "",
    });

    useEffect(() => {
        setToken(window.user?.data?.auth_token);
        if (window.user?.data?.auth_token) {
            setToken(true);
        }
    }, []);

    const onSubmit = async (values, { resetForm }) => {

        let obj = {
            comment: values.comment,
            review: values.review,
            assessments_id: assessmentdata.id,
        };

        if (!token) {
            obj["name"] = values.name;
            obj["email"] = values.email;
        }

        try {
            let response = await assessmentServe.assessmentFeedback(obj);
            if (response.status === "success") {
                resetForm();
                toast.success(response.message);
                setValue({
                    name: "",
                    email: "",
                    comment: "",
                    review: "",
                });
            } else {
                toast.error(
                    response.message ||
                    response.data.review ||
                    response.data.name ||
                    response.data.email ||
                    response.data.comment
                );
                setValue({
                    name: "",
                    email: "",
                    comment: "",
                    review: "",
                });
                resetForm();
            }
        } catch (err) {
            throw err;
        }
    };

    const ValidateSchema = Yup.object().shape({
        name: Yup.string().when("token", {
            is: token === true,
            then: Yup.string().required(),
        }),
        email: Yup.string().when("token", {
            is: token === true,
            then: Yup.string().required(),
        }),

        comment: Yup.string().required("Required"),
        review: Yup.string().required("Required"),
    });

    return (
        <Formik
            initialValues={value}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validationSchema={ValidateSchema}
        >
            {(props) => (
                <div className="card mt--30">
                    <div className="card-body">


                        <form
                            className="row"
                            onSubmit={props.handleSubmit}
                        >
                            <h6 className="mb--10">Leave Comments</h6>

                            <div className="rating">
                                <ReactStars
                                    count={5}
                                    name="review"
                                    onChange={(event) => {
                                        props.setFieldValue("review", event);
                                    }}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                                {props.touched.review && props.errors.review ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.review}
                                    </div>
                                ) : null}
                            </div>
                            {!token ? (
                                <>
                                    <div className="col-lg-6 form-group">
                                        <input
                                            name="name"
                                            type="text"
                                            onBlur={props.handleBlur}
                                            value={props.values.name}
                                            className="form-control form-control-lg"
                                            placeholder="Name*"
                                            onChange={(event) => {
                                                props.setFieldValue("name", event.target.value);
                                            }}
                                        />
                                        {props.touched.name && props.errors.name ? (
                                            <div className="formik-errors bg-error">
                                                {props.errors.name}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="col-lg-6 form-group">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            name="email"
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                            placeholder="Email*"
                                            onChange={props.handleChange}
                                        />
                                        {props.touched.email && props.errors.email ? (
                                            <div className="formik-errors bg-error">
                                                {props.errors.email}
                                            </div>
                                        ) : null}
                                    </div>
                                </>
                            ) : null}

                            <div className="col-lg-12 form-group">
                                <textarea
                                    className="form-control"
                                    name="comment"
                                    placeholder="Your comment"
                                    onBlur={props.handleBlur}
                                    value={props.values.comment}
                                    onChange={(event) => {
                                        props.setFieldValue("comment", event.target.value);
                                    }}
                                    maxLength="180"
                                />
                                {props.errors.comment ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.comment}
                                    </div>
                                ) : null}
                            </div>
                            <div className="col-lg-12 text-end">
                                <button className="edu-btn" type="submit">
                                    Submit Now
                                </button>
                            </div>
                        </form></div><ToastContainer />
                </div>
            )}
        </Formik>
    );
}
