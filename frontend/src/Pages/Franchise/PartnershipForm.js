import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Captcha from "react-numeric-captcha";
import PhoneInput from "react-phone-input-2/lib/lib";
import "react-phone-input-2/lib/bootstrap.css";
import PaymentServices from "../../Services/PaymentService/PaymentService";

export default function PartnershipForm() {
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const serve = new PaymentServices();
  const [ip, setIP] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    ip_address: "",
    message: "",
    country_code: "91",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };
  const onSubmit = async (values, { resetForm }) => {
    let obj = {
      country_code: values.country_code,
      name: values.name,
      mobile: values.mobile,
      email: values.email,
      enquiry_type: "franchise",
      message: values.message,
      ip_address: ip,
    };
    if (verify) {
      setError();
      setLoader(true);
      try {
        const response = await serve.enquiry(obj);
        if (response.status === "success") {
          toast.success(response.message);
          setLoader(false);
          resetForm();
          setValues({
            name: "",
            email: "",
            mobile: "",
            country_code: "91",
            ip_address: "",
            message: "",
          });
        } else {
          setLoader(false);
          toast.error(response.message);
          resetForm();
          setValues({
            name: "",
            email: "",
            mobile: "",
            ip_address: "",
            message: "",
            country_code: "91",
          });
        }
      } catch (err) {
        throw err;
      }
    } else {
      setError(" Please fill Recapcha correctly ");
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const VoucherSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required")
      .min(10, "too short")
      .max(10, "too long"),
    country_code: Yup.string().required("Required"),
  });
  return (
    <div className="col-md-5">
      <div className="card">
        <div className="card-body">
          <div className="text-center">
            <h4 className="pix-sliding-headline">Get Partnership Details</h4>
          </div>
          <div className="pix-el-text">
            <p className="text-body-default text-center">
              Investment Starts at Just Rs 8 Lac
            </p>
          </div>
          <Formik
            initialValues={values}
            validationSchema={VoucherSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {(props) => (
              <form
                className="row ssdn-form-design"
                onSubmit={props.handleSubmit}
                style={{ borderTop: "1px solid rgba(45, 40, 78, 0.07)" }}
              >
                <div className="col-lg-12 form-group mt--10">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={props.handleChange}
                      value={props.values.name}
                      placeholder="Name*"
                    />
                    {props.touched.name && props.errors.name ? (
                      <div className="formik-errors bg-error">
                        {props.errors.name}
                      </div>
                    ) : null}
                </div>
                <div className="col-lg-12 form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={props.handleChange}
                      value={props.values.email}
                      placeholder="Email*"
                    />{" "}
                    {props.touched.email && props.errors.email ? (
                      <div className="formik-errors bg-error">
                        {props.errors.email}
                      </div>
                    ) : null}
                  </div>
                <div className="col-lg-4 col-6 form-group">
                    <PhoneInput
                      className="form-select me-3"
                      country={"in"}
                      enableSearch={true}
                      value={props.values.country_code}
                      onChange={(e) => {
                        props.setFieldValue("country_code", e);
                      }}
                    />
                    {props.touched.country_code && props.errors.country_code ? (
                      <div className="formik-errors bg-error">
                        {props.errors.country_code}
                      </div>
                    ) : null}
                </div>
                <div className="col-lg-8 col-6 form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="mobile"
                      onChange={props.handleChange}
                      value={props.values.mobile}
                      placeholder="Phone"
                    />
                    {props.touched.mobile && props.errors.mobile ? (
                      <div className="formik-errors bg-error">
                        {props.errors.mobile}
                      </div>
                    ) : null}
                  </div>
                <div className="col-md-12 form-group">
                    <textarea
                      className="form-control"
                      onChange={props.handleChange}
                      value={props.values.message}
                      name="message"
                      placeholder="Your Message"
                    />
                    {props.touched.message && props.errors.message ? (
                      <div className="formik-errors bg-error">
                        {props.errors.message}
                      </div>
                    ) : null}
                </div>
                <div className="col-lg-12">
                <Captcha onChange={(e) => setVerify(e)} />
                  <div className="formik-errors bg-error">{error}</div>
                </div>
                {loader ? (
                  <div className="col-lg-12 text-center mt-1">
                  <strong className="me-2">Loading...</strong>
                  <div className="spinner-border text-warning"
                  ></div>
              </div>
                ) : (
                  <div className="col-lg-12 mt-4">
                    <button
                      className="edu-btn w-100"
                      name="submit"
                      type="submit"
                    >
                      Submit Now
                    </button>
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
