import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import UserService from "../../Services/UserService";
import { CartContext } from "../../Container/Context";

export default function Otp() {
  const [counter, setCounter] = React.useState(30);
  const [loader, setLoader] = useState(false);
  let getting_email = window.location.pathname.split("/");
  const navigate = useNavigate();
  const userServe = new UserService();
  const [value, setValue] = useState({ otp: "" });
  const { user } = useContext(CartContext);
  const [userName, setUserName] = user;
  const data = JSON.parse(sessionStorage.getItem("signupData"));
  useEffect(() => {
    localStorage.setItem("prevurl", window.location.pathname);
    // setTimeout(() => {
    //   setResendOtp(true);
    // }, [30000]);
  }, []);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    const onSubmit = async (values) => {
        let obj = {
            verification_email: data?.email ? data.email : getting_email?.[3],
            verification_token: values.otp,
            verification_mobile: data?.mobile ? data?.mobile : getting_email?.[4],
        };
        try {
            let response = await userServe.verifyToken(obj);
            if (response.status === "success") {
                setUserName(response.data?.first_name);
                localStorage.setItem("user", JSON.stringify(response));
                localStorage.setItem("username", response.data?.first_name);

                toast.success(response.message);
                localStorage.setItem("prevurl", window.location.pathname);
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, [1000]);
            } else {
                localStorage.setItem("prevurl", window.location.pathname);
                toast.error("wrong otp entered !");
            }
        } catch (err) {
            throw err;
        }
    };

    const ResendOtpHandle = async (values) => {
        let obj = {
            email: data?.email ? data.email : getting_email?.[3],
            redirect_url: window.location.host + "/otp",
            mobile: data?.mobile ? data?.mobile : getting_email?.[4],
        };
        setLoader(true);
        try {
            let response = await userServe.resendOtp(obj);
            if (response.status === "success") {
                console.log("opt", response);
                setLoader();
                toast.success(response?.message);
            } else {
                console.log("opt", response);
                toast.error(
                    response.data?.redirect_url ||
                    response.data?.email ||
                    response.data?.mobile
                );
                setLoader(false);
            }
        } catch (err) {
            throw err;
        }
    };

    const ValidateSchema = Yup.object().shape({
        otp: Yup.number().required("Required"),
    });

    return (
        <>
            <div className="login-register-page-wrapper mt--15 mb--15 bg-color-white">
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
                            <div className="row login-form-box signin">
                                <h5 className="mb--5 text-center">OTP Verification</h5>
                                <hr></hr>
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
                                            {data?.country_code && data.country_code === "91" ? (
                                                <>
                                                    <div className="col-lg-12">
                                                        <p className="mb--0 text-center">
                                                            Please enter the OTP sent to
                                                        </p>
                                                        <p className="text-primary text-center">{data.mobile}</p>
                                                    </div>
                                                    <div className="col-lg-7 m-auto">
                                                        <input
                                                            type="text"
                                                            name="otp"
                                                            placeholder="Enter otp"
                                                            onChange={props.handleChange}
                                                            value={props.values.otp}
                                                        />
                                                        {props.touched.otp && props.errors.otp ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.otp}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="col-lg-7 m-auto text-center mt-5">
                                                        <button
                                                            className="edu-btn w-100"
                                                            name="submit"
                                                            type="submit"
                                                        >
                                                            <span>Verify Now</span>
                                                        </button>
                                                    </div>
                                                    <div className="col-lg-12 text-center mt-4">
                                                        OTP in {counter > 0 ? counter : ""} seconds
                                                    </div>
                                                    {counter == 0 && (
                                                        <>
                                                            {loader ? (
                                                                <div className="col-lg-12 text-center mt-1">
                                                                    <strong className="me-2">Loading...</strong>
                                                                    <div className="spinner-border text-warning"></div>
                                                                </div>
                                                            ) : (
                                                                <div className="col-lg-12 text-center mb-4">
                                                                    <Link style={{ textDecoration: "underline" }}
                                                                        to="#"
                                                                        onClick={ResendOtpHandle}
                                                                    >Resend OTP
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <>

                                                    {/* <div className="col-lg-12 text-center">
                                                        <p className="mb--0">
                                                            Please enter the OTP sent to
                                                        </p>
                                                        <p className="text-primary">
                                                            {data?.email ? data.email : getting_email?.[3]}
                                                        </p>
                                                    </div>
                                                    <div className="col-lg-7 m-auto">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="otp"
                                                            onChange={props.handleChange}
                                                            value={props.values.otp}
                                                            placeholder="Enter otp"
                                                        />
                                                        {props.touched.otp && props.errors.otp ? (
                                                            <div className="formik-errors bg-error">
                                                                {props.errors.otp}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="col-lg-6">
                                                        00:{counter > 0 ? counter : ""}
                                                    </div>

                                                    <div className="col-lg-6">

                                                    </div> */}

                                                </>
                                            )}




                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={1000} />
            </div>
        </>
    );
}
