import React, { useState, useEffect, useContext } from "react";
import { Formik } from "formik";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LetUsHelp from "../Home/LetUsHelp/LetUsHelp";
import Utils from "../../Utils/Utils";
import HeadingName from "../HeadingName/HeadingName";
import UserService from "../../Services/UserService";
import { CartContext } from "../../Container/Context";
import PhoneInput from "react-phone-input-2/lib/lib";
import "react-phone-input-2/lib/bootstrap.css";

const UpdateContact = React.lazy(() => import("./UpdateContact"));

const Profile = React.lazy(() => import("./Profile"));

export default function EditProfile() {
  const userServe = new UserService();
  const [value, setValue] = useState({
    image: "",
    first: "",
    last: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    code: "",
  });

  const { user, image, bannery } = useContext(CartContext);
  const [banner, setBannerImage] = bannery;
  const [active, setActive] = useState(false);
  const [userImage, setUserImage] = image;
  const [userName, setUserName] = user;
  const onSubmit = (values) => {
    const formdata = new FormData();
    formdata.set("first_name", values.first);
    formdata.set("last_name", values.last);
    formdata.set("email", values.email);
    formdata.set("image", values.image);
    formdata.set("gender", values.gender);
    formdata.set("date_of_birth", values.dob);
    formdata.set("country_code", values.code);
    if (values.mobile !== "91") {
      formdata.set("mobile", values.mobile);
    }
    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };

    axios
      .post(
        process.env.REACT_APP_API_BASEURL + "user/update-profile",
        formdata,
        config
      )
      .then((res) => {
        if (res.data.status === "success") {
          localStorage.setItem("value", value.image);
          toast.success("Profile updated successfully");
          localStorage.setItem("username", res.data?.data?.first_name);

          setUserImage(res.data?.data?.image);
          setUserName(res.data?.data?.first_name);
          localStorage.setItem("userimage", res.data?.data?.image);
        } else {
          toast.error(
            res?.data?.data?.email ||
              res?.data?.data?.first_name ||
              res?.data?.data?.last_name ||
              res?.data?.data?.mobile
          );
        }
      });
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const ValidateSchema = Yup.object().shape({
    first: Yup.string().required("Required"),
    last: Yup.string().required("Required"),
    gender: Yup.string().required("Required").nullable(),
    dob: Yup.string().required("Required").nullable(),
    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required")
      .nullable(),
  });

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try {
      let response = await userServe.getProfile();
      if (response) {
        setValue({
          first: response.data.first_name,
          last: response.data.last_name,
          email: response.data.email,
          image: response.data.image,
          gender: response.data.gender,
          dob: response.data.date_of_birth,
          mobile: response.data.mobile,
          code: response.data.country_code,
        });
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
    <HeadingName name="Edit Profile" home="Home" heading="Edit Profile" />
    
      <div className="edu-event-details-area edu-event-details edu-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <React.Suspense fallback="">
              <Profile value={value} />
            </React.Suspense>

            <div className="col-lg-9">
              <div className="edu-course-widget widget-category">
                <div className="inner">
                  <h5 className="widget-title">Edit Profile</h5>
                  <Formik
                    initialValues={value}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                    validationSchema={ValidateSchema}
                  >
                    {(props) => (
                      <form className="row" onSubmit={props.handleSubmit}>
                        <div className="form-group col-md-12 mb--20">
                          <div className="avatar-upload">
                            <div className="avatar-edit">
                              <label className="imageUpload">
                                <i className="ri-pencil-fill">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={(e) => {
                                      props.setFieldValue(
                                        "image",
                                        e.target.files[0]
                                      );
                                      setUserImage(
                                        URL.createObjectURL(e.target.files[0])
                                      );
                                    }}
                                  />
                                </i>
                              </label>
                            </div>
                            <div className="avatar-preview">
                              {userImage || props.values.image ? (
                                <div>
                                  <LazyLoadImage
                                    src={userImage || props.values.image}
                                    alt="image"
                                    style={{
                                      padding: "0",

                                      width: "100%",
                                      height: "100%",
                                    }}
                                    height="100%"
                                    width="100%"
                                  />
                                </div>
                              ) : (
                                <div
                                  style={{
                                    background: "f5f5f5",
                                    textAlign: "center",
                                    padding: "30%",
                                    fontSize: "32px",
                                  }}
                                >
                                  {Utils.nameToInitials(
                                    window.user?.data?.name
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="form-group col-md-6 mb--20">
                          <label>
                            First Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="First Name"
                            name="first"
                            onChange={props.handleChange}
                            value={props.values.first}
                            className="form-control"
                          />
                          {props.touched.first && props.errors.first ? (
                            <div className="formik-errors bg-error">
                              {props.errors.first}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6 mb--20">
                          <label>
                            Last Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Last Name"
                            name="last"
                            onChange={props.handleChange}
                            value={props.values.last}
                            className="form-control"
                          />
                          {props.touched.last && props.errors.last ? (
                            <div className="formik-errors bg-error">
                              {props.errors.last}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group col-md-6 mb--20" disabled>
                          <label>
                            Email ID <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="Email ID"
                            name="email"
                            readOnly
                            onChange={props.handleChange}
                            value={
                              window.user?.data?.email
                                ? window.user?.data?.email
                                : ""
                            }
                            className="form-control"
                          />
                          {props.touched.email && props.errors.email ? (
                            <div className="formik-errors bg-error">
                              {props.errors.email}
                            </div>
                          ) : null}
                        </div>
                        {props.values.code == "91" ? (
                          <>
                            {" "}
                            <div className="form-group col-md-2 col-6">
                              <label>
                                Code <span className="text-danger">*</span>
                              </label>{" "}
                              <PhoneInput
                                className="form-selected"
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
                            <div
                              className="form-group col-md-3 col-6 mb--20"
                              disabled
                            >
                              <label>
                                Mobile No.{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Mobile no."
                                name="mobile"
                                disabled
                                readOnly
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
                            <div
                              className="form-group col-md-1 mb--20"
                              style={{ marginTop: "28px" }}
                            >
                              <button
                                type="button"
                                className=" btn btn-primary"
                                onClick={() => setActive(true)}
                              >
                                <i className="ri-pencil-fill"></i>
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="form-group col-md-2 col-6 mb--20">
                              <label>
                                Code <span className="text-danger">*</span>
                              </label>
                              <PhoneInput
                                className="form-selected"
                                enableSearch={true}
                                value={props.values.code}
                                onChange={(e) => {
                                  props.setFieldValue("code", e);
                                }}
                              />
                            </div>
                            <div className="form-group col-md-4 col-6 mb--20">
                              <label>
                                Mobile No.
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Mobile no."
                                name="mobile"
                                onChange={props.handleChange}
                                value={props.values.mobile}
                              />
                              {props.touched.mobile && props.errors.mobile ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.mobile}
                                </div>
                              ) : null}
                            </div>
                          </>
                        )}

                        <div className="col-lg-6">
                          <label>
                            Gender <span className="text-danger">*</span>
                          </label>
                          <br />
                          <div className="d-flex">
                            <div className="comment-form-consent form-group mb--30">
                              <input
                                id="radio-1"
                                type="radio"
                                name="gender"
                                value="male"
                                checked={props.values.gender === "male"}
                                className="gender-radio"
                                onChange={props.handleChange}
                              />

                              <label htmlFor="radio-1">Male</label>
                              {props.touched.gender && props.errors.gender ? (
                                <div className="formik-errors bg-error">
                                  {props.errors.gender}
                                </div>
                              ) : null}
                            </div>

                            <div className="comment-form-consent form-group mb--30 pl--20">
                              <input
                                id="radio-2"
                                type="radio"
                                name="gender"
                                value="female"
                                checked={props.values.gender === "female"}
                                className="gender-radio"
                                onChange={props.handleChange}
                              />
                              <label htmlFor="radio-2">Female</label>
                            </div>
                            <div className="comment-form-consent form-group mb--30 pl--20">
                              <input
                                id="radio-3"
                                type="radio"
                                name="gender"
                                value="other"
                                checked={props.values.gender === "other"}
                                className="gender-radio"
                                onChange={props.handleChange}
                              />

                              <label htmlFor="radio-3">Other</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-group col-md-6 mb--20">
                          <label>
                            DOB <span className="text-danger">*</span>{" "}
                          </label>
                          <br />
                          <input
                            type="date"
                            max={new Date().toISOString().replace(/T.*/, "")}
                            name="dob"
                            onChange={props.handleChange}
                            value={props.values.dob}
                            className="form-control"
                          />
                          {props.touched.dob && props.errors.dob ? (
                            <div className="formik-errors bg-error">
                              {props.errors.dob}
                            </div>
                          ) : null}
                        </div>
                        <div className="text-end">
                          <button className="edu-btn" type="submit">
                            Update Profile
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
        <ToastContainer autoClose={1000} />
      </div>
      <React.Suspense fallback="Loading...">
        <UpdateContact
          active={active}
          setActive={setActive}
          getProfileData={getProfileData}
        />
      </React.Suspense>
      <LetUsHelp />
    </>
  );
}
