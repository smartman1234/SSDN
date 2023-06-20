import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import UserService from "../../Services/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "./SocialLogin";
import { useEffect } from "react";
import MetaService from "../../Services/MetaServices/MetaService";
import SEO from "../SEO/SEO";

export default function ForgetPassword() {
  const metaService = new MetaService();
  const userService = new UserService();
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const navigate = useNavigate();
  const emailAddressInputRef = useRef();

  useEffect(() => {
    localStorage.setItem("prevurl", window.location.pathname);
  }, []);
  const submitHandler = (event) => {
    setLoading(true);
    try {
      event.preventDefault();
      const enteredEmailAddress = emailAddressInputRef.current.value;
      emailAddressInputRef.current.value = "";
      const formData = {
        email: enteredEmailAddress,
        redirect_url: window.location.host + "/reset-password",
      };
      userService
        .forgetpassword(formData)
        .then((response) => {
          if (response.message) {
            toast.success(response.message);
            localStorage.setItem("prevurl", window.location.pathname);
            setLoading(false);
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            toast.error(response?.error);
          }
        })
        .catch(console.log);
    } catch (err) {}
  };

  const loginhandler = () => {
    navigate("/login");
  };
  useEffect(() => {
    getmetaData("forget-password");
  }, []);
  const getmetaData = async () => {
    try {
      let response = await metaService.getMetadetail("forget-password");
      if (response.status === "success") {
        setMeta(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <SEO
        meta_title={meta?.meta_title}
        meta_description={meta?.meta_description}
        meta_keyword={meta?.meta_keywords}
        breacrumb={meta?.breadcrumb}
      />
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
                <h5 className="mb--7">Forget Password</h5>

                <form className="login-form" onSubmit={submitHandler}>
                  <div className="input-box mb--25">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@gmail.com"
                      ref={emailAddressInputRef}
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="mb--10">
                    {loading ? (
                      <div className="col-lg-12 text-center mt-1">
                      <strong className="me-2">Loading...</strong>
                      <div className="spinner-border text-warning"
                      ></div>
                  </div>
                    ) : (
                      <button className="edu-btn w-100" type="submit">
                        <span>Send Reset Link</span>
                      </button>
                    )}

                    <div className="d-flex justify-content-center mt-5">
                      <p mt-5>OR</p>
                    </div>
                    <button
                      className="edu-btn w-100"
                      type="button"
                      onClick={loginhandler}
                    >
                      <span>Login</span>
                    </button>
                  </div>
                </form>
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
