import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeadingName from "../HeadingName/HeadingName";
import UserService from "../../Services/UserService";

const Profile = React.lazy(() => import("./Profile"));

export default function ChangePassword() {
  const userServe = new UserService();

  const [value, setValue] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const onSubmit = async (values) => {
    let obj = {
      old_password: values.old,
      password: values.new,
    };

    try {
      let response = await userServe.changePassword(obj);
      if (response.status === "success") {
        toast.success("Password changed successfully");
      } else {
        toast.error("Password did not match with your old password");
      }
    } catch (err) {
      throw err;
    }
  };

  const ValidateSchema = Yup.object().shape({
    old: Yup.string().required("Required"),
    new: Yup.string()
      .min(6, "Password is too short - should be 6 chars minimum.")
      .required("Required"),
    confirm: Yup.string()
      .oneOf([Yup.ref("new"), null], "Passwords must match")
      .required("Required"),
  });
  return (
    <>
    <HeadingName name="Change Password" home="Home" heading="Change Password" />
    
      <div className="edu-event-details-area edu-event-details edu-section-gap bg-color-white">
        <div className="container">
          <div className="row">
          <React.Suspense fallback="">
          <Profile />
          </React.Suspense>
         
            <div className="col-lg-9">
              <div className="edu-course-widget widget-category">
                <div className="inner">
                  <h5 className="widget-title">Change Password Courses</h5>
                  <Formik
                    initialValues={value}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                    validationSchema={ValidateSchema}
                  >
                    {(props) => (
                      <form
                        className="row"
                        onSubmit={props.handleSubmit}
                      >
                        <div className="row">
                          <div className="input-box col-md-6 mb--20">
                            <label>Old Password</label>
                            <input
                              type="password"
                              placeholder="Old Password *"
                              name="old"
                              onChange={props.handleChange}
                              value={props.values.old}
                              className="form-control"
                            />
                            {props.touched.old && props.errors.old ? (
                              <div className="formik-errors bg-error">
                                {props.errors.old}
                              </div>
                            ) : null}
                          </div>
                          <div className="input-box col-md-6 mb--20">
                            <label>New Password</label>
                            <input
                              type="password"
                              name="new"
                              placeholder="New Password *"
                              onChange={props.handleChange}
                              value={props.values.new}
                              className="form-control"
                            />
                            {props.touched.new && props.errors.new ? (
                              <div className="formik-errors bg-error">
                                {props.errors.new}
                              </div>
                            ) : null}
                          </div>
                          <div className="input-box col-md-6 mb--20">
                            <label>Confirm New Password</label>
                            <input
                              type="password"
                              name="confirm"
                              placeholder="Confirm New Password *"
                              onChange={props.handleChange}
                              value={props.values.confirm}
                              className="form-control"
                            />
                            {props.touched.confirm && props.errors.confirm ? (
                              <div className="formik-errors bg-error">
                                {props.errors.confirm}
                              </div>
                            ) : null}
                          </div>
                          <div className="text-end">
                            <button className="edu-btn" type="submit">
                              Update Password
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
      <LetUsHelp />
    </>
  );
}
