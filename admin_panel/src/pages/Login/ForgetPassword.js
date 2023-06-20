import React from "react";
import { Link } from "react-router-dom";

function ForgetPassword() {
  return (
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-12 p-0">
          <div className="login-card">
            <div className="login-main">
              <form className="theme-form login-form">
                <h4 className="mb-3">Reset Your Password</h4>
                <div className="form-group">
                  <label>Enter Your Mobile Number</label>
                  <div className="row">
                    <div className="col-4 col-sm-3">
                      <input className="form-control" type="text" value="+ 91" />
                    </div>
                    <div className="col-8 col-sm-9">
                      <input
                        className="form-control"
                        type="tel"
                        value="000-000-0000"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block" type="submit">
                    Send
                  </button>
                </div>
                <div className="form-group">
                  <span className="reset-password-link">
                    If don't receive OTP?  
                    <Link className="btn-link text-danger" to="#">
                      Resend
                    </Link>
                  </span>
                </div>
                <div className="form-group">
                  <label>Enter OTP</label>
                  <div className="row">
                    <div className="col">
                      <input
                        className="form-control text-center opt-text"
                        type="text"
                        value="00"
                        maxLength="2"
                      />
                    </div>
                    <div className="col">
                      <input
                        className="form-control text-center opt-text"
                        type="text"
                        value="00"
                        maxLength="2"
                      />
                    </div>
                    <div className="col">
                      <input
                        className="form-control text-center opt-text"
                        type="text"
                        value="00"
                        maxLength="2"
                      />
                    </div>
                  </div>
                </div>
                <h6>Create Your Password</h6>
                <div className="form-group">
                  <label>New Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                    <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      className="form-control"
                      type="password"
                      name="login[password]"
                      required=""
                      placeholder="*********"
                    />
                    <div className="show-hide">
                      <span className="show"></span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Retype Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                    <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      className="form-control"
                      type="password"
                      name="login[password]"
                      required=""
                      placeholder="*********"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="checkbox">
                    <input id="checkbox1" type="checkbox" />
                    <label className="text-muted" htmlFor="checkbox1">
                      Remember password
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block" type="submit">
                    Done
                  </button>
                </div>
                <p>
                  Already have an password?
                  <Link className="ms-2" to="login.html">
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
