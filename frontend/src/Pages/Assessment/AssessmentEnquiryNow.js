import React, { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../../Container/Context";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Captcha from "react-numeric-captcha";
import EnquiryService from "../../Services/EnquiryService/EnquiryService";

export default function AssessmentEnquiryNow({ assessmentId }) {
    const [verify, setVerify] = useState(false);
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const { modal, pop } = useContext(CartContext);

    const [open, setOpen] = pop;
    const [token, setToken] = useState(false);
    const [ip, setIP] = useState("");
    const [value, setValue] = useState({
        name: "",
        email: "",
        mobile: "",
        token: "token",
        ip_address: "",
        voucher_id: "",
        message: "",
    });
    const enquiryServe = new EnquiryService();

    useEffect(() => {
        if (window.user?.data?.auth_token) {
            setToken(true);
            setValue({ ...value, token: window.user?.data?.auth_token });
        }
        getData();
    }, []);

    const onSubmit = async (values) => {
        let obj = {};
        if (token) {
            obj["assessment_id"] = assessmentId;
            obj["ip_address"] = ip;
            obj["message"] = values.message;
        } else {
            obj["name"] = values.name;
            obj["email"] = values.email;
            obj["mobile"] = values.mobile;
            obj["assessment_id"] = assessmentId;
            obj["ip_address"] = ip;
            obj["message"] = values.message;
        }

        if (verify) {
            setError();
            setLoader(true);
            try {
                let response = await enquiryServe.enquiry(obj);
                if (response.status === "success") {
                    setLoader(false);
                    toast.success(response.message);
                    setOpen(false);
                } else {
                    setLoader(false);
                    toast.error("Enquiry is already submitted for the day!");
                }
            } catch (err) {
                throw err;
            }
        } else {
            setError(" Please fill Recapcha correctly ");
        }
    };

    const ValidateSchema = Yup.object().shape({
        name: Yup.string()
            .when("token", {
                is: "token",
                then: Yup.string().required(),
            })
            .nullable(),
        email: Yup.string()
            .when("token", {
                is: "token",
                then: Yup.string().required(),
            })
            .nullable(),
        mobile: Yup.string()
            .when("token", {
                is: "token",
                then: Yup.string().required(),
            })
            .nullable(),
        message: Yup.string().required(),
    });
    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        setIP(res.data.ip);
    };

    const closeHandle = () => {
        setOpen(false);
    };
    return (
        <>
            <div
                className="modal in"
                id="modalReportedQuestion"
                style={{ display: "block" }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div>
                                <h5 className="modal-title">
                                    Assessment Enquiry Now
                                </h5>
                                <p>
                                    You are just one step away to register for your assessment.
                                </p>
                            </div>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeHandle}
                            ></button>
                        </div>

                        <div className="modal-body mt--20">
                            <div className="row">
                                <div className="col-md-12">
                                    <Formik
                                        initialValues={value}
                                        onSubmit={onSubmit}
                                        enableReinitialize={true}
                                        validationSchema={ValidateSchema}
                                    >
                                        {(props) => (
                                            <form
                                                className="row"
                                                onSubmit={props.handleSubmit}
                                            >
                                                {!window.user?.data?.auth_token && (
                                                    <>
                                                        <div className="form-group col-lg-12">
                                                            <input
                                                                name="name"
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter user name*"
                                                                onChange={(event) => {
                                                                    props.setFieldValue(
                                                                        "name",
                                                                        event.target.value
                                                                    );
                                                                }}
                                                                onBlur={props.handleBlur}
                                                                value={props.values.name}
                                                            />

                                                            {props.touched.name && props.errors.name ? (
                                                                <div className="formik-errors bg-error">
                                                                    {props.errors.name}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="form-group col-lg-12">
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                id="contact-email"
                                                                name="email"
                                                                placeholder="Enter email*"
                                                                onChange={(event) => {
                                                                    props.setFieldValue(
                                                                        "email",
                                                                        event.target.value
                                                                    );
                                                                }}
                                                                onBlur={props.handleBlur}
                                                                value={props.values.email}
                                                            />
                                                            {props.touched.email && props.errors.email ? (
                                                                <div className="formik-errors bg-error">
                                                                    {props.errors.email}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="form-group col-lg-12">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="mobile"
                                                                id="contact-phone"
                                                                placeholder="Enter mobile no"
                                                                onChange={(event) => {
                                                                    props.setFieldValue(
                                                                        "mobile",
                                                                        event.target.value
                                                                    );
                                                                }}
                                                                onBlur={props.handleBlur}
                                                                value={props.values.mobile}
                                                            />
                                                            {props.touched.mobile && props.errors.mobile ? (
                                                                <div className="formik-errors bg-error">
                                                                    {props.errors.mobile}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </>
                                                )}
                                                <div className="form-group col-lg-12">
                                                    <textarea
                                                        className="form-control"
                                                        name="message"
                                                        placeholder="Message"
                                                        onChange={(event) => {
                                                            props.setFieldValue(
                                                                "message",
                                                                event.target.value
                                                            );
                                                        }}
                                                        onBlur={props.handleBlur}
                                                        value={props.values.message}
                                                    />
                                                    {props.touched.message && props.errors.message ? (
                                                        <div className="formik-errors bg-error">
                                                            {props.errors.message}
                                                        </div>
                                                    ) : null}
                                                </div>

                                                <div className="form-group col-lg-12">
                                                    <Captcha onChange={(e) => setVerify(e)} />
                                                    <div className="formik-errors bg-error">
                                                        {error}
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    {loader ? (
                                                        <div className="col-lg-12 text-end mt-1">
                                                            <strong className="me-2">Loading...</strong>
                                                            <div className="spinner-border text-warning"
                                                            ></div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <button
                                                                className="edu-btn mr--10"
                                                                name="submit"
                                                                type="submit"
                                                            >
                                                                Enquiry Now
                                                            </button>
                                                        </>
                                                    )}

                                                    <button
                                                        className="edu-btn btn-bg-alt"
                                                        onClick={closeHandle}
                                                    >
                                                        Cancel
                                                    </button>
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
            </div>
        </>
    );
}
