import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";

import axios from "axios";

import CourseService from "../../Services/CourseService/CourseService";

const DownloadFormFields = React.lazy(() => import("./DownloadFormFields"));

export default function DownloadForm({ active, setActive, detailData, id }) {
  const [loader, setLoader] = useState(false);
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");
  const course = new CourseService();
  const [ip, setIP] = useState("");
  const [value, setValue] = useState({
    first_name: "",
    name: "",
    email: "",
    mobile: "",
    code: "91",
    message: "",
    ip_address: "",
  });

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };
  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (values, { resetForm }) => {
    let obj = {
      enquiry_type: "download",
      course_id: id,
      name: values.first_name,
      email: values.email,
      mobile: values.mobile,
      country_code: values.code,
      ip_address: ip,
      message: values.message,
    };

    if (verify) {
      setError();
      setLoader(true);
      try {
        const response = await course.query(obj);
        if (response.status === "success") {
          toast.success(response.message);
          setLoader(false);
          let element = document.createElement("a");
          element.href = detailData;
          element.download = detailData;
          element.target = "_blank";
          element.click();
          setValue({
            first_name: "",
            name: "",
            email: "",
            mobile: "",
            code: "",
            message: "",
            ip_address: "",
          });
          resetForm();
          setActive(false);
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

  const ValidateSchema = Yup.object().shape({
    first_name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    message: Yup.string().required("Required"),
    code: Yup.string().required("Required"),
  });
  return (
    <div
      className={active ? "modal fade show" : "modal fade"}
      style={active ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div>
              <h5 className="modal-title">Download Content </h5>
              <p>You are just one step away to download the content.</p>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => setActive(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={value}
              onSubmit={onSubmit}
              enableReinitialize={true}
              validationSchema={ValidateSchema}
            >
              {(props) => (
                 <React.Suspense fallback="Loading...">
                 <DownloadFormFields
                  props={props}
                  setVerify={setVerify}
                  error={error}
                  loader={loader}
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
