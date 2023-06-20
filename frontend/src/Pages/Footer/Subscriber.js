import React, { useState, } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import MetaService from "../../Services/MetaServices/MetaService";

export default function Subscriber() {
    const [loader, setLoader] = useState(false);
    const [value, setValue] = useState({
        email: "",
    });
    const serve = new MetaService();

    const onSubmit = async (values, { resetForm }) => {
        let obj = { email: values.email };
        setLoader(true);
        try {
            let response = await serve.subscriber(obj);
            if (response.status === "success") {
                toast.success(response.message);
                setValue({
                    email: ""
                })
                setLoader(false);
                resetForm()
            } else {
                toast.error(response.data?.email);
                setValue({
                    email: ""
                })
                setLoader(false);
                resetForm()
            }
        } catch (err) {
            throw err;
        }
    };

    const ValidateSchema = Yup.object().shape({
        email: Yup.string().required(),
    });

    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="edu-footer-widget explore-widget">
                <h5 className="widget-title">FOR NEWSLETTER</h5>
                <Formik
                    initialValues={value}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                    validationSchema={ValidateSchema}
                >
                    {(props) => (
                        <form onSubmit={props.handleSubmit}>
                            <div className="coupon-code-btn">
                                <input
                                    type="text"
                                    placeholder="Enter email id"
                                    name="email"
                                    onChange={props.handleChange}
                                    value={props.values.email}
                                />
                                {props.touched.email && props.errors.email ? (
                                    <div className="formik-errors bg-error">
                                        {props.errors.email}
                                    </div>
                                ) : null}
                                {loader ? (
                                    <div className="col-lg-12 text-center mt-1">
                                    <strong className="me-2">Loading...</strong>
                                    <div className="spinner-border text-warning"
                                    ></div>
                                </div>
                                ) : (
                                    <button
                                        className="edu-btn btn-dark data-email"
                                        type="submit"
                                    >
                                        Send
                                    </button>
                                )}
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
            <ToastContainer autoClose={1000} />
        </div>
    );
}
