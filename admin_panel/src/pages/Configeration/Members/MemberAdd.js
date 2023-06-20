import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import Breadcrumb from "../../BreadCrumb/Breadcrumb";
import axios from "axios";
import RoleService from "../../../Services/ConfigerationService/RoleService";
import MemberService from "../../../Services/ConfigerationService/MemberService";

export default function MemberAdd() {
  const [loading, setLoading] = useState(false);
  const [allCategoryList, setAllCategoryList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const serve = new MemberService();
  const [parent, setCategory] = useState([]);
  const [values, setValues] = useState({
    name: "",
    user_name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    password: "",
    confirm_password: "",
  });

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const VoucherSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    user_name: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required")
      .min(10, "too short")
      .max(10, "too long"),
    address: Yup.string().required("Required"),
    role: Yup.mixed().required("Required"),
    password: Yup.string().min(
      6,
      "Password is too short - should be 6 chars minimum."
    ),

    confirm_password: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("name", values.name);
    formData.set("user_name", values.user_name);
    formData.set("email", values.email);
    formData.set("contact_number", values.phone);
    formData.set("address", values.address);
    formData.set("roles_id", values.role.value);
    formData.set("password", values.password);
    formData.set("confirm_password", values.confirm_password);
    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    setLoading(true);
    if (values.id) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_BASEURL + `admin/update-admin-auth`,
          formData,
          config
        );
        if (response.data?.status === "success") {
          setLoading(false);
          toast.success("Record update successfully");
          setTimeout(() => {
            navigate("/members");
          }, [1000]);
        } else {
          toast.error(response.data?.message);
          setLoading(false);
        }
      } catch (err) {
        throw err;
      }
    } else {
      axios
        .post(
          process.env.REACT_APP_API_BASEURL + "admin/create-admin-auth",
          formData,
          config
        )
        .then((res) => {
          if (res.data?.status === "success") {
            setLoading(false);
            toast.success("Record created successfully");
            setTimeout(() => {
              navigate("/members");
            }, [1000]);
          } else if (res.data?.status === "fail") {
            toast.error(res.data?.data?.contact_number || res.data?.data?.name);
            setLoading(false);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const getDetail = async () => {
    try {
      let response = await serve.detail(params.id);
      if (response.status === "success") {
        const role = {};
        role["value"] = response.data.role?.id;
        role["label"] = response.data.role?.name;
        setValues({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,

          user_name: response.data.user_name,
          email: response.data.email,
          phone: response.data.contact_number,
          address: response.data.address,
          role: role,
        });
      } else {
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (params.id) {
      getDetail();
    }
    RolesList();
  }, []);

  const name = (
    <Link to="/roles" className="btn btn-primary">
      Back
    </Link>
  );

  const RolesList = async () => {
    try {
      let response = await serve.roles();
      if (response) {
        setCategory(response.data);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <>
      <div className="page-body">
        <Breadcrumb
          heading={params.id ? "Edit Member" : "Add Member"}
          add={name}
        />
        <div className="container-fluid support-ticket">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>{params.id ? "Edit Member" : "Add Member"}</h5>
                </div>
                <Formik
                  initialValues={values}
                  validationSchema={VoucherSchema}
                  onSubmit={onSubmit}
                  enableReinitialize={true}
                >
                  {(props) => (
                    <form className="" onSubmit={props.handleSubmit}>
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Full Name <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              value={props.values.name}
                              onChange={(event) => {
                                props.setFieldValue("name", event.target.value);
                              }}
                              onBlur={props.handleBlur}
                              name="name"
                              type="text"
                              placeholder="Enter member name"
                            />
                            {props.touched.name && props.errors.name ? (
                              <div className="formik-errors bg-error">
                                {props.errors.name}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              User Name <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              value={props.values.user_name}
                              onChange={(event) => {
                                props.setFieldValue(
                                  "user_name",
                                  event.target.value
                                );
                              }}
                              onBlur={props.handleBlur}
                              name="user_name"
                              type="text"
                              placeholder="Enter user name"
                            />
                            {props.touched.user_name &&
                            props.errors.user_name ? (
                              <div className="formik-errors bg-error">
                                {props.errors.user_name}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              value={props.values.email}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="email"
                              type="email"
                              placeholder="Enter user email"
                            />
                            {props.touched.email && props.errors.email ? (
                              <div className="formik-errors bg-error">
                                {props.errors.email}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Phone <span className="text-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              value={props.values.phone}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="phone"
                              type="text"
                              placeholder="Enter phone number"
                            />
                            {props.touched.phone && props.errors.phone ? (
                              <div className="formik-errors bg-error">
                                {props.errors.phone}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Address
                              <span className="text-danger">*</span>
                            </label>
                            <textarea
                              className="form-control"
                              value={props.values.address}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="address"
                              type="text"
                            />
                            {props.touched.description &&
                            props.errors.description ? (
                              <div className="formik-errors bg-error">
                                {props.errors.description}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="contact">
                              Role <span className="text-danger">*</span>
                            </label>
                            <Select
                              onChange={(value) => {
                                props.setFieldValue("role", value);
                              }}
                              options={parent}
                              name="parent"
                              value={props.values.role}
                            />
                          </div>
                          {/* {params.id && ( */}
                          <div className="form-group col-md-6">
                            <label className="form-label">Password</label>
                            <input
                              className="form-control"
                              value={props.values.password}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="password"
                              type="password"
                              placeholder="Enter password"
                            />
                            {props.touched.password && props.errors.password ? (
                              <div className="formik-errors bg-error">
                                {props.errors.password}
                              </div>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label className="form-label">
                              Confirm Password
                            </label>
                            <input
                              className="form-control"
                              value={props.values.confirm_password}
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              name="confirm_password"
                              type="password"
                              placeholder="Enter password"
                            />
                            {props.touched.password && props.errors.password ? (
                              <div className="formik-errors bg-error">
                                {props.errors.password}
                              </div>
                            ) : null}
                          </div>
                          {/* )} */}
                          {loading ? (
                            <div className="d-flex justify-content-center">
                              <div className="spinner-border text-success" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          ) : (
                            <div className="card-footer text-end">
                              <button className="btn btn-primary" type="submit">
                                Submit
                              </button>
                            </div>
                          )}
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

    <ToastContainer autoClose={1000} />
    </>
  );
}
