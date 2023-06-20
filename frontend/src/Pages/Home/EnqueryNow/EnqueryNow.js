import React, { useState, useEffect } from "react";

import { Formik } from "formik";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CourseService from "../../../Services/CourseService/CourseService";
import EnqueryNowFormFields from "./EnqueryNowFormFields";

export default function EnqueryNow({ active, setActive }) {
  const [ip, setIP] = useState("");
  const course = new CourseService();
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState({
    company_name: "",
    first_name: "",
    enquiry_type: "",
    name: "",
    email: "",
    mobile: "",
    code: "91",
    message: "",
    ip_address: "",
    attendees: "",
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
      name: values.first_name,
      enquiry_type: values.enquiry_type,
      email: values.email,
      mobile: values.mobile,
      country_code: values.code,
      ip_address: ip,
      message: values.message,
    };
    if (values.enquiry_type === "company") {
      obj["company_name"] = values.company_name;
      obj["attendees"] = values.attendees;
    } else {
      obj["course_voucher_assessment"] = values.name;
    }
    if (verify) {
      setError();
      setLoader(true);
      try {
        const response = await course.query(obj);
        if (response.status === "success") {
          toast.success(response.message);
          setLoader(false);

          setActive(false);
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
        } else {
          toast.error(response.message);
          setLoader(false);
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
    enquiry_type: Yup.string().required("Required"),
    company_name: Yup.string()
      .when("enquiry_type", {
        is: (enquiry_type) => enquiry_type === "company",
        then: Yup.string().required("Required"),
      })
      .nullable(),
    first_name: Yup.string().required("Required"),

    email: Yup.string().required("Required"),
    code: Yup.string().required("Required"),
    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    message: Yup.string().required("Required"),

    name: Yup.string()
      .when("enquiry_type", {
        is: (enquiry_type) => enquiry_type === "individual",
        then: Yup.string().required("Required"),
      })
      .nullable(),
    attendees: Yup.string()
      .when("enquiry_type", {
        is: (enquiry_type) => enquiry_type === "company",
        then: Yup.string().required("Required"),
      })
      .nullable(),
  });

  return (
    <>
      <div
        className={active ? "modal fade show" : "modal fade"}
        style={active ? { display: "block" } : { display: "none" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="bg-color-white ssdn-data-section pb--0 pt--5">
              <div className="container eduvibe-animated-shape">
                <div className="row">
                  <div className="col-lg-11">
                    <div className="section-title text-center">
                      <h3 className="title mb-2">
                        <span className="down-mark-line">Enquiry</span> Now
                      </h3>
                      <span className="pre-title mb--0">
                        Have queries? Talk to our expert. We are happy to help
                        you 24/7!!
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-11">
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setActive(false)}
                      style={{
                        position: "absolute",
                        right: "30px",
                        top: "15px",
                      }}
                    ></button>
                  </div>
                </div>
                <div className="row g-6 mt--00">
                  <div className="col-lg-6 d-md-block d-none text-center">
                    <LazyLoadImage
                      src="/assets/images/course/imgpsh_fullsize_anim (1).png"
                      height="430px"
                      width="100%"
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="card">
                      <div className="card-body">
                        <Formik
                          initialValues={value}
                          onSubmit={onSubmit}
                          enableReinitialize={true}
                          validationSchema={ValidateSchema}
                        >
                          {(props) => (
                            <EnqueryNowFormFields
                              props={props}
                              loader={loader}
                              error={error}setVerify={setVerify}
                            />
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
}
