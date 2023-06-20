import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {  useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";

import CourseService from "../../Services/CourseService/CourseService";
import axios from "axios";

const ResolveQueryFormFields = React.lazy(() => import("./ResolveQueryFormFields"));

export default function ResolveQuery({ params }) {
  const [ip, setIP] = useState("");
  const course = new CourseService();
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    enquiry_type: "",
    name: "",
    email: "",
    mobile: "",
    ip_address: "",
    message: "",
    country_code: "91",
    company_name: "",
    attendees: "",
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
      course_id: params.id,
      name: values.name,
      mobile: values.mobile,
      country_code: values.country_code,
      email: values.email,
      enquiry_type: values.enquiry_type,
      message: values.message,
      ip_address: ip,
    };
    if (values.enquiry_type === "company") {
      obj["company_name"] = values.company_name;
      obj["attendees"] = values.attendees;
    }
    if (verify) {
      setError();
      setLoader(true);
      try {
        const response = await course.query(obj);
        if (response) {
          setLoader(false);
          toast.success(response.message);
          setTimeout(() => {
            navigate("/enquiry-thankyou");
          }, []);

          setValues({
            enquiry_type: "",
            name: "",
            email: "",
            mobile: "",
            ip_address: "",
            message: "",
            country_code: "",
            company_name: "",
            attendees: "",
          });
        } else {
          setLoader(false);
          toast.error(response.message);
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
    company_name: Yup.string()
      .when("enquiry_type", {
        is: (enquiry_type) => enquiry_type && enquiry_type === "company",
        then: Yup.string().required("Required"),
      })
      .nullable(),
    enquiry_type: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required")
      .min(10, "too short")
      .max(10, "too long"),
    country_code: Yup.string().required("Required"),
    attendees: Yup.string()
      .when("enquiry_type", {
        is: (enquiry_type) => enquiry_type && enquiry_type === "company",
        then: Yup.string().required("Required"),
      })
      .nullable(),
  });

  return (
    <div className="col-lg-4 mt--30">
      <div className="resolve-query">
        <div className="resolve-query-img text-center">
           <LazyLoadImage
            src="/assets/images/Form.png"
            alt="image"
            height="100%"
            width="100%"
          />
        </div>
        <div className="col-lg-12">
          <div className="section-title text-center">
            <span className="pre-title mb-0">Request for more information</span>
          </div>
        </div>
        <Formik
          initialValues={values}
          validationSchema={VoucherSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(props) => (
            <React.Suspense fallback="">
              <ResolveQueryFormFields
              props={props}
              setVerify={setVerify}
              error={error}
              loader={loader}
            />
          </React.Suspense>
         
          )}
        </Formik>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}
