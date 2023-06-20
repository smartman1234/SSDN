import React, {  useState,useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import UserService from "../../Services/UserService";
import * as Yup from "yup";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Formik, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "./SocialLogin";

export default function ResetPassword() {

  const userService = new UserService();
  const params = useParams();
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };
  useEffect(() => {
    localStorage.setItem("prevurl", window.location.pathname);
  }, []);
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password is too short - should be 6 chars minimum.")
      .required("Password is a required field"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Password must match")
      .required("Confirm Password is a required field"),
  });
  const submitResetPassword = async (values, e) => {
    let obj = {
      password: values.newPassword,
      token: params?.token,
      email: params?.email,
    };
    try {
      let response = await userService.resetPassword(obj);
      if (response.status === "success") {
        localStorage.setItem("prevurl",window.location.pathname)
        toast.success(response.message);
        setTimeout(() => {
          navigate("/login");
        }, [1000]);
      } else {
        localStorage.setItem("prevurl",window.location.pathname)
        toast.error(response.message);
      }
    } catch (err) {
      
    }
  };
  return (
    <>
      <div className="login-register-page-wrapper mt--15 bg-color-white">
        <div className="container checkout-page-style">
          <div className="row align-items-center">
            <div className="col-lg-7">
               <LazyLoadImage loading="lazy" src="/assets/images/login.png" alt="image"
                                height="100%"
                                width="100%"/>
            </div>
            <div className="col-lg-5">
              <div className="login-form-box signin">
                <h5 className="mb--5">Reset Password</h5>
                <Formik
                  validationSchema={validationSchema}
                  initialValues={initialValues}
                  enableReinitialize={true}
                  onSubmit={submitResetPassword}
                >
                  {({
                    values,
                    errors,
                    status,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form className="login-form" onSubmit={handleSubmit}>
                      <div className="input-box mb--15">
                        <label className="mb-2">Enter new password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="newPassword"
                          value={values && values.newPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.newPassword && !errors.newPassword}
                        />
                        <ErrorMessage name="newPassword">
                          {(msg) => (
                            <div className="formik-errors bg-error">{msg}</div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="input-box mb--10">
                        <label className="mb-2">Confirm new password</label>
                        <input
                          type={passwordShown ? "text" : "password"}
                          className="form-control"
                          name="confirmPassword"
                          value={values && values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={
                            touched.confirmPassword && !errors.confirmPassword
                          }
                        />
                        <ErrorMessage name="confirmPassword">
                          {(msg) => (
                            <div className="formik-errors bg-error">{msg}</div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="comment-form-consent input-box mb--10">
                          <input
                            id="checkbox-1"
                            type="checkbox"
                            onClick={togglePassword}
                          />
                          <label htmlFor="checkbox-1">Show password</label>
                        </div>
                      </div>
                      <div className="mb--10">
                        <button className="edu-btn w-100" type="submit">
                          <span>Change password</span>
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>

              <div className="login-form-box socialsignin">
                <h6 className="mb--5">Sign in with social</h6>

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
