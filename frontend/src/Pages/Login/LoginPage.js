import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import UserService from "../../Services/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../../Container/Context";
import SocialLogin from "./SocialLogin";

export default function LoginPage(isOpen, onRequestClose) {
  const userService = new UserService();
  const { login, user, image } = useContext(CartContext);
  const [userName, setUserName] = user;
  const [userImage, setUserImage] = image;
  const [loginData, setLogingData] = login;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    let info = { login_type: "self", email: email, password: password };

    try {
      let response = await userService.login(info);
      setLogingData(response.data);
      if (response.data?.auth_token) {
        setUserName(response.data.first_name);
        const name = localStorage.setItem(
          "username",
          response.data?.first_name
        );
        setUserImage(response.data?.image);
        localStorage.setItem("userimage", response.data?.image);
        toast.success(response.message);
        if (localStorage.getItem("prevurl")) {
          navigate("/");
        } else {
          navigate(-1);
        }
        setEmail("");
        setPassword("");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <div className="login-register-page-wrapper mt--15 bg-color-white">
        <div className="container checkout-page-style">
          <div className="row align-items-center">
            <div className="col-lg-7 d-none d-lg-block">
               <LazyLoadImage loading="lazy" src="/assets/images/login.png" alt="image" 
                                height="100%"
                                width="100%"/>
            </div>
            <div className="col-lg-5">
              <div className="login-form-box signin">
                <h5 className="mb--5">Sign In</h5>

                <form className="login-form" onSubmit={submitHandler}>
                  <div className="input-box mb--15">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      autoComplete="off"
                      placeholder="example@gmail.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="input-box mb--10">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      autoComplete="off"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <Link
                      to="/forget-password"
                      className="lost-password mb--10"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="mb--10">
                    <button className="edu-btn w-100" type="submit">
                      <span>Sign in</span>
                    </button>
                  </div>

                  <div className="text-center">
                    Not registered?{" "}
                    <Link to="/signup" className="text-primary">
                      {" "}
                      Sign Up
                    </Link>
                  </div>
                </form>
              </div>

              <div className="login-form-box socialsignin">
                <h6 className="mb--5">Sign in with social</h6>

                <SocialLogin isOpen={isOpen} onRequestClose={onRequestClose} />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
}
