import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ handleAuthState }) {
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const userService = new UserService();

    const passwordToggle = () => {
        setPasswordShown(!passwordShown);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const enteredUserEmail = emailInputRef.current.value;
        const enteredUserPassword = passwordInputRef.current.value;
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";

        const formData = {
            email: enteredUserEmail,
            password: enteredUserPassword,
        };

        try {
            let response = await userService.login(formData);
            if (response.data?.auth_token) {
                handleAuthState(true);
                navigate("/home");
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            throw err;
        }
    };
    return (
        <>
            
            <div className="login-card">
                <form className="theme-form login-form" onSubmit={submitHandler}>
                    <div className="text-center mb-3">
                        <img src="/assets/images/logo/logo.png" alt="SSDN Logo"/>
                    </div>
                    <h4>Login</h4>
                    <h6>Welcome back! Log in to your account.</h6>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="fa-regular fa-envelope"></i>
                            </span>
                            <input
                                className="form-control"
                                type="text"
                                required
                                placeholder="Test@gmail.com"
                                ref={emailInputRef}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="fa-solid fa-lock"></i>
                            </span>
                            <input
                                className="form-control"
                                type={passwordShown ? "text" : "password"}
                                id="confirmpassword"
                                name="password"
                                autoComplete="true"
                                required
                                placeholder="*******"
                                ref={passwordInputRef}
                            />
                            <div className="show-hide" onClick={passwordToggle}>
                                <span className="show"> </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group d-flex justify-content-between">
                        <Link className="link" to="/forgot_password">
                            Forgot password?
                        </Link>
                        <button className="btn btn-primary btn-block" type="submit">
                        <i className="fa fa-right-to-bracket"></i> Login 
                        </button>
                    </div>
                </form>
            </div>
          <ToastContainer autoClose={1000} />
        </>
    );
}

export default Login;
