import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../../container/Context";
import Breadcrumb from "../BreadCrumb/Breadcrumb";
import UserService from "../../Services/UserService";

export default function EmailSetting() {
  const serve = new UserService();
  const navigate = useNavigate();
  const params = useParams();
  const { last, voucherValues } = useContext(Context);
  const [voucher, setVoucher] = voucherValues;
  const [image, setImage] = useState("");
  const [value, setValue] = useState({
    mail_address: "",
    from_name: "",
    mail_cc: "",
    mail_reply_mail: "",
    mail_password: "",
    mail_host: "",
    mail_port: "",
    mail_encryption: "",
  });

  const ValidateSchema = Yup.object().shape({
    mail_address: Yup.string().required("Required"),
    from_name: Yup.string().required("Required"),
    mail_cc: Yup.string().required("Required"),
    mail_reply_mail: Yup.string().required("Required"),
    mail_password: Yup.string().required("Required"),
    mail_host: Yup.string().required("Required"),
    mail_port: Yup.string().required("Required"),
    mail_encryption: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    if (values.id) {
      formData.set("id", values.id);
    }
    formData.set("mail_address", values.mail_address);
    formData.set("from_name", values.from_name);
    formData.set("mail_cc", values.mail_cc);
    formData.set("mail_reply_mail", values.mail_reply_mail);
    formData.set("mail_password", values.mail_password);
    formData.set("mail_host", values.mail_host);
    formData.set("mail_port", values.mail_port);
    formData.set("mail_encryption", values.mail_encryption);

    const config = {
      headers: {
        content: "multipart/form-data",
        AUTHTOKEN: window.user?.data?.auth_token,
      },
    };
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASEURL + "mail-setting",
        formData,
        config
      );
      if (response.data?.status === "success") {
        toast.success(" updated successfully");
      } else {
        toast.err("error");
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
      CategoryByIdApi();
   
  }, []);

  const CategoryByIdApi = async () => {
    try {
      let response = await serve.getmailsetting();
      if (response) {
        setValue({
          id: response.data.id,
          mail_address: response.data?.mail_address,
          from_name: response.data.from_name,
          mail_cc: response.data.mail_cc,
          mail_reply_mail: response.data.mail_reply_mail,
          mail_password: response.data.mail_password,
          mail_host: response.data.mail_host,
          mail_port: response.data.mail_port,
          mail_encryption: response.data.mail_encryption,
        });
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="page-body">
      <Breadcrumb heading="Email Setting" />
      <div className="container-fluid support-ticket">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Email Setting</h5>
              </div>
              <Formik
                initialValues={value}
                onSubmit={onSubmit}
                enableReinitialize={true}
                validationSchema={ValidateSchema}
              >
                {(props) => (
                  <form className="" onSubmit={props.handleSubmit}>
                    <div className="card-body">
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label className="form-label">
                            Mail Address <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.mail_address}
                            name="mail_address"
                            type="email"
                            placeholder="Enter mail address"
                          />
                          {props.touched.mail_address &&
                          props.errors.mail_address ? (
                            <div className="formik-errors bg-error">
                              {props.errors.mail_address}
                            </div>
                          ) : null}
                        </div>

                        <div className="form-group col-md-6">
                          <label className="form-label">From Name</label>
                          <input
                            className="form-control"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.from_name}
                            name="from_name"
                            type="text"
                            placeholder="Enter location"
                          />{" "}
                          {props.touched.from_name && props.errors.from_name ? (
                            <div className="formik-errors bg-error">
                              {props.errors.from_name}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">Mail CC</label>
                          <input
                            className="form-control"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.mail_cc}
                            name="mail_cc"
                            type="text"
                          />{" "}
                          {props.touched.mail_cc && props.errors.mail_cc ? (
                            <div className="formik-errors bg-error">
                              {props.errors.mail_cc}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-12">
                          <label className="form-label">Note : Seprate your mail id with a comma </label>
                          </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">Mail Reply Mail</label>
                          <input
                            className="form-control"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.mail_reply_mail}
                            name="mail_reply_mail"
                            type="email"
                          />
                          {props.touched.mail_reply_mail &&
                          props.errors.mail_reply_mail ? (
                            <div className="formik-errors bg-error">
                              {props.errors.mail_reply_mail}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">Mail Password</label>
                          <input
                            className="form-control"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.mail_password}
                            name="mail_password"
                            type="password"
                          />{" "}
                          {props.touched.mail_password &&
                          props.errors.mail_password ? (
                            <div className="formik-errors bg-error">
                              {props.errors.mail_password}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">Mail Host</label>
                          <input
                            className="form-control"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.mail_host}
                            name="mail_host"
                            type="text"
                          />{" "}
                          {props.touched.mail_host && props.errors.mail_host ? (
                            <div className="formik-errors bg-error">
                              {props.errors.mail_host}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">Mail Port</label>
                          <input
                            className="form-control"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.mail_port}
                            name="mail_port"
                            type="text"
                          />{" "}
                          {props.touched.mail_port && props.errors.mail_port ? (
                            <div className="formik-errors bg-error">
                              {props.errors.mail_port}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group col-md-6">
                          <label className="form-label">Mail Encryption</label>
                          <input
                            className="form-control"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.mail_encryption}
                            name="mail_encryption"
                            type="text"
                          />{" "}
                          {props.touched.mail_encryption &&
                          props.errors.mail_encryption ? (
                            <div className="formik-errors bg-error">
                              {props.errors.mail_encryption}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-end">
                      <button className="btn btn-primary me-2" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    <ToastContainer autoClose={1000} />
    </div>
  );
}
