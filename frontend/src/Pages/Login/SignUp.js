import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SEO from "../SEO/SEO";
import MetaService from "../../Services/MetaServices/MetaService";
import UserService from "../../Services/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "./SocialLogin";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

export default function SignUp() {
  const navigate = useNavigate();
  const userServe = new UserService();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
    code: "91",
  });
  const [meta, setMeta] = useState({
    title: "",
    keywords: "",
    description: "",
    breadcrumb: "",
  });
  const metaService = new MetaService();

  const onSubmit = async (values, { resetForm }) => {
    let obj = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      mobile: values.mobile,
      password: values.password,
      register_type: "self",
      country_code: values.code,
      redirect_url: window.location.host + "/otp",
    };
    sessionStorage.setItem("signupData", JSON.stringify(obj));
    try {
      setLoading(true);
      let response = await userServe.sigup(obj);
      if (response.status === "success") {
        console.log("==========",response)
        toast.success(response.message);
        localStorage.setItem("prevurl", window.location.pathname);
        setTimeout(() => {
          navigate("/otp");
        }, [1000]);
        // navigate();

        setLoading(false);
      } else {
        localStorage.setItem("prevurl", window.location.pathname);
        toast.error(response?.data?.email || response?.data?.mobile);
        setLoading(false);
      }
    } catch (err) {
      throw err;
    }
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const ValidateSchema = Yup.object().shape({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().required(),
    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    password: Yup.string()
      .min(6, "Password is too short - should be 6 chars minimum.")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    code: Yup.string().required("Required"),
  });

  useEffect(() => {
    getmetaData("signup");
    localStorage.setItem("prevurl", window.location.pathname);
  }, []);

  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("signup");
      if (response.status === "success") {
        setMeta({
          title: response.data.meta_title,
          Keywords: response.data.meta_keywords,
          description: response.data.meta_description,
          breadcrumb: response.data.breadcrumb,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <SEO
        meta_title={meta?.title}
        meta_description={meta?.description}
        meta_keyword={meta?.Keywords}
        breacrumb={meta?.breadcrumb}
      />
      <div className="login-register-page-wrapper mt--15 bg-color-white">
        <div className="container checkout-page-style">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <LazyLoadImage
                loading="lazy"
                src="/assets/images/login.png"
                alt="image"
                height="100%"
                width="100%"
              />
            </div>
            <div className="col-lg-5">
              <div className="login-form-box signin">
                <h5 className="mb--5">Sign Up</h5>
                <Formik
                  initialValues={value}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                  validationSchema={ValidateSchema}
                >
                  {(props) => (
                    <form
                      className="login-form"
                      action="#"
                      onSubmit={props.handleSubmit}
                    >
                      <div className="row">
                        <div className="input-box col-md-6 mb--15">
                          <input
                            type="text"
                            placeholder="First Name"
                            name="first_name"
                            onChange={props.handleChange}
                            value={props.values.first_name}
                            className="form-control"
                          />
                          {props.touched.first_name &&
                          props.errors.first_name ? (
                            <div className="formik-errors bg-error">
                              {props.errors.first_name}
                            </div>
                          ) : null}
                        </div>
                        <div className="input-box col-md-6 mb--15">
                          <input
                            type="text"
                            placeholder="Last Name"
                            name="last_name"
                            onChange={props.handleChange}
                            value={props.values.last_name}
                            className="form-control"
                          />
                          {props.touched.last_name && props.errors.last_name ? (
                            <div className="formik-errors bg-error">
                              {props.errors.last_name}
                            </div>
                          ) : null}
                        </div>
                        <div className="input-box col-md-12 mb--15">
                          <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={props.handleChange}
                            className="form-control"
                            value={props.values.email}
                          />
                          {props.touched.email && props.errors.email ? (
                            <div className="formik-errors bg-error">
                              {props.errors.email}
                            </div>
                          ) : null}
                        </div>
                        <div className="input-box col-md-4 col-6 mb--15">
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
                        <div className="input-box col-md-8 mb--15">
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
                        <div className="input-box col-md-12 mb--15">
                          <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={props.handleChange}
                            value={props.values.password}
                            className="form-control"
                          />
                          {props.touched.password && props.errors.password ? (
                            <div className="formik-errors bg-error">
                              {props.errors.password}
                            </div>
                          ) : null}
                        </div>
                        <div className="input-box col-md-12 mb--15">
                          <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirm_password"
                            onChange={props.handleChange}
                            value={props.values.confirm_password}
                            className="form-control"
                          />
                          {props.touched.confirm_password &&
                          props.errors.confirm_password ? (
                            <div className="formik-errors bg-error">
                              {props.errors.confirm_password}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        {loading ? (
                          <div className="col-lg-12 text-center mt-1">
                            <strong className="me-2">Loading...</strong>
                            <div className="spinner-border text-warning"></div>
                          </div>
                        ) : (
                          <button
                            className="rn-btn w-100 edu-btn"
                            type="submit"
                          >
                            {" "}
                            <span> Sign Up</span>
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </Formik>
                <div className="input-box mt--10 text-center">
                  Already have a account?
                  <Link to="/login" className="text-primary">
                    {" "}
                    Sign In
                  </Link>
                </div>
              </div>
              <div className="login-form-box socialsignin">
                <h6 className="mb--5">Sign up with social</h6>
                <SocialLogin />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
}
