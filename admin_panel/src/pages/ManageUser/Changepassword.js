import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageUserService from "../../Services/ManageUserService/ManageUserService";

export default function ChangePassword({ id, active, setActive }) {
  const serve = new ManageUserService();
  const [value, setValue] = useState({
    new: "",
    confirm: "",
  });

  const onSubmit = async (values) => {
    let obj = {
      user_id: id,
      password: values.new,
    };


    try {
      let response = await serve.password(obj);
      if (response.status === "success") {
        toast.success("Password changed successfully");
        setActive({[id]:false})
      } else {
        toast.error("Password did not match with your old password");
      }
    } catch (err) {
      throw err;
    }
  };

  const ValidateSchema = Yup.object().shape({
   
    new: Yup.string()
      .min(6, "Password is too short - should be 6 chars minimum.")
      .required("Required"),
    confirm: Yup.string()
      .oneOf([Yup.ref("new"), null], "Passwords must match")
      .required("Required"),
  });
  return (
    <>
      <div
        className={active[id] ? "modal fade show" : "modal fade"}
        id="view-details"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={active[id] ? { display: "block" } : { display: "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
            <h5 class="modal-title">Chnage Password</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setActive({ [id]: false })}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <Formik
                  initialValues={value}
                  validationSchema={ValidateSchema}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      <div className="input-box col-md-12">
                        <label>New Password</label>
                      </div>
                      <div className="input-box col-md-12">
                        <input
                          type="password"
                          name="new"
                          placeholder="New Password *"
                          onChange={props.handleChange}
                          value={props.values.new}
                          style={{ width: "100%" }}
                        />
                        {props.touched.new && props.errors.new ? (
                          <div className="formik-errors bg-error">
                            {props.errors.new}
                          </div>
                        ) : null}
                      </div>
                      <div className="input-box col-md-12 mt-4">
                        <label>Confirm New Password</label>{" "}
                      </div>{" "}
                      <div className="input-box col-md-12">
                        <input
                          type="password"
                          name="confirm"
                          placeholder="Confirm New Password *"
                          onChange={props.handleChange}
                          value={props.values.confirm}
                          style={{ width: "100%" }}
                        />
                        {props.touched.confirm && props.errors.confirm ? (
                          <div className="formik-errors bg-error">
                            {props.errors.confirm}
                          </div>
                        ) : null}
                      </div>
                      <div className="text-end mt-3">
                        <button className="edu-btn" type="submit">
                          Update Password
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
      
    </>
  );
}
