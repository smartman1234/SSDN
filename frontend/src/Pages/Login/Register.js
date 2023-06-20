import React from "react";
import { Link } from "react-router-dom";

export default function Register({ register, setRegister }) {
  return (
    <div className="col-lg-6">
      <div className="login-form-box">
        <h3 className="mb-30">Register</h3>
        <form className="login-form" action="#">
          <div className="input-box mb--30">
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="input-box mb--30">
            <input type="email" placeholder="Email" />
          </div>
          <div className="input-box mb--30">
            <input type="password" placeholder="Password" />
          </div>
          <button
            className="edu-btn w-100 mb--30"
            type="submit"
            onClick={() => setRegister(false)}
          >
            <span>Register</span>
          </button>
          <div className="input-box">
            <input id="checkbox-2" type="checkbox" />
            <label htmlFor="checkbox-2">
              I read & agree the <Link to="/term-conditions">
                        Terms &amp; Conditions.
                      </Link>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
