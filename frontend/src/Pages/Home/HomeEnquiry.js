import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import Captcha from "react-numeric-captcha";
import { Formik } from "formik";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import CourseService from "../../Services/CourseService/CourseService";

export default function HomeEnquiry() {
    const [verify, setVerify] = useState(false);
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [ip, setIP] = useState("");
    const course = new CourseService();
    const [value, setValue] = useState({
        company_name: "",
        first_name: "",
        enquiry_type: "",
        name: "",
        email: "",
        mobile: "",
        code: "91",
        message: "",
        ip_address: "",
        attendees: "",
    });

    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        setIP(res.data.ip);
    };
    useEffect(() => {
        getData();
    }, []);

    const onSubmit = async (values, { resetForm }) => {
        let obj = {
            name: values.first_name,
            enquiry_type: values.enquiry_type,
            email: values.email,
            mobile: values.mobile,
            country_code: values.code,
            ip_address: ip,
            message: values.message,
        };
        if (values.enquiry_type === "company") {
            obj["company_name"] = values.company_name;
            obj["attendees"] = values.attendees;
        } else {
            obj["course_voucher_assessment"] = values.name;
        }
        if (verify) {
            setError();
            setLoader(true);
            try {
                const response = await course.query(obj);
                if (response.status === "success") {
                    setLoader(false);
                    setTimeout(() => {
                        navigate("/enquiry-thankyou");
                    }, []);
                    setValue({
                        first_name: "",
                        name: "",
                        email: "",
                        mobile: "",
                        code: "",
                        message: "",
                        ip_address: "",
                    });
                    resetForm();
                } else {
                    setLoader(false);
                    toast.error(response.message);
                }
            } catch (err) {
                throw err;
            }
        } else {
            setError(" Please fill Recapcha correctly ");
        }
    };
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const ValidateSchema = Yup.object().shape({
        enquiry_type: Yup.string().required("Required"),
        company_name: Yup.string()
            .when("enquiry_type", {
                is: (enquiry_type) => enquiry_type === "company",
                then: Yup.string().required("Required"),
            })
            .nullable(),
        first_name: Yup.string().required("Required"),

        email: Yup.string().required("Required"),
        code: Yup.string().required("Required"),
        mobile: Yup.string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("Required"),
        message: Yup.string().required("Required"),

        name: Yup.string()
            .when("enquiry_type", {
                is: (enquiry_type) => enquiry_type === "individual",
                then: Yup.string().required("Required"),
            })
            .nullable(),
        attendees: Yup.string()
            .when("enquiry_type", {
                is: (enquiry_type) => enquiry_type === "company",
                then: Yup.string().required("Required"),
            })
            .nullable(),
    });
    return (
        <div className="edu-section-gap bg-color-white pb--0">
            <div className="container eduvibe-animated-shape">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title text-center">
                            <h3 className="title mb-4">
                                <span className="down-mark-line">Enquiry</span> Now
                            </h3>
                            <span className="pre-title mb--0">
                                Have queries? Talk to our expert. We are happy to help you
                                24/7!!
                            </span>
                        </div>
                        <div className="section-title text-center">
                            <h3 className="title"></h3>
                        </div>
                    </div>
                </div>
                <div className="row g-6 mt--0">
                    <div className="col-lg-6 d-md-block d-none">
                         <LazyLoadImage
                            src="/assets/images/course/imgpsh_fullsize_anim (1).png"
                            height="500px"
                            width="100%"
                        />
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <Formik
                                    initialValues={value}
                                    onSubmit={onSubmit}
                                    enableReinitialize={true}
                                    validationSchema={ValidateSchema}
                                >
                                    {(props) => (
                                        <form
                                            className="login-form_id row"
                                            onSubmit={props.handleSubmit}
                                        >
                                            <div className="col-lg-12 d-flex position-relative">
                                                <div className="comment-form-consent input-box mb--10">
                                                    <input
                                                        id="enquiry_type_join"
                                                        type="radio"
                                                        name="enquiry_type"
                                                        onChange={props.handleChange}
                                                        value="individual"
                                                    />
                                                    <label htmlFor="enquiry_type_join">
                                                        Individual
                                                    </label>
                                                </div>
                                                <div className="comment-form-consent input-box mb--10 pl--30">
                                                    <input
                                                        id="enquiry_type_companys"
                                                        type="radio"
                                                        name="enquiry_type"
                                                        onChange={props.handleChange}
                                                        value="company"
                                                    />
                                                    <label htmlFor="enquiry_type_companys">
                                                        Company
                                                    </label>
                                                </div>
                                                {props.touched.enquiry_type &&
                                                    props.errors.enquiry_type ? (
                                                    <div
                                                        className="formik-errors bg-error"
                                                        style={{ bottom: "0px" }}
                                                    >
                                                        {props.errors.enquiry_type}
                                                    </div>
                                                ) : null}
                                            </div>
                                            {props.values.enquiry_type === "company" ? (
                                                <>
                                                    <div className="col-lg-6 form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="company_name"
                                                            onChange={props.handleChange}
                                                            value={props.values.company_name}
                                                            placeholder="Enter company name"
                                                        />
                                                        {props.touched.company_name &&
                                                            props.errors.company_name ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.company_name}
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                            <div className="col-md-6 form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="first_name"
                                                                    onChange={props.handleChange}
                                                                    value={props.values.first_name}
                                                                    placeholder="Contact person name"
                                                                />
                                                                {props.touched.first_name &&
                                                                    props.errors.first_name ? (
                                                                    <div className="formik-errors bg-error">
                                                                        {props.errors.first_name}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-md-12 form-group">
                                                                <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    name="email"
                                                                    onChange={props.handleChange}
                                                                    value={props.values.email}
                                                                    placeholder="Contact person email"
                                                                />
                                                                {props.touched.email && props.errors.email ? (
                                                                    <div className="formik-errors bg-error">
                                                                        {props.errors.email}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-lg-4 form-group">
                                                                <PhoneInput
                                                                    className="form-selected"
                                                                    country={"in"}
                                                                    enableSearch={true}
                                                                    value={props.values.code}
                                                                    onChange={(e) => {
                                                                        props.setFieldValue("code", e);
                                                                    }}
                                                                />
                                                                {props.touched.code && props.errors.code ? (
                                                                    <div className="formik-errors bg-error">
                                                                        {props.errors.code}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-lg-8 form-group">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Mobile"
                                                                    name="mobile"
                                                                    onChange={props.handleChange}
                                                                    value={props.values.mobile}
                                                                    className="form-control"
                                                                />
                                                                {props.touched.mobile && props.errors.mobile ? (
                                                                    <div className="formik-errors bg-error">
                                                                        {props.errors.mobile}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-md-12 form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    onChange={props.handleChange}
                                                                    name="attendees"
                                                                    value={props.values.attendees}
                                                                    placeholder="No of employee"
                                                                />
                                                                {props.touched.attendees &&
                                                                    props.errors.attendees ? (
                                                                    <div className="formik-errors bg-error">
                                                                        {props.errors.attendees}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <textarea
                                                                    className="form-control"
                                                                    name="message"
                                                                    placeholder="Message"
                                                                    onChange={props.handleChange}
                                                                    value={props.values.message}
                                                                />
                                                                {props.touched.message &&
                                                                    props.errors.message ? (
                                                                    <div className="formik-errors bg-error">
                                                                        {props.errors.message}
                                                                    </div>
                                                                ) : null}
                                                            {/* </div> */}
                                                            {/* <div className="col-lg-12"> */}
                                                                <Captcha onChange={(e) => setVerify(e)} />
                                                                <div className="formik-errors bg-error">
                                                                    {error}
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="col-lg-12 form-group">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Enter first name"
                                                                    name="first_name"
                                                                    className="form-control"
                                                                    onChange={props.handleChange}
                                                                    value={props.values.first_name}
                                                                />
                                                                {props.touched.first_name &&
                                                                    props.errors.first_name ? (
                                                                    <div className="formik-errors bg-error">
                                                                        {props.errors.first_name}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <input
                                                                    type="email"
                                                                    placeholder="Enter email"
                                                                    className="form-control"
                                                                    name="email"
                                                                    onChange={props.handleChange}
                                                                    value={props.values.email}
                                                                />
                                                                {props.touched.email && props.errors.email ? (
                                                                    <div className="formik-errors bg-error">
                                                                        {props.errors.email}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-lg-4 form-group">
                                                                <PhoneInput
                                                                    className="form-selected"
                                                                    country={"in"}
                                                                    enableSearch={true}
                                                                    value={props.values.code}
                                                                    onChange={(e) => {
                                                                        props.setFieldValue("code", e);
                                                                    }}
                                                                />
                                                                {props.touched.code && props.errors.code ? (
                                                                    <div className="formik-errors bg-error">
                                                                        {props.errors.code}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-lg-8 form-group">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Enter mobile no"
                                                                    name="mobile"
                                                                    className="form-control"
                                                                    onChange={props.handleChange}
                                                                    value={props.values.mobile}
                                                                />
                                                                {props.touched.mobile && props.errors.mobile ? (
                                                                    <div className="formik-errors bg-error">
                                                                        {props.errors.mobile}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="name"
                                                                    placeholder="Enter Course / Voucher / Assessment name"
                                                                    onChange={props.handleChange}
                                                                    value={props.values.name}
                                                                />
                                                                {props.touched.name && props.errors.name ? (
                                                                    <div className="formik-errors bg-error">
                                                                        {props.errors.name}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-lg-12 form-group">
                                                                <textarea
                                                                    className="form-control"
                                                                    name="message"
                                                                    placeholder="Message"
                                                                    onChange={props.handleChange}
                                                                    value={props.values.message}
                                                                />
                                                                {props.touched.message &&
                                                                    props.errors.message ? (
                                                                    <div className="formik-errors bg-error">
                                                                        {props.errors.message}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <Captcha onChange={(e) => setVerify(e)} />
                                                                <div className="formik-errors bg-error">
                                                                    {error}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                    {loader ? (
                                                        <div className="col-lg-12 text-center mt-1">
                                                        <strong className="me-2">Loading...</strong>
                                                        <div className="spinner-border text-warning"
                                                        ></div>
                                                    </div>
                                            ) : (
                                                <div className="col-lg-12 text-center mt-4">
                                                    <button
                                                        className="edu-btn"
                                                        name="submit"
                                                        type="submit"
                                                    >
                                                        Submit Now
                                                    </button>
                                                </div>
                                            )}
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={1000} />
        </div >
    );
}
