import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import CourseService from "../../Services/CourseService/CourseService";

const CourseEnquiryPopUpField = React.lazy(() => import("./CourseEnquiryPopUpField"));

export default function CourseEnquiryPopUp({
  setCourseEnquiry,
  CourseEnquiry,
  detailData,
  active,
  setActive,
}) {
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [ip, setIP] = useState("");
  const course = new CourseService();
  const navigate = useNavigate();
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

  const onSubmit = async (values) => {
    let obj = {
      name: values.name,
      mobile: values.mobile,
      country_code: values.country_code,
      email: values.email,
      enquiry_type: values.enquiry_type,
      message: values.message,
      ip_address: ip,
    };
    if (window.location.pathname !== "/international-students") {
      obj["course_id"] = detailData.id;
    }
    if (verify) {
      setError();
      setLoader(true);
      try {
        const response = await course.query(obj);
        if (response.status === "success") {
          setLoader(false);
          setCourseEnquiry(false);
          setTimeout(() => {
            navigate("/enquiry-thankyou");
          }, []);
          setValues({
            name: "",
            email: "",
            mobile: "",
            ip_address: "",
            message: "",
            country_code: "",
          });
        } else {
          setLoader(false);
          toast.error(response.message);
          setCourseEnquiry(false);
        }
      } catch (err) {
        throw err;
      }
    } else {
      setError(" Please fill Recapcha  correctly");
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
    <div
      className={CourseEnquiry || active ? "modal fade show" : "modal fade"}
      id="view-details"
      style={
        CourseEnquiry || active ? { display: "block" } : { display: "none" }
      }
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Enquire Now
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setCourseEnquiry(false);
                setActive(false);
              }}
            ></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={values}
              validationSchema={VoucherSchema}
              onSubmit={onSubmit}
              enableReinitialize={true}
            >
              {(props) => (
                  <React.Suspense fallback="">
                   <CourseEnquiryPopUpField
                  props={props}
                  setVerify={setVerify}
                  error={error}
                  loader={loader}
                  verify={verify}
                />
                  </React.Suspense>
              
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
